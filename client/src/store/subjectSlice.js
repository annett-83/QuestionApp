import { createSlice } from "@reduxjs/toolkit";
import { handleObjectArrays } from "./helper/helper";
const initialState = { data: [], isLoading: true };

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        update: (state, action) => {
            handleObjectArrays(state.data, action.payload);
            state.isLoading = false;

        }
    },
});

export const states = {
    subjectData: (state) => state.subject.Data,
    isLoading: (state) => state.subject.isLoading
};
export default subjectSlice;
