import {configureStore, combineReducers} from "@reduxjs/toolkit";
import questionsReducer from "./slices/questionsSlice";
import usersReducer from "./slices/usersSlice";

const rootReducer = combineReducers({
    questionsReducer,
    usersReducer
})
export const store = configureStore({
    reducer: rootReducer
})