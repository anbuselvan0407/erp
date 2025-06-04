import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  signup(data: any) {
    return this.http.post(`${this.API}/auth/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${this.API}/auth/login`, data);
  }

  storeToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  

getCurrentUser() {
  const token = this.getToken();
  console.log('Token used:', token);

  return this.http.get(`${this.API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


}
