import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeavyComponent } from './heavy/heavy.component';

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
