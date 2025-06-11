import { router } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const dadosPedido = {
  id: "LOJA202507001",
  dataPedido: "05/06/2025",
  entregaEstimada: "15/06/2025",
  historicoStatus: [
    { nome: "Pedido Realizado", dataStatus: "05/06/2025, 10:15", concluido: true, emoji: "🛍️" },
    { nome: "Pagamento Confirmado", dataStatus: "05/06/2025, 10:20", concluido: true, emoji: "💳" },
    { nome: "Separando Itens", dataStatus: "06/06/2025, 11:00", concluido: true, emoji: "👚" },
    { nome: "Pedido Enviado", dataStatus: "06/06/2025, 17:30", concluido: true, atual: true, emoji: "🚚" },
    { nome: "Em Trânsito para sua Cidade", dataStatus: null, concluido: false, emoji: "✈️" },
    { nome: "Saiu para Entrega", dataStatus: null, concluido: false, emoji: "💨" },
    { nome: "Entregue", dataStatus: null, concluido: false, emoji: "🎉" },
  ],
  itens: [
    { idItem: 1, nomeItem: "Camiseta Algodão Premium (M)", quantidade: 2, preco: "R$ 89,90" },
    { idItem: 2, nomeItem: "Calça Jeans Slim Fit (40)", quantidade: 1, preco: "R$ 179,90" },
    { idItem: 3, nomeItem: "Tênis Casual Urbano (41)", quantidade: 1, preco: "R$ 249,00" },
    { idItem: 4, nomeItem: "Meia Esportiva (Pacote com 3)", quantidade: 1, preco: "R$ 35,50" },
  ],
  enderecoEntrega: {
    rua: "Rua das Palmeiras, 452",
    complemento: "Casa 2",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    cep: "20000-000",
    destinatario: "Ana Pereira"
  },
  valorTotal: "R$ 644,20",
  metodoPagamento: "PIX",
};

// Componente auxiliar para exibir informações em linha
const LinhaInfo = ({ rotulo, valor, destacado = false }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{rotulo}</Text>
    <Text style={[styles.infoValue, destacado && styles.highlightValue]}>{valor}</Text>
  </View>
);

