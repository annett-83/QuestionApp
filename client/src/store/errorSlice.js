import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const errorSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setErrror: (state, action) => {
            state.data = state.data.filter(
                (e) => e.context !== action.payload.context
            );
            state.data.push(action.payload);
        },
        resetErrror: (state, action) => {
            state.data = state.data.filter(
                (e) => e.context !== action.payload.context
            );
        },
    },
});

export const states = {
    errorState: (state) => state.error.data,
};

export function createErrorObject(context, message) {
    const contextObject = {
        context,
        message,
    };
    return contextObject;
}

export default errorSlice;
