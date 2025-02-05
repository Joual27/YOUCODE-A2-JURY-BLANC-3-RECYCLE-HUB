import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { homeReducer } from "../../modules/home/state/home.reducers";

export const reducers : ActionReducerMap<AppState> = {
    home : homeReducer
}