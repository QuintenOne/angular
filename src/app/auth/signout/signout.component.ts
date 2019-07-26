import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html'
})
export class SignoutComponent {

  constructor(private authService: AuthService) { }

  signout() {
    this.authService.signOut();
  }

  getCached() {
    return this.authService.cached; //username en token in localStorage?
  }
}
