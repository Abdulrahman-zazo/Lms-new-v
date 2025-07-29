// context/AuthContext.tsx
"use client";

import { createContext, useContext } from "react";

type AuthContextType = {
  token: string;
};

const AuthContext = createContext<AuthContextType>({ token: "" });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};
