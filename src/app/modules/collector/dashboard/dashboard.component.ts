import { Component } from '@angular/core';
import { UserNavbarComponent } from "../../../shared/ui/user-navbar/user-navbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [UserNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
