import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  form: FormGroup;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.form = new FormGroup({
      "email": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }
  signin() {
    this.authService.signIn(this.form.value);
  }
}
