"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext({
  user: null,
  isLoading: true,
});

function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  console.log(session);
  // useEffect(() => {
  //   if (status === "loading") {
  //     setIsLoading(true);
  //   } else {
  //     setUser(session?.user || null);
  //     setIsLoading(false);
  //   }
  // }, [session, status]);

  const value = {
    user: session?.user,
    isLoading: status === "loading",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context was used outside provider");

  return context;
}

export { useAuth, AuthProvider };
