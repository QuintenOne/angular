import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { DocumentComponent } from './document/document.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { TitleDirective } from './title.directive';
import { TitleCaserPipe } from './title-caser.pipe';
import { SelectComponent } from './select/select.component';

var coreRoutes = [
  {path: '', component: HomeComponent},
  {path: 'lazy', loadChildren: "../lazy-module/lazy-module.module#LazyModuleModule"},
  {path: 'docs', component: DocumentComponent, children: [
    { path: 'faq',          component: DocumentComponent },  { path: 'FAQ',     redirectTo: 'faq' },
    { path: 'contact',      component: DocumentComponent },  { path: 'Contact', redirectTo: 'contact' },
    { path: 'help',         component: DocumentComponent },  { path: 'Help',    redirectTo: 'help' },
    { path: 'test',         component: DocumentComponent },  { path: 'Test',    redirectTo: 'test' },
    { path: 'docnotfound',  component: NotfoundComponent },  { path: '**',      redirectTo: 'notfound' },
  ]},
  { path: 'notfound',       component: NotfoundComponent },  { path: '**',       redirectTo: 'notfound' },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes),
    FormsModule,
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    DocumentComponent,
    NotfoundComponent,
    TitleDirective,
    TitleCaserPipe,
    SelectComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
