import { createSlice } from "@reduxjs/toolkit";

import { handleObjectArrays } from "./helper/helper";

const initialState = { data: [], isLoading: true };

const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        update: (state, action) => {
            handleObjectArrays(state.data, action.payload);
            state.isLoading = false;
        }
    }
});

export const states = {
    teacherData: (state) => state.teacher.Data,
    isLoading: (state) => state.teacher.isLoading
};
export default teacherSlice;
