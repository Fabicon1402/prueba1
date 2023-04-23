import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Header, IconButtonnn, LineDivider } from "../../../Components";
import { db } from "../../../Database/Firebase";
import { getDoc, doc } from "firebase/firestore";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AwesomeAlert from "react-native-awesome-alerts";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const RestaurantsList = ({ navigation }) => {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ctgRestaurants, setCtgRestaurants] = useState();
  const [dataItem, setDataItem] = useState();
  const [selecIndex, setSelecIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);

  //<< <FUNCIONES> >>

  function pasoAtras() {
    setAlert(false);
    navigation.goBack();
  }

  {
    /*function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }*/
  }

  // BARAJAR ALEATORIAMENTE
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //ORDENAR DE MAYOR A MENOR
  function ordenarLocales(dato) {
    const listLocalesOrdenados = dato.listLocales.sort((a, b) => {
      const aDestacado = a.destacado ? 1 : 0;
      const bDestacado = b.destacado ? 1 : 0;

      if (aDestacado > bDestacado) {
        return -1;
      } else if (aDestacado < bDestacado) {
        return 1;
      } else {
        const aRatio = a.sumaRating / a.sumaRatingPerson;
        const bRatio = b.sumaRating / b.sumaRatingPerson;

        return bRatio - aRatio;
      }
    });

    return { ...dato, listLocales: listLocalesOrdenados };
  }

  //TRAER DATOS DE LA DB
  async function getData() {
    try {
      const docRef = doc(db, "Restaurantes", "0xt31Fwgp5yTLgIRHk5x");
      const documento = await getDoc(docRef);
      const datArray = JSON.parse(documento.data().dataRestaurants);
      return { categories: [datArray[0]], restaurantes: [datArray.slice(1)] };
    } catch (error) {
      console.log("Error al obtener los datos:", error);
      setAlert(true);
      return null;
    }
  }

  //<< <RENDERS DE COMPONENTES> >>

  function renderHeader() {
    return (
      <Header
        title="Restaurantes"
        titleStyle={{
          fontSize: 16,
          lineHeight: 22,
          right: 15,
        }}
        containerStyle={{
          height: 50,
          marginHorizontal: 16,
          marginTop: 8,
          marginBottom: 5,
        }}
        leftComponent={
          <IconButtonnn
            icon={require("../../../assets/back.png")}
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
            onPress={() => navigation.goBack()}
          />
        }
      />
    );
  }

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelecIndex(index);
          flatListRef.current.scrollToIndex({ index });
        }}
      >
        <View
          style={{
            position: "relative",
            marginRight: 5,
            height: 150,
            width: 125,
          }}
        >
          <Image
            source={{ uri: item.img }}
            style={{
              height: 120,
              width: 115,
              borderRadius: 5,
              borderWidth: selecIndex == index ? 3 : 0,
              borderColor: "black",
            }}
          />
          <Text
            style={{
              position: "absolute",
              top: 90,
              left: 5,
              color: "white",
              fontFamily: "Poppins-SemiBold",
              fontSize: 13,
            }}
          >
            {item.name.length > 9 ? item.name.slice(0, 7) + "..." : item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    async function orderingData() {
      const arrays = await getData();
      if (!arrays) return;
      setCtgRestaurants(arrays.categories[0]);
      const arraysCopy = arrays.restaurantes[0]
        .map((obj) => ({
          nameCtg: obj.nameCtg,
          listLocales: shuffle(obj.listLocales),
        }))
        .map(ordenarLocales);

      setDataItem(arraysCopy);
      setLoading(false);
    }
    orderingData();
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
          onConfirmPressed={() => pasoAtras()}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fafbff" }}>
      <StatusBar backgroundColor={"#fafbff"} barStyle="dark-content" />

      {renderHeader()}
      <LineDivider
        contenedorPad={{ paddingHorizontal: 16, paddingBottom: 2 }}
      />

      <ScrollView>
        <View style={{ height: 190, paddingTop: 8 }}>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={{
              paddingHorizontal: 16,
              height: 125,
              paddingBottom: 2,
              paddingEnd: 8,
              top: 15,
            }}
            horizontal={true}
            data={ctgRestaurants.ctg}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            onScroll={(event) =>
              setScrollPosition(event.nativeEvent.contentOffset.x)
            }
          />
        </View>
        {dataItem[selecIndex].listLocales.length > 0 && (
          <View
            style={{
              flex: 1,
              top: -18,
              paddingHorizontal: 16,
              marginBottom: 20,
            }}
          >
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  lineHeight: 22,
                }}
              >{`${dataItem[selecIndex].listLocales.length} Restaurantes`}</Text>
            </View>
            {dataItem[selecIndex].listLocales.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                disabled={item.cerrado}
                onPress={() => navigation.navigate("perfilRestaurante",{
                  dataProfile:item
                })}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    paddingHorizontal: 7,
                    borderBottomWidth: item.cerrado ? 0 : 2,
                    borderBottomColor: "#F5F5F8",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                      height: 95,
                    }}
                  >
                    <Image
                      source={{ uri: item.logo }}
                      style={{
                        width: 55,
                        height: 55,
                        marginRight: 10,
                        borderRadius: 10,
                      }}
                    />
                    <View
                      style={{
                        width: windowWidth - 170,
                      }}
                    >
                      {item.destacado && (
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#898B9A",
                            fontFamily: "Poppins-Regular",
                            top: 5,
                          }}
                        >
                          Destacado
                        </Text>
                      )}
                      <Text
                        numberOfLines={1}
                        style={{ fontFamily: "Poppins-SemiBold", fontSize: 14 }}
                      >
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          top: item.destacado ? -5 : 0,
                        }}
                      >
                        <Image
                          source={require("../../../assets/clock.png")}
                          style={{
                            width: 15,
                            height: 15,
                            top: 4,
                            marginRight: 7,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: 13,
                          }}
                        >{`${item.time - 10}-${item.time} min`}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "white",
                      flexDirection: "row",
                      paddingVertical: 2,
                      paddingHorizontal: 6,
                      borderRadius: 6,
                      top: -12,
                    }}
                  >
                    <Image
                      source={require("../../../assets/star.png")}
                      style={{
                        width: 10,
                        height: 10,
                        top: 8,
                        tintColor: "#f9ae02",
                        left: 3,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 8,
                        fontSize: 10,
                        lineHeight: 22,
                        fontFamily: "Poppins-SemiBold",
                        color: "black",
                      }}
                    >
                      {(item.sumaRating / item.sumaRatingPerson) % 1 == 0
                        ? (item.sumaRating / item.sumaRatingPerson).toFixed(1)
                        : (item.sumaRating / item.sumaRatingPerson).toFixed(1)}
                    </Text>
                  </View>
                </View>
                {item.cerrado && (
                  <View
                    style={{
                      backgroundColor: "white",
                      flex: 1,
                      height: 32,
                      paddingHorizontal: 7,
                      top: 0,
                      borderBottomWidth: 2,
                      borderBottomColor: "#F5F5F8",
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "#e9e9ec",
                        justifyContent: "center",
                        borderRadius: 7,
                        top: -8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: 12,
                          color: "#343435",
                        }}
                      >
                        Cerrado
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RestaurantsList;

const styles = StyleSheet.create({
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
