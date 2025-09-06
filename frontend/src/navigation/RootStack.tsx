import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import PerfilScreen from "../screens/ProfileScreen";
import CrearServicioScreen from "../screens/CrearServicioScreen";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* La tab siempre visible */}
      <Stack.Screen name="Tabs" component={TabNavigator} />

      {/* Pantalla de perfil, abierta sobre la tab */}
      <Stack.Screen name="Perfil" component={PerfilScreen} />

      {/* Pantalla para crear un servicio */}
      <Stack.Screen name="CrearServicioScreen" component={CrearServicioScreen} />
    </Stack.Navigator>
  );
}






