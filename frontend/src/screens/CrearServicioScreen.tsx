import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CrearServicioScreen({ navigation }: any) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [alias, setAlias] = useState("");
  const [cbu, setCbu] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a las fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleCrearServicio = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre del servicio es obligatorio");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.168:5000/servicios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          telefono,
          email,
          direccion,
          alias,
          cbu,
          foto, // incluimos la foto
        }),
      });

      if (res.ok) {
        Alert.alert("Éxito", "Servicio creado correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", "No se pudo crear el servicio");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema de conexión");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Crear mi Servicio</Text>

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.buttonText}>
          {foto ? "Cambiar Foto" : "Seleccionar Foto"}
        </Text>
      </TouchableOpacity>

      {foto && (
        <Image
          source={{ uri: foto }}
          style={{ width: 150, height: 150, marginVertical: 10, borderRadius: 10 }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Nombre del servicio"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Alias"
        value={alias}
        onChangeText={setAlias}
      />
      <TextInput
        style={styles.input}
        placeholder="CBU"
        value={cbu}
        onChangeText={setCbu}
      />

      <TouchableOpacity style={styles.button} onPress={handleCrearServicio}>
        <Text style={styles.buttonText}>Guardar servicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#009929",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  photoButton: {
    backgroundColor: "#0077cc",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});



