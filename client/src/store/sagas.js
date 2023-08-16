import { createAction } from "@reduxjs/toolkit";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import {
    hasValidToken,
    removeAuthData,
    setTokens,
} from "../services/localStorage.service";
import questionService from "../services/questionService";
import subjectService from "../services/subjectService";
import teacherService from "../services/teacherService";
import userService from "../services/user.service";
import { states as currentUserStates } from "../store/userSlice";

import errorSlice from "./errorSlice";
import subjectSlice from "./subjectSlice";
import teacherSlice from "./teacherSlice";
import userSlice from "./userSlice";
/* Define Actions */
export const actions = {
    initialize_store: createAction("INITIALIZE_STORE"),

    currentuser_set_newToken: createAction("CURRENTUSER_SET_NEWTOKEN"),
    currentuser_log_out: createAction("CURRENTUSER_LOG_OUT"),

    userIndependentData_fetchCyclic_data: createAction(
        "USERINDEPENDENTDATA_FETCHCYCLIC_DATA"
    ),
    userDependentData_fetchCyclic_data: createAction(
        "USERDEPENDENTDATA_FETCHCYCLIC_DATA"
    ),
};

function* initialize_store() {
    yield put(actions.userIndependentData_fetchCyclic_data());
    yield put(actions.userDependentData_fetchCyclic_data());
}
function* currentuser_set_NewToken(action) { // в процессе разработки
    yield put(errorSlice.actions.resetErrror({ context: action.type }));
    try {
        yield put(userSlice.actions.setLoading());
        yield setTokens(action.payload);
        yield put(actions.userDependentData_fetchCyclic_data());
    } catch (e) {
        console.log("catch ", e);
        yield put(
            errorSlice.actions.setErrror({
                context: action.type,
                error: { code: 500, message: "Connection failed" },
            })
        );
    }
}

function* currentuser_log_out() {
    yield removeAuthData();
    yield put(actions.userDependentData_fetchCyclic_data());
    yield put(userSlice.actions.logout());
} // =====================================================================================================
function* userIndependentData_fetchCyclic_data() {
    while (true) {
        try {
            const { data } = yield call(subjectService.getSubjects);
            yield put(subjectSlice.actions.update(Object.values(data)));
        } catch (error) {
            console.log(error);
        }
        try {
            const { data } = yield call(teacherService.getTeachers);
            yield put(teacherSlice.actions.update(Object.values(data)));
        } catch (error) {
            console.log("teachererror", error);
        }
        yield delay(1000);
    }
}

function* userDependentData_fetchCyclic_data() {
    while (true) {
        const userData = yield select(currentUserStates.currentUserData);
        const vt = yield hasValidToken();

        if (vt && !userData) {
            yield put(userSlice.actions.setLoading());
        }

        if (vt) {
            try {
                const { data, error } = yield call(userService.getCurrentUser);
                if (error) {
                    console.log(error);
                } else {
                    yield put(userSlice.actions.setUser({ ...data }));
                }
            } catch (error) {
                console.log(error);
            }

            try {
                const { data, error } = yield call(() =>
                    questionService.get("usersepecific_all")
                );
                if (error) {
                    console.log(error);
                } else {
                    yield put(
                        userSlice.actions.setUserQuestion(Object.values(data))
                    );
                }
            } catch (error) {
                console.log(error);
                if (!error.response || error.response.status === 401) {
                    yield put(actions.currentuser_log_out());
                }
            }
            yield delay(1000);
        } else {
            yield delay(1000);
        }
    }
}

export default function* mySaga() {
    yield takeLatest(actions.initialize_store.toString(), initialize_store);

    yield takeLatest(
        actions.currentuser_set_newToken.toString(),
        currentuser_set_NewToken
    );
    yield takeLatest(
        actions.currentuser_log_out.toString(),
        currentuser_log_out
    );

    yield takeLatest(
        actions.userIndependentData_fetchCyclic_data.toString(),
        userIndependentData_fetchCyclic_data
    );
    yield takeLatest(
        actions.userDependentData_fetchCyclic_data.toString(),
        userDependentData_fetchCyclic_data
    );
}
