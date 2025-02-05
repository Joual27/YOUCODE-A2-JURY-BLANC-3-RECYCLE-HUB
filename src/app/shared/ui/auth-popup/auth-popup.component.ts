import { Component } from '@angular/core';
import { RegisrationFormComponent } from "../../../modules/auth/regisration-form/regisration-form.component";
import { LoginFormComponent } from "../../../modules/auth/login-form/login-form.component";

@Component({
  selector: 'app-auth-popup',
  imports: [RegisrationFormComponent, LoginFormComponent],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.css'
})
export class AuthPopupComponent {

}
