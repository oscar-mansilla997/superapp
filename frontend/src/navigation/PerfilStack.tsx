import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import MisTurnosScreen from "../screens/MisTurnosScreen";

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="MisTurnos" component={MisTurnosScreen} />
    </Stack.Navigator>
  );
}

