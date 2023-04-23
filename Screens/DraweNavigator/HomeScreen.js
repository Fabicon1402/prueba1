import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header, IconButtonnn, LineDivider } from "../../Components";
import { Perfil, BannerSlider, Popular } from "./HomeComponents";
import { db, auth } from "../../Database/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AwesomeAlert from "react-native-awesome-alerts";

const HomeScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(auth.currentUser.photoURL);
  const [fetchdata, setFetchdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const testeo = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      avatar: "https://example.com/johndoe/avatar.jpg",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@example.com",
      avatar: "https://example.com/janedoe/avatar.jpg",
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bobsmith@example.com",
      avatar: "https://example.com/bobsmith/avatar.jpg",
    },
  ];

  //FUNCIONES

  async function pruebaS() {
    const usersString = JSON.stringify(testeo);
    const collectionName = "test";
    const docId = "fbPIfphAYs1OM02XM5oB";

    const userDocRef = doc(db, collectionName, docId);
    await updateDoc(userDocRef, {
      texto: usersString,
    });
  }

  async function getBanners() {
    const datos = [];
    try {
      const docRef = doc(db, "CentralApp", "HomeScreenConfig");
      const documento = await getDoc(docRef);
      if (documento.exists()) {
        const bannerSplit = documento.data().data.split("Ñ");
        const banners = bannerSplit[0].split("**");

        const imgBanners = banners.map((banner) => {
          const bannerSplit = banner.split("*");
          return {
            img: bannerSplit[0],
            id: bannerSplit[1],
            ctg: bannerSplit[2],
            Exp: bannerSplit[3],
          };
        });

        const topRestaurants = bannerSplit[1].split("**").map((restaurant) => {
          const restaurantSplit = restaurant.split("*");
          return {
            img: restaurantSplit[0],
            bg: restaurantSplit[1],
            id: restaurantSplit[2],
            ctg: restaurantSplit[3],
            title: restaurantSplit[4],
            tiempo: parseInt(restaurantSplit[5]),
          };
        });

        const result = { imgBanners, topRestaurants };
        console.log(result);
        datos.push(result);
      } else {
        throw new Error("El documento no existe.");
      }
    } catch (error) {
      console.log("Error al obtener los datos:", error);
      throw new Error("Ocurrió un error al obtener los datos.");
    }
    return datos[0];
  }

  function cerrarSesion() {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada exitosamente");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function pasoAtras() {
    setAlert(false);
  }

  //Renderizado de Header
  function renderHeader() {
    return (
      <Header
        onPress={() => navigation.navigate("location")}
        title={"Tu Ubicación"}
        titleStyle={{ fontFamily: "Poppins-SemiBold", left: 5 }}
        containerStyle={{
          height: 50,
          marginHorizontal: 12,
          marginTop: 8,
        }}
        leftComponent={
          <IconButtonnn
            icon={require("../../assets/menu.png")}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 12,
              borderColor: "#BBBDC1",
            }}
            iconStyle={{ width: 20, height: 20, tintColor: "#BBBDC1" }}
            onPress={() => navigation.openDrawer()}
          />
        }
        rightComponent={
          <Perfil imagenP={photo} onPress={() => cerrarSesion()} />
        }
        iconoUbi={true}
      />
    );
  }
  //Renderizado de Banners
  const RenderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  useEffect(() => {
    async function fetchBanners() {
      try {
        const info = await getBanners();
        setFetchdata(info);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setAlert(true);
      }
    }
    fetchBanners();
  }, []);
  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#fafbff",
        }}
      >
        <ActivityIndicator size="large" color="#f10569" />
        <AwesomeAlert
          show={alert}
          showProgress={false}
          title="Ups,algo salió mal"
          titleStyle={styles.title}
          messageStyle={styles.message}
          closeOnTouchOutside={false}
          message="Cierra la aplicación y vuelve a intentar."
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Entiendo"
          confirmButtonTextStyle={styles.texto}
          confirmButtonStyle={styles.containerText}
          confirmButtonColor="#f10569"
          onConfirmPressed={() => pasoAtras()}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fafbff" }}>
      <StatusBar backgroundColor={"#fafbff"} barStyle="dark-content" />
      {renderHeader()}
      <View style={{ top: 2 }}>
        <LineDivider contenedorPad={{ paddingHorizontal: 12 }} />
      </View>
      {/* Body */}
      <ScrollView style={{ marginHorizontal: 12 }}>
        <View style={{ marginTop: 15 }}>
          <Carousel
            data={fetchdata.imgBanners}
            renderItem={RenderBanner}
            sliderWidth={width}
            itemWidth={290}
            loop
            autoplay={true}
            autoplayInterval={3600}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 17,
              lineHeight: 22,
              paddingHorizontal: 0,
              color: "black",
            }}
          >
            Categorias
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ right: 6, marginTop: 3 }}
        >
          {/*Restaurantes */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("restaurantesList")}
            style={{ left: 0 }}
          >
            <View
              style={{
                width: 115,
                height: 130,
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: 15,
                margin: 8,
                elevation: 1,
                backgroundColor: "#F5F5F8",
              }}
            >
              <View style={{ width: 80, height: 80 }}>
                <Image
                  source={require("../../assets/Restaurantes.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  lineHeight: 22,
                  fontSize: 13,
                  color: "black",
                }}
              >
                Restaura..
              </Text>
            </View>
          </TouchableOpacity>

          {/*Licores */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ left: 0 }}
            onPress={() => navigation.navigate("licoreria")}
          >
            <View
              style={{
                width: 115,
                height: 130,
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: 15,
                margin: 8,
                elevation: 1,
                backgroundColor: "#F5F5F8",
              }}
            >
              <View style={{ width: 80, height: 80 }}>
                <Image
                  source={require("../../assets/Licorerias.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  lineHeight: 22,
                  fontSize: 13,
                  color: "black",
                }}
              >
                Licorería
              </Text>
            </View>
          </TouchableOpacity>

          {/*Gas */}
          <TouchableOpacity
            onPress={() => ""}
            activeOpacity={0.9}
            style={{ left: 0 }}
          >
            <View
              style={{
                width: 115,
                height: 130,
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: 15,
                margin: 8,
                elevation: 1,
                backgroundColor: "#F5F5F8",
              }}
            >
              <View style={{ width: 80, height: 80 }}>
                <Image
                  source={require("../../assets/Gas.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  lineHeight: 22,
                  fontSize: 13,
                  color: "black",
                }}
              >
                Gas
              </Text>
            </View>
          </TouchableOpacity>

          {/*Pasteles    oldColor #e1e5f5*/}
          <TouchableOpacity
            onPress={() => ""}
            activeOpacity={0.9}
            style={{ left: 0 }}
          >
            <View
              style={{
                width: 115,
                height: 130,
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: 15,
                margin: 8,
                elevation: 1,
                backgroundColor: "#F5F5F8",
              }}
            >
              <View style={{ width: 80, height: 80 }}>
                <Image
                  source={require("../../assets/drugstore.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  lineHeight: 22,
                  fontSize: 13,
                  color: "black",
                }}
              >
                Botica
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/*POPULAR RESTAURANTS*/}
        {
          <View style={{ top: 20 }}>
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 17 }}>
              Restaurantes Populares
            </Text>
            <View style={{ marginBottom: 30, top: 6 }}>
              <Popular
                data={fetchdata.topRestaurants}
                editTitle={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}
                editSub={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                  color: "#898B9A",
                }}
                navigation={navigation}
              />
            </View>
          </View>
        }
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-SemiBold",
    width: "100%",
  },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textAlign: "justify",
    width: "100%",
  },
  texto: {
    fontFamily: "Poppins-SemiBold",
  },
});
