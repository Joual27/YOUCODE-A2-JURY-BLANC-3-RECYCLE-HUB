import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/request-page/request-page.component').then(m => m.RequestPageComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/collection-request/collection-request.component').then(m => m.CollectionRequestComponent)
  },
//   {
//     path: 'edit/:id',
//     loadComponent: () => import('./requests/edit-request/edit-request.component').then(m => m.EditRequestComponent)
//   },
//   {
//     path: 'points',
//     loadComponent: () => import('./points/points.component').then(m => m.PointsComponent)
//   }
];