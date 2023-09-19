import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RegisterScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [strava, setStrava] = useState("");

  const handleRegister = () => {
    // Adicione a lógica para enviar os dados de registro para o servidor aqui
    // Por enquanto, vamos apenas exibir os dados no console para fins de demonstração
    console.log("Nome:", nome);
    console.log("Sobrenome:", sobrenome);
    console.log("CPF:", cpf);
    console.log("E-mail:", email);
    console.log("Celular:", celular);
    console.log("Strava:", strava);

    // Depois de enviar os dados, você pode navegar para a próxima tela, se necessário
    // navigation.navigate('TelaSeguinte');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Ciclista</Text>
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
      <Button title="Cadastrar" onPress={handleRegister} />
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
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "white",
  },
});
