import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

// Define a type for the slice state
interface UserState {
  user: {
    userId: string;
    name: string;
  } | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {
    userId: "",
    name: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    delUser: (state) => {
      state.user = null;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<UserState>) => {
      //state.car += action.payload;
    },
  },
});

export const { getUser, delUser, incrementByAmount } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
