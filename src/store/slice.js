import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name: "user",
    initialState: {
        users: localStorage.getItem('users') || null, // Read from local storage
        role: localStorage.getItem('role') || null,
        auth: localStorage.getItem('auth') === 'true', // Convert to boolean
    },
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
            localStorage.setItem('auth', action.payload); // Persist to local storage
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            localStorage.setItem('users', action.payload); // Persist to local storage
        },
        clearUsers: (state) => {
            state.users = null; // Clear the user state
            localStorage.removeItem('users'); // Remove from local storage
        },
        removeAuth: (state) => {
            state.auth = false;
            localStorage.removeItem('auth'); // Remove from local storage
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem('role', action.payload); // Persist to local storage
        }
    }
});

export const { setUsers, clearUsers, setRole, setAuth, removeAuth } = Slice.actions;
export default Slice.reducer;