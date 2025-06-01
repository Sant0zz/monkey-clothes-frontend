import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Linking,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Star,
  CreditCard,
  Barcode,
  Money,
} from "phosphor-react-native";

export default function TelaProduto() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState("Cartão");
  const [quantidade, setQuantidade] = useState(1);
  const [parcelas, setParcelas] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("P");
  const precoUnitario = 249.90;

  const formasPagamento = [
    { nome: "Cartão", icon: <CreditCard size={24} color="#333" /> },
    { nome: "PIX", icon: <Barcode size={24} color="#333" /> },
    { nome: "Espécie", icon: <Money size={24} color="#333" /> },
  ];

  const valorTotal = precoUnitario * quantidade;
  const valorParcela = (valorTotal / parcelas).toFixed(2);

  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  // Para botões de parcelas, máximo 12
  const maxParcelas = 12;

  return (
    <View style={estilos.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={estilos.cabecalho}>
          <TouchableOpacity style={estilos.botaoVoltar}>
            <Text style={estilos.textoVoltar}>voltar</Text>
          </TouchableOpacity>
          <View style={estilos.saudacao}>
            <Text style={estilos.textoOla}>Olá, Rodrigo Faro.</Text>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={estilos.avatar}
            />
          </View>
        </View>

        <Image
          source={require("../../assets/images/camiseta.png")}
          style={estilos.imagemProduto}
          resizeMode="contain"
        />

        <View style={estilos.cartao}>
          <View style={estilos.linhaAvaliacao}>
            <Star weight="fill" color="#FFC107" size={20} />
            <Text style={estilos.textoNota}>4,8</Text>
            <Text style={estilos.textoAvaliacoes}> 10+ Avaliações · ver</Text>
          </View>

          <Text style={estilos.titulo}>NHL Ducks Home Jersey.</Text>
          <Text style={estilos.subtitulo}>
            Camisa oficial Anaheim Ducks {"\n"}design vibrante e masculino. - LARANJA/PRETO
          </Text>

          {/* Seletor de Tamanho */}
          <View style={estilos.containerPicker}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>Tamanhos:</Text>
            {isMobile ? (
              <View style={estilos.containerTamanhos}>
                {["P", "M", "G", "GG"].map((tam) => (
                  <TouchableOpacity
                    key={tam}
                    style={[
                      estilos.botaoTamanho,
                      tamanhoSelecionado === tam && estilos.botaoTamanhoSelecionado,
                    ]}
                    onPress={() => setTamanhoSelecionado(tam)}
                  >
                    <Text
                      style={[
                        estilos.textoTamanho,
                        tamanhoSelecionado === tam && estilos.textoTamanhoSelecionado,
                      ]}
                    >
                      {tam}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={estilos.pickerWrapper}>
                <Picker
                  selectedValue={tamanhoSelecionado}
                  style={estilos.picker}
                  onValueChange={(itemValue) => setTamanhoSelecionado(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item label="P" value="P" />
                  <Picker.Item label="M" value="M" />
                  <Picker.Item label="G" value="G" />
                  <Picker.Item label="GG" value="GG" />
                </Picker>
              </View>
            )}
          </View>

          <Text style={estilos.preco}>
            R$ {precoUnitario.toFixed(2)} <Text style={estilos.desconto}>Economize 16%</Text>
          </Text>
          <Text style={estilos.precoAntigo}>
            Valor normal: <Text style={{ textDecorationLine: "line-through" }}>R$ 297,50</Text>
          </Text>
          <Text style={estilos.parcelas}>ou em até 12x de R$ 20,83</Text>

          <TouchableOpacity
            style={[estilos.botaoComprar, { backgroundColor: "#007AFF" }]}
            onPress={() => setModalVisivel(true)}
          >
            <Text style={[estilos.textoBotaoComprar, { fontWeight: "bold" }]}>COMPRAR AGORA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisivel(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisivel(false)}>
          <View style={estilos.modalFundo}>
            <View style={estilos.modalContainer}>
              <Text style={[estilos.tituloModal, estilos.tituloModalVerde]}>
                Confirmar pedido
              </Text>

              <Text style={estilos.textoModal}>
                Ao fazer o pedido você concorda com as{" "}
                <Text
                  style={estilos.link}
                  onPress={() => Linking.openURL("https://monkey-clothes.com/terms")}
                >
                  Condições da Monkey-clothes
                </Text>
              </Text>

              <View style={estilos.linha}>
                <Text>Itens:</Text>
                <Text>R$ {valorTotal.toFixed(2)}</Text>
              </View>
              <View style={estilos.linha}>
                <Text>Frete e manuseio:</Text>
                <Text>R$ 0,00</Text>
              </View>
              <View style={[estilos.linha, { marginTop: 8 }]}>
                <Text style={{ fontWeight: "bold" }}>Total do Pedido:</Text>
                <Text style={{ fontWeight: "bold" }}>R$ {valorTotal.toFixed(2)}</Text>
              </View>

              {/* Mostrar opções de parcelas só para cartão */}
              {pagamentoSelecionado === "Cartão" && (
                <>
                  <Text style={{ marginTop: 16, fontWeight: "bold" }}>
                    Escolha o número de parcelas:
                  </Text>
                  <View style={estilos.containerParcelas}>
                    {Array.from({ length: maxParcelas }, (_, i) => i + 1).map((num) => (
                      <TouchableOpacity
                        key={num}
                        style={[
                          estilos.botaoParcela,
                          parcelas === num && estilos.botaoParcelaSelecionado,
                        ]}
                        onPress={() => setParcelas(num)}
                      >
                        <Text
                          style={[
                            estilos.textoParcela,
                            parcelas === num && estilos.textoParcelaSelecionado,
                          ]}
                        >
                          {num}x
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={{ marginTop: 10 }}>
                    Em {parcelas}x de R$ {valorParcela} sem juros
                  </Text>
                </>
              )}

              <Text style={{ fontWeight: "bold", marginTop: 16 }}>Formas de pagamento:</Text>
              {formasPagamento.map((forma, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    estilos.opcaoPagamento,
                    pagamentoSelecionado === forma.nome && estilos.opcaoSelecionada,
                  ]}
                  onPress={() => {
                    setPagamentoSelecionado(forma.nome);
                    if (forma.nome !== "Cartão") setParcelas(1);
                  }}
                >
                  {forma.icon}
                  <Text style={estilos.nomePagamento}>{forma.nome}</Text>
                </TouchableOpacity>
              ))}

              <Text style={[estilos.pagamentoTexto, { marginTop: 12 }]}>
                Forma selecionada: <Text style={{ fontWeight: "bold" }}>{pagamentoSelecionado}</Text>
              </Text>

              <View style={estilos.produtoResumo}>
                <Image
                  source={require("../../assets/images/camiseta.png")}
                  style={estilos.imagemProdutoResumo}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>NHL Ducks Home Jersey</Text>
                  <Text>por Monkey Clothes</Text>
                  <Text style={{ fontWeight: "bold", marginTop: 4 }}>R$ {precoUnitario.toFixed(2)}</Text>
                  <Text>Enviado por Monkey Clothes Brasil</Text>
                  <Text>Vendido por <Text style={estilos.link}>Monkey Clothes</Text></Text>
                  <Text style={{ marginTop: 8 }}>Quantidade:</Text>
                  <View style={estilos.seletorQuantidade}>
                    <TouchableOpacity
                      onPress={() => setQuantidade(q => Math.max(1, q - 1))}
                      style={estilos.botaoQuantidade}
                    >
                      <Text style={estilos.textoBotaoQuantidade}>-</Text>
                    </TouchableOpacity>
                    <Text style={estilos.textoQuantidade}>{quantidade}</Text>
                    <TouchableOpacity
                      onPress={() => setQuantidade(q => Math.min(10, q + 1))}
                      style={estilos.botaoQuantidade}
                    >
                      <Text style={estilos.textoBotaoQuantidade}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[estilos.botaoComprar, { marginTop: 20, backgroundColor: "#00E676" }]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={estilos.textoBotaoComprar}>Confirmar pedido!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5F0FF" },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 50,
  },
  botaoVoltar: {
    backgroundColor: "#D0E8FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  textoVoltar: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  saudacao: { flexDirection: "row", alignItems: "center" },
  textoOla: { marginRight: 8, textDecorationLine: "underline" },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  imagemProduto: {
    width: "100%",
    height: 300,
    marginTop: 20,
    marginBottom: 30,
  },
  cartao: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  linhaAvaliacao: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  textoNota: { fontWeight: "bold", marginLeft: 4 },
  textoAvaliacoes: { color: "gray", marginLeft: 4 },
  titulo: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  subtitulo: { fontSize: 14, color: "gray", marginVertical: 4 },
  preco: { fontSize: 20, color: "#28A745", fontWeight: "bold", marginTop: 10 },
  desconto: { color: "#28A745", fontSize: 14 },
  precoAntigo: { fontSize: 14, color: "gray", marginTop: 4 },
  parcelas: { fontSize: 14, color: "gray", marginTop: 4 },
  botaoComprar: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  textoBotaoComprar: { color: "#FFF", fontSize: 18 },

  containerPicker: {
    marginTop: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 4,
    width: 100,
  },
  picker: {
    height: 40,
    width: "100%",
    color: "#333",
    backgroundColor: "#fff",
  },
  containerTamanhos: {
    flexDirection: "row",
    marginTop: 4,
  },
  botaoTamanho: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 8,
  },
  botaoTamanhoSelecionado: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  textoTamanho: {
    color: "#333",
    fontWeight: "bold",
  },
  textoTamanhoSelecionado: {
    color: "#fff",
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tituloModalVerde: {
    color: "#00E676",
  },
  textoModal: {
    fontSize: 14,
    marginBottom: 12,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  opcaoPagamento: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  opcaoSelecionada: {
    borderColor: "#007AFF",
    backgroundColor: "#D0E8FF",
  },
  nomePagamento: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  pagamentoTexto: {
    fontSize: 16,
  },
  produtoResumo: {
    flexDirection: "row",
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  imagemProdutoResumo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  seletorQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  botaoQuantidade: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  textoBotaoQuantidade: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  textoQuantidade: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerParcelas: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  botaoParcela: {
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  botaoParcelaSelecionado: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  textoParcela: {
    color: "#333",
  },
  textoParcelaSelecionado: {
    color: "#fff",
    fontWeight: "bold",
  },
});
