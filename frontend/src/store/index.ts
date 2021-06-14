import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./Car";
import userReducer from "./User";

export const store = configureStore({
  reducer: {
    car: carReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
