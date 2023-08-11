import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";
import subjectSlice from "./subjectSlice";
import userSlice from "./userSlice";
import teacherSlice from "./teacherSlice";
import errorSlice from "./errorSlice";
import { combineReducers } from "redux";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const rootReducer = combineReducers({
    subject: subjectSlice.reducer,
    user: userSlice.reducer,
    teacher: teacherSlice.reducer,
    error: errorSlice.reducer
});

// Mount it on the Store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware)
});

// Then run the saga
sagaMiddleware.run(mySaga);
