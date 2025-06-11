import { Button, Text, View } from "react-native";
import { useState } from "react";
import api from "../service/api"; // Axios configurado
import { router } from "expo-router";

export default function Index() {
  const [resposta, setResposta] = useState("Aguardando...");

  const validarLogin = async () => {
    try {
      
      const response = await api.get('/usuario');
      setResposta(JSON.stringify(response.data));

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setResposta("Erro ao conectar com o servidor");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="sitemap" onPress={async () => router.push("/_sitemap")} />
      <Button title="cliente" onPress={async () => router.push("/cliente")} />
      <Button title="usuario" onPress={async () => router.push("/usuario")} />
      <Button title="Login" onPress={async () => router.push("/login")} />
      <Button title="Api" onPress={validarLogin} />
      <Text style={{ marginTop: 50 }}>{resposta}</Text>
    </View>
  );
}
