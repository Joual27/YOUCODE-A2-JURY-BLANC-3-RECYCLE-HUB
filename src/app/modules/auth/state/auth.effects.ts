import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../core/auth/service/auth.service";
import * as authActions from "./auth.actions";
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable()
export class AuthEffect {
    private authService = inject(AuthService);
    private actions$ = inject(Actions);

    registerUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.validForm),
            mergeMap(({ fullName, address, email, password , role }) =>
                this.authService.register({ fullName, address, email, password , role}).pipe(
                  map((res) => authActions.registrationSuccess(res)),
                  catchError((err) => of(authActions.registrationFailure({ error: err.message })))
                )
            )
        )   
    )

   authenticateUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(authActions.validLoginForm),
        mergeMap((data) => 
            this.authService.login(data.email , data.password).pipe(
                map((res) => {
                    if (!res || Object.keys(res).length === 0) {
                      return authActions.loginFailure({ error: 'Invalid Credentials' });
                    } else {
                      this.authService.setLoggedInUser(res);
                      return authActions.loginSuccess(res);
                    }
                  }),   
                catchError(err => of(authActions.loginFailure(err.message)))
            )
        )
      )
   )
}