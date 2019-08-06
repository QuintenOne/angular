import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Route } from '@angular/router';
import { HeavyComponent } from './heavy/heavy.component';
import { HomeComponent } from '../core/home/home.component';

const appRoutes: Route[] = [
  { path: '', component: HeavyComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [HeavyComponent]
})
export class LazyModuleModule { }
