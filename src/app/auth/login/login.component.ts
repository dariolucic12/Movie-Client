import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Token } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
})
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]]
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
    if(this.form.invalid){
      return;
    }
    console.log(this.form.getRawValue())
    const response = await this.http.post("https://localhost:7288/api/Account/login", this.form.getRawValue(), httpOptions )
      .subscribe(res  => {
       const token = JSON.stringify(Object.values(res)[0])
       console.log(token)

        localStorage.setItem("token", token)
        this.router.navigate(['/pages/home']);
      });
  }

  toRegister() {
    this.router.navigate(['/register'])
  }

}
