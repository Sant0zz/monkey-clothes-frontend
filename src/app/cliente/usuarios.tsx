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
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BotaoVoltar from '../../components/BotaoVoltar';

const { width } = Dimensions.get('window');

const dadosExemploUsuarios = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    info: 'joao.silva@example.com',
    telefone: '81912345678',
    endereco: 'Rua das Flores, 123',
    statusInicial: 'Ativo',
    ultimaCompra: new Date('2025-05-20T10:00:00Z'),
    avatar: require('../../../assets/images/logo.png'),
  },
  {
    id: '2',
    nome: 'Maria Souza',
    email: 'maria.souza@example.com',
    info: 'Gerente de Vendas',
    telefone: '81998765432',
    endereco: 'Av. Principal, 456',
    statusInicial: 'Inativo',
    ultimaCompra: new Date('2025-04-01T15:30:00Z'),
    avatar: require('../../../assets/images/logo.png'),
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    email: 'carlos.o@example.com',
    info: 'carlos.o@example.com',
    telefone: '81987651234',
    endereco: 'Travessa da Paz, 789',
    statusInicial: 'Pendente',
    ultimaCompra: new Date('2025-05-25T08:00:00Z'),
    avatar: require('../../../assets/images/logo.png'),
  },
  {
    id: '4',
    nome: 'Ana Costa',
    email: 'ana.costa@example.com',
    info: 'Analista de Marketing',
    telefone: '81911223344',
    endereco: 'Rua do Sol, 10',
    statusInicial: 'Ativo',
    ultimaCompra: new Date('2025-03-10T11:00:00Z'),
    avatar: require('../../../assets/images/logo.png'),
  },
  {
    id: '5',
    nome: 'Pedro Santos',
    email: 'pedro.santos@example.com',
    info: 'pedro.santos@example.com',
    telefone: '81955443322',
    endereco: 'Praça Central, 5',
    statusInicial: 'Inativo',
    ultimaCompra: new Date('2025-05-01T09:00:00Z'),
    avatar: require('../../../assets/images/logo.png'),
  },
  {
    id: '6',
    nome: 'Mariana Lima',
    email: 'mariana.lima@example.com',
    info: 'Suporte ao Cliente',
    telefone: '81977665544',
    endereco: 'Alameda das Acácias, 20',
    statusInicial: 'Ativo',
    ultimaCompra: new Date('2025-05-30T14:00:00Z'),
    avatar: require('../../../assets/images/logo.png'),
  },
];

type Usuario = typeof dadosExemploUsuarios[0];

const calcularStatusAtividade = (ultimaCompra: Date): 'Ativo' | 'Inativo' => {
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

  if (ultimaCompra >= trintaDiasAtras) {
    return 'Ativo';
  } else {
    return 'Inativo';
  }
};

