import { Component } from '@angular/core';
import { HomeLayoutComponent } from "../layout/home-layout/home-layout.component";
import { LoginFormComponent } from "../../../shared/ui/login-form/login-form.component";

@Component({
  selector: 'app-home-page',
  imports: [HomeLayoutComponent, LoginFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
