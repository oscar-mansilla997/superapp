// src/components/MainLayout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import TabNavigator from "../navigation/TabNavigator";

type MainLayoutProps = {
  children: React.ReactNode;
  navigation: any;
};

export default function MainLayout({ children, navigation }: MainLayoutProps) {
  return (
    <View style={styles.container}>
      <Header title="Mi App" navigation={navigation} />
      <View style={styles.content}>{children}</View>
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});

