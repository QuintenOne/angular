import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component'; 
import { HeaderComponent } from './core/header/header.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Route[] = [
  { path: 'header', component: HeaderComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    HeaderComponent
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
