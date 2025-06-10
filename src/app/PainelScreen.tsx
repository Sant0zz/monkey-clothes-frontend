// src/app/PainelScreen.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
// Corrigindo imports para caminhos relativos corretos
import { useColorScheme } from '../../constants/hooks/useColorScheme';
import { Colors } from '../../constants/Colors';
import BotaoVoltar from "../components/BotaoVoltar";

// ícones de grid
const vendasIcon = require('../../assets/images/vendas.png');
const avaliacoesIcon = require('../../assets/images/avaliacoes.png');
const pedidosIcon = require('../../assets/images/pedidos.png');
const promocoesIcon = require('../../assets/images/promocoes.png');
const usuariosIcon = require('../../assets/images/usuarios.png');
const adicionarProdutosIcon = require('../../assets/images/adicionar_produtos.png');
const removerProdutosIcon = require('../../assets/images/remover_produtos.png');
// ícones de navegação
import favoritosIcon from '../../assets/images/favoritos.png';
import homeIcon from '../../assets/images/home-icon.png';
import comprasIcon from '../../assets/images/compras.png';
// avatar e voltar
import MonkeyLogo from '../../assets/images/MonkeyLogo.png';
import { Scroll } from 'phosphor-react-native';

export default function PainelScreen() {

  const theme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const router = useRouter();


    return (
    // 1. Fundo em gradiente
    <LinearGradient
      colors={['#4A90E2', '#357ABD']}
      style={styles.fullScreen}
    >
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />

      {/* Conteúdo principal envolvido para empurrar a navbar */}
      <View style={{ flex: 1, paddingBottom: 80 }}>
        {/* 2. Header */}
        <View style={styles.header}>
          <BotaoVoltar onPress={() => router.back()} />
          <Text style={[styles.title, { color: Colors[theme].text }]}>PAINEL</Text>
          <View style={styles.profileContainer}>
            <Text style={[styles.profileText, { color: Colors[theme].text }]}>Olá, Adm.</Text>
            <Image source={MonkeyLogo} style={styles.profileAvatar} />
          </View>
        </View>

        <View style={styles.grid}>
          {[
            { icon: vendasIcon, label: 'Vendas', onPress: () => {} },
            { icon: avaliacoesIcon, label: 'Avaliações', onPress: () => {} },
            { icon: pedidosIcon, label: 'Pedidos', onPress: () => {} },
            { icon: promocoesIcon, label: 'Promoções', onPress: () => {} },
            { icon: usuariosIcon, label: 'Usuários', onPress: () => {} },
            { icon: adicionarProdutosIcon, label: 'Adicionar Produtos', onPress: () => {} },
            { icon: removerProdutosIcon, label: 'Remover Produtos', onPress: () => {} },
            {}, // célula vazia
            {}, // célula vazia
          ].map((item, idx) =>
            item.icon ? (
              <TouchableOpacity
                key={idx}
                style={styles.card}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <Image source={item.icon} style={styles.cardIcon} />
                <Text style={[styles.cardLabel, { color: Colors[theme].text }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ) : (
              <View key={idx} style={styles.cardEmpty} />
            )
          )}
        </View>
      </View>

      {/* 4. Navegação inferior */}
      {/*<View style={styles.footerNav}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/home')}>
          <Image source={favoritosIcon} style={styles.navIcon} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>58</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtnCenter} onPress={() => router.push('/home')}>
          <Image source={homeIcon} style={styles.navIconCenter} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/home')}>
          <Image source={comprasIcon} style={styles.navIcon} />
        </TouchableOpacity>
      </View>*/}
    </LinearGradient>
  );
}




const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingTop: Platform.select({ ios: 50, default: 20 }),
    paddingHorizontal: 0, // Removido o padding horizontal para a navbar encostar nas bordas
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: Colors['light'].background,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  title: { fontSize: 24, fontWeight: '700' },
  profileContainer: { flexDirection: 'row', alignItems: 'center' },
  profileText: { marginRight: 8, fontSize: 14 },
  profileAvatar: { width: 36, height: 36, borderRadius: 18 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8, // Adiciona um leve padding lateral
  },
  card: {
    width: '30%',
    aspectRatio: 0.95, // Mais próximo de um quadrado, mas um pouco mais alto
    backgroundColor: '#FFF',
    borderRadius: 16, // Mais arredondado
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18, // Mais espaçamento entre linhas
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 110, // Garante altura mínima proporcional
    maxHeight: 130,
  },
  cardIcon: { width: 54, height: 54, marginBottom: 10 }, // Ícone maior
  cardLabel: { fontSize: 13, textAlign: 'center' },
  cardEmpty: { width: '30%', aspectRatio: 0.95, marginBottom: 18 },

  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 6, // Diminui altura da barra
    backgroundColor: Colors['light'].background,
    marginBottom: 0,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  navBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64, // Botão maior
    height: 56, // Botão maior
  },
  navBtnCenter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 2,
  },
  navIcon: { width: 48, height: 48 }, // Ícone maior
  navIconCenter: { width: 58, height: 58 }, // Ícone central maior
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
});
