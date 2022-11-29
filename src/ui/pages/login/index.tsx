import React from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/AuthContext";

export const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    await auth.handleLogin();

    navigate("/inbox", { replace: true });
  };

  return (
    <div>
      <button className="bg-primary p-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
