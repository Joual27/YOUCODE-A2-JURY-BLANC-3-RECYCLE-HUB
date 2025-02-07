import { Component, inject, signal } from '@angular/core';
import { ValidationService } from '../../../shared/services/validation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthErrors } from '../models/auth.models';
import { Store } from '@ngrx/store';
import { validLoginForm } from '../state/auth.actions';
import { selectLoginErrorMsg } from '../state/auth.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [AsyncPipe , ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm : FormGroup;
  validationService = inject(ValidationService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  invalidLoginAttemptMsg$ = this.store.select(selectLoginErrorMsg);
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
      this.store.dispatch(validLoginForm(this.loginForm.value));
      console.log(this.loginForm.value);
      
      this.resetValidationErrs();
    }
  }

  private resetValidationErrs() : void {
    this.authErrors.set({
      fullName : null,
      email : null , 
      address : null ,
      password : null
    })
  }
}
