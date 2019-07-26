import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SigninComponent } from '../auth/signin/signin.component';
import { SignoutComponent } from '../auth/signout/signout.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { RouterModule, Route } from '@angular/router';
import { AuthInterceptor } from './auth-interceptor';
import { AuthGuardActivateIfLoggedIn, AuthGuardActivateIfLoggedOut, AuthGuardDeactivate } from './auth.guard';

const authRoutes: Route[] = [
  {path: "login",     component: SigninComponent,   canActivate: [AuthGuardActivateIfLoggedOut]},
  {path: "register",  component: SignupComponent,   canActivate: [AuthGuardActivateIfLoggedOut],  canDeactivate: [AuthGuardDeactivate]},
  {path: "logout",    component: SignoutComponent,  canActivate: [AuthGuardActivateIfLoggedIn]},
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
    SigninComponent,
    SignoutComponent,
    SignupComponent
  ],
  exports: [
    SigninComponent,
    SignoutComponent,
    SignupComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuardActivateIfLoggedIn, 
    AuthGuardActivateIfLoggedOut, 
    AuthGuardDeactivate
  ]
})
export class AuthModule { }
