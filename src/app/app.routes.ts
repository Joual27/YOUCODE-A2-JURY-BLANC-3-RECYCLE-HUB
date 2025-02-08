import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { RequestPageComponent } from './modules/user/request-page/request-page.component';
import { DashboardComponent } from './modules/collector/dashboard/dashboard.component';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path : "",
        component : HomePageComponent
    },
    {
        path : "requests",
        component : RequestPageComponent,
        canActivate: [RoleGuard],
        data: { role: 'user' }
    },
    {
        path : "dashboard",
        component : DashboardComponent,
        canActivate: [RoleGuard],
        data: { role: 'collector' }
    }
];
