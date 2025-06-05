import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

interface PropsPerfil {
  nomeUsuario: string;
  emailUsuario: string;
  urlFotoPerfil: string;
  aoVoltar?: () => void;
  aoIrParaStatusEntrega?: () => void;
}

const TelaPerfil: React.FC<PropsPerfil> = ({
  nomeUsuario,
  emailUsuario,
  urlFotoPerfil,
  aoVoltar,
  aoIrParaStatusEntrega, 
}) => {

  const voltar = () => {
    if (aoVoltar) {
      aoVoltar();
    } else {
      console.warn('Função aoVoltar não fornecida para o botão Voltar.');
    }
  };

  const irParaStatusEntrega = () => {
    if (aoIrParaStatusEntrega) {
      aoIrParaStatusEntrega();
    } else {
      console.warn('Função aoIrParaStatusEntrega não fornecida para o botão de status da entrega.');
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <TouchableOpacity onPress={voltar} style={estilos.botaoVoltar}>
        <Text style={estilos.textoBotaoVoltar}>{"< voltar"}</Text>
      </TouchableOpacity>

      <Text style={estilos.tituloPrincipal}>PERFIL</Text> 

      <ScrollView contentContainerStyle={estilos.conteudoScroll}>
        <View style={estilos.cabecalho}>
          <Image
            source={{ uri: urlFotoPerfil }}
            style={estilos.imagemPerfil}
          />
          <Text style={estilos.nomeUsuario}>{nomeUsuario}</Text>
          <Text style={estilos.emailUsuario}>{emailUsuario}</Text>
        </View>

        <View style={estilos.containerOpcoes}>
          <TouchableOpacity style={estilos.botaoOpcao}>
            <FontAwesome name="user-circle" size={20} color="#666" style={estilos.iconeOpcao} />
            <Text style={estilos.textoOpcao}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoOpcao} onPress={irParaStatusEntrega}>
            <FontAwesome name="truck" size={20} color="#666" style={estilos.iconeOpcao} />
            <Text style={estilos.textoOpcao}>Status da Entrega</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoOpcao}>
            <FontAwesome name="cog" size={20} color="#666" style={estilos.iconeOpcao} />
            <Text style={estilos.textoOpcao}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoOpcao}>
            <FontAwesome name="bell" size={20} color="#666" style={estilos.iconeOpcao} />
            <Text style={estilos.textoOpcao}>Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoOpcao}>
            <FontAwesome name="question-circle" size={20} color="#666" style={estilos.iconeOpcao} />
            <Text style={estilos.textoOpcao}>Ajuda e Suporte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[estilos.botaoOpcao, estilos.botaoSair]}>
            <FontAwesome name="sign-out" size={20} color="#E74C3C" style={estilos.iconeOpcao} />
            <Text style={[estilos.textoOpcao, estilos.textoSair]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  botaoVoltar: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 1,
    padding: 10,
  },
  textoBotaoVoltar: {
    fontSize: 17,
    color: '#007AFF',
  },
  tituloPrincipal: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#DEDEDE',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20, 
  },
  conteudoScroll: {
    alignItems: 'center',
    paddingVertical: 0, 
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagemPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007AFF', 
  },
  nomeUsuario: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emailUsuario: {
    fontSize: 16,
    color: '#666',
  },
  containerOpcoes: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  botaoOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconeOpcao: {
    marginRight: 15,
    width: 20,
    textAlign: 'center',
  },
  textoOpcao: {
    fontSize: 18,
    color: '#333',
  },
  botaoSair: {
    borderBottomWidth: 0, 
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textoSair: {
    color: '#E74C3C', 
    fontWeight: 'bold',
  },
});

export default TelaPerfil;