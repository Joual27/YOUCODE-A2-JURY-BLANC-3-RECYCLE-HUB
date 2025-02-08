import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/request-page/request-page.component').then(m => m.RequestPageComponent)
  },
//   {
//     path: 'new',
//     loadComponent: () => import('./requests/create-request/create-request.component').then(m => m.CreateRequestComponent)
//   },
//   {
//     path: 'edit/:id',
//     loadComponent: () => import('./requests/edit-request/edit-request.component').then(m => m.EditRequestComponent)
//   },
//   {
//     path: 'points',
//     loadComponent: () => import('./points/points.component').then(m => m.PointsComponent)
//   }
];