import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }

  addSubject(key: string, value) {
    var subject = new Subject();
    this.httpClient.put(
      "https://schoolfirebaseqc.firebaseio.com/" + key + ".json",
      value
    ).subscribe(
      (data) => { subject.next(data) },
      (error) => {console.error(error)}
    )
    return subject
  }
  
  add(key, value) {
    return this.httpClient.put(
      "https://schoolfirebaseqc.firebaseio.com/" + key + ".json",
      value
    )
  }
  
  getSubject(key: string) {
    var subject = new Subject();
    this.httpClient.get(
      "https://schoolfirebaseqc.firebaseio.com/" + key + ".json"
    ).subscribe(
      (data) => { subject.next(data) },
      (error) => {console.error(error)}
    )
    return subject
  }

  get(key: string) {
    return this.httpClient.get(
      "https://schoolfirebaseqc.firebaseio.com/" + key + ".json"
    )
  }

  getDocs() {
    return {
      "contact": "Klik hier 66-545-4965",
      "faq": "<h1>FAQ</h1>",
      "help": "<code>main() { print('Hello World') }</code>",
      "test": "test test"
    }
  }
}
