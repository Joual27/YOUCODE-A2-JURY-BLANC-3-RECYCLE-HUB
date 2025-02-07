import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import * as authActions from "./auth.actions"

export const authReducer = createReducer(
    initialAuthState,
    on(authActions.registrationSuccess , (state , action) => ({
        ...state ,
    })),
    on(authActions.registrationFailure , (state) => ({
        ...state
    })),
    on(authActions.loginSuccess , (state , action) => ({
        ...state ,
        shownLoginFailureMsg : false
    })),
    on(authActions.loginFailure , (state) => ({
        ...state,
        shownLoginFailureMsg : true,
    }))
)   