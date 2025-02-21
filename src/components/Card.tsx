import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

interface CardProps {
  imageSource: any; // Aceita tanto URI quanto require para imagens locais
  title: string;
  description: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ imageSource, title, description }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  // Carregar as fontes
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Mantém a tela de splash visível enquanto as fontes são carregadas
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Quando as fontes estiverem carregadas, marca o app como pronto
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      // Esconde a tela de splash quando as fontes estiverem carregadas e o app estiver pronto
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null; // Retorna null enquanto as fontes não estiverem carregadas
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onLayout={onLayoutRootView}>
      {/* Imagem */}
      <Image source={imageSource} style={styles.img} />
      {/* Conteúdo textual */}
      <View style={styles.textBox}>
        <View style={styles.textContent}>
          {/* Título e tempo */}
          <Text style={styles.h1}>{title}</Text>
        </View>
        {/* Descrição */}
        <Text style={styles.p}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Estilos
const styles = StyleSheet.create({
  card: {
    width: "70%",
    maxWidth: "100%",
    height: 100,
    backgroundColor: "rgba(53, 53, 53, 0.5)",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 0, // Espaçamento entre os cards
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 1,
    backgroundColor: "#222",
  },
  textBox: {
    flex: 1,
    marginLeft: 10,
  },
  textContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  h1: {
    fontSize: 16,

    color: "#fff",
    fontFamily: "Poppins_700Bold", // Usando a fonte Poppins Bold
  },
  p: {
    fontSize: 11,

    color: "#f1f1f1",
    fontFamily: "Poppins_400Regular", // Usando a fonte Poppins Regular
  },
});

export default Card;
