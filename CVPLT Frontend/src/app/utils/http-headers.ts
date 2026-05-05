import { HttpHeaders } from '@angular/common/http';

export function publicHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
}

export function authHeaders(username: string, password: string): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Basic ${btoa(`${username}:${password}`)}`
  });
}
