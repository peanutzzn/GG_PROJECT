import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

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

  // GET
  getPersons(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET by ID
  getPerson(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST
  createPerson(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // PUT
  updatePerson(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // DELETE
  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

    

}
