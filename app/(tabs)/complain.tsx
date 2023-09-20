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
import { FontAwesome } from "@expo/vector-icons";

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
    setTimeout(() => {
      setIsComplaintSent(true);
    }, 1000); // Defina um tempo limite de 1 segundo para simular o envio
  };

  const [isComplaintSent, setIsComplaintSent] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Ocorrência</Text>
      <Image
        source={
          photo
            ? { uri: photo }
            : require("../../assets/images/noImageComplain.png")
        }
        style={styles.photo}
      />
      <TouchableOpacity onPress={handleTakePhoto}>
        <FontAwesome style={styles.icon} name="camera" size={30} color="gray" />
      </TouchableOpacity>
      <TextInput
        style={styles.inputMessage}
        placeholder="Digite aqui um breve resumo do problema..."
        value={problemSummary}
        onChangeText={(text) => setProblemSummary(text)}
        multiline
      />
      <Text style={styles.text}>Localização:</Text>
      <Text style={styles.inputCenter}>
        {location && (
          <>
            {location.latitude}, {location.longitude}{" "}
          </>
        )}
      </Text>
      <Button title="Enviar" onPress={handleSendComplaint} />
      {isComplaintSent && (
        <Text style={styles.successMessage}>Mensagem enviada com sucesso!</Text>
      )}
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
  icon: {
    marginBottom: 16,
  },
  inputMessage: {
    width: "80%",
    height: 200,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "white",
  },
  inputCenter: {
    fontWeight: "bold",
    width: "80%",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "80%",
    height: 200,
    borderRadius: 8,
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2f95dc",
    marginBottom: 16,
  },
});
