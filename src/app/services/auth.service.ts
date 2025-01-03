import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationDate: any;
  private domain = environment.apiUrl;
  private apiUrl = `${this.domain}/auth-gateway/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setToken(token: string, expiresIn: string): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expiresIn_token', expiresIn);
  }

  isTokenExpired(): boolean {
    const expiresIn = localStorage.getItem('expiresIn_token');
    if (!expiresIn) return true;
    this.tokenExpirationDate = moment(expiresIn);
    if (!this.tokenExpirationDate) return true;
    return moment().clone() > this.tokenExpirationDate;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }

  login(username: string, password: string) {
    const loginData = {
      username: username,
      password: password,
    };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginData);
  }
}
