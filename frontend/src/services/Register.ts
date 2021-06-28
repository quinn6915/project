import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../api";
import { UserType } from "../api/types";
import { useToasts } from "react-toast-notifications";

export const useRegister = () => {
  let history = useHistory();
  const { addToast } = useToasts();

  const [form, setForm] = useState<UserType>({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      addToast("Les mots de passe ne correspondent pas", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      const result = await register(form);
      if (result.error) {
        addToast(result.error.errors.name.message, {
          appearance: "warning",
          autoDismiss: true,
        });
      }
      if (result.name) {
        addToast("Compte créer", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/");
      }
    }
  };
  return {
    form,
    handleChange,
    submit,
  };
};
