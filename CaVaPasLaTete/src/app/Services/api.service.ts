import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' , 'Accept': 'application/json'});
  private apiUrl = 'http://localhost:8080/api/users'
  constructor(private http: HttpClient) {
  }

  sendData(data: any, url: string): Observable<any> {
    return this.http.post( this.apiUrl+url, data);
  }

  sendDataProfil(data: any, url: string): Observable<any> {
    return this.http.post(this.apiUrl+url, data);
  }
  getUserId(data: any, url: string): Observable<any> {
    console.log("GetUserId : " +  data);
    return this.http.get( this.apiUrl+url, data);
  }
  getUserFirstName(data: any)
  {
    return this.http.get(this.apiUrl + "/" + data + "/getFirstName", {responseType: 'text'})
  }
  getUserLastName(data: any)
  {
    return this.http.get(this.apiUrl + "/" + data + "/getLastName", {responseType: 'text'})
  }

}
