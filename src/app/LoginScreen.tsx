// app/LoginScreen.tsx

import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Images
const ChevronLeft = require("@/../assets/images/ChevronLeft.png");
const MonkeyLogo = require('@/../assets/images/MonkeyLogo.png');

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#4A90E2',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#4A90E2',
    inputBackground: '#F0F0F0',
    placeholder: '#757575',
    buttonBackground: '#0a7ea4',
    buttonDisabled: '#b0b0b0',
    buttonText: '#fff',
    link: '#0a7ea4',
    textSecondary: '#687076',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#357ABD',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#357ABD',
    inputBackground: '#23272b',
    placeholder: '#b0b0b0',
    buttonBackground: '#fff',
    buttonDisabled: '#444',
    buttonText: '#151718',
    link: '#fff',
    textSecondary: '#9BA1A6',
  },
};

export default function LoginScreen() {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    // Degradê de fundo
    <LinearGradient
      colors={['#4A90E2', '#357ABD']}
      style={styles.fullScreen}
    >
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />

      {/* Header com botão Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Image source={ChevronLeft} style={{ width: 24, height: 24, tintColor: Colors[theme].text }} />
        <Text style={[styles.backText, { color: Colors[theme].text }]}>
          voltar
        </Text>
      </TouchableOpacity>

      {/* Avatar do macaco */}
      <View style={styles.logoContainer}>
        <Image source={MonkeyLogo} style={{ width: 100, height: 100 }} />
      </View>

      {/* Título de boas-vindas */}
      <Text style={[styles.title, { color: Colors[theme].text }]}>
        Olá, bem vindo.
      </Text>

      {/* Label e input de usuário */}
      <Text style={[styles.label, { color: Colors[theme].text }]}>
        Email de usuario:
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: Colors[theme].inputBackground }
        ]}
        placeholder="Email de usuario"
        placeholderTextColor={Colors[theme].placeholder}
        value={username}
        onChangeText={setUsername}
      />

      {/* Label e input de senha */}
      <Text style={[styles.label, { color: Colors[theme].text }]}>
        Senha:
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: Colors[theme].inputBackground }
        ]}
        placeholder="Senha"
        placeholderTextColor={Colors[theme].placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botão Entrar */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              username && password
                ? Colors[theme].buttonBackground
                : Colors[theme].buttonDisabled,
          },
        ]}
        disabled={!username || !password}
        activeOpacity={0.7}
        onPress={() => {/* handle login */}}
      >
        <Text style={[styles.buttonText, { color: Colors[theme].buttonText }]}>
          Entrar
        </Text>
      </TouchableOpacity>

      {/* Link de cadastro */}
      <TouchableOpacity onPress={() => router.push('./SingupScreen')}>
        <Text style={[styles.link, { color: Colors[theme].link }]}>
          Não possuo conta? Cadastre-se
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
  backText: {
    marginLeft: 8,
    fontSize: 16,
    textTransform: 'lowercase',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
