import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity, Image, ScrollView, Image as RNImage } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import BarInfo from "@/components/barinfo";
import ImageView from "react-native-image-viewing";

export const data = [
  { source: require('@/assets/Eras/1/1.webp') },
  { source: require('@/assets/Eras/1/2.webp') },
  { source: require('@/assets/Eras/1/3.webp') },
  { source: require('@/assets/Eras/1/1.webp') },
  { source: require('@/assets/Eras/1/3.webp') },
  { source: require('@/assets/Eras/1/2.webp') },
];

const PageGaleria = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [visible, setVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ImageBackground
      source={require("@/assets/Eras/1/bgf.webp")}
      style={styles.container}
    >
      <View style={styles.headerBar}>
        <BarInfo backgroundColor={""} title="Galeria de Imagens" subtitle="Veja photoshoots desse álbum" />
      </View>

      <View style={styles.galleryContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id} // Use o ID único como chave
            onPress={() => {
              setCurrentImageIndex(index);
              setVisible(true);
            }}
          >
            <Image source={item.source} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </View>

      <ImageView
        images={data.map((item) => ({ uri: RNImage.resolveAssetSource(item.source).uri }))}
        imageIndex={currentImageIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100%",
  },
  headerBar: {
    marginTop: 30,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems:"center",
  },
  thumbnail: {
    width: 200,
    height: 300,
    resizeMode:"cover",
    borderRadius: 10,
    marginBottom:10,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default PageGaleria;