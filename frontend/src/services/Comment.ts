import { ChangeEvent, SyntheticEvent, useState } from "react";
import { comment } from "../api";
import { CommentInput } from "../api/types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { commentCar } from "../store/Car";

export const useComment = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const userId = user?.userId ? user.userId : null;

  const [form, setForm] = useState<CommentInput>({
    user: userId,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const { value } = event.target;
    setForm({
      ...form,
      [i]: value,
      user: userId,
    });
  };

  const submit = async (
    event: SyntheticEvent,
    id: string,
    setLoading: Function,
    i: number
  ) => {
    setLoading(true);
    event.preventDefault();
    const value = await comment(form, id, i);
    dispatch(commentCar(value));
    setForm({
      user: userId,
    });
    setLoading(false);
  };

  return {
    form,
    handleChange,
    submit,
  };
};
