import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice"; // Import the reducer (default export)

export default configureStore({
    reducer: {
        user: userReducer, // Assign the reducer to the `user` key
    },
});
