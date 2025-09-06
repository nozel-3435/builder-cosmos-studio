import React from "react";
import { useParams } from "react-router-dom";
import SpecializedRegister from "@/components/auth/SpecializedRegister";
import AccountTypeSelection from "./AccountTypeSelection";

const Register = () => {
  const params = useParams();
  const type = (params as any).type as "client" | "merchant" | "delivery" | undefined;

  if (!type) {
    return <AccountTypeSelection />;
  }

  return <SpecializedRegister initialUserType={type} />;
};

export default Register;
