import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Button,
  ActivityIndicator,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  Header,
  IconButtonnn,
  FooterTotal,
  StepperInput,
  LineDivider,
} from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearBasket,
  RemoveBasket,
  Aumentar,
  Disminuir,
  calculateTotals,
} from "../../ShoppingCar/BasketSlice";
import { SwipeListView } from "react-native-swipe-list-view";
import { Dialog } from "@rneui/themed";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { auth, db } from "../../Database/Firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import AwesomeAlert from "react-native-awesome-alerts";

const MyCart = ({ route, navigation }) => {
  const { IdLocal, logoLocal, nameLocal, ctgLocal } = route.params;
  const [loading, setLoading] = useState(false);
  const { items, total, total2 } = useSelector((state) => state.basket);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items]);

  //RENDER COMPONETS

  function renderHeader() {
    return (
      <Header
        title="MI CARRITO"
        titleStyle={{
          fontSize: 16,
          lineHeight: 22,
        }}
        containerStyle={{
          height: 50,
          marginHorizontal: 16,
          marginTop: 8,
        }}
        leftComponent={
          <IconButtonnn
            icon={require("../../assets/back.png")}
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
        rightComponent3={<View style={{ width: 25, height: 15 }} />}
      />
    );
  }

  function renderCartList() {
    return (
      <SwipeListView
        data={items}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 8,
          paddingHorizontal: 24,
          paddingBottom: 24 * 2,
        }}
        disableRightSwipe={true}
        rightOpenValue={-70}
        renderItem={(data, rowMap) => (
          <View
            key={data.item.id}
            style={{
              height: 100,
              backgroundColor: "white",
              ...styles.cartItemContainer,
            }}
          >
            <View
              style={{
                width: 85,
                height: 100,
                marginLeft: -10,
              }}
            >
              <Image
                source={{ uri: data.item.imagen }}
                resizeMode="contain"
                style={{
                  width: "82%",
                  height: "90%",
                  position: "absolute",
                  top: 5,
                  left: 5,
                  borderRadius: 15,
                }}
              />
            </View>
            {/* Food Info*/}
            <View
              style={{
                flex: 1,
                left: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 15,
                  lineHeight: 22,
                  textAlign: "auto",
                }}
              >
                {data.item.titulo.length > 15
                  ? data.item.titulo.slice(0, 16) + "..."
                  : data.item.titulo}
              </Text>

              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 15,
                  lineHeight: 22,
                  color: "#f10569",
                }}
              >
                {data.item.precioBajada
                  ? `S/${data.item.precioBajada.toFixed(2)}`
                  : `S/${data.item.precio.toFixed(2)}`}
              </Text>
            </View>
            <StepperInput
              icono={
                data.item.cant == 1
                  ? require("../../assets/delete.png")
                  : require("../../assets/minus.png")
              }
              containerStyle={{
                height: 50,
                width: 85,
                backgroundColor: "#F5F5F8",
              }}
              textstyle={{
                fontSize: data.item.cant > 9 ? 11 : 18,
              }}
              contText={{ top: 3 }}
              value={data.item.cant}
              onAdd={() => dispatch(Aumentar(data.item.id))}
              onMinus={() => {
                if (data.item.cant == 1) {
                  dispatch(RemoveBasket(data.item.id));
                  return;
                }
                dispatch(Disminuir(data.item.id));
              }}
              botones={{ height: 15, width: 15 }}
              contenedor={{ width: 35 }}
            />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButtonnn
            containerStyle={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "#f10569",
              ...styles.cartItemContainer,
            }}
            icon={require("../../assets/delete.png")}
            iconStyle={{ marginRight: 10 }}
            onPress={() => dispatch(RemoveBasket(data.item.id))}
          />
        )}
      />
    );
  }

  function pasoAtras() {
    setAlert(false);
    navigation.goBack();
  }

  async function UploadOrders() {
    setLoading(true);
    const orders = [...items];
    await addDoc(collection(db, `Ordenes`), {
      idRestaurante: IdLocal,
      nombreLocal: nameLocal,
      logoRestaurante: logoLocal,
      precioCliente: total,
      nameCliente: auth.currentUser.displayName,
      idCliente: auth.currentUser.email,
      ubicacion: "Villa Club 3",
      orderTime: new Date().toString(),
      orders,
    })
      .then(async () => {
        console.log("Check 1");
        await addDoc(collection(db, `users/${auth.currentUser.email}/orders`), {
          idRestaurante: IdLocal,
          nombreLocal: nameLocal,
          logoRestaurante: logoLocal,
          precioCliente: total,
          nameCliente: auth.currentUser.displayName,
          idCliente: auth.currentUser.email,
          ubicacion: "Villa Club 3",
          orderTime: new Date().toString(),
          orders,
        }).then(() => {
          dispatch(ClearBasket());
          navigation.goBack();
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function Suma() {
    const total = datos
      .map((item) => item.price)
      .reduce((prev, curr) => prev + curr, 0);
    return total;
  }

  function deled() {
    const copiaArray = Object.values(datos);
    copiaArray.splice(0, 1);
    setDatos(copiaArray);
  }

  function Clear() {
    dispatch(ClearBasket());
    navigation.goBack();
  }

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (items.length == 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fafbff" }}>
        <StatusBar
          backgroundColor={"#fafbff"}
          barStyle="dark-content"
          translucent={false}
        />
        {renderHeader()}
        <View style={{ top: 5 }}>
          <LineDivider />
        </View>

        <View style={{ marginHorizontal: 24, alignItems: "center" }}>
          <Image
            resizeMode="contain"
            source={require("../../assets/undraw_empty_cart_co35.png")}
            style={{
              width: 310,
              height: 350,
              borderRadius: 20,
              top: 20,
            }}
          />
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 15,
              lineHeight: 22,
              top: 15,
            }}
          >
            Aún no tienes productos en tu carrito.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fafbff",
      }}
    >
      <StatusBar
        backgroundColor={"#fafbff"}
        barStyle="dark-content"
        translucent={false}
      />
      <Dialog isVisible={loading}>
        <Dialog.Loading loadingProps={{ size: "large", color: "#f10569" }} />
      </Dialog>
      {renderHeader()}
      <View style={{ top: 5 }}>
        <LineDivider />
      </View>
      {renderCartList()}
      {items.length > 0 ? (
        <FooterTotal
          onPres={() => navigation.navigate("checkout", {
            total,
            IdLocal,
            logoLocal,
            nameLocal,
            ctgLocal,
            items,
            total2,
          })}
          subtotal={total}
          shippingFree={0}
          total={total}
          off={total >= 10 ? false : true}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
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
export default MyCart;
