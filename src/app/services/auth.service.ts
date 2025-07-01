import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
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
  const token = this.getToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch (error) {
    return false;
  }
}

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.role || null;
  } catch (error) {
    return null;
  }
}



getCurrentUser() {
  const token = this.getToken();
  console.log('Token used:', token);

  return this.http.get<any>(`${this.API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


}
