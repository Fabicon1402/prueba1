import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Alert,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { CartIndicator } from "../../../Components";
import { Image } from "@rneui/themed";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { AuxModal } from "../../../Components";
import { useSelector, useDispatch } from "react-redux";
import { ClearBasket } from "../../../ShoppingCar/BasketSlice";
import AwesomeAlert from "react-native-awesome-alerts";

//import SpecialOffers from "./SpecialOffers";

const windowWidth = Dimensions.get("window").width;

const ProfileRestaurant = ({ route, navigation }) => {
  const { dataProfile } = route.params;
  const [categoryIndex, setCategoryIndex] = useState(0);
  const flatListRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [alert, setAlert] = useState(false);
  const lista = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const [currentEvent, setCurrentEvent] = useState(null);

  const modalRef = useRef(null);

  const handleExpand = () => {
    modalRef.current.expand();
  };

  const handleClose = () => {
    modalRef.current.close();
  };

  function updateCtg(v) {
    setCategoryIndex(v);
    setTimeout(function () {
      handleClose();
    }, 600);
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

  {
    /*function backk() {
    dispatch(ClearBasket());
    navigation.goBack();
  }*/
  }

  {
    /*function deleteddd(evento) {
    dispatch(ClearBasket());
    navigation.dispatch(evento.data.action);
  }*/
  }

  {
    /*function deleteddd(evento) {
    dispatch(ClearBasket());
    navigation.dispatch(evento.data.action);
  }*/
  }

  function pasoAtras() {
    setAlert(false);
    navigation.goBack();
  }

  {
    /*function GobackConditional() {
    if (lista.items.length > 0) {
      setAlert(true);
    } else {
      navigation.goBack();
    }
  }*/
  }

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategoryIndex(index);
          flatListRef.current.scrollToIndex({ index });
        }}
        activeOpacity={0.8}
        style={{ marginTop: 8 }}
      >
        <Text
          style={[
            {
              fontFamily: "Poppins-SemiBold",
              fontSize: 15,
              lineHeight: 22,
              color: "#525C67",
              marginLeft: index > 0 ? 22 : 0,
            },
            categoryIndex == index && styles.indexCateg,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />

      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: dataProfile.portada,
          }}
          PlaceholderContent={
            <ActivityIndicator size={"large"} color="#F5F5F8" />
          }
          placeholderStyle={{
            backgroundColor: "white",
            width: "100%",
            height: 180,
          }}
          blurRadius={4}
          containerStyle={{
            width: "100%",
            height: 200,
            position: "absolute",
          }}
        />
      </View>
      {/* Header */}
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
            width: 40,
            height: 40,
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
            idLocal={dataProfile.name}
            nameLocal={dataProfile.name}
            logoLocal={dataProfile.logo}
            ctgLocal={"Polleria"}
            quantity={lista.items.length}
          />
        )}
      </View>
      <View style={styles.whiteS}>
        <View
          style={{
            top: 5,
            height: 10,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        />
        <ScrollView
          contentContainerStyle={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <View
            style={{
              marginTop: 8,
              marginHorizontal: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: windowWidth - 128 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: dataProfile.name.length > 11 ? 24 : 28,
                    lineHeight: 36,
                  }}
                >
                  {dataProfile.name}
                </Text>
              </View>
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
                  onPress={() => console.log(dataProfile)}
                  source={require("../../../assets/star.png")}
                  style={{
                    width: 13,
                    height: 13,
                  }}
                />
                <Text
                  style={{
                    top: 1,
                    fontFamily: "Poppins-SemiBold",
                    marginLeft: 8,
                    fontSize: 12,
                    lineHeight: 22,
                    color: "#FFFFFF",
                  }}
                >
                  {(dataProfile.sumaRating / dataProfile.sumaRatingPerson) %
                    1 ==
                  0
                    ? (
                        dataProfile.sumaRating / dataProfile.sumaRatingPerson
                      ).toFixed(1)
                    : (
                        dataProfile.sumaRating / dataProfile.sumaRatingPerson
                      ).toFixed(1)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
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
              >{`${dataProfile.time - 5} - ${dataProfile.time} min`}</Text>
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

            <View
              style={{ flexDirection: "row", alignItems: "center", height: 44 }}
            >
              <TouchableOpacity
                onPress={() => handleExpand()}
                activeOpacity={0.4}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#F5F5F8",
                    borderRadius: 12,
                    height: 43,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 6,
                    paddingEnd: 6,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      fontSize: 13,
                      lineHeight: 22,
                      color: "#525C67",
                    }}
                  >
                    Menú{" "}
                  </Text>
                  <View
                    style={{ height: 20, justifyContent: "center", top: 0 }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        lineHeight: 22,
                        fontWeight: "bold",
                        color: "#525C67",
                      }}
                    >
                      ﹀
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ left: 3, width: windowWidth - 115 }}>
                <FlatList
                  ref={flatListRef}
                  horizontal={true}
                  data={dataProfile.categorias}
                  contentContainerStyle={{ paddingEnd: 12 }}
                  renderItem={renderCategories}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(index) => index}
                  onScroll={(event) =>
                    setScrollPosition(event.nativeEvent.contentOffset.x)
                  }
                />
              </View>
            </View>
            <View style={{ top: 12, marginBottom: 28 }}>
              {dataProfile.menu[categoryIndex].items.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.navigate("render", {
                      opcionesD: item.detailsOptions,
                      titulo: item.titulo,
                      imagen: item.img,
                      descripcion: item.descrip,
                      precio: item.precio,
                      id: item.id,
                      precioBajada:
                        item.precio > 45
                          ? Math.round(item.precio + item.precio * 0.15)
                          : Math.round(item.precio + item.precio * 0.18),
                    })
                  }
                  key={index}
                  style={{ marginBottom: 10 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "#FFFFFF",
                      height: 140,
                      borderRadius: 5,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#F5F5F8",
                    }}
                  >
                    <View
                      style={{
                        width: 220,
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{ fontSize: 15, fontFamily: "Poppins-SemiBold" }}
                      >
                        {item.titulo}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Poppins-Regular",
                          color: "#525C67",
                        }}
                      >
                        {item.descrip.length > 40
                          ? item.descrip.slice(0, 50) + "..."
                          : item.descrip}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins-SemiBold",
                          lineHeight: 30,
                          fontSize: 12,
                        }}
                      >{`S/${
                        item.precio > 45
                          ? Math.round(item.precio + item.precio * 0.15)
                          : Math.round(item.precio + item.precio * 0.18)
                      }`}</Text>
                    </View>
                    <View>
                      <Image
                        style={{ width: 85, height: 95, borderRadius: 5 }}
                        source={{ uri: item.img }}
                        PlaceholderContent={
                          <ActivityIndicator size={"large"} color="#525C67" />
                        }
                        placeholderStyle={{ backgroundColor: "white" }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
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
        </ScrollView>
        <AuxModal
          ref={modalRef}
          activeHeight={height * 0.65}
          backgroundColor={"#fafbff"}
          backDropColor={"black"}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{}}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 26 }}>
                  Menú
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 12,
                  width: 40,
                  height: 40,
                  backgroundColor: "#fafbff",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -60,
                  elevation: 3,
                  right: 12,
                }}
              >
                <TouchableOpacity style={{}} onPress={handleClose}>
                  <Image
                    source={require("../../../assets/cross.png")}
                    style={{ width: 26, height: 26 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              {dataProfile.categorias.map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 18,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 30,
                  }}
                >
                  <View
                    style={{
                      height: 25,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 20,
                        color: "#525C67",
                        lineHeight: 22,
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => updateCtg(index)}>
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          tintColor:
                            index == categoryIndex ? "#f10569" : "#9e9fb2",
                        }}
                        source={
                          index == categoryIndex
                            ? require("../../../assets/check_on.png")
                            : require("../../../assets/check_off.png")
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </AuxModal>
      </View>
    </View>
  );
};

export default ProfileRestaurant;

const styles = StyleSheet.create({
  whiteS: {
    width: "100%",
    height: "83%",
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
