import { Routes } from '@angular/router';

export const COLLECTOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
//   {
//     path: 'requests/:id',
//     loadComponent: () => import('./request-details/request-details.component').then(m => m.RequestDetailsComponent)
//   }
];