import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Token } from '@angular/compiler';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
})
};

@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = ""
  form!: FormGroup
  isValidLogin: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.max(16), Validators.min(6)]]
    })
  }

  /*submit(): void {
    console.log(this.form.getRawValue())
    this.http.post("https://localhost:7288/api/Account/login", this.form.getRawValue(), {withCredentials: true})
      .subscribe(() => this.router.navigate(['/']));
  } */

  /*submit(): void {
    console.log(this.form.getRawValue())
    this.http.post("https://localhost:7288/api/Account/login", this.form.getRawValue(), httpOptions)
      .subscribe(() => this.router.navigate(['/']));
  }*/

  
 async submit() {

    console.log(this.form.getRawValue())
    const response = await this.http.post("https://localhost:7288/api/Account/login", this.form.getRawValue(), httpOptions )
      .subscribe(res  => {
       const token = JSON.stringify(Object.values(res)[0])
       localStorage.setItem("token", token);
       this.router.navigate(['/pages/home']);
      }, err => {
        this.isValidLogin = false;
      });
      console.log(this.isValidLogin)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if(token && this.jwtHelper.isTokenExpired(token)){
      return false;
    } else if(!token) {
      return false;
    }
    return true;

  }

  toRegister() {
    this.router.navigate(['/register'])
  }

}
