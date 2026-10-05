import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:30306';

  constructor(private http: HttpClient) {}

  testBackend() {
    return this.http.get(`${this.apiUrl}/`);
  }

  testDatabase() {
    return this.http.get(`${this.apiUrl}/api/test-db`);
  }
    

}
