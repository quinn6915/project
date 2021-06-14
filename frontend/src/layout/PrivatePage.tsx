import React from "react";

type props = {
  children: React.ReactNode;
};

const PrivatePage: React.FC<props> = ({ children }) => {
  return <>{children}</>;
};

export default PrivatePage;
