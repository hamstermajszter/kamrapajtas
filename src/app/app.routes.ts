import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/kamra',
    pathMatch: 'full'
  },
  {
    path: 'kamra',
    loadComponent: () => import('./components/pantry-add/pantry-add.component').then(m => m.PantryAddComponent)
  }
];
