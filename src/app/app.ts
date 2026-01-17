import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  protected profiles: any;
  ngOnInit(): void {
    this.http.get<any>('http://localhost:5172/api/profile/profiles').subscribe({
      next: (profiles) => {
        this.profiles = profiles;
      },
      error: (err) => {
        console.error('Failed to load profiles:', err);
      },
    });
  }
}
