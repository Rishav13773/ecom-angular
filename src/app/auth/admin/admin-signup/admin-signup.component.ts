import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-signup',
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="flex justify-center items-center h-screen bg-gray-100 px-5">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-4">Admin Sign Up</h2>

        <input
          [(ngModel)]="admin.firstName"
          type="text"
          placeholder="First Name"
          class="w-full p-2 border rounded-md mb-2"
        />
        <input
          [(ngModel)]="admin.lastName"
          type="text"
          placeholder="Last Name"
          class="w-full p-2 border rounded-md mb-4"
        />
        <input
          [(ngModel)]="admin.email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border rounded-md mb-4"
        />
        <input
          [(ngModel)]="admin.password"
          type="password"
          placeholder="Password"
          class="w-full p-2 border rounded-md mb-4"
        />
        <button
          (click)="signup()"
          class="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Sign Up
        </button>
        <p class="text-sm text-center mt-2">
          Admin login
          <a routerLink="/admin/login" class="text-red-500 hover:underline"
            >Click here</a
          >
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class AdminSignupComponent {
  constructor(private authService: AuthService, private router: Router) {}

  admin = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin',
  };

  signup() {
    this.authService.signup(this.admin).subscribe({
      next: () => {
        this.router.navigate(['/admin/login']); // Redirect after signup
      },
      error: (err) => {
        console.error(err);
        alert('Signup failed. Try again.');
      },
    });
  }
}
