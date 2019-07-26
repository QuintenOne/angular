import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../user'
import { DatabaseService } from '../shared/database.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User = {"uid": "NaN", "email": "NaN"};
  username: string = "";
  token: string = "";

  loggedIn: boolean = false;
  cached: boolean = false;

  constructor(private database: DatabaseService) {
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
      this.cached = true;
    }
  }

  /////Authenticatie
  signIn(form) {
    firebase.auth().signInWithEmailAndPassword(form.email, form.password)
    .then(
      (userData) => { this.updateUser(true, userData); }
    )
    .catch(
      () => { this.updateUser(false); }
    )
  }

  signOut() { 
    if (this.loggedIn)
      firebase.auth().signOut();
    this.updateUser(false);
  }

  signUp(form) {
    var email = form.email;
    var username = form.username;
    var password = form.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      (response) => {
        this.updateUser(true, response, username)

        //Stuurt meerdere requests indien één faalt
        var interval = setInterval(() => {
          console.log("SignUpAddTimeOut-" + this.token)
          this.database.add("users/" + username, this.user).subscribe(
            () => { clearInterval(interval); }
          )
        }, 1000);

      },
      () => { this.updateUser(false); }
    );
    return this.loggedIn;
  }

  ///// Updaten van gegevens: gebruiker, token
  updateUser(_loggedIn: boolean, userData = undefined, _username = undefined) {
    if (_loggedIn == true) {
      this.user = {"uid": userData["user"]["uid"], "email": userData["user"]["email"]};
      this.loggedIn = true;
      this.cached = true;
      
      //SET USERNAME
      if (_username == undefined) {
        //Stuurt meerdere requests indien één faalt
        var getUsernameTries = 0;
        var interval = setInterval(() => {
          this.database.get("users").subscribe(
            (data) => {
              var keys = Object.keys(data)
              for (var i = 0; i < keys.length; i += 1) {
                if (data[keys[i]]['email'] == this.user.email) {
                  this.username = keys[i]
                  localStorage.setItem('username', keys[i]);
                  clearInterval(interval)
                }
              }
            },
            (error) => {
              console.error("AuthServiceGetUsername-" + error)
              this.username = "Error: Not Authenticated"
              localStorage.setItem('username', "Error: Not Authenticated");
            }
          )


          getUsernameTries += 1;
          if ( getUsernameTries > 10) {
              clearInterval(interval)
              console.log("Try " + getUsernameTries + "/10 of getting username")
          }
        }, 100);
      } else {
        this.username = _username;
        localStorage.setItem('username', _username);
      }

      //SET TOKEN
      firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token
          localStorage.setItem('token', this.token);
        },
        (error) => {
          console.error("AuthServiceUpdateToken-" + error)
        }
      )
    } else {
      this.loggedIn = false
      this.user = {"uid": "NaN", "email": "NaN"};
      this.username = ""
      localStorage.setItem('username', "");
      this.token = ""
      localStorage.setItem('token', "");
      this.cached = false
    }
    
  }
}
