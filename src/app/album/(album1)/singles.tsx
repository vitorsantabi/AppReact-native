import BarInfo from "@/components/barinfo";
import SingleCard from "@/components/singles";
import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions } from "react-native";
const Hollywood = require('@/assets/Eras/1/Hollywood.mp3');
const Singles = () => {
  return (
    <ImageBackground
      source={require("@/assets/Eras/1/bgf.webp")}
      style={styles.container}
    >
      <View style={styles.bar}>
        <BarInfo backgroundColor={""} title={"Galeria"} subtitle={"Confira as imagens do album"} />
      </View>
      <ScrollView
      
        contentContainerStyle={{ gap: 10, }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        <SingleCard
          title={"Hollywood"}
          imageSource={require("@/assets/Eras/1/holly.png")}
          description={"Um comentário satírico sobre a cultura da fama e o sonho americano, 'Hollywood' combina batidas pop cativantes com letras inteligentes que questionam o custo da celebridade."} 
          audioSource={Hollywood}    
              />

        <SingleCard
          title={"I Am Not a Robot"}
          imageSource={require("@/assets/Eras/1/root.png")}
          description={"Uma música sobre vulnerabilidade e humanidade, 'I Am Not a Robot' explora a ideia de que é normal sentir emoções e que não precisamos nos esconder atrás de uma fachada de perfeição."} audioSource={undefined}        />
      
  
        <SingleCard
          title={"Oh No!"}
          imageSource={require("@/assets/Eras/1/ahno.png")}
          description={"Com um ritmo energético e letras que falam sobre ambição e autossabotagem, 'Oh No!' é uma ode à luta interna entre o desejo de sucesso e o medo do fracasso."} audioSource={undefined}        />
     
     
        <SingleCard
          title={"Shampain"}
          imageSource={require("@/assets/Eras/1/sha.png")}
          description={"Uma música animada que usa champanhe como metáfora para os altos e baixos de um relacionamento turbulento, 'Shampain' é uma mistura de diversão e melancolia."} audioSource={undefined}        />
      
    
        <SingleCard
          title={"Mowgli's Road"}
          imageSource={require("@/assets/Eras/1/mog.png")}
          description={"Inspirada no personagem Mowgli de 'O Livro da Selva', essa música surreal e cativante fala sobre seguir seu próprio caminho e resistir às expectativas dos outros."} audioSource={undefined}        />
    
     
        <SingleCard
          title={"Obsessions"}
          imageSource={require("@/assets/Eras/1/obs.png")}
          description={"Uma música introspectiva que explora a ansiedade e os pensamentos obsessivos, 'Obsessions' é uma jornada emocional sobre superar medos e inseguranças."} audioSource={undefined}        />
     

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",


  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffff",
  },
  bar: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  single: {



  },

});

export default Singles;