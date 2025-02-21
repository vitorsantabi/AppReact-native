import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface CardProps {
  imageSource1: any; // Fonte da primeira imagem
  imageSource2: any; // Fonte da segunda imagem
  imageSource3: any; // Fonte da terceira imagem
}

const { width } = Dimensions.get("window"); // Obtém a largura da tela

// Componente funcional que recebe as props
const Galeria: React.FC<CardProps> = ({
  imageSource1,
  imageSource2,
  imageSource3,
}) => {
  const scrollViewRef = useRef<ScrollView>(null); // Referência para o ScrollView
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para rastrear a imagem atual

  const images = [imageSource1, imageSource2, imageSource3]; // Array de imagens

  // Função para rolar para a próxima imagem
  const scrollToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < images.length) {
      scrollViewRef.current?.scrollTo({ x: width * nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  // Função para rolar para a imagem anterior
  const scrollToPrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      scrollViewRef.current?.scrollTo({ x: width * prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.galeriaContent}
        horizontal={true}
        pagingEnabled={true} // Rola uma imagem por vez
        showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem
        onMomentumScrollEnd={(event) => {
          // Atualiza o índice atual ao parar de rolar
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={image}
              style={styles.galeriaImagensContent}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={scrollToPrevious} style={styles.arrowButton}>
          <FontAwesome
            name="arrow-circle-left" // Ícone de seta para a esquerda
            size={32}
            color={currentIndex === 0 ? "#ccc" : "#000"} // Desativa o ícone se estiver na primeira imagem
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollToNext} style={styles.arrowButton}>
          <FontAwesome
            name="arrow-circle-right" // Ícone de seta para a direita
            size={32}
            color={currentIndex === images.length - 1 ? "#ccc" : "#000"} // Desativa o ícone se estiver na última imagem
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  galeriaContent: {
    flex: 1,
    width: "100%",
  },
  imageContainer: {
    width, // Largura da tela
    height: 380, // Altura fixa para o contêiner da imagem
    justifyContent: "center",
    alignItems: "center",
  },
  galeriaImagensContent: {
    width: "95%",
    height: "100%",
    borderRadius: 30,
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: "50%",
    width: "100%",
    paddingHorizontal: 20,
  },
  arrowButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 100,
    padding: 5,
  },
});

export default Galeria;
