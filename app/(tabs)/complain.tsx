import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";

type ComplainScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function ComplainScreen({ navigation }: ComplainScreenProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [problemSummary, setProblemSummary] = useState("");

  useEffect(() => {
    // Solicitar permissões de localização e câmera quando o componente é montado
    (async () => {
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      const { status: cameraStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (locationStatus !== "granted" || cameraStatus !== "granted") {
        console.error("Permissões de localização ou câmera não concedidas");
      }
    })();
  }, []);

  const handleTakePhoto = async () => {
    // Obter a localização atual
    const { coords } = await Location.getCurrentPositionAsync({});
    if (coords) {
      setLocation(coords);
    }

    // Tirar uma foto da ciclovia
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const photoUri = result.assets[0].uri;
      setPhoto(photoUri);
    }
  };

  const handleSendComplaint = () => {
    // Adicione a lógica para enviar os dados da ocorrência para o servidor aqui
    // Certifique-se de incluir a foto, a localização e o resumo do problema
    console.log("Foto:", photo);
    console.log("Localização:", location);
    console.log("Resumo do Problema:", problemSummary);

    // Depois de enviar os dados, você pode navegar para a próxima tela, se necessário
    // navigation.navigate('TelaSeguinte');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorrência</Text>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      {location && (
        <Text style={styles.locationText}>
          Localização: {location.latitude}, {location.longitude}
        </Text>
      )}
      <Button title="Tirar Foto e Obter Localização" onPress={handleTakePhoto} />
      <TextInput
        style={styles.input}
        placeholder="Resumo do Problema"
        value={problemSummary}
        onChangeText={(text) => setProblemSummary(text)}
        multiline
      />
      <Button title="Enviar" onPress={handleSendComplaint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "white",
  },
  photo: {
    width: 200,
    height: 150,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 16,
  },
});