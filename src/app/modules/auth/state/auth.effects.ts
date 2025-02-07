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
                  catchError((err) => of(authActions.regisrationFailure({ error: err.message })))
                )
            )
        )   
    )
}