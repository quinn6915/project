import { useEffect } from "react";
import { getAllCar } from "../api";
import { useAppDispatch } from "../hooks";
import { setAllCar } from "../store/Car";

export const useCars = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      const result = await getAllCar();
      dispatch(setAllCar(result.reverse()));
    };
    asyncFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
