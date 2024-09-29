import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8080/pessoa';

  constructor(private http: HttpClient) { }

  salvarPessoa(pessoa: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(this.apiUrl.concat('/save'), pessoa, {
      headers: headers,
      withCredentials: true
    });
  }
  

  getPacientes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/findAll`, { headers: headers })
      .pipe(
        catchError(this.handleError<any[]>('getPacientes', []))
      );
  }

  getPacienteDetails(id: number): Observable<string> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/details?filter=${id}`, { headers: headers, responseType: 'text' });
  }

  getAnexos(id: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/getAnexos?filter=${id}`, { headers: headers })
  }

  findByFilter(filter: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/findByFilter?filter=${filter}`, { headers: headers })
      .pipe(
        catchError(this.handleError<any[]>('findByFilter', []))
      );
  }

  downloadAnexo(id: number): Observable<any> {
    const url = `${this.apiUrl}/download/${id}`;
    const headers = this.getHeaders(); 
    return this.http.get<any>(url, { headers: headers });  
  }
  

  private getHeaders(): HttpHeaders {
    let token = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
