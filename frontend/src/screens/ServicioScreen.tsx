import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { UserContext } from "../context/UserContext";

export default function ServicioScreen({ route }: any) {
  const { servicioId } = route.params;
  const { userRole } = useContext(UserContext);
  const [servicio, setServicio] = useState<any>(null);
  const [turnos, setTurnos] = useState<any[]>([]);

  useEffect(() => {
    // Traer info del servicio
    fetch(`http://localhost:5000/servicios/${servicioId}`)
      .then(res => res.json())
      .then(data => setServicio(data));

    // Traer turnos de este servicio
    fetch(`http://localhost:5000/turnos?servicioId=${servicioId}`)
      .then(res => res.json())
      .then(data => setTurnos(data));
  }, [servicioId]);

  const reservarTurno = (turnoId: string) => {
    Alert.alert("Reservar", `Reservaste el turno ${turnoId}`);
    // Aquí podrías hacer POST a backend para reservar
  };

  if (!servicio) return <Text>Cargando...</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{servicio.nombre}</Text>
      <Text style={{ marginBottom: 16 }}>{servicio.descripcion}</Text>

      <FlatList
        data={turnos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, padding: 12, marginBottom: 8 }}>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Hora: {item.hora}</Text>
            {userRole === "usuario" && (
              <Button title="Reservar" onPress={() => reservarTurno(item._id)} />
            )}
          </View>
        )}
      />
    </View>
  );
}
