// frontend/src/screens/ProfileScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";

// Tipos
type Turno = {
  _id: string;
  fecha: string;
  hora: string;
  servicioId: string;
  usuarioId: string;
};

type Servicio = {
  _id: string;
  nombre: string;
  descripcion: string;
  foto?: string;
  estado: "pendiente" | "aprobado" | "rechazado";
};

export default function ProfileScreen({ navigation }: any) {
  const { userId, userRole } = useContext(UserContext);

  const [misTurnos, setMisTurnos] = useState<Turno[]>([]);
  const [misServicios, setMisServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    // Traer turnos del usuario
    fetch(`http://localhost:5000/turnos?usuarioId=${userId}`)
      .then(res => res.json())
      .then((data: Turno[]) => setMisTurnos(data))
      .catch(console.error);

    // Traer servicios creados por el usuario
    fetch(`http://localhost:5000/servicios?creadorId=${userId}`)
      .then(res => res.json())
      .then((data: Servicio[]) => setMisServicios(data))
      .catch(console.error);
  }, [userId]);

  return (
    <View style={styles.container}>
      {/* Botón de Atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{"< Atrás"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Mi perfil</Text>

      <Text style={styles.subtitle}>Mis turnos</Text>
      <FlatList
        data={misTurnos}
        keyExtractor={(t: Turno) => t._id}
        renderItem={({ item }: { item: Turno }) => (
          <View style={styles.card}>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Hora: {item.hora}</Text>
          </View>
        )}
      />

      <Text style={styles.subtitle}>Mis servicios</Text>
      <FlatList
        data={misServicios}
        keyExtractor={(s: Servicio) => s._id}
        renderItem={({ item }: { item: Servicio }) => (
          <View style={styles.card}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Estado: {item.estado}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  backButton: { marginBottom: 16 },
  backText: { color: "#009929", fontSize: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 20, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  card: { backgroundColor: "#fff", padding: 12, marginBottom: 8, borderRadius: 8 },
});

