import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";

// Tipos
type Turno = {
  _id: string;
  fecha: string; // formato ISO: "2025-09-05"
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

// Función para obtener el nombre del día en español
const getNombreDia = (fecha: string) => {
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const fechaObj = new Date(fecha);
  return dias[fechaObj.getDay()];
};

export default function ProfileScreen({ navigation }: any) {
  const { userId } = useContext(UserContext);

  const [misTurnos, setMisTurnos] = useState<Turno[]>([]);
  const [misServicios, setMisServicios] = useState<Servicio[]>([]);
  const [expandedTurnos, setExpandedTurnos] = useState(false);
  const [expandedServicios, setExpandedServicios] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/turnos?usuarioId=${userId}`)
      .then(res => res.json())
      .then((data: Turno[]) => setMisTurnos(data))
      .catch(console.error);

    fetch(`http://localhost:5000/servicios?creadorId=${userId}`)
      .then(res => res.json())
      .then((data: Servicio[]) => setMisServicios(data))
      .catch(console.error);
  }, [userId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="" navigation={navigation} />

      <View style={styles.container}>
        <Text style={styles.title}>Mi perfil</Text>

        {/* Mis Turnos */}
        <TouchableOpacity onPress={() => setExpandedTurnos(!expandedTurnos)}>
          <Text style={styles.sectionText}>
            {expandedTurnos ? "Ocultar mis turnos" : "Mis turnos"}
          </Text>
        </TouchableOpacity>

        {expandedTurnos && (
          <FlatList
            data={misTurnos}
            keyExtractor={(t: Turno) => t._id}
            renderItem={({ item }: { item: Turno }) => {
              const servicio = misServicios.find(s => s._id === item.servicioId);
              const dia = getNombreDia(item.fecha);
              return (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    {servicio ? servicio.nombre : "Servicio desconocido"}
                  </Text>
                  <Text style={styles.cardText}>
                    {dia}, {item.fecha} - {item.hora}
                  </Text>
                </View>
              );
            }}
          />
        )}

        {/* Mis Servicios */}
        <TouchableOpacity onPress={() => setExpandedServicios(!expandedServicios)}>
          <Text style={styles.sectionText}>
            {expandedServicios ? "Ocultar mis servicios" : "Mis servicios"}
          </Text>
        </TouchableOpacity>

        {expandedServicios && (
          <FlatList
            data={misServicios}
            keyExtractor={(s: Servicio) => s._id}
            renderItem={({ item }: { item: Servicio }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardText}>Estado: {item.estado}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  sectionText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#555",
  },
});





