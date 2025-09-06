import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet, Image } from "react-native";
import { UserContext } from "../context/UserContext";

// Tipos
type Turno = {
  _id: string;
  fecha: string;
  hora: string;
  usuarioId?: string;
  usuarioNombre?: string;
  disponible?: boolean;
};

type Servicio = {
  _id: string;
  nombre: string;
  descripcion: string;
  foto?: string;
};

export default function ServicioScreen({ route }: any) {
  const { servicioId } = route.params;
  const { userRole } = useContext(UserContext);

  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    // Traer info del servicio
    fetch(`http://localhost:5000/servicios/${servicioId}`)
      .then(res => res.json())
      .then((data: Servicio) => setServicio(data))
      .catch(console.error);

    // Traer turnos de este servicio
    fetch(`http://localhost:5000/turnos?servicioId=${servicioId}`)
      .then(res => res.json())
      .then((data: Turno[]) => setTurnos(data))
      .catch(console.error);
  }, [servicioId]);

  const reservarTurno = (turnoId: string) => {
    Alert.alert("Reservar", `Reservaste el turno ${turnoId}`);
    // Aquí iría tu POST al backend
  };

  const toggleBloqueoTurno = (turnoId: string) => {
    setTurnos(prev =>
      prev.map(t =>
        t._id === turnoId ? { ...t, disponible: !t.disponible } : t
      )
    );
    // Aquí podrías actualizar en backend si bloqueaste o desbloqueaste
  };

  if (!servicio) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{servicio.nombre}</Text>
      {servicio.foto && (
        <Image source={{ uri: servicio.foto }} style={styles.foto} />
      )}
      <Text style={styles.descripcion}>{servicio.descripcion}</Text>

      <Text style={styles.subtitulo}>
        {userRole === "usuario" ? "Turnos disponibles" : "Turnos del servicio"}
      </Text>

      <FlatList
        data={turnos}
        keyExtractor={(t: Turno) => t._id}
        renderItem={({ item }: { item: Turno }) => (
          <View
            style={[
              styles.card,
              !item.disponible && userRole === "proveedor" ? styles.bloqueado : {}
            ]}
          >
            <Text>
              {item.fecha} {item.hora}{" "}
              {userRole === "proveedor" && item.usuarioNombre
                ? `- ${item.usuarioNombre}`
                : ""}
            </Text>

            {userRole === "usuario" && item.disponible !== false && (
              <Button title="Reservar" onPress={() => reservarTurno(item._id)} />
            )}

            {userRole === "proveedor" && (
              <Button
                title={item.disponible ? "Bloquear" : "Desbloquear"}
                onPress={() => toggleBloqueoTurno(item._id)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitulo: { fontSize: 20, fontWeight: "600", marginVertical: 12 },
  descripcion: { fontSize: 16, marginBottom: 12 },
  foto: { width: "100%", height: 200, borderRadius: 12, marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  bloqueado: { backgroundColor: "#ddd" },
});


