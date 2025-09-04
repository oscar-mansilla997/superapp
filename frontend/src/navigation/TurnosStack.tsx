import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TurnosScreen from "../screens/TurnosScreen";
import ServicioScreen from "../screens/ServicioScreen";
import DisponibilidadScreen from "../screens/DisponibilidadScreen";

const Stack = createNativeStackNavigator();

export default function TurnosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TurnosMain" component={TurnosScreen} />
      <Stack.Screen name="ServicioScreen" component={ServicioScreen} />
      <Stack.Screen name="DisponibilidadScreen" component={DisponibilidadScreen} />
    </Stack.Navigator>
  );
}





