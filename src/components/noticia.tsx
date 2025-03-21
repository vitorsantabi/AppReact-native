import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
    useFonts,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_200ExtraLight,
  } from "@expo-google-fonts/poppins";

type NoticiaProps = {
    imageSource: any;
    title: string;
    description: string;
};

const Noticia: React.FC<NoticiaProps> = ({ imageSource, title, description }) => {

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
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        objectFit: 'cover',
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
      
        marginBottom: 8,
        fontFamily: 'Poppins_700Bold',
    },
    content: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins_400Regular',
    },
});

export default Noticia;