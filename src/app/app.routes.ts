import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthReverseGuard } from './guard/auth-reverse.guard';

import { CrmComponent } from './pages/crm/crm.component';
import { AdminLoginComponent } from './auth/admin/admin-login/admin-login.component';
import { AdminSignupComponent } from './auth/admin/admin-signup/admin-signup.component';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [AuthReverseGuard],
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
    canActivate: [AuthReverseGuard],
  },

  {
    path: 'admin/login',
    pathMatch: 'full',
    component: AdminLoginComponent,
    // canActivate: [AuthReverseGuard],
  },

  {
    path: 'admin/new',
    pathMatch: 'full',
    component: AdminSignupComponent,
    // canActivate: [AuthReverseGuard],
  },

  {
    path: '',
    component: ProductsListComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'portal',
    component: CrmComponent,
    // canActivate: [AuthGuard],
  },
];
