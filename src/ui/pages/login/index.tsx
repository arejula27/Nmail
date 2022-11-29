import React, { useState } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/AuthContext";

export const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const handleLogin = async () => {
    auth.handleLogin(publicKey, privateKey);

    navigate("/inbox", { replace: true });
  };

  //TODO restriccions
  return (
    <div>
      <form name="login" className=" flex flex-col">
        <input
          className="m-1"
          placeholder="private key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <input
          className="m-1"
          placeholder="public key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
      </form>
      <button className="bg-primary p-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
