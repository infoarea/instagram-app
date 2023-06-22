import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/app/postSlice"

const store = configureStore({
    reducer:{
        post: postReducer
    },
    devTools: true
});

export default store;