import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const Singles = () => {
  return (
    <ImageBackground
        source={require("@/assets/Eras/1/bgf.webp")}
        style={styles.container} 
        >
      <Text style={styles.text}>Singles</Text>
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
});

export default Singles;