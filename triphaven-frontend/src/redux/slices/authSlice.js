import { createSlice } from '@reduxjs/toolkit'

const storedToken = localStorage.getItem('token');
const storedRole = localStorage.getItem('role');

const initialState = {
    token: storedToken ? storedToken : null,
    role: storedRole ? storedRole : null,
    userData: null,
    error: null,
    isLoggedIn: false,
    loading: false,
}

export const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.userData = action.payload.data;
            state.isLoggedIn = true;

            // console.log(action.payload)
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.userData = null;
            state.error = null;
            state.isLoggedIn = false;
            state.loading = false;

            // Remove from localStorage
            localStorage.clear();
        },
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer