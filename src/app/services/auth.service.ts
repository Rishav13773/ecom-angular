import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5053/api/Users';

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Registration`, user, {
      responseType: 'text',
    });
  }

  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, { email, password, role });
  }

  logout() {
    localStorage.removeItem('UserToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('UserToken');
  }
}
