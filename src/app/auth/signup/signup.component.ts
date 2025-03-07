import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="flex justify-center items-center h-screen bg-gray-100 px-5">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <input
          [(ngModel)]="user.firstName"
          type="text"
          placeholder="First Name"
          class="w-full p-2 border rounded-md mb-2"
        />
        <input
          [(ngModel)]="user.lastName"
          type="text"
          placeholder="Last Name"
          class="w-full p-2 border rounded-md mb-2"
        />
        <input
          [(ngModel)]="user.email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border rounded-md mb-2"
        />
        <input
          [(ngModel)]="user.password"
          type="password"
          placeholder="Password"
          class="w-full p-2 border rounded-md mb-4"
        />
        <button
          (click)="signup()"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p class="text-sm text-center mt-2">
          Already have an account?
          <a routerLink="/login" class="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class SignupComponent {
  user = { firstName: '', lastName: '', email: '', password: '', role: 'user' };

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']); // Redirect after signup
      },
      error: (err) => {
        console.error(err);
        alert('Signup failed. Try again.');
      },
    });
  }
}
