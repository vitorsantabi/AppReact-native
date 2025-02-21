import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import albumImage from "../../../assets/albuns/album1.png";
import bgImg from "@/assets/Eras/1/bgf.webp";
import Galeria from "@/components/Galeria";
import InfoCard from "@/components/infocard";
import BarInfo from "@/components/barinfo";
import SingleCard from "@/components/singles";

const { width } = Dimensions.get("window");

export default function Album1() {
  const [appIsReady, setAppIsReady] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current; // Para rastrear a posição de rolagem
  const headerHeight = useRef(new Animated.Value(80)).current; // Altura inicial do header
  const iconSize = useRef(new Animated.Value(75)).current; // Tamanho inicial do ícone

  // Carregar as fontes
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  // Função para animar o header e o ícone com base na rolagem
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // `useNativeDriver` não suporta animações de altura
  );

  // Efeito para ajustar o header e o ícone com base na rolagem
  useEffect(() => {
    const headerListener = scrollY.addListener(({ value }) => {
      if (value > 50) {
        // Quando o usuário rolar para baixo
        Animated.timing(headerHeight, {
          toValue: 54, // Altura reduzida do header
          duration: 40,
          useNativeDriver: false,
        }).start();

        Animated.timing(iconSize, {
          toValue: 50, // Esconde o ícone
          duration: 30,
          useNativeDriver: false,
        }).start();
      } else {
        // Quando o usuário rolar para cima
        Animated.timing(headerHeight, {
          toValue: 80, // Altura original do header
          duration: 30,
          useNativeDriver: false,
        }).start();

        Animated.timing(iconSize, {
          toValue: 75, // Mostra o ícone
          duration: 40,
          useNativeDriver: false,
        }).start();
      }
    });

    return () => {
      scrollY.removeListener(headerListener); // Limpa o listener ao desmontar
    };
  }, [scrollY, headerHeight, iconSize]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground source={bgImg} style={styles.bg}>
        {/* Header animado */}
        <Animated.View
          style={[
            styles.header,
            {
              height: headerHeight,
            },
          ]}>
          <Animated.Image
            source={albumImage}
            style={[
              styles.iconPage,
              {
                width: iconSize,
                height: iconSize,
              },
            ]}
          />
          <View style={styles.textContainer}>
            <Animated.Text
              style={[
                styles.title,
                {
                  fontSize: scrollY.interpolate({
                    inputRange: [0, 50], // Intervalo de rolagem
                    outputRange: [25, 30], // Tamanho da fonte: 22 (original) -> 28 (aumentado)
                    extrapolate: "clamp", // Garante que o valor não ultrapasse os limites
                  }),
                  textAlignVertical: "center",
                  marginTop: 10,
                },
              ]}>
              The Family Jewels
            </Animated.Text>
          </View>
        </Animated.View>

        {/* Conteúdo principal */}
        <ScrollView
          style={styles.main}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Controla a frequência dos eventos de rolagem
        >
          
          
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bg: {
    flex: 1,
    width: "100%",
  },
  header: {
    backgroundColor: "rgba(0, 0, 25, 0.6)",
    width: "96%",
    marginTop: 50,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 100,
    flexDirection: "row",
    gap: 10,
    borderColor: "rgba(0, 0, 2, 1.5)",
    borderWidth: 3,
  },
  iconPage: {
    borderRadius: 100,
    position: "relative",
    left: 2,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    position: "relative",
    bottom: 5,
    zIndex: 1000,
  },
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    marginTop: 10,
  },
});