import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BellRinging, Bookmark, MagnifyingGlass, SlidersHorizontal, Star } from "phosphor-react-native";

const categories = [
  { title: "Blusas", image: require("../../assets/images/blusas.png") },
  { title: "Tênis", image: require("../../assets/images/tenis.png") },
  { title: "Moletom", image: require("../../assets/images/moletom.png") },
  { title: "Calças", image: require("../../assets/images/calcas.png") },
];

export default function Index() {
  return (
    <ScrollView style={estilos.containerPrincipal} contentContainerStyle={{ paddingBottom: 100 }}>
      <StatusBar style="auto" />

      <View style={estilos.cabecalho}>
        <View style={estilos.cabecalhoEsquerda}>
          <Image source={require("../../assets/images/logo.png")} style={estilos.logoMarca} />
          <Text style={estilos.textoCabecalhoEsquerda}>Monkeys clothes</Text>
        </View>
        <View style={estilos.cabecalhoDireita}>
          <TouchableOpacity style={estilos.containerIcone} activeOpacity={0.7}>
            <BellRinging size={30} color="#8DD8FF" weight="duotone" />
            <View style={estilos.indicadorNotificacao}>
              <Text style={estilos.textoIndicador}>0</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.containerIcone} activeOpacity={0.7}>
            <Bookmark size={30} color="#8DD8FF" weight="duotone" />
            <View style={estilos.indicadorNotificacao}>
              <Text style={estilos.textoIndicador}>0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={estilos.saudacaoUsuario}>Olá, Rodrigo Faro</Text>

      <View style={estilos.containerInput}>
        <MagnifyingGlass size={28} color="#8DD8FF" weight="duotone" />
        <TextInput
          placeholder="O que você está procurando?"
          placeholderTextColor="#757575"
          style={estilos.campoInput}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={estilos.botaoFiltro}>
          <SlidersHorizontal size={24} color="#8DD8FF" weight="duotone" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={estilos.botaoMeio} activeOpacity={0.7} onPress={() => alert("Botão pressionado!")}>
        <Image source={require("../../assets/images/botaomeio.png")} style={estilos.imagemBotaoMeio} />
      </TouchableOpacity>

      {/* Título + Categorias */}
      <View style={estilos.wrapperCategorias}>
        <Text style={estilos.tituloCategorias}>Navegar por categorias</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={estilos.containerCategorias}
          contentContainerStyle={{ paddingLeft: 20 }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity key={index} style={estilos.cartaoCategoria} activeOpacity={0.8}>
              <Image source={item.image} style={estilos.imagemCategoria} resizeMode="contain" />
              <Text style={estilos.textoCategoria}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={estilos.tituloSecao}>Catálogo:</Text>

      <View style={estilos.containerProdutos}>
        <View style={estilos.cartaoProduto}>
          <Pressable style={estilos.botaoCartao}>
            <Image style={estilos.imagemCartao} source={require("../../assets/images/ducks.png")} />
            <View style={estilos.infoCartao}>
              <View style={estilos.cabecalhoCartao}>
                <Text style={estilos.tituloInfoCartao}>NHL Ducks Home Jersey</Text>
              </View>

              <Text style={estilos.subtituloInfoCartao}>
                Camisa oficial Anaheim Ducks {"\n"}design vibrante e masculino.
              </Text>

              <View style={estilos.rodapeCartao}>
                <Text style={estilos.precoInfoCartao}>VALOR: R$ 249,90</Text>

                <View style={estilos.containerAvaliacaoFavorito}>
                  <View style={estilos.containerAvaliacao}>
                    <Star size={18} color="#FFD700" weight="fill" />
                    <Text style={estilos.textoAvaliacao}>0.0</Text>
                  </View>

                  <TouchableOpacity style={estilos.iconeFavorito} activeOpacity={0.7}>
                    <Bookmark size={20} color="#8DD8FF" weight="duotone" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cabecalhoEsquerda: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoMarca: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  textoCabecalhoEsquerda: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
    fontWeight: "bold",
  },
  cabecalhoDireita: {
    flexDirection: "row",
  },
  containerIcone: {
    position: "relative",
    marginLeft: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 12,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  indicadorNotificacao: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textoIndicador: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  saudacaoUsuario: {
    paddingTop: 30,
    paddingBottom: 30,
    color: "#333",
    fontSize: 25,
    fontWeight: "800",
    textDecorationLine: "underline",
    textDecorationColor: "#8DD8FF",
  },

  containerInput: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFF8F8",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
  campoInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 0,
  },
  botaoFiltro: {
    backgroundColor: "#F2F2F2",
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoMeio: {
    alignSelf: "center",
    marginVertical: 20,
    width: 300,
    height: 340,
    justifyContent: "center",
    alignItems: "center",
  },
  imagemBotaoMeio: {
    width: 370,
    height: 370,
    resizeMode: "contain",
  },

  wrapperCategorias: {
    height: 150,
    justifyContent: "center",
    marginTop: -60,
  },
  tituloCategorias: {
    fontSize: 17,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },

  containerCategorias: {
    height: 120,
    marginBottom: 10,
  },
  cartaoCategoria: {
    width: 70,
    height: 90,
    backgroundColor: "#F3F3F3",
    borderRadius: 16,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imagemCategoria: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  textoCategoria: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
  },

  containerProdutos: {
    width: "100%",
    marginTop: 20,
  },
  cartaoProduto: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  botaoCartao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  imagemCartao: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  infoCartao: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  cabecalhoCartao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tituloInfoCartao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  precoInfoCartao: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E8B57",
  },
  subtituloInfoCartao: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  rodapeCartao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  containerAvaliacaoFavorito: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerAvaliacao: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoAvaliacao: {
    fontSize: 13,
    color: "#444",
    marginLeft: 4,
  },
  iconeFavorito: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    marginLeft: 8,
  },

  tituloSecao: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
});

