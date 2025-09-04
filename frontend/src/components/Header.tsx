import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Header({ title, navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"< Back"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1b003a"
  },
  backText: { color: "#fff", fontSize: 16 },
  title: { flex: 1, textAlign: "center", color: "#fff", fontWeight: "bold" },
});



