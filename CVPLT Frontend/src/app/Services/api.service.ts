import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private username = "vandenberg";
  private password = "LeadDev2527";
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept': 'application/json', 'Authorization': `Basic ${btoa(`${this.username}:${this.password}`)}`});
  private apiUrl = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient) {
  }

  sendData(data: any, url: string): Observable<any> {
    return this.http.post(this.apiUrl + url, data, { headers: this.headers });
  }

  sendDataProfil(data: any, url: string): Observable<any> {
    return this.http.post(this.apiUrl+url, data, { headers: this.headers });
  }
  getUserId(email: string): Observable<any> {

    let url = this.apiUrl +"/user/" + email;

    return this.http.get( url,  { headers: this.headers });
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
