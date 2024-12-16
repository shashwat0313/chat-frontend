import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthSlice{
    isAuthenticated: boolean;
    token: string | null;
    username: string | null;
    id : string | null;
}

const tokenFromLocalStorage = localStorage.getItem('token');
const userDataFromLocalStorage = localStorage.getItem('userdata');

// initial state of auth slice
const initialState : AuthSlice = {
    token: tokenFromLocalStorage,
    isAuthenticated: !!tokenFromLocalStorage, // the !! ensures a boolean type
    username: userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage)?.username : null,
    id : userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage)?.id : null,
}

const authSlice = createSlice(
    {
        name : "auth",
        initialState,
        reducers : {
            loginSuccess : (state, action : PayloadAction<{ id : string ; username : string ; token : string; message : string }>) => {
                console.log("reducer called with payload: " + JSON.stringify(action.payload))
                console.log("and state was " + JSON.stringify(state))
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.id = action.payload.id;
                state.isAuthenticated = true;

                console.log("new state: " + JSON.stringify(state));
                localStorage.setItem('token', action.payload.token);
            },
            logout : (state) => {
                localStorage.removeItem('token');
                state.token = null;
                state.isAuthenticated = false;
            }
        }
    }
)

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;