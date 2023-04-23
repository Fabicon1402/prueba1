import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../Database/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Image } from "@rneui/themed";
import { CartIndicator } from "../../../Components";
import { useSelector, useDispatch } from "react-redux";
import { ClearBasket } from "../../../ShoppingCar/BasketSlice";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { AtkinsonHyperlegible_700Bold_Italic } from "@expo-google-fonts/atkinson-hyperlegible";
import AwesomeAlert from "react-native-awesome-alerts";

const width = Dimensions.get("screen").width / 2 - 30;

const LicoreriaScreen = ({ navigation }) => {
  const [profileRestaurant, setProfileRestaurant] = useState();
  const [dataItem, setDataItem] = useState();
  const [loading, setLoading] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const lista = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const [currentEvent, setCurrentEvent] = useState(null);

  //FUNCIONES
  //{JSON.stringify}
  async function getData() {
    try {
      const docRef = doc(db, "Licoreria", "UUyyvSy0d4K52Hv218W2");
      const documento = await getDoc(docRef);
      const datArray = JSON.parse(documento.data().dataProfile);
      setProfileRestaurant(datArray[0]);
      setDataItem(datArray.slice(1));
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los datos:", error);
      setAlert(true);
    }
  }

  function alertStepBack() {
    setAlert(false);
    navigation.goBack();
  }

  function Goback_Clear() {
    if (lista.items.length > 0) {
      setAlert(true);
    } else {
      navigation.goBack();
    }
  }

  function atras() {
    if (currentEvent == null) {
      setAlert(false);
      dispatch(ClearBasket());
      setAlert(false);
      navigation.goBack();
    } else {
      setAlert(false);
      dispatch(ClearBasket());
      navigation.dispatch(currentEvent.data.action);
    }
  }
  //RENDERIZADO DE COMPONENTES
  const renderCategories = ({ item, index }) => {
    const categoryTextStyle = {
      fontFamily: "Poppins-SemiBold",
      fontSize: 15,
      lineHeight: 22,
      color: "#525C67",
    };
    return (
      <TouchableOpacity
        onPress={() => {
          setCategoryIndex(index);
          flatListRef.current.scrollToIndex({ index });
        }}
        activeOpacity={0.8}
        style={{ marginTop: 18 }}
      >
        <Text
          style={[
            categoryTextStyle,
            {
              marginLeft: index > 0 ? 30 : 0,
            },
            categoryIndex == index && styles.indexCateg,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProducts = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("render", {
            opcionesD: item.detailsOptions,
            titulo: item.title,
            imagen: item.img,
            descripcion: item.descrip,
            precio: item.precio,
            id: item.id,
          })
        }
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: item.img }}
              resizeMode="contain"
              PlaceholderContent={
                <ActivityIndicator size={"large"} color="#525C67" />
              }
              placeholderStyle={{ backgroundColor: "white" }}
              style={{ width: 120, height: 120 }}
            />
          </View>

          {item.title ? (
            <View
              style={{
                height: 38,
                top: item.title.length < 16 ? 15 : 5,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: item.title.length < 16 ? 15 : 11,
                }}
              >
                {item.title.length > 35
                  ? item.title.slice(0, 36) + "..."
                  : item.title}
              </Text>
            </View>
          ) : null}

          <View style={{ top: 5 }}>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                lineHeight: 30,
                fontSize: 13,
              }}
            >{`S/${item.precio}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (lista.items.length > 0) {
        event.preventDefault();
        setCurrentEvent(event);
        setAlert(true);
      }
    });

    return unsubscribe;
  }, [navigation, lista.items]);

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "AtkinsonHyperlegible-Bold": AtkinsonHyperlegible_700Bold_Italic,
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
          title="Error"
          titleStyle={styles.title}
          messageStyle={styles.message}
          closeOnTouchOutside={false}
          message="Algo salió mal, inténtalo de nuevo más tarde."
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonTextStyle={styles.texto}
          confirmButtonStyle={styles.containerText}
          confirmButtonColor="#f10569"
          onConfirmPressed={() => alertStepBack()}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fafbff" }}>
      <StatusBar backgroundColor="transparent" translucent={true} />

      <Image
        blurRadius={4}
        source={
          profileRestaurant.portada
            ? {
                uri: profileRestaurant.portada,
              }
            : {
                uri: "https://images.unsplash.com/photo-1619834092768-9ee9d433d8b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              }
        }
        PlaceholderContent={
          <ActivityIndicator size={"large"} color="#fafbff" />
        }
        placeholderStyle={{ backgroundColor: "white" }}
        containerStyle={{
          width: "100%",
          height: 340,
          position: "absolute",
          top: -18,
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          height: 50,
          marginHorizontal: 16,
          marginTop: 35,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => Goback_Clear()}
          style={{
            width: 35,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "#fafbff",
          }}
        >
          <Image
            source={require("../../../assets/back.png")}
            style={{ width: 25, height: 25, tintColor: "#fafbff" }}
          />
        </TouchableOpacity>

        {lista.items.length > 0 && (
          <CartIndicator
            idLocal={profileRestaurant.idDocument}
            nameLocal={profileRestaurant.nameLocal}
            logoLocal={profileRestaurant.logo}
            quantity={lista.items.length}
            onPress={console.log("LO QUE HAY DENTRO", lista.items)}
          />
        )}
      </View>

      <View style={styles.whiteS}>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 17,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "AtkinsonHyperlegible-Bold",
                fontSize: 28,
                lineHeight: 36,
              }}
            >
              {profileRestaurant.nameLocal}
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderRadius: 10,
                backgroundColor: "#f10569",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/star.png")}
                style={{
                  width: 13,
                  height: 13,
                }}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 13,
                  lineHeight: 22,
                  color: "#FFFFFF",
                }}
              >
                4.8
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../assets/clock.png")}
              style={{
                width: 18,
                height: 18,
                tintColor: "#525C67",
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 13,
                color: "#525C67",
                textAlign: "justify",
                lineHeight: 22,
                marginLeft: 8,
              }}
            >{`${profileRestaurant.tiempo - 5} - ${
              profileRestaurant.tiempo
            } min`}</Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 13,
                lineHeight: 22,
                color: "#525C67",
                textAlign: "justify",
                marginLeft: 15,
              }}
            >
              • Minimo S/10
            </Text>
          </View>

          <View style={{ paddingBottom: 10 }}>
            <FlatList
              ref={flatListRef}
              horizontal={true}
              data={profileRestaurant.ctg}
              renderItem={renderCategories}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(index) => index}
              onScroll={(event) =>
                setScrollPosition(event.nativeEvent.contentOffset.x)
              }
            />
          </View>
          <View style={{ top: 10, backgroundColor: "#fafbff" }}>
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              contentContainerStyle={{ paddingBottom: 310 }}
              numColumns={2}
              data={dataItem[categoryIndex].items}
              renderItem={renderProducts}
              keyExtractor={(item) => item.id}
            />
          </View>
          <AwesomeAlert
            show={alert}
            showProgress={false}
            title="¿Seguro que quieres salir?"
            titleStyle={styles.title}
            messageStyle={styles.message}
            closeOnTouchOutside={false}
            message="Al hacerlo, se limpiara tu carrito."
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No"
            confirmText="Si, salir"
            confirmButtonColor="#f10569"
            onCancelPressed={() => setAlert(false)}
            onConfirmPressed={atras}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fondoBackgroud: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: -18,
    resizeMode: "cover",
  },
  whiteS: {
    width: "100%",
    height: "82%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fafbff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  indexCateg: {
    color: "#f10569",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: "#f10569",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    height: 205,
    backgroundColor: "white",
    borderRadius: 8,
    margin: "0%",
    width: width + 5,
    marginBottom: 20,
    padding: 8,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    lineHeight: 22,
  },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textAlign: "justify",
  },
  texto: {
    fontFamily: "Poppins-SemiBold",
  },
  containerText: {
    width: 80,
    height: 40,
    alignItems: "center",
  },
});

export default LicoreriaScreen;
