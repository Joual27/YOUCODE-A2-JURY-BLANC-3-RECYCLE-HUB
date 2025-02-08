import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { RequestPageComponent } from './modules/request/request-page/request-page.component';
import { DashboardComponent } from './modules/collector/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path : "",
        component : HomePageComponent
    },
    {
        path : "requests",
        component : RequestPageComponent
    },
    {
        path : "dashboard",
        component : DashboardComponent
    }
];
