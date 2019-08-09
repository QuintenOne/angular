import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  docsHeads: string[];      //De koppen die bovenaan in de header staan ('Home' wordt niet in deze lijst gezet)

  cached: boolean = false;  //username en JWT token in localStorage?
  username: string = "";    //username wordt gebruikt bij de begroeting (altijd rechts bovenaan)
  
  constructor(private database: DatabaseService) {}

  ngOnInit() {  
    this.docsHeads = Object.keys(this.database.getDocs());
  }

  getDocsHeads() {
    return this.docsHeads;
  }

  updateCached() {
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      this.cached = true;
    } else {
      this.username = undefined;
      this.cached = false;
    }

    return this.cached;
  }
}