const TelaStatusPedido = ({ navigation }) => {
  // Encontra o status atual com base na propriedade 'atual' ou no último status 'concluido'
  const statusAtual = dadosPedido.historicoStatus.find(status => status.atual) ||
                      dadosPedido.historicoStatus.slice().reverse().find(status => status.concluido);
  
  const nomeStatusAtual = statusAtual ? statusAtual.nome : "Status Indisponível";
  const emojiStatusAtual = statusAtual ? statusAtual.emoji : "🤷";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFF4" />
      
      {/* --- Cabeçalho --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => router.back} 
          style={styles.backButton}
          accessibilityLabel="Voltar para a tela anterior" // Adicionado para acessibilidade
        >
          <Text style={styles.backButtonText}>&lt; voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>SITUAÇÃO DO PEDIDO</Text>
        </View>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* --- Conteúdo Principal Rolável --- */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* --- Card: Detalhes Principais --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📦 Detalhes Principais</Text>
          <LinhaInfo rotulo="ID do Pedido:" valor={dadosPedido.id} />
          <LinhaInfo rotulo="Data do Pedido:" valor={dadosPedido.dataPedido} />
          <LinhaInfo rotulo="Entrega Estimada:" valor={dadosPedido.entregaEstimada} destacado={true} />
          <LinhaInfo rotulo="Valor Total:" valor={dadosPedido.valorTotal} />
          <LinhaInfo rotulo="Forma de Pagamento:" valor={dadosPedido.metodoPagamento} />
        </View>

        {/* --- Card: Status Atual --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{emojiStatusAtual} Status Atual</Text>
          <Text style={styles.currentStatusText}>{nomeStatusAtual}</Text>
          {statusAtual && statusAtual.dataStatus && (
            <Text style={styles.currentStatusDate}>Atualizado em: {statusAtual.dataStatus}</Text>
          )}
        </View>

        {/* --- Card: Histórico de Status --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⏳ Histórico de Status</Text>
          {dadosPedido.historicoStatus.map((status, indice) => (
            <View key={indice} style={styles.statusStep}>
              <View style={styles.statusLineContainer}>
                <View style={[
                    styles.statusDot,
                    status.concluido && styles.completedDot,
                    status.atual && styles.currentDot,
                  ]}
                />
                {indice < dadosPedido.historicoStatus.length - 1 && (
                  <View style={[
                      styles.statusLine,
                      // Linha completa se o status atual ou o próximo status estiverem concluídos
                      (status.concluido || (status.atual && dadosPedido.historicoStatus[indice+1].concluido)) && styles.completedLine,
                    ]}
                  />
                )}
              </View>
              <View style={styles.statusInfo}>
                <Text style={[
                    styles.statusName,
                    status.concluido && styles.completedStatusName,
                    status.atual && styles.currentStatusNameHighlight,
                  ]}
                >
                  {status.emoji} {status.nome}
                </Text>
                {status.dataStatus && <Text style={styles.statusDateText}>{status.dataStatus}</Text>}
              </View>
            </View>
          ))}
        </View>

        {/* --- Card: Itens do Pedido --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👕 Itens do Pedido</Text>
          {dadosPedido.itens.map((item) => (
            <View key={item.idItem} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.quantidade}x {item.nomeItem}</Text>
              <Text style={styles.itemPrice}>{item.preco}</Text>
            </View>
          ))}
        </View>

        {/* --- Card: Endereço de Entrega --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏠 Endereço de Entrega</Text>
          <Text style={styles.addressText}>Destinatário: {dadosPedido.enderecoEntrega.destinatario}</Text>
          <Text style={styles.addressText}>{dadosPedido.enderecoEntrega.rua}</Text>
          {dadosPedido.enderecoEntrega.complemento && <Text style={styles.addressText}>{dadosPedido.enderecoEntrega.complemento}</Text>}
          <Text style={styles.addressText}>
            {dadosPedido.enderecoEntrega.cidade}, {dadosPedido.enderecoEntrega.estado} - CEP: {dadosPedido.enderecoEntrega.cep}
          </Text>
        </View>

        {/* --- Botão de Ação: Ajuda e Suporte --- */}
        <TouchableOpacity 
          style={styles.actionItem} 
          onPress={() => alert('Abrir Ajuda e Suporte para o pedido ' + dadosPedido.id)}
          accessibilityLabel={`Abrir ajuda e suporte para o pedido ${dadosPedido.id}`} // Adicionado para acessibilidade
        >
          <Text style={styles.actionItemText}>❔ Ajuda e Suporte</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#EFEFF4',
  },
  backButton: {
    padding: 10,
    minWidth: 70,
  },
  backButtonText: {
    fontSize: 17,
    color: '#007AFF',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    textTransform: 'uppercase',
  },
  headerRightPlaceholder: {
    minWidth: 70,
  },
  scrollViewContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 2,
  },
  infoLabel: {
    fontSize: 15,
    color: '#555',
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
  },
  highlightValue: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  currentStatusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  currentStatusDate: {
    fontSize: 13,
    color: '#666',
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  statusLineContainer: {
    alignItems: 'center',
    marginRight: 12,
    minHeight: 50, // Garante que a linha vertical tenha um tamanho mínimo
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#cccccc',
    zIndex: 1,
  },
  completedDot: {
    backgroundColor: '#28a745',
  },
  currentDot: {
    backgroundColor: '#007bff',
    transform: [{ scale: 1.3 }],
  },
  statusLine: {
    width: 2,
    flex: 1, // Permite que a linha se estenda conforme o conteúdo
    backgroundColor: '#cccccc',
    marginTop: 4,
    marginBottom: 4,
  },
  completedLine: {
    backgroundColor: '#28a745',
  },
  statusInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  statusName: {
    fontSize: 15,
    color: '#666',
  },
  completedStatusName: {
    color: '#333',
    fontWeight: '500',
  },
  currentStatusNameHighlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  statusDateText: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    fontSize: 15,
    color: '#333',
    flexShrink: 1, // Permite que o texto quebre linha se for muito longo
    paddingRight: 8,
  },
  itemPrice: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
  },
  addressText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
    lineHeight: 20,
  },
  actionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 8,
  },
  actionItemText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default TelaStatusPedido;