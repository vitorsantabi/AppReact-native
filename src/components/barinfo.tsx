import { Text, View, StyleSheet } from "react-native";
import { BlurView } from 'expo-blur';
import React from "react";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

interface BarInfoProps {
  backgroundColor: string;
  title: string;
  subtitle: string;
}

const BarInfo: React.FC<BarInfoProps> = ({
  backgroundColor,
  title,
  subtitle,
}) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Ou um componente de carregamento
  }
  return (
    <BlurView intensity={50} style={styles.blurContainer} tint="light">
      <View style={[styles.toolbar, { backgroundColor }]}>
      <Text style={styles.toolbarText}>{title}</Text>
      <Text style={styles.toolbarText1}>{subtitle}</Text>
    </View>
    </BlurView>
    
  );
};

const styles = StyleSheet.create({
  toolbar: {
  
  },
  blurContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor:"rgba(0,2,2,0.5)"
  },
  toolbarText: {
    fontSize: 25,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily: "Poppins_700Bold",
  },
  toolbarText1: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    fontWeight: 100,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default BarInfo;
