import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api'; // Your Express server URL

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Auth endpoints
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, { email, password });
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/auth/signup`, userData);
  }

  logout(): Observable<any> {
    return this.http.post(`${API_URL}/auth/logout`, {});
  }

  // Student CRUD
  getStudents(): Observable<any> {
    return this.http.get(`${API_URL}/students`);
  }

  createStudent(studentData: any): Observable<any> {
    return this.http.post(`${API_URL}/students`, studentData);
  }

  // Staff CRUD
  getStaff(): Observable<any> {
    return this.http.get(`${API_URL}/staff`);
  }
}
