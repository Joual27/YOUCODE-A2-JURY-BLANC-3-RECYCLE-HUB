import { Component, inject, signal } from '@angular/core';
import { ValidationService } from '../../../shared/services/validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthErrors } from '../models/auth.models';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm : FormGroup;
  validationService = inject(ValidationService);
  private fb = inject(FormBuilder);
  authErrors = signal<AuthErrors>(
    {
      fullName : null,
      email : null ,
      password : null , 
      address : null
    }
  );

  constructor(){
    this.loginForm = this.fb.group({
      email : ["" , [Validators.required , Validators.email]],
      password : ["" , Validators.required]
    })
  }

  onLoginFormSubmit(event : Event) : void {
    event.preventDefault();

    if(this.loginForm.invalid){
      let errors =  this.validationService.getFormErrors(this.loginForm);
      this.authErrors.set(errors);
    }else{
      
    }
  }
}
