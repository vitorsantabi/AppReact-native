import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
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
import albumImage from "@/assets/albuns/album1.png";
import bgImg from "@/assets/Eras/1/bgf.webp";
import InfoCard from "@/components/infocard";
import BarInfo from "@/components/barinfo";


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
    <>
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
                    outputRange: [28, 30], // Tamanho da fonte: 22 (original) -> 28 (aumentado)
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
          scrollEventThrottle={16}
           // Controla a frequência dos eventos de rolagem
        > 
        <BarInfo backgroundColor={""} title={"Sobre o Album"} subtitle={"Veja curiosidades sobre o album!"} />
          <View style={{ padding: 15 ,backgroundColor: "rgba(255, 255, 255, 1.97)", borderRadius: 30,width:"95%",paddingBottom:90, alignSelf:"center",}}>
      
           <InfoCard
              title={
                "The Family Jewels: A Ousadia e a Autenticidade de Marina and the Diamonds"
              }
              imageSource={require("@/assets/Eras/1/textimg.jpg")}
              description={
                "Lançado em 15 de fevereiro de 2010, The Family Jewels é o álbum de estreia da cantora e compositora galesa Marina Diamandis, conhecida artisticamente como Marina and the Diamonds. O álbum, que combina elementos de indie pop, electropop, synthpop e new wave, é uma exploração audaciosa de temas como consumismo, valores sociais modernos, família e sexualidade feminina, marcando Marina como uma artista única no cenário musical."
              }
            />
            <InfoCard
              title={"Estilo Musical e Influências"}
              imageSource={require("@/assets/Eras/1/img2.jpg")}
              description={
                "O álbum mistura elementos de indie pop, new wave e electropop, com uma produção vibrante e letras inteligentes. Marina cita influências como Kate Bush, Gwen Stefani e Blondie, que se refletem em sua abordagem única e teatral.\n\nAs faixas variam entre batidas dançantes e melodias melancólicas, criando um equilíbrio entre o energético e o introspectivo. Destaques incluem 'Mowgli's Road', com sua sonoridade excêntrica, e 'I Am Not a Robot', que se tornou um hino de autoaceitação.\n\nA voz de Marina é um dos pontos altos do álbum, alternando entre tons poderosos e delicados, com uma entrega emocional que cativa o ouvinte."
              }
            />
            <InfoCard
              title={"Recepção e Legado"}
              imageSource={require("@/assets/Eras/1/img3.jpg")}
              description={
                `The Family Jewels foi aclamado pela crítica e pelo público, consolidando Marina Diamandis como uma das artistas mais originais e promissoras da cena pop. O álbum alcançou o 5º lugar na UK Albums Chart e recebeu a certificação de Ouro no Reino Unido.\n\n` +
                `Canções como "Hollywood" e "I Am Not a Robot" se tornaram singles de sucesso, com videoclipes criativos que reforçaram a imagem excêntrica e artística de Marina. Essas faixas também conquistaram uma base de fãs dedicada, que se identificou com as letras introspectivas e os temas universais.\n\n` +
                `O álbum é frequentemente elogiado por sua originalidade e profundidade lírica, características que diferenciaram Marina de outras artistas pop da época. Sua capacidade de abordar temas complexos de forma acessível e cativante é um dos pontos altos do projeto.\n\n` +
                `O legado de "The Family Jewels" permanece forte, influenciando uma nova geração de artistas que buscam combinar substância com apelo mainstream. Para muitos fãs, o álbum é um marco na carreira de Marina, representando o início de uma jornada artística única e autêntica.`
              }
            /> 
          </View>
          
          
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
  },
  header: {
    backgroundColor: "rgba(5, 21, 43, 0.68)",
    width: "96%",
    marginTop: 50,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 100,
    flexDirection: "row",
    gap: 10,
    
  },
  iconPage: {
    borderRadius: 100,
    position: "relative",
    left: 5,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  title: {
    fontSize: 35,
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    position: "relative",
    bottom: 5,
    zIndex: 1000,
  },
  main: {
    width: "100%",
    height: "100%",
  
    borderRadius: 40,
    marginTop: 10,
    
  },
  
});