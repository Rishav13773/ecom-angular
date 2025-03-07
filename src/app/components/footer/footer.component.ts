import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="w-full fixed bottom-0 bg-gray-900 text-white py-4">
      <div
        class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-sm md:text-base">
          &copy; 2025 Your Company. All rights reserved.
        </p>
        <nav class="flex space-x-4 mt-2 md:mt-0">
          <a href="#" class="text-gray-300 hover:text-white transition">Home</a>
          <a href="#" class="text-gray-300 hover:text-white transition"
            >About</a
          >
          <a href="#" class="text-gray-300 hover:text-white transition"
            >Services</a
          >
          <a href="#" class="text-gray-300 hover:text-white transition"
            >Contact</a
          >
          <a href="#" class="text-gray-300 hover:text-white transition"
            >Privacy Policy</a
          >
        </nav>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
