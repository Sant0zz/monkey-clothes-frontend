// app/SignupScreen.tsx

import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Imagens
const ChevronLeft = require("@/../assets/images/ChevronLeft.png");
const MonkeyLogo = require('@/../assets/images/MonkeyLogo.png');
import {Colors} from "../../constants/Colors";

export default function SignupScreen() {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={['#4A90E2', '#357ABD']}
      style={styles.fullScreen}
    >
      <StatusBar style={theme === 'light' ? "dark" : "light"} />

      {/* Header com botão Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Image
          source={ChevronLeft}
          style={[styles.icon, { tintColor: Colors[theme].text }]}
        />
        <Text style={[styles.backText, { color: Colors[theme].text }]}>
          voltar
        </Text>
      </TouchableOpacity>

      {/* Avatar do macaco */}
      <View style={styles.logoContainer}>
        <Image
          source={MonkeyLogo}
          style={styles.logoImage}
        />
      </View>

      {/* Título de boas-vindas */}
      <Text style={[styles.title, { color: Colors[theme].text }]}>
        Olá, bem vindo.
      </Text>

      {/* Nome de usuário */}
      <Text style={[styles.label, { color: Colors[theme].text }]}>
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
      <Text style={[styles.label, { color: Colors[theme].text }]}>
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
      <Text style={[styles.label, { color: Colors[theme].text }]}>
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
      <Text style={[styles.label, { color: Colors[theme].text }]}>
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
            backgroundColor:
              username && email && cpf && password
                ? Colors[theme].buttonBackground
                : Colors[theme].buttonDisabled,
          },
        ]}
        disabled={!username || !email || !cpf || !password}
        activeOpacity={0.7}
        onPress={() => { /* handle signup */ }}
      >
        <Text style={[styles.buttonText, { color: Colors[theme].buttonText }]}>
          Cadastrar
        </Text>
      </TouchableOpacity>

      {/* Link para login */}
      <TouchableOpacity onPress={() => router.push('./LoginScreen')}>
        <Text style={[styles.link, { color: Colors[theme].link }]}>
          Já possui conta? Fazer login
        </Text>
      </TouchableOpacity>

      {/* Rodapé de crédito */}
      <Text style={[styles.footer, { color: Colors[theme].textSecondary }]}>
        ©WindRoseCode
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingTop: Platform.select({ ios: 50, default: 20 }),
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    textTransform: 'lowercase',
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
