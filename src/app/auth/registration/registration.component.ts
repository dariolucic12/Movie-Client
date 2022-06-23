import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      phoneNumber:['', [Validators.required]]
    })
  }

  submit(): void {
    let RegisterData = this.form.getRawValue();
    console.log(RegisterData);
    this.http.post("https://localhost:7288/api/Account/register", RegisterData, httpOptions)
      .subscribe(res => {
        console.log(res);
        console.log(RegisterData)
        this.router.navigate(['auth/login']);
      })
  }

  toLogin() {
    this.router.navigate(['auth/login'])
  }

}
