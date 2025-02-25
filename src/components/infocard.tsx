import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";
interface InfoCardProps {
  title: string; // Título do cabeçalho
  imageSource: any; // Fonte da imagem
  description: string; // Texto descritivo
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  imageSource,
  description,
}) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_200ExtraLight,
  });

  if (!fontsLoaded) {
    return null; // Ou um componente de carregamento
  }
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>{title}</Text>

      {/* Imagem */}
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      {/* Texto */}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    fontSize: 19,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
    textAlign: "center",
    color: "#111",
    width: "100%",
    backgroundColor: "rgb(238, 236, 236)",
    padding: 5,

    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: "#222",
    textAlign: "justify",
    marginBottom: 10,
    fontFamily: "Poppins_300Light",
  },
});

export default InfoCard;
