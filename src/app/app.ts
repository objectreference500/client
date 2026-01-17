import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../nav/nav";

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http = inject(HttpClient);
  protected readonly title = signal('client');

    ngOnInit(): void {
    this.http.get('http://localhost:5172/api/profile/me').subscribe({
      next: (response) => {
        console.log('API is healthy:', response);
      },
      error: (error) => {
        console.error('API health check failed:', error);
      }
    }); 
  }
}
