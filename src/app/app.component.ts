import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  template: `
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: [],
})
export class AppComponent {}
