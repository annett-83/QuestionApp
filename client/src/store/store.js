import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import errorSlice from "./errorSlice";
import mySaga from "./sagas";
import subjectSlice from "./subjectSlice";
import teacherSlice from "./teacherSlice";
import userSlice from "./userSlice";

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