const TelaUsuarios = () => {
  const navegador = useRouter();
  const [textoBusca, setTextoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'Todos' | 'Ativo' | 'Pendente' | 'Inativo'>('Todos');

  const [modalVisivel, setModalVisivel] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const abrirModalDetalhes = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setModalVisivel(true);
  };

  const usuariosFiltrados = dadosExemploUsuarios.filter(usuario => {
    const correspondeBusca =
      usuario.nome.toLowerCase().includes(textoBusca.toLowerCase()) ||
      usuario.info.toLowerCase().includes(textoBusca.toLowerCase()) ||
      usuario.email.toLowerCase().includes(textoBusca.toLowerCase());

    const correspondeStatusInicial =
      filtroStatus === 'Todos' || usuario.statusInicial === filtroStatus;

    return correspondeBusca && correspondeStatusInicial;
  });

  const renderizarItemUsuario = ({ item }: { item: Usuario }) => (
    <View style={estilos.itemUsuario}>
      <Image source={item.avatar} style={estilos.avatarUsuario} />
      <View style={estilos.detalhesUsuario}>
        <Text style={estilos.nomeUsuario}>{item.nome}</Text>
        <Text style={estilos.infoUsuario}>{item.info}</Text>
      </View>
      <TouchableOpacity style={estilos.botaoOpcoes} onPress={() => abrirModalDetalhes(item)}>
        <Ionicons name="ellipsis-vertical" size={24} color="#8E8E93" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={estilos.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={estilos.header}>
        <View style={estilos.headerProfile}>
          <Text style={estilos.profileText}>Olá, Adm.</Text>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={estilos.avatarAdm}
          />
        </View>
        {/* Botão Voltar */}
        <BotaoVoltar onPress={() => navegador.back()} />
      </View>

      <Text style={estilos.tituloPrincipal}>USUÁRIOS</Text>

      <View style={estilos.container}>
        <View style={estilos.containerFiltros}>
          {['Todos', 'Ativo', 'Pendente', 'Inativo'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                estilos.botaoFiltro,
                filtroStatus === status && estilos.botaoFiltroAtivo,
              ]}
              onPress={() => setFiltroStatus(status as typeof filtroStatus)}
            >
              <Text
                style={[
                  estilos.textoFiltro,
                  filtroStatus === status && estilos.textoFiltroAtivo,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={estilos.containerBusca}>
          <Ionicons name="search" size={20} color="#8E8E93" style={estilos.iconeBusca} />
          <TextInput
            style={estilos.campoBusca}
            placeholder="Pesquisar usuário"
            placeholderTextColor="#8E8E93"
            value={textoBusca}
            onChangeText={setTextoBusca}
          />
        </View>

        <FlatList
          data={usuariosFiltrados}
          renderItem={renderizarItemUsuario}
          keyExtractor={(item) => item.id}
          contentContainerStyle={estilos.listaContainer}
          ListEmptyComponent={() => (
            <Text style={estilos.textoNenhumResultado}>Nenhum usuário encontrado.</Text>
          )}
        />

        {usuarioSelecionado && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={() => setModalVisivel(false)}
          >
            <Pressable style={estilos.overlayModal} onPress={() => setModalVisivel(false)}>
              <View style={estilos.conteudoModal} onStartShouldSetResponder={() => true}>
                <Image source={usuarioSelecionado.avatar} style={estilos.avatarModal} />
                <Text style={estilos.nomeModal}>{usuarioSelecionado.nome}</Text>
                <Text style={estilos.tituloSecaoModal}>Informações de Contato</Text>
                <Text style={estilos.textoModal}>Email: {usuarioSelecionado.email}</Text>
                <Text style={estilos.textoModal}>Telefone: {usuarioSelecionado.telefone}</Text>
                <Text style={estilos.textoModal}>Endereço: {usuarioSelecionado.endereco}</Text>

                <Text style={estilos.tituloSecaoModal}>Status de Atividade</Text>
                <Text style={estilos.textoModal}>
                  Última compra: {usuarioSelecionado.ultimaCompra.toLocaleDateString('pt-BR')}
                </Text>
                <Text style={estilos.textoModal}>
                  Atividade:{' '}
                  <Text
                    style={
                      calcularStatusAtividade(usuarioSelecionado.ultimaCompra) === 'Ativo'
                        ? estilos.statusAtivoTexto
                        : estilos.statusInativoTexto
                    }
                  >
                    {calcularStatusAtividade(usuarioSelecionado.ultimaCompra)}
                  </Text>
                </Text>

                <TouchableOpacity
                  style={estilos.botaoFecharModal}
                  onPress={() => setModalVisivel(false)}
                >
                  <Text style={estilos.textoBotaoFecharModal}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: 20 },
  headerProfile: { flexDirection: 'row', alignItems: 'center' },
  profileText: { color: '#8A8A8E', marginRight: 8 },
  avatarAdm: { width: 36, height: 36, borderRadius: 18 },
  tituloPrincipal: { fontSize: 34, fontWeight: 'bold', color: '#D1D1D6', marginTop: 20, marginLeft: 25, marginBottom: 10 },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  containerFiltros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EFEFF4',
    borderRadius: 10,
    marginVertical: 15,
    padding: 3,
  },
  botaoFiltro: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textoFiltro: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
  },
  textoFiltroAtivo: {
    color: '#000',
    fontWeight: '600',
  },
  containerBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E9EB',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  iconeBusca: { marginRight: 8 },
  campoBusca: {
    flex: 1,
    height: 40,
    fontSize: 17,
    color: '#000',
  },
  listaContainer: {
    paddingBottom: 80,
  },
  itemUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarUsuario: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#E9E9EB',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
  },
  detalhesUsuario: {
    flex: 1,
  },
  nomeUsuario: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  infoUsuario: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  botaoOpcoes: {
    padding: 5,
  },
  textoNenhumResultado: {
    textAlign: 'center',
    marginTop: 50,
    color: '#8E8E93',
    fontSize: 16,
  },
  overlayModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  conteudoModal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%',
  },
  avatarModal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
  },
  nomeModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  tituloSecaoModal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFEF',
    paddingBottom: 5,
  },
  textoModal: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    width: '100%',
    textAlign: 'left',
  },
  statusAtivoTexto: {
    color: '#34C759',
    fontWeight: 'bold',
  },
  statusInativoTexto: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  botaoFecharModal: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  textoBotaoFecharModal: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default TelaUsuarios;