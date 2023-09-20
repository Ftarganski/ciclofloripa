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
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

type RegisterScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [strava, setStrava] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Verifique se você está editando um usuário existente e, se sim, preencha os campos
    if (id) {
      // Lógica para buscar o usuário existente pelo ID e preencher os estados
    }
  }, [id]);

  const handlePickImage = async () => {
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

  const handleRegister = () => {
    // Adicione a lógica para enviar ou atualizar os dados de registro para o servidor aqui
    // Por enquanto, vamos apenas exibir os dados no console para fins de demonstração
    console.log("ID:", id);
    console.log("Nome:", nome);
    console.log("Sobrenome:", sobrenome);
    console.log("CPF:", cpf);
    console.log("E-mail:", email);
    console.log("Celular:", celular);
    console.log("Strava:", strava);
    console.log("Foto:", photo);

    // Depois de enviar os dados, você pode navegar para a próxima tela, se necessário
    // navigation.navigate('TelaSeguinte');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ciclista</Text>
      <View style={styles.imageContainer}>
        <Image
          source={
            photo
              ? { uri: photo }
              : require("../../assets/images/noUserPhoto.png")
          }
          style={styles.photo}
        />
        <TouchableOpacity onPress={handlePickImage}>
          <FontAwesome name="camera" size={30} color="gray" />{" "}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        onChangeText={(text) => setSobrenome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        onChangeText={(text) => setCpf(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Celular"
        onChangeText={(text) => setCelular(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Strava (opcional)"
        onChangeText={(text) => setStrava(text)}
      />
      <Button title="Salvar" onPress={handleRegister} />
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "white",
  },
});
