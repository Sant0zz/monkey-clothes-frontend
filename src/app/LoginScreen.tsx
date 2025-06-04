// app/LoginScreen.tsx

import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Images
const MonkeyLogo = require('../../assets/images/logo-branco.png');

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

  // Forçar cor dos textos para branco
  const textColor = '#fff';

  return (
    <View style={styles.backgroundWhite}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.formBox}
        >
          {/* Header com botão Voltar */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={[styles.backText, { color: textColor }]}>voltar</Text>
          </TouchableOpacity>
          {/* Avatar do macaco */}
          <View style={styles.logoContainer}>
            <Image source={MonkeyLogo} style={{ width: 80, height: 80 }} />
          </View>
          {/* Label e input de usuário */}
          <Text style={[styles.label, { color: textColor }]}>Email de usuario:</Text>
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
          <Text style={[styles.label, { color: textColor }]}>Senha:</Text>
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
          {/* Esqueci a senha */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          {/* Botão Entrar */}
          <TouchableOpacity
            style={styles.button}
            disabled={!username || !password}
            activeOpacity={0.7}
            onPress={() => {/* handle login */}}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          {/* Link de cadastro */}
          <TouchableOpacity onPress={() => router.push('./SingupScreen')}>
            <Text style={styles.signupText}>Não possui conta? <Text style={styles.signupLink}>Cadastre-se</Text></Text>
          </TouchableOpacity>
          {/* Rodapé de crédito */}
          <Text style={styles.footer}>©WindRoseCode</Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundWhite: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formBox: {
    width: '90%',
    maxWidth: 350,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
    marginLeft: 0,
  },
  backText: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#fff',
    paddingLeft: 1,
    paddingRight: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
    color: '#fff',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#fff',
  },
  input: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#222',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A90E2',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
  },
  socialText: {
    color: '#fff',
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    gap: 18,
  },
  socialIcon: {
    width: 32,
    height: 32,
    marginHorizontal: 8,
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 8,
  },
  signupLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    marginTop: 16,
    marginBottom: 0,
    alignSelf: 'center',
  },
});
