import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import apiSlice from "../features/api/apiSlice.ts";

export const store = configureStore({
    reducer: {
        auth : authReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,

    },
    middleware : (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
});

// Export types for usage with TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;