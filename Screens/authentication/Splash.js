import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Animated,
  Text,
  Alert,
  StatusBar,
} from "react-native";
import React from "react";
import { SIZES } from "./Componentes/Utils";
import { Boton } from "./Componentes";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require("../../assets/background01.png"),
    bannerImage: require("../../assets/mapsCell.png"),
    title: "Descubre nuevos restaurantes",
    description:
      "¿Quieres descubrir nuevos sabores y lugares para comer? Descubre los restaurantes más populares y deliciosos en tu zona.",
  },
  {
    id: 2,
    backgroundImage: require("../../assets/background02.png"),
    bannerImage: require("../../assets/favoriteF.png"),
    title: "Tu comida favorita",
    description:
      "¡Encuentra tu comida favorita en Apay! Ofrecemos una amplia variedad de opciones gastronómicas para que puedas disfrutar de tus platos preferidos.",
  },
  {
    id: 3,
    backgroundImage: require("../../assets/background01.png"),
    bannerImage: require("../../assets/hot_delivery.png"),
    title: "Delivery a domicilio",
    description:
      "¡Te lo llevamos en un abrir y cerrar de ojos! Pide ahora y recibe tu comida lo más rápido posible.",
  },
];

const Splash = ({ navigation }) => {
  const ScrollX = React.useRef(new Animated.Value(0)).current;
  const FlatListRef = React.useRef();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const onViewChangeRef = React.useRef(({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const Dots = () => {
    const dotPosition = Animated.divide(ScrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ["#fccde1", "#f10569", "#fccde1"],
            extrapolate: "clamp",
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  function renderButon() {
    return (
      <View style={{ height: 83, top: -20 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Dots />
        </View>
        {currentIndex < onboarding_screens.length - 1 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}
          >
            <Boton
              label="Next"
              labelStyle={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                lineHeight: 22,
              }}
              buttonContainerStyle={{
                height: 60,
                width: 150,
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
                FlatListRef?.current?.scrollToIndex({
                  index: currentIndex + 1,
                  animated: true,
                });
              }}
            />
          </View>
        )}
        {currentIndex == onboarding_screens.length - 1 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}
          >
            <Boton
              label="Comenzar"
              labelStyle={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                lineHeight: 22,
              }}
              buttonContainerStyle={{
                height: 60,
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.navigate("signin")}
            />
          </View>
        )}
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={"#fccde1"} barStyle="dark-content" />

      <Animated.FlatList
        ref={FlatListRef}
        horizontal
        pagingEnabled
        data={onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewChangeRef.current}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: SIZES.width, top: -60 }}>
              <View style={{ flex: 3 }}>
                <ImageBackground
                  source={item.backgroundImage}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "100%",
                    height: index == 1 ? "92%" : "100%",
                  }}
                >
                  <Image
                    source={item.bannerImage}
                    resizeMode="contain"
                    style={{
                      top: item.id == 1 || item.id == 3 ? 15 : -50,
                      width:
                        item.id == 1 || item.id == 3
                          ? SIZES.width * 0.95
                          : SIZES.width * 0.7,
                      height:
                        item.id == 1 || item.id == 3
                          ? SIZES.width * 0.95
                          : SIZES.width * 0.7,
                      marginBottom: -SIZES.padding,
                    }}
                  />
                </ImageBackground>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 15,
                  top: -5,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 28,
                    lineHeight: 36,
                    textAlign: "center",
                    top: -12,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: "justify",
                    color: "#525C67",
                    fontFamily: "Poppins-Regular",
                    fontSize: 17,
                    lineHeight: 22,
                    top: -5,
                    //paddingHorizontal: SIZES.padding,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {renderButon()}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
