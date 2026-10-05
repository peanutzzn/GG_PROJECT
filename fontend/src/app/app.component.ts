import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fontend';
    constructor(private apiService: ApiService) {}

  testBackend() {
    this.apiService.testBackend().subscribe({
      next: (res) => {
        console.log('Backend:', res);
      },
      error: (err) => {
        console.error('Backend error:', err);
      }
    });
  }

  testDatabase() {
    this.apiService.testDatabase().subscribe({
      next: (res) => {
        console.log('Database:', res);
      },
      error: (err) => {
        console.error('Database error:', err);
      }
    });
  }
}
