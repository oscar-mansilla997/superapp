import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { format, addDays } from "date-fns";
import { getDisponibilidad, createReserva } from "../services/api";
import Header from "../components/Header";

const screenWidth = Dimensions.get("window").width;

export default function DisponibilidadScreen({ route, navigation }: any) {
  const { servicio } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHora, setSelectedHora] = useState<string | null>(null);
  const [disponibilidad, setDisponibilidad] = useState<Record<string, string[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [reservaLoading, setReservaLoading] = useState(false);

  const days = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    const fetchDisponibilidad = async () => {
      try {
        const data = await getDisponibilidad(servicio._id);
        setDisponibilidad(data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo cargar la disponibilidad.");
      } finally {
        setLoading(false);
      }
    };
    fetchDisponibilidad();
  }, []);

  const horariosDisponibles = disponibilidad
    ? disponibilidad[format(selectedDate, "yyyy-MM-dd")] || []
    : [];

  const dayCardWidth = screenWidth / 6;
  const horarioCardWidth = (screenWidth - 48) / 4;

  const handleReservar = async () => {
    if (!selectedHora) return;
    setReservaLoading(true);
    try {
      await createReserva({
        servicioId: servicio._id,
        fecha: format(selectedDate, "yyyy-MM-dd"),
        hora: selectedHora,
      });
      Alert.alert(
        "¡Éxito!",
        `Reservaste ${servicio.nombre} el ${format(selectedDate, "dd/MM/yyyy")} a las ${selectedHora}`
      );

      setDisponibilidad((prev) => {
        if (!prev) return prev;
        const key = format(selectedDate, "yyyy-MM-dd");
        return { ...prev, [key]: prev[key].filter((h) => h !== selectedHora) };
      });

      setSelectedHora(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo realizar la reserva.");
    } finally {
      setReservaLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#009929" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="" navigation={navigation} />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Portada */}
        {servicio.foto && (
          <Image source={{ uri: servicio.foto }} style={styles.portada} />
        )}

        <Text style={styles.title}>{servicio.nombre}</Text>
        <Text style={styles.desc}>{servicio.descripcion}</Text>

        {/* Calendario horizontal */}
        <View style={{ height: 70, marginTop: 8 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((item) => {
              const key = format(item, "yyyy-MM-dd");
              const isSelected = format(selectedDate, "yyyy-MM-dd") === key;
              const isDisabled =
                disponibilidad !== null ? (disponibilidad[key] || []).length === 0 : false;

              return (
                <TouchableOpacity
                  key={key}
                  disabled={isDisabled}
                  style={[
                    styles.dayCard,
                    { width: dayCardWidth, opacity: isDisabled ? 0.4 : 1 },
                    isSelected && styles.selectedDay,
                  ]}
                  onPress={() => {
                    setSelectedDate(item);
                    setSelectedHora(null);
                  }}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                    {format(item, "EEE")}
                  </Text>
                  <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>
                    {format(item, "dd")}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Horarios */}
        <View style={styles.horariosContainer}>
          {horariosDisponibles.length > 0 ? (
            horariosDisponibles.map((hora) => {
              const isSelected = selectedHora === hora;
              return (
                <TouchableOpacity
                  key={hora}
                  style={[
                    styles.horaCard,
                    { width: horarioCardWidth },
                    isSelected && styles.selectedHoraCard,
                  ]}
                  onPress={() => setSelectedHora(hora)}
                >
                  <Text style={[styles.horaText, isSelected && styles.selectedHoraText]}>
                    {hora}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.noHorariosText}>No hay horarios disponibles</Text>
          )}
        </View>

        {/* Botón Reservar */}
        <TouchableOpacity
          style={[
            styles.reservarButton,
            !(selectedHora && horariosDisponibles.length > 0) && { backgroundColor: "#999" },
          ]}
          disabled={!(selectedHora && horariosDisponibles.length > 0) || reservaLoading}
          onPress={handleReservar}
        >
          <Text style={styles.reservarText}>
            {reservaLoading ? "Reservando..." : "Reservar"}
          </Text>
        </TouchableOpacity>

        {/* Información de contacto */}
        <View style={styles.infoContainer}>
  <Text style={styles.infoText}>Contacto:</Text>
  <Text style={styles.infoText}>Tel: {servicio.telefono || "No definido"}</Text>
  <Text style={styles.infoText}>Email: {servicio.email || "No definido"}</Text>
  <Text style={styles.infoText}>Dirección: {servicio.direccion || "No definido"}</Text>
  <Text style={styles.infoText}>Alias: {servicio.alias || "No definido"}</Text>
  <Text style={styles.infoText}>CBU: {servicio.cbu || "No definido"}</Text>
</View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  portada: { width: "100%", height: 200, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8, paddingHorizontal: 16 },
  desc: { fontSize: 16, color: "#666", paddingHorizontal: 16 },

  dayCard: {
    height: 60,
    backgroundColor: "#fff",
    marginRight: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  selectedDay: { backgroundColor: "#009929" },
  dayText: { fontSize: 14, color: "#333" },
  dateText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  selectedDayText: { color: "#fff" },

  horariosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  horaCard: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  selectedHoraCard: {
    backgroundColor: "#009929",
  },
  horaText: { fontSize: 16, color: "#333" },
  selectedHoraText: { color: "#fff", fontWeight: "bold" },

  noHorariosText: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 16,
  },

  reservarButton: {
    marginTop: 16,
    backgroundColor: "#009929",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    elevation: 3,
  },
  reservarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  infoContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  infoText: { fontSize: 14, color: "#555", marginBottom: 4 },
});










