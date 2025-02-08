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
    on(authActions.loginSuccess, (state, { user }) => ({
        ...state,
        shownLoginFailureMsg: false,
        signedInUser: user 
      })),
    on(authActions.loginFailure , (state ) => ({
        ...state,
        shownLoginFailureMsg : true,
    }))
)   