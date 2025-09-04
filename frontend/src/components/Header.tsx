import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  navigation: any;
  showBack?: boolean;
};

export default function Header({ title, navigation, showBack = true }: HeaderProps) {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"< Back"}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Perfil")}
          style={styles.icon}
        >
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Notificaciones")} style={styles.icon}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Carrito")} style={styles.icon}>
          <Ionicons name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1b003a",
  },
  backText: { color: "#fff", fontSize: 16 },
  title: { flex: 1, textAlign: "center", color: "#fff", fontWeight: "bold" },
  iconsContainer: { flexDirection: "row" },
  icon: { marginLeft: 12 },
});








