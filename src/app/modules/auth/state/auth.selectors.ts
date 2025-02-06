import { createSelector } from "@ngrx/store";
import { selectHomeState } from "../../home/state/home.selectors";


export const selectAuthErrors = createSelector(
    selectHomeState,
    (state) => state.authErrors
)