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
  // Texto descritivo
}
const SingleCard: React.FC<InfoCardProps> = ({ title, imageSource }) => {
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
    <View style={styles.containe}>
      <Image style={styles.cover} source={imageSource} />
      <Text style={styles.Titulo}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containe: {
    width: "99%",
    height: "70%",
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    borderRadius: 30,
    gap: 10,
    alignSelf: "center",
  },
  cover: {
    backgroundColor: "#222",
    width: "80%",
    height: 350,
    borderRadius: 30,
  },
  Titulo: {
    color: "#fff",
    fontFamily: "Poppins_200ExtraLight",
    fontSize: 20,
  },
});

export default SingleCard;
