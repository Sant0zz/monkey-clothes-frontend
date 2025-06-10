// app/SignupScreen.tsx

import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import BotaoVoltar from "../components/BotaoVoltar";

// Imagens
const MonkeyLogo = require('../../assets/images/logo-branco.png');
import {Colors} from "../../constants/Colors";

export default function SignupScreen() {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  // Forçar cor dos textos para branco
  const textColor = '#fff';

  return (
    <ScrollView>
      <LinearGradient
        colors={['#4A90E2', '#357ABD']}
        style={styles.fullScreen}
      >
        <StatusBar style={theme === 'light' ? "dark" : "light"} />
        {/* Botão Voltar no canto superior esquerdo da box */}
        <View style={{ alignItems: 'flex-start', marginBottom: 12, marginTop: -8 }}>
          <BotaoVoltar onPress={() => router.back()} />
        </View>
        {/* Avatar do macaco */}
        <View style={styles.logoContainer}>
          <Image
            source={MonkeyLogo}
            style={styles.logoImage}
          />
        </View>
        {/* Título de boas-vindas */}
        <Text style={[styles.title, { color: textColor }]}>
          Olá, bem vindo.
        </Text>
        {/* Nome de usuário */}
        <Text style={[styles.label, { color: textColor }]}>
          Nome de usuario:
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: Colors[theme].inputBackground }]}
          placeholder="Nome de usuario"
          placeholderTextColor={Colors[theme].placeholder}
          value={username}
          onChangeText={setUsername}
        />
        {/* Email */}
        <Text style={[styles.label, { color: textColor }]}>
          Email:
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: Colors[theme].inputBackground }]}
          placeholder="Email"
          placeholderTextColor={Colors[theme].placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {/* CPF */}
        <Text style={[styles.label, { color: textColor }]}>
          CPF:
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: Colors[theme].inputBackground }]}
          placeholder="CPF"
          placeholderTextColor={Colors[theme].placeholder}
          value={cpf}
          onChangeText={setCpf}
        />
        {/* Senha */}
        <Text style={[styles.label, { color: textColor }]}>
          Senha:
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: Colors[theme].inputBackground }]}
          placeholder="Senha"
          placeholderTextColor={Colors[theme].placeholder}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* Botão Cadastrar */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: '#fff', // Botão branco
            },
          ]}
          disabled={!username || !email || !cpf || !password}
          activeOpacity={0.7}
          onPress={() => { /* handle signup */ }}
        >
          <Text style={[styles.buttonText, { color: '#4A90E2' }]}>Cadastrar</Text>
        </TouchableOpacity>
        {/* Link para login */}
        <TouchableOpacity onPress={() => router.push('./LoginScreen')}>
          <Text style={[styles.link, { color: textColor }]}>
            Já possui conta? Fazer login
          </Text>
        </TouchableOpacity>
        {/* Rodapé de crédito */}
        <Text style={[styles.footer, { color: textColor }]}>
          ©WindRoseCode
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingTop: Platform.select({ ios: 50, default: 20 }),
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 32,
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
  },
});
