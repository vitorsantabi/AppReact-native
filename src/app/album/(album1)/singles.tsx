import BarInfo from "@/components/barinfo";
import SingleCard from "@/components/singles";
import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";

const Singles = () => {
  return (
    <ImageBackground
        source={require("@/assets/Eras/1/bgf.webp")}
        style={styles.container} 
        >
          <View style={styles.bar}>
            <BarInfo backgroundColor={""} title={"Galeria"} subtitle={"Confira as imagens do album"}/>
            </View>
      <ScrollView horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false} 
      style={{margin: 0, width: "100%", }}>
        <SingleCard/>
        <SingleCard/>
        <SingleCard/>
        <SingleCard/>
        <SingleCard/>
        <SingleCard/>
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
    width: "100%",
    height: "100%",


  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffff",
  },
  bar:{
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
 
});

export default Singles;