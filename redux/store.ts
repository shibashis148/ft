import { configureStore } from "@reduxjs/toolkit";
import { gameApi } from "./services/gameService";
import { gameSubmissionApi } from "./services/gameSubmission";
import { couponCodeApi } from "./services/couponCode";

export const store = configureStore({
    reducer: {
        [gameApi.reducerPath]: gameApi.reducer,
        [gameSubmissionApi.reducerPath]: gameSubmissionApi.reducer,
        [couponCodeApi.reducerPath]: couponCodeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        gameApi.middleware,
        gameSubmissionApi.middleware,
        couponCodeApi.middleware
    ),


})