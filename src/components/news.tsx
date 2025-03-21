import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";

interface NewsProps {
  imageUrl: any;
  title: string;
  subtitle: string;
}

const News: React.FC<NewsProps> = ({ imageUrl, title, subtitle }) => {
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
      <Image source={imageUrl} style={styles.image} />
      <View style={styles.textContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 5,
  },
  textContent: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center", 
    position: "relative",
    right: 5,
    padding: 8,
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
    marginTop: 10,
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    fontFamily: "Poppins_300Light",
  },
});

export default News;
