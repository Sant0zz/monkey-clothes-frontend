import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface BotaoVoltarProps {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  texto?: string;
}

export default function BotaoVoltar({
  onPress,
  style,
  textStyle,
  texto = "voltar",
}: BotaoVoltarProps) {
  return (
    <TouchableOpacity style={[styles.botaoVoltar, style]} onPress={onPress}>
      <Text style={[styles.textoVoltar, textStyle]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botaoVoltar: {
    backgroundColor: "#D0E8FF",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 0,
    minWidth: 70,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  textoVoltar: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
