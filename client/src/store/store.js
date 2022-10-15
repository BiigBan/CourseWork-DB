import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import newsSlice from "./newsSlice";


const store =  configureStore({
    reducer: {
        news: newsSlice,
        auth: authSlice,
    }
    
})

window.store = store;

export default store;