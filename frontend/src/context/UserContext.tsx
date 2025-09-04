// src/context/UserContext.tsx
import React, { createContext, useState, ReactNode } from "react";

type UserContextType = {
  userRole: string;
  setUserRole: (role: string) => void;
  userId: string;          // agregamos userId
  setUserId: (id: string) => void;
};

export const UserContext = createContext<UserContextType>({
  userRole: "usuario",
  setUserRole: () => {},
  userId: "",
  setUserId: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState("usuario");
  const [userId, setUserId] = useState("123"); // podés inicializar con un valor real

  return (
    <UserContext.Provider value={{ userRole, setUserRole, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

