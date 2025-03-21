import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Cards from "../components/Card";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Link } from "expo-router";
import BarInfo from "@/components/barinfo";
import News from "@/components/news";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(80)).current;
  const iconSize = useRef(new Animated.Value(75)).current;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    const headerListener = scrollY.addListener(({ value }) => {
      if (value > 80) {
        Animated.timing(headerHeight, {
          toValue: 80,
          duration: 40,
          useNativeDriver: false,
        }).start();

        Animated.timing(iconSize, {
          toValue: 80,
          duration: 30,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(headerHeight, {
          toValue: 70,
          duration: 30,
          useNativeDriver: false,
        }).start();

        Animated.timing(iconSize, {
          toValue: 70,
          duration: 40,
          useNativeDriver: false,
        }).start();
      }
    });

    return () => {
      scrollY.removeListener(headerListener);
    };
  }, [scrollY, headerHeight, iconSize]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require("@/assets/background/bg.jpg")}
        style={styles.bg}
      />
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
        ]}
      >
        <Animated.Image
          source={require("@/assets/background/favicon.png")}
          style={[
            styles.headerIcon,
            {
              width: iconSize,
              height: iconSize,
            },
          ]}
        />
        <View style={styles.headerTextContainer}>
          <Animated.Text
            style={[
              styles.headerText,
              {
                fontSize: scrollY.interpolate({
                  inputRange: [0, 50],
                  outputRange: [25, 30],
                  extrapolate: "clamp",
                }),
                textAlignVertical: "center",
                marginTop: 10,
              },
            ]}
          >
            Wiki Diamonds
          </Animated.Text>
        </View>
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <BarInfo
          backgroundColor={""}
          title={"News Marina"}
          subtitle={"Saiba as últimas notícias"}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newsScrollContainer}
        >
          <View style={styles.newsContainer}>
            <News
              imageUrl={require("@/assets/news/cover1.jpg")}
              title={"BUTTERFLY"}
              subtitle={"MARINA lança single, 'BUTTERFLY'."}
            />

            <Link href={"/newsone"} style={styles.newsLink}>
              <Text style={styles.newsLinkText}>Confira aqui ...</Text>
            </Link>
          </View>

          <View style={styles.newsContainer}>
            <News
              imageUrl={require("@/assets/news/cupidgirl.webp")}
              title={"CUPID'S GIRL"}
              subtitle={"MARINA lançou o seu novo single, 'CUPID'S GIRL'."}
            />

            <Link href={"/newstwo"} style={styles.newsLink}>
              <Text style={styles.newsLinkText}>Ver mais ...</Text>
            </Link>
          </View>

          <View style={styles.newsContainer}>
            <News
              imageUrl={require("@/assets/news/cupidgirl.webp")}
              title={"News Title 1"}
              subtitle={"Subtitle 1"}
            />

            <Link href={"/newstwo"} style={styles.newsLink}>
              <Text style={styles.newsLinkText}>Ver mais ...</Text>
            </Link>
          </View>
        </ScrollView>
        <BarInfo
          backgroundColor={""}
          title={"Albuns"}
          subtitle={"Descubra a discografia da MARINA"}
        />

        {[
          {
            imageSource: require("@/assets/albuns/album1.png"),
            title: "The Family Jewels",
            description:
              "Lançado em 2010 - Hits: Hollywood, Oh No!, I Am Not a Robot",
            link: "/album/(album1)/",
          },
          {
            imageSource: require("@/assets/albuns/album2.jpeg"),
            title: "Electra Heart",
            description:
              "Lançado em 2012 - Hits: Primadonna, Bubblegum Bitch, Teen Idle",
            link: "/",
          },
          {
            imageSource: require("@/assets/albuns/album3.jpeg"),
            title: "FROOT",
            description: "Lançado em 2015 - Hits: FROOT, Blue, Happy",
            link: "",
          },
          {
            imageSource: require("@/assets/albuns/album4.jpeg"),
            title: "Love + Fear",
            description:
              "Lançado em 2019 - Hits: Handmade Heaven, Orange Trees, Karma",
            link: "",
          },
          {
            imageSource: require("@/assets/albuns/album5.png"),
            title: "Ancient Dreams in a Modern Land",
            description:
              "Lançado em 2021 - Hits: Purge the Poison, Venus Fly Trap, Man's World",
            link: "",
          },
        ].map((album, index) => (
          <View key={index} style={styles.albumContainer}>
            <Cards
              imageSource={album.imageSource}
              title={album.title}
              description={album.description}
            />
            <TouchableOpacity style={styles.button}>
              <Link href={album.link as "/"}>
                <Text style={styles.buttonText}>Ver mais</Text>
              </Link>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 1.5,
    objectFit: "cover",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    flexDirection: "row",
    position: "relative",
    zIndex: 10000,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
  },
  headerIcon: {
    width: width * 0.4, // 40% da largura do dispositivo
    height: width * 0.4, // 40% da largura do dispositivo
    borderRadius: (width * 0.4) / 2, // Metade da largura para manter a proporção circular
    opacity: 0.8,
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  headerText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
  },
  scrollView: {
    width: "100%",
    paddingBottom: 150,
    marginBottom: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  newsScrollContainer: {
    height: 300,
    padding: 0,
    paddingRight: 30,
    margin: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    gap: 10,
  },
  newsContainer: {
    width: width * 0.99, // 90% da largura do dispositivo
    padding: 10,
    margin: 1,
    marginRight:25,
    backgroundColor: "rgba(0, 0, 2, 0.5)",
    borderRadius: 50,
    alignItems: "center",
  },
  newsLink: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    textAlign: "center",
    textAlignVertical: "center",
    
    borderRadius: 20,
    width: width * 0.35, // 25% da largura do dispositivo
    height: height * 0.06, // 5% da altura do dispositivo
    
  },
  newsLinkText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  albumContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 1,
    marginTop: 5,
  },
  button: {
    backgroundColor: "rgba(53, 53, 53, 0.4)",
    width: width * 0.25, // 25% da largura do dispositivo
    height: 100, // 10% da altura do dispositivo
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
