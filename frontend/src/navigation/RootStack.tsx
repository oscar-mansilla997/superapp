import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import PerfilScreen from "../screens/ProfileScreen"; // Abrimos directamente el perfil

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* La tab siempre visible */}
      <Stack.Screen name="Tabs" component={TabNavigator} />

      {/* Perfil se abre sobre la tab, pero la tab sigue visible */}
      <Stack.Screen name="Perfil" component={PerfilScreen} />
    </Stack.Navigator>
  );
}





