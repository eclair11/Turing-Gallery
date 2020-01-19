import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  email;
  password;


  constructor(private formBuilder: FormBuilder, public root: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, {
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  // goToHome() {
  //   alert(this.email);
  //   sessionStorage.setItem('email', this.email);

  // alert('cc: ' + username);
  // console.log('password: ' + password);

  // if (!(this.registerForm.invalid)) {
  //   sessionStorage.setItem('username', username);
  //   this.root.navigate(['/home']);
  // }
  // }


  authenticate() {
    let pass = this.password;
    let email = this.email;

    if (!(this.registerForm.invalid)) {
      this.root.navigate(['/home']);
    }

    sessionStorage.setItem('email', email);


    return this.httpClient.post<any>('http://localhost:8080/authenticate', { email, pass }).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', email);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );


  }


  // isUserLoggedIn() {
  //   let user = sessionStorage.getItem('username')
  //   return !(user === null)
  // }


  // logOut() {
  //   sessionStorage.removeItem('username')
  // }

}
