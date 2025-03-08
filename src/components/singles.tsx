import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import GestureFlipView from 'react-native-gesture-flip-card';
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

const SingleCard: React.FC<InfoCardProps> = ({ title, imageSource, description }) => {
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

  const renderFront = () => {
    return (
      <View style={styles.frontStyle}>
        <Image style={styles.cover} source={imageSource} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  const renderBack = () => {
    return (
      <View style={styles.backStyle}>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GestureFlipView width={370} height={500} renderFront={renderFront} renderBack={renderBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(2,2,2,0.5)",
    width: "100%",
    flex:1,
    padding: 25,
    borderRadius: 40,
    alignItems: 'center',
  },
  frontStyle: {
    backgroundColor: "rgba(2,2,2,0.5)",
    width: 370,
    height: 500,
    padding: 38,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backStyle: {
    backgroundColor: "rgba(2,2,2,0.5)",
    width: 370,
    height: 500,
    padding: 38,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    borderRadius: 20,
    width: "90%",
    height: 300,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontFamily: "Poppins_200ExtraLight",
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    color: "#fff",
    fontFamily: "Poppins_300Light",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default SingleCard;