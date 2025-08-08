import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/kamra',
    pathMatch: 'full'
  },
  {
    path: 'kamra',
    loadComponent: () => import('./components/pantry-add/pantry-add.component').then(m => m.PantryAddComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
