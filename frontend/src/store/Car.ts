import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ItemCarType } from "../api/types";

interface CarState {
  cars: ItemCarType[];
}

const initialState: CarState = {
  cars: [] as any,
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setAllCar: (state, action: PayloadAction<any>) => {
      state.cars = action.payload;
    },
    addCar: (state, action: PayloadAction<ItemCarType>) => {
      state.cars.unshift(action.payload);
    },
    commentCar: (state, action: PayloadAction<ItemCarType>) => {
      const index = state.cars.findIndex(
        (obj) => obj._id === action.payload._id
      );
      state.cars[index] = action.payload;
    },
  },
});

export const { setAllCar, addCar, commentCar } = carSlice.actions;

export const selectCar = (state: RootState) => state.car.cars;

export default carSlice.reducer;
