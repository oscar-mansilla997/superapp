// frontend/src/screens/MisTurnosScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, SafeAreaView } from "react-native";
import { UserContext } from "../context/UserContext";
import { getReservas } from "../services/api";
import Header from "../components/Header";

type Turno = {
  _id: string;
  servicioId: string;
  servicioNombre: string;
  usuarioId: string;
  fecha: string;
  hora: string;
};

export default function MisTurnosScreen({ navigation }: any) {
  const { userId } = useContext(UserContext);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const allTurnos: Turno[] = await getReservas();
        const misTurnos = allTurnos.filter((t: Turno) => t.usuarioId === userId);
        setTurnos(misTurnos);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudieron cargar tus turnos.");
      } finally {
        setLoading(false);
      }
    };
    fetchTurnos();
  }, [userId]);

  const renderItem = ({ item }: { item: Turno }) => (
    <View style={styles.card}>
      <Text style={styles.servicio}>{item.servicioNombre}</Text>
      <Text>{item.fecha} - {item.hora}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#009929" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mis Turnos" navigation={navigation} />
      {turnos.length > 0 ? (
        <FlatList
          data={turnos}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : (
        <View style={styles.center}>
          <Text>No tienes turnos reservados.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 3,
  },
  servicio: { fontWeight: "bold", fontSize: 16, marginBottom: 4, color: "#333" },
});

