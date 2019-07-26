import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DatabaseService } from '../../shared/database.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit {
  currentDoc: SafeHtml = "";      //wordt gebuikt om HTML te renderen op de docs
  currentDocUnsafe: string = "";  //HTML dat wordt omgezet naar SafeHTML
  subscription: Subscription;

  constructor(private database: DatabaseService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.subscription == undefined)
      this.getCurrentDoc();

    this.subscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) //de router stuurt enkele events bij het veranderen van routes
          this.getCurrentDoc();
    });
  }

  getCurrentDoc() {
    let docHeader: string = this.router.url.split('/')[2];
    let doc = this.database.getDocs();
    this.currentDoc = this.sanitizer.bypassSecurityTrustHtml(doc[docHeader]);
  }

}
