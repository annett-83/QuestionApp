import { createSlice } from "@reduxjs/toolkit";
import { handleSingleObject, handleObjectArrays } from "./helper/helper";
const initialState = { data: { userData: undefined, questionData: [] }, isLoadingUserData: false, isLoadingQuestionData: false };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = initialState.data;
            state.isLoadingUserData = false;
            state.isLoadingQuestionData = false;
        },
        setUser: (state, action) => {
            if (action.payload) {
                if (!state.data.userData) { state.data.userData = {}; }
                handleSingleObject(state.data.userData, action.payload);
                state.isLoadingUserData = false;
            }
        },
        setUserQuestion: (state, action) => {
            handleObjectArrays(state.data.questionData, action.payload);
            state.isLoadingQuestionData = false;
        },
        setLoading: (state) => {
            state.isLoadingUserData = true;
            state.isLoadingQuestionData = true;
        }
    }
});

export const states = {
    currentUserData: (state) => state.user.data.userData,
    isLoadingUserData: (state) => state.user.isLoadingUserData,
    isLoadingQuestionData: (state) => state.user.isLoadingQuestionData

};

export default userSlice;
