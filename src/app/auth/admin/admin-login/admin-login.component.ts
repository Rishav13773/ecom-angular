import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="flex justify-center items-center h-screen bg-gray-100 px-5">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-4">Admin Login</h2>

        <div class="flex justify-center mb-4">
          <button
            (click)="toggleRole()"
            class="px-4 py-2 rounded-md text-white bg-red-500"
          >
            Switch to User Login
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
          class="w-full text-white py-2 px-4 rounded-md bg-red-500 hover:bg-red-700"
        >
          Login
        </button>
        <p *ngIf="errorMessage" class="text-red-500 text-sm mt-2 text-center">
          {{ errorMessage }}
        </p>

        <p class="text-sm text-center mt-2">
          Create new admin
          <a routerLink="/admin/new" class="text-red-500 hover:underline"
            >Click here</a
          >
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class AdminLoginComponent {
  email = '';
  password = '';
  role = 'admin';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleRole() {
    this.router.navigate(['/login']);
  }

  login() {
    this.authService.login(this.email, this.password, this.role).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem('AdminToken', JSON.stringify(response)); // Save token
          this.router.navigate(['/portal']); // Navigate after login
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
