import { createAction, props } from "@ngrx/store";
import { RegistrationData } from "../models/auth.models";

export const validForm = createAction(
    "[Auth Popup] valid auth form",
    props<RegistrationData>()
);

export const clearAuthFormErrors = createAction("[Auth Popup] clear auth form errors ");