import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";

type Servicio = {
  _id: string;
  nombre: string;
  descripcion: string;
  foto?: string;
};

export default function TurnosScreen({ navigation }: any) {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useContext(UserContext);

  const { width: screenWidth } = useWindowDimensions();
  const numColumns = 2;
  const cardMargin = 8;
  const cardWidth = (screenWidth - cardMargin * (numColumns * 2)) / numColumns;
  const fontScale = cardWidth / 150;

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        // Aquí usamos tu IP en vez de localhost
        const res = await fetch("http://192.168.1.168:5000/servicios");
        const data = await res.json();
        setServicios(data);
        console.log("Servicios recibidos:", data); // para debug
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  const renderServicio = ({ item }: { item: Servicio }) => (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth, margin: cardMargin }]}
      onPress={() => navigation.navigate("DisponibilidadScreen", { servicio: item })}
    >
      <Image
        source={{
          uri: item.foto && item.foto !== "" ? item.foto : "https://via.placeholder.com/150",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.nombre, { fontSize: 16 * fontScale }]} numberOfLines={1}>
          {item.nombre}
        </Text>
        <Text style={[styles.descripcion, { fontSize: 12 * fontScale }]} numberOfLines={2}>
          {item.descripcion}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Turnos" navigation={navigation} />
      <FlatList
        data={servicios}
        keyExtractor={(item) => item._id}
        renderItem={renderServicio}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: "center" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={() =>
          userRole === "usuario" ? (
            <TouchableOpacity
              style={styles.footerContainer}
              activeOpacity={0.6}
              onPress={() => navigation.navigate("CrearServicioScreen")}
            >
              <Text style={styles.linkText}>crear mi servicio</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: "#f2f2f2" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    aspectRatio: 1 / 1.2,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    flex: 0.6,
    backgroundColor: "#ccc",
  },
  textContainer: { flex: 0.4, padding: 8 },
  nombre: { fontWeight: "bold", color: "#333" },
  descripcion: { color: "#666", marginTop: 4 },
  footerContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#009929",
  },
});





