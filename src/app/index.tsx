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

const { width } = Dimensions.get("window");

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
          toValue: 100,
          duration: 30,
          useNativeDriver: false,
        }).start();

        Animated.timing(iconSize, {
          toValue: 85,
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
          styles.Wellcome,
          {
            height: headerHeight,
          },
        ]}
      >
        <Animated.Image
          source={require("@/assets/background/favicon.png")}
          style={[
            styles.ImgWellcome,
            {
              width: iconSize,
              height: iconSize,
            },
          ]}
        />
        <View style={styles.WellcomeText}>
          <Animated.Text
            style={[
              styles.WellcomeText1,
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
        style={{ width: "100%", paddingBottom: 150, marginBottom: 30 }}
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
          contentContainerStyle={{
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
          }}
        >
          <View style={styles.mewsContainer}>
            <News
              imageUrl={require("@/assets/Eras/6/albumMc.png")}
              title={"News Title 1"}
              subtitle={"Subtitle 1"}
            />
            <Link href={"/(news)/news1"} style={styles.mewsContainerLink}>
              <Text style={styles.mewsContainerLinktxt}>Ver mais ...</Text>
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
            link: "",
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
          <View key={index} style={styles.Albuns}>
            <Cards
              imageSource={album.imageSource}
              title={album.title}
              description={album.description}
            />
            <TouchableOpacity style={styles.button}>
              <Link href={album.link}>
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "rgba(53, 53, 53, 0.4)",
    width: 100,
    height: 100,
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
  Albuns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 1,
    marginTop: 5,
  },
  ImgWellcome: {
    width: 150,
    height: 150,
    borderRadius: 100,
    opacity: 0.8,
  },
  Wellcome: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    flexDirection: "row",
  },
  WellcomeText: {
    flexDirection: "column",
  },
  WellcomeText1: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mewsContainer: {
    width: 380,
    padding: 10,
    flex: 1,
    backgroundColor: "rgba(0, 0, 2, 0.5)",
    borderRadius: 30,

    alignItems: "center",
  },
  mewsContainerLinktxt: {
    backgroundColor: "#fff",
    padding: 10,
    width: 100,
    height: 50,
  },
});
