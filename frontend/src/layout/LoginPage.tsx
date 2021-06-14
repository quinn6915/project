import React from "react";
import { AuthButton } from "../components/AuthButton";

type props = {
  children: React.ReactNode;
};

const LoginPage: React.FC<props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center ">
      <br />
      {children}
      <AuthButton />
    </div>
  );
};

export default LoginPage;
