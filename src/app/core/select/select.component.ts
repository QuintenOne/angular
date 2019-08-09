import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { Link } from '../../link';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

  oldLinkDispayName: string;
  currentLinkDispayName: string;
  links: Link[] = [];      //De koppen die bovenaan in de header staan ('Home' wordt niet in deze lijst gezet)

  constructor(private database: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.links.push(new Link("Home", ""))
    this.links.push(new Link("lazy", "lazy"))
    Object.keys(this.database.getDocs()).forEach(
      (value) => { this.links.push(new Link( value, "docs/" + value )) }
    );

    this.currentLinkDispayName = window.location.pathname.split('/').pop()

    if (this.currentLinkDispayName == "")
      this.currentLinkDispayName = "Home"
  }

  changeIndex(i) {
    this.currentLinkDispayName = this.links[i].displayName
    this.oldLinkDispayName = this.router.url.split('/').pop();

    if (this.currentLinkDispayName == "")
      this.currentLinkDispayName = "Home"
      if (this.oldLinkDispayName == "")
        this.oldLinkDispayName = "Home"

  }

}
