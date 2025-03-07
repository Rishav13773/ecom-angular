import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  template: `
    <div class="flex justify-center items-center h-screen bg-gray-100 px-5">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-4">User Login</h2>

        <div class="flex justify-center mb-4">
          <button
            (click)="toggleRole()"
            class="px-4 py-2 rounded-md text-white bg-blue-500"
          >
            Switch to Admin Login
          </button>
        </div>

        <input
          [(ngModel)]="email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border rounded-md mb-2"
        />
        <input
          [(ngModel)]="password"
          type="password"
          placeholder="Password"
          class="w-full p-2 border rounded-md mb-4"
        />
        <button
          (click)="login()"
          class="w-full text-white py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700"
        >
          Login
        </button>
        <p *ngIf="errorMessage" class="text-red-500 text-sm mt-2 text-center">
          {{ errorMessage }}
        </p>

        <p class="text-sm text-center mt-2">
          Don't have an account?
          <a routerLink="/signup" class="text-blue-500 hover:underline"
            >Sign Up</a
          >
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  email = '';
  password = '';
  role = 'user';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleRole() {
    this.router.navigate(['/admin/login']);
  }

  login() {
    this.authService.login(this.email, this.password, this.role).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem('UserToken', JSON.stringify(response)); // Save token
          this.router.navigate(['']); // Navigate after login
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      },
    });
  }
}
