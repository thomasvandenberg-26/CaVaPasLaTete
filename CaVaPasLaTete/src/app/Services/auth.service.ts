import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users/login';
  constructor( private http: HttpClient) {

  }
  login(email: string, password: string) {
    return this.http.post<User>(this.apiUrl, {email, password})

  }

  getUserId(email: string) {
    return this.http.get<User>(this.apiUrl+"url", {params: {email}});
  }
}
