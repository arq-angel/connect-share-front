import {createSlice} from '@reduxjs/toolkit';

interface EmployeesFetchInfoState {
    lastFetchTime: string | null;
    wasSuccess: boolean | null;
    message: string | null;
    wasError: boolean | null;
    error: string | null;
    expiresAt: string | null;
}

const initialState : EmployeesFetchInfoState = {
    lastFetchTime: null,
    wasSuccess: null,
    message: null,
    wasError: null,
    error: null,
    expiresAt: null
}

const employeesFetchInfoReducer = createSlice({
    name: 'employees-fetch-info',
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.lastFetchTime = action.payload.lastFetchTime;
            state.wasSuccess = action.payload.wasSuccess;
            state.message = action.payload.message;
            state.wasError = action.payload.wasError;
            state.error = action.payload.error;
            state.expiresAt = action.payload.expiresAt;

        },
        clearInfo: (state) => {
            state.lastFetchTime = null;
            state.wasSuccess = null;
            state.message = null;
            state.wasError = null;
            state.error = null;
            state.expiresAt = null;
        },
    },
});

export const {setInfo, clearInfo} = employeesFetchInfoReducer.actions;
export default employeesFetchInfoReducer.reducer;