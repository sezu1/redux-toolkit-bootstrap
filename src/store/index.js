import {configureStore, combineReducers} from "@reduxjs/toolkit";
import questionsReducer from "./slices/questionsSlice"

const rootReducer = combineReducers({
    questionsReducer
})
export const store = configureStore({
    reducer: rootReducer
})