import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons"; // Para ícones de play/pause

type InfoCardProps = {
  title: string;
  imageSource: any;
  description: string;
  audioSource: any; // Pode ser um require(local) ou uma URL (remoto)
};

const SingleCard: React.FC<InfoCardProps> = ({ title, imageSource, description, audioSource }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // Posição atual do áudio em milissegundos
  const [duration, setDuration] = useState(0); // Duração total do áudio em milissegundos

  // Carrega o áudio quando o componente é montado
  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(audioSource, {}, onPlaybackStatusUpdate);
      setSound(sound);
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Descarrega o áudio quando o componente é desmontado
      }
    };
  }, [audioSource]);

  // Atualiza o estado de reprodução e a posição do áudio
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  // Função para tocar ou pausar o áudio
  const playPauseAudio = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  // Função para buscar uma posição específica no áudio
  const seekAudio = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  // Converte milissegundos para o formato mm:ss
  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

      </View>


      <View style={styles.Player}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={seekAudio}
          minimumTrackTintColor="#fff" // Cor da parte preenchida
          maximumTrackTintColor="#aaa" // Cor da parte não preenchida
          thumbTintColor="#4682B4" // Cor do "ponteiro"
        />

        {/* Minutagem (tempo atual / tempo total) */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        {/* Botão de play/pause */}
        <TouchableOpacity onPress={playPauseAudio} style={styles.playButton}>
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={40}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
   alignSelf: "center",
  },
  content: {
    flexDirection: "row",
    width:"100%",
    padding:0,
    marginTop:10,
    justifyContent:"center",
    alignItems:"center",
  },
  textContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "auto",
    marginRight:15,
    marginBottom:10,
    padding:10,
    backgroundColor:"#fff",
    borderRadius:30,
    
  },
  Player:{
    backgroundColor:"rgba(0, 0, 0, 1.0)",
    width:"80%",
    height:80,
    alignItems:"center",
    justifyContent:"center",
    padding:10,
    borderRadius:100,
    marginTop:10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight:15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    
  },
  slider: {
    width: "80%",
    position:"relative",
    top:15,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    
  },
  timeText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    position:"relative",
    top:12,
  },
  playButton: {
    position:"relative",
    bottom:5,
  },
});

export default SingleCard;