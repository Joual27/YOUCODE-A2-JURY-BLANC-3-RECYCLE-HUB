import { createReducer, on } from "@ngrx/store";
import { initialHomeState } from "./home.state";
import * as homeActions from "./home.actions"


export const homeReducer = createReducer(
    initialHomeState,
    on(homeActions.showAuthPopup , (state) => ({
        ...state ,
        authPopupShown : true
    })),
    on(homeActions.hideAuthPopup , (state) => ({
        ...state,
        authPopupShown : false
    })),
    on(homeActions.showLoginForm , (state) => ({
        ...state , 
        activeAuthForm : 'login'
    })),
    on(homeActions.showRegisterForm , (state) => ({
        ...state , 
        activeAuthForm : "register"
    })),
    on(homeActions.toggleAuthForm, (state) => ({
        ...state,
        activeAuthForm: state.activeAuthForm === "register" ? "login" : "register",
    }))
) 