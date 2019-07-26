import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  ngOnInit() {
    var config = {
      apiKey: "AIzaSyBQoLRflZm_JowHRrYhkOK52KpY36SgzVI",
      authDomain: "schoolfirebaseqc.firebaseapp.com",
      databaseURL: "https://schoolfirebaseqc.firebaseio.com",
      projectId: "schoolfirebaseqc",
      storageBucket: "schoolfirebaseqc.appspot.com",
      messagingSenderId: "975934687594"
    };
    firebase.initializeApp(config);
  }
}
