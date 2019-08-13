import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  loginSuccess: boolean = false
  submitted: boolean = false;

  constructor(private authService: AuthService) {  }

  ngOnInit() {
    this.form = new FormGroup({
      "email": new FormControl(null, 
        Validators.compose([
          Validators.required, 
          this.ValidatorIsEmailValid.bind(this)
        ])
      ),
      "username": new FormControl(null, 
        [Validators.required], 
        this.ValidatorIsUsernameTaken.bind(this)
        ),
      "password": new FormControl(null, 
        Validators.compose([
          Validators.required, 
          this.ValidatorIsPasswordValid.bind(this)
        ])) 
    });

    this.form.statusChanges.subscribe((staat) => console.log(staat));
    
  }


  signup(value = undefined) {
    this.submitted = true;

    if (value)
      this.loginSuccess = this.authService.signUp(value);
    else 
      this.authService.signUp(this.form.value);
  }

  ValidatorIsPasswordValid(formControl: FormControl) {
    if ((/[0-9a-zA-Z]{6,}/).test(formControl.value))
      return null;
    else
      return {passwordInvalid: true};
  }

  ValidatorIsEmailValid(formControl: FormControl) {
    if ((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(formControl.value))
      return null;
    else
      return {emailInvalid: true};
  }

  ValidatorIsUsernameTaken(formControl) {
    return new Promise<any>((resolve, reject) => {
      if (formControl.value == "Quinten")
        resolve({'usernameTaken': true});
      else
        reject(null);
    })
  }

  showError(key: string, value): boolean {
    return (this.form.get(key).dirty && value);
  }

  getErrorWithID(eID) {
    if (eID == 0) 
      if (this.form.controls.email.errors["required"])
        return this.form.get("email").dirty
        
    if (eID == 1) 
      if (this.form.controls.email.errors["emailInvalid"])
        return this.form.get("email").dirty
      
    if (eID == 2) 
      if (this.form.controls.username.errors["required"])
        return this.form.get("username").dirty
      
    if (eID == 3) 
      if (this.form.controls.email.errors["passwordInvalid"])
        return this.form.get("password").dirty

    return false
  }
}
/*
this.form.controls.email.errors.required 
this.form.controls.email.errors.emailInvalid 
this.form.controls.username.errors.required
this.form.controls.password.errors.passwordInvalid*/