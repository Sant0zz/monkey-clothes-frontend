import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useColorScheme } from '../../constants/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';

// Imagens PNG necessárias
;
import MonkeyLogo from '../../assets/images/MonkeyLogo.png';
import ImgPlaceholder from '../../assets/images/img.png';

export default function AdicionarProduto() {
  // Hooks de tema, navegação e estados do formulário
  const theme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const router = useRouter();

  // Estados dos campos do formulário de produto
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [codigoProduto, setCodigoProduto] = useState('');
  const [valor, setValor] = useState('');
  const [desconto, setDesconto] = useState('');
  const [qtdEstoque, setQtdEstoque] = useState('');
  const [tamanho, setTamanho] = useState('GG');
  const [cor, setCor] = useState('RED');
  const [imagemUri, setImagemUri] = useState<string | null>(null);

  // Função para selecionar imagem da galeria
  async function handlePickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagemUri(result.assets[0].uri);
    }
  }

  return (
    // Estrutura principal da tela
    <View style={styles.fullScreen}>
      <StatusBar style="dark" />

      {/* Botão de voltar para navegação */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>voltar</Text>
      </TouchableOpacity>

      {/* Cabeçalho com título e perfil do usuário */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>ADICIONAR{`\n`}PRODUTO</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>Olá, Adm.</Text>
          <Image source={MonkeyLogo} style={styles.profileAvatar} />
        </View>
      </View>

      {/* Destaque para início do formulário */}
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Informações do produto:</Text>
      </View>

      {/* Formulário de cadastro do produto */}
      <View style={styles.formContainer}>
        {/* Campos de texto e inputs para dados do produto */}
        <Text style={styles.label}>NOME:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>DESCRIÇÃO:</Text>
        <TextInput
          style={styles.inputMultiline}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={descricao}
          onChangeText={setDescricao}
        />
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.labelSmall}>CATEGORIA:</Text>
            <TextInput
              style={styles.inputSmall}
              value={categoria}
              onChangeText={setCategoria}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.labelSmall}>CÓDIGO DO PRODUTO:</Text>
            <TextInput
              style={styles.inputSmall}
              value={codigoProduto}
              onChangeText={setCodigoProduto}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.thirdWidth}>
            <Text style={styles.labelSmall}>IMAGEM:</Text>
            {/* Upload e preview de imagem */}
            <TouchableOpacity style={styles.imageInputWrapper} onPress={handlePickImage} activeOpacity={0.7}>
              {imagemUri ? (
                <Image source={{ uri: imagemUri }} style={styles.selectedImage} />
              ) : (
                <Image source={ImgPlaceholder} style={styles.iconSmall} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.thirdWidth}>
            <Text style={styles.labelSmall}>VALOR:</Text>
            <TextInput
              style={styles.inputSmall}
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />
          </View>
          <View style={styles.thirdWidth}>
            <Text style={styles.labelSmall}>DESCONTO:</Text>
            <TextInput
              style={styles.inputSmall}
              keyboardType="numeric"
              value={desconto}
              onChangeText={setDesconto}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.thirdWidth}>
            <Text style={styles.labelSmall}>QTD / ESTOQUE:</Text>
            <TextInput
              style={styles.inputSmall}
              keyboardType="numeric"
              value={qtdEstoque}
              onChangeText={setQtdEstoque}
            />
          </View>
          <View style={styles.thirdWidth}>
            <Text style={styles.labelSmall}>TAMANHO:</Text>
            {/* Seleção de tamanho */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tamanho}
                onValueChange={(itemValue: string) => setTamanho(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="PP" value="PP" />
                <Picker.Item label="P" value="P" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="G" value="G" />
                <Picker.Item label="GG" value="GG" />
              </Picker>
            </View>
          </View>
          <View style={styles.thirdWidth}>
            <Text style={styles.labelSmall}>COR:</Text>
            <TextInput
              style={styles.inputSmall}
              value={cor}
              onChangeText={setCor}
              autoCapitalize="characters"
            />
          </View>
        </View>
      </View>
      {/* Botão para enviar o formulário */}
      <TouchableOpacity
        style={styles.submitButton}
        activeOpacity={0.7}
        onPress={() => {
          // handle submission (API, validações, etc.)
        }}
      >
        <Text style={styles.submitText}>ENVIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos gerais da tela
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingTop: Platform.select({ ios: 10, default: 10 }),
    paddingHorizontal: 0,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.select({ ios: 10, default: 10 }),
    left: 10,
    zIndex: 10,
    paddingVertical: 0,
    paddingHorizontal: 2,
    minWidth: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    textTransform: 'lowercase',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#CCC',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
    marginTop: 26,
    marginBottom: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B6B6B',
    textAlign: 'left',
    lineHeight: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    marginRight: 8,
    fontSize: 16,
    color: '#6B6B6B',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  badgeContainer: {
    backgroundColor: '#2196F3',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
    marginLeft: 16,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
    alignSelf: 'flex-start',
  },
  labelSmall: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#E0E0E0',
    color: '#000',
  },
  inputMultiline: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#357ABD',
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#E0E0E0',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  thirdWidth: {
    width: '32%',
    minWidth: 80,
    maxWidth: 120,
  },
  inputSmall: {
    width: '100%',
    height: 40,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#E0E0E0',
    color: '#000',
  },
  imageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  imgText: {
    color: '#FFF',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 14,
  },
  pickerContainer: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    borderWidth: 0,
  },
  picker: {
    height: 40,
    width: '100%',
    color: '#000',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  submitButton: {
    width: '90%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Platform.select({ ios: 20, default: 12 }),
    backgroundColor: '#00C853',
    alignSelf: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  iconSmall: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  selectedImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
