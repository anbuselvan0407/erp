import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/'; // adjust your port

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
}
