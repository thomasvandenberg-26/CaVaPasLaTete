import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '../Models/User';
import {publicHeaders, authHeaders} from '../utils/http-headers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/users';

  private currentUsername: string = '';
  private currentPassword: string = '';

  constructor(private http: HttpClient) {
  }



  setCredentials(username: string, password: string): void {
    this.currentUsername = username;
    this.currentPassword = password;
    localStorage.setItem('credentials', btoa(`${username}:${password}`));
  }

  login(email: string, password: string) {
    return this.http.post<User>(`
    ${this.apiUrl}/login`
      , {email, password},
      {headers: publicHeaders()}
    ).pipe(tap((user: any) => {
      this.setCredentials(email, password);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userEmail', user.email);
    }))
  }

  // Inscription
  register(user: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create`,
      user,
      { headers: publicHeaders() }
    );
  }

  sendData(data: any, url:string): Observable<any> {
    return this.http.post(this.apiUrl+url, data, { headers: authHeaders(this.currentUsername, this.currentPassword) });
  }

  getUserId(email: string,  url:string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/user/${email}`,
      { headers: authHeaders(this.currentUsername, this.currentPassword) }
    );
  }
  getUserFirstName(id: number)
  {
    return this.http.get(`${this.apiUrl}/${id}/getFirstName`, {headers: authHeaders(this.currentUsername, this.currentPassword), responseType: 'text'})
  }
  getUserLastName(id: number)
  {
    return this.http.get(`${this.apiUrl}/${id}/getLastName`, {headers: authHeaders(this.currentUsername, this.currentPassword), responseType: 'text'})
  }

}
