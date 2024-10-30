import {createSlice} from '@reduxjs/toolkit';

interface BearerTokenState {
    token: string | null;
    expiresAt: string | null;
}

const initialState : BearerTokenState = {
    token: null,
    expiresAt: null,
}

const bearerTokenReducer = createSlice({
    name: 'bearer-token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.expiresAt = action.payload.expiresAt;
        },
        clearToken: (state) => {
            state.token = null;
            state.expiresAt = null
        },
    },
});

export const {setToken, clearToken} = bearerTokenReducer.actions;
export default bearerTokenReducer.reducer;