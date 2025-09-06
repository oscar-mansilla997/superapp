// frontend/src/navigation/MainLayout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header"; // <-- ruta correcta
import TabNavigator from "./TabNavigator";

type MainLayoutProps = {
  children: React.ReactNode;
  navigation: any;
  title?: string;
};

export default function MainLayout({ children, navigation, title = "" }: MainLayoutProps) {
  return (
    <View style={styles.container}>
      {/* Header siempre arriba */}
      <Header navigation={navigation} title={title} />

      {/* Contenido de la pantalla */}
      <View style={styles.content}>{children}</View>

      {/* TabNavigator siempre abajo */}
      <View style={styles.tab}>
        <TabNavigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  content: { flex: 1 },
  tab: { height: 60 },
});


