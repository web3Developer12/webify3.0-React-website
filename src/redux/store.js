import { userSlice } from "./userSlice";
const  { configureStore } = require("@reduxjs/toolkit");

export const storeRedux = configureStore({
    reducer:{
        user:userSlice.reducer
    }
})