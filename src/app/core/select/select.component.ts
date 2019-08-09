import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { Link } from '../../link';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

  links: Link[] = [];      //De koppen die bovenaan in de header staan ('Home' wordt niet in deze lijst gezet)

  constructor(private database: DatabaseService) {}

  ngOnInit() {
    this.links.push(new Link("Home", ""))
    this.links.push(new Link("Lazy", "lazy"))
    Object.keys(this.database.getDocs()).forEach(
      (value) => { this.links.push(new Link( value, "docs/" + value )) }
    );

  }

}
