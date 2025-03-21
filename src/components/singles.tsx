import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons"; // Para ícones de play/pause

const { width, height } = Dimensions.get("window");

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
    <View style={[styles.card, { width: width * 0.98 }]}>
      
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
       
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
  card:{
    backgroundColor: "#fff",
    borderRadius: 30,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContent: {
    padding: 10,
    width: "100%",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#333",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#666",
  },
  Player: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
   
    
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  timeText: {
    color: "#000",
  },
  playButton: {
    backgroundColor: "#4682B4",
    padding: 10,
    borderRadius: 50,
   position: "relative",
    bottom: 10,
  },
});

export default SingleCard;