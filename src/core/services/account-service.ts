import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../../types/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  baseUrl = 'http://localhost:5172/api/';

  login(creds : any){
    return this.http.post<User>(this.baseUrl + 'auth/login',creds).pipe(
      tap(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentUser.set(user)
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
