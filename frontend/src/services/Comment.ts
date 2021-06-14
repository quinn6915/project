import { ChangeEvent, SyntheticEvent, useState } from "react";
import { comment } from "../api";
import { CommentType } from "../api/types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { commentCar } from "../store/Car";

export const useComment = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const userId = user?.userId ? user.userId : null;

  const [form, setForm] = useState<CommentType>({
    content: "",
    user: userId,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
      user: userId,
    });
  };

  const submit = async (
    event: SyntheticEvent,
    id: string,
    setLoading: Function
  ) => {
    setLoading(true);
    event.preventDefault();
    const value = await comment(form, id);
    dispatch(commentCar(value));
    setForm({
      content: "",
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
