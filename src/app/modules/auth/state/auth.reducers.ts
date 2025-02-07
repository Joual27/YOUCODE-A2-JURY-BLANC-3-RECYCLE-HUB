import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import * as authActions from "./auth.actions"

export const authReducer = createReducer(
    initialAuthState,
    on(authActions.registrationSuccess , (state , action) => ({
        ...state ,
        signedInUser : action
    })),
    on(authActions.regisrationFailure , (state) => ({
        ...state
    }))
)