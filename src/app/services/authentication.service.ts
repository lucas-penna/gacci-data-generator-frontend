import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(loginRequest: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, loginRequest).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }
}
