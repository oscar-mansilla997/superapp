import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import RootStack from "./src/navigation/RootStack";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserProvider>
  );
}











