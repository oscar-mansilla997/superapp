import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

type ServicioCardProps = {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
  onPress: () => void;
};

const ServicioCard: React.FC<ServicioCardProps> = ({
  nombre,
  descripcion,
  foto,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: foto }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    width: 150, // ancho fijo para grid
    // sombra para Android
    elevation: 5,
    // sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
  },
  info: {
    padding: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  descripcion: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default ServicioCard;






