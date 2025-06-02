

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Modal,
  Pressable, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const pedidosExemplo = [
  {
    id: '00001',
    nomeProduto: 'Kit Camiseta Básica + Calça Jeans',
    cliente: {
      nome: 'Usuário Fictício',
      endereco: 'Rua Fictícia',
      numero: '00',
      cep: '0000-000',
      telefone: '81995371049',
      email: 'usuario@gmail.com',
    },
    pagamento: {
      forma: 'PIX',
      status: 'PAGO',
    },
    entrega: {
      status: 'Aguardando envio.',
    },
  },
];


type Pedido = typeof pedidosExemplo[0];

const TelaPedidos = () => {
  const navegador = useRouter();


  const [modalVisivel, setModalVisivel] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);

  
  const abrirModal = (pedido: Pedido) => {
    setPedidoSelecionado(pedido);
    setModalVisivel(true);
  };

  
  const renderizarItemPedido = ({ item }: { item: Pedido }) => (
    <TouchableOpacity onPress={() => abrirModal(item)}>
      <View style={estilos.itemPedido}>
        <Text style={estilos.textoItemPedido}>
          ID:{item.id} - {item.nomeProduto}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.container}>
        <StatusBar barStyle="dark-content" />

        <View style={estilos.cabecalho}>
          <TouchableOpacity onPress={() => navegador.back()} style={estilos.botaoVoltar}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={estilos.textoBotaoVoltar}>voltar</Text>
          </TouchableOpacity>
          <View style={estilos.perfilCabecalho}>
            <Text style={estilos.textoPerfil}>Olá, Adm.</Text>
            <Image
              source={require('../../assets/images/logo.png')}
              style={estilos.avatar}
            />
          </View>
        </View>

        <Text style={estilos.titulo}>PEDIDOS</Text>

        <View style={estilos.containerBusca}>
          <Ionicons name="search" size={20} color="#8E8E93" style={estilos.iconeBusca} />
          <TextInput
            style={estilos.campoBusca}
            placeholder="Buscar"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <FlatList
          data={pedidosExemplo}
          renderItem={renderizarItemPedido}
          keyExtractor={(item) => item.id}
          contentContainerStyle={estilos.containerLista}
        />

        
        {pedidoSelecionado && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={() => setModalVisivel(false)}
          >
            <Pressable style={estilos.overlayModal} onPress={() => setModalVisivel(false)}>
              <View style={estilos.visualizacaoModal} onStartShouldSetResponder={() => true}>
                <Text style={estilos.idModal}>ID: {pedidoSelecionado.id}</Text>

                <View style={estilos.secaoModal}>
                  <Text style={estilos.textoModal}>Nome: {pedidoSelecionado.cliente.nome}</Text>
                  <Text style={estilos.textoModal}>Endereço: {pedidoSelecionado.cliente.endereco}</Text>
                  <Text style={estilos.textoModal}>Número: {pedidoSelecionado.cliente.numero}</Text>
                  <Text style={estilos.textoModal}>CEP: {pedidoSelecionado.cliente.cep}</Text>
                  <Text style={estilos.textoModal}>Telefone: {pedidoSelecionado.cliente.telefone}</Text>
                  <Text style={estilos.textoModal}>Email: {pedidoSelecionado.cliente.email}</Text>
                </View>

                <View style={estilos.secaoModal}>
                  <Text style={estilos.tituloSecaoModal}>Situação do pedido</Text>
                  <Text style={estilos.textoModal}>
                    Forma de pagamento: <Text style={estilos.textoVerde}>{pedidoSelecionado.pagamento.forma}</Text>
                  </Text>
                  <Text style={estilos.textoModal}>
                    Confirmação de venda: <Text style={estilos.textoVerde}>{pedidoSelecionado.pagamento.status}</Text>
                  </Text>
                  <Text style={estilos.textoModal}>
                    Entrega: <Text style={estilos.textoLaranja}>{pedidoSelecionado.entrega.status}</Text>
                  </Text>
                </View>

                <TouchableOpacity style={estilos.botaoNFC}>
                  <Text style={estilos.textoBotaoNFC}>Imprimir-NFCe</Text>
                </TouchableOpacity>

                <View style={estilos.secaoModal}>
                  <Text style={estilos.tituloSecaoModal}>Mensagem automática</Text>
                  <TouchableOpacity style={estilos.botaoWhatsapp}>
                    <Ionicons name="logo-whatsapp" size={32} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};


const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, paddingHorizontal: 20 },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  botaoVoltar: { flexDirection: 'row', alignItems: 'center' },
  textoBotaoVoltar: { color: '#007AFF', fontSize: 17 },
  perfilCabecalho: { flexDirection: 'row', alignItems: 'center' },
  textoPerfil: { color: '#8A8A8E', marginRight: 8 },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  titulo: { fontSize: 34, fontWeight: 'bold', color: '#D1D1D6', marginTop: 20, marginLeft: 5 },
  containerBusca: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E9E9EB', borderRadius: 10, paddingHorizontal: 10, marginTop: 15, marginBottom: 15 },
  iconeBusca: { marginRight: 8 },
  campoBusca: { flex: 1, height: 40, fontSize: 17, color: '#000' },
  containerLista: { paddingBottom: 20 },
  itemPedido: { backgroundColor: '#E9E9EB', padding: 20, borderRadius: 12, marginBottom: 10 },
  textoItemPedido: { fontSize: 16, color: '#333' },

 
  overlayModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  visualizacaoModal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  idModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
  },
  secaoModal: {
    width: '100%',
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 15,
  },
  tituloSecaoModal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  textoModal: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  textoVerde: {
    color: '#34C759', 
    fontWeight: 'bold',
  },
  textoLaranja: {
    color: '#FF9500', 
    fontWeight: 'bold',
  },
  botaoNFC: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2,
    marginBottom: 15,
  },
  textoBotaoNFC: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  botaoWhatsapp: {
    backgroundColor: '#25D366', 
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
  },
});

export default TelaPedidos;