import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Header,
  IconButtonnn,
  FooterTotal,
  FortInput,
  CartItem,
} from "../../Components";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../../Database/Firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { ClearBasket } from "../../ShoppingCar/BasketSlice";
import { Dialog, Input } from "@rneui/themed";

const CheckoutScreen = ({ navigation, route }) => {
  const { total, IdLocal, logoLocal, nameLocal, ctgLocal, items, total2 } =
    route.params;
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [amountcash, setAmountCash] = useState(null);
  const { myLocation } = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const CardPAgos = [
    {
      id: 1,
      name: "Yape",
      icon: require("../../assets/IconYape.png"),
      card_no: "1234",
    },
    {
      id: 2,
      name: "Efectivo",
      icon: require("../../assets/IconDolar.png"),
      card_no: "1234",
    },
    {
      id: 3,
      name: "Otros",
      icon: require("../../assets/tarjeta2.png"),
      card_no: "1234",
    },
  ];

  function filtroPedidos(arrayPedidos) {
    const arrays = arrayPedidos.map((dato) => ({
      titulo: dato.titulo,
      precio: dato.precio,
      priceProfit: dato.precioBajada,
      mensaje: dato.mensaje,
      imagen: dato.imagen,
      cantidad: dato.cant,
      nameRestaurant: nameLocal,
      logoLocal: logoLocal,
      adicionales: dato.ArrayDetalles,
    }));

    return arrays;
  }

  //SUBIR PEDIDO A LA DATABASE

  async function uploadOrder() {
    const order = {
      nameUser: auth.currentUser.displayName,
      paymentMethod: selectedCard.name,
      cellPhone: 934756361,
      orderTime: new Date().toString(),
      location: myLocation,
      pedidos: filtroPedidos(items),
    };
    const OrderFinal = JSON.stringify(order);

    const referencia = doc(db, "Pedidos", `${auth.currentUser.email}`);
    await getDoc(referencia).then((doc) => {
      if (doc.exists()) {
        const campoActual = doc.data().Pedido;
        const nuevoValor = OrderFinal;
        const valorActualizado = campoActual + "," + nuevoValor;

        updateDoc(referencia, {
          Pedido: valorActualizado,
        });
      } else {
        setDoc(referencia, {
          Pedido: OrderFinal,
        })
          .then(() => {
            console.log("Documento creado correctamente.");
          })
          .catch((error) => {
            console.error("Error al crear el documento: ", error);
          });
      }
    });
  }

  {
    /* MANDAR LA ORDEN A LA LISTA*/
  }
  {
    /*async function AddToWishlist() {
    setLoading(true);
    const orders = [...items];
    await addDoc(collection(db, `Ordenes`), {
      logoRestaurante: logoLocal,
      numCelular: cel,
      entregado: false,
      nombreLocal: nameLocal,
      idRestaurante: IdLocal,
      categoriaLocal: ctgLocal ? ctgLocal : "",
      califRestaurant: false,
      precioAPAY: total,
      precioLocal: total2,
      nameCliente: auth.currentUser.displayName,
      idCliente: auth.currentUser.email,
      metodoPago: selectedCard.name,
      cantidadEfectivo: amountcash ? Number(amountcash) : 0,
      orderTime: new Date().toString(),
      ubicacion: {
        direccion: myLocation[0].address,
        coordinates: `${myLocation[0].location.latitude} ${myLocation[0].location.longitude}`,
      },
      orders,
    })
      .then(() => {
        console.log("Check");
        dispatch(ClearBasket());
        navigation.replace("SuccesS");
      })
      .catch((err) => {
        console.log("Error:", err.message);
        setLoading(false);
        Alert.alert("Ocurrio un error..");
      });
  }*/
  }

  {
    /*async function AddListPedidosUser() {
    const orders = [...items];
    try {
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
      });
      console.log("Check 2");
    } catch (error) {
      console.log("No paso..2");
    }
  }*/
  }

  //RENDERS COMPONENTS

  function renderHeader() {
    return (
      <Header
        title="TU PEDIDO"
        titleStyle={{
          fontSize: 16,
          lineHeight: 22,
        }}
        containerStyle={{
          height: 50,
          marginHorizontal: 16,
          marginTop: 15,
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

  function renderMyCards() {
    return (
      <View>
        {CardPAgos.map((item, index) => {
          return (
            <CartItem
              key={`MyCard-${item.id}`}
              item={item}
              UpdateCash={setAmountCash}
              isSelected={
                selectedCard
                  ? `${selectedCard.key}-${selectedCard.id}` ==
                    `MyCard-${item.id}`
                  : null
              }
              onPress={() => setSelectedCard({ ...item, key: "MyCard" })}
            />
          );
        })}
      </View>
    );
  }

  function renderDeliveryAddr() {
    return (
      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 14,
            lineHeight: 22,
            left: 3,
          }}
        >
          Dirección de entrega
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
            height: 52,
            paddingHorizontal: 20,
            borderWidth: 3,
            borderRadius: 12,
            borderColor: "#F5F5F8",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity onPress={() => ""}>
            <Image
              source={require("../../assets/location1.png")}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </TouchableOpacity>
          <Text
            onPress={() => ""}
            style={{
              marginLeft: 30,
              width: "85%",
              fontFamily: "Poppins-Regular",
              lineHeight: 22,
              fontSize: 16,
            }}
          >
            {myLocation.length > 0
              ? myLocation[0].address
              : "Coloca tú Ubicación"}
          </Text>
        </View>
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fafbff" }}>
      <StatusBar
        backgroundColor={"#fafbff"}
        barStyle="dark-content"
        translucent={false}
      />
      {renderHeader()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraScrollHeight={-200}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: 25,
        }}
      >
        {renderMyCards()}
        {renderDeliveryAddr()}
      </KeyboardAwareScrollView>
      <FooterTotal
        labelEdit={"Hacer pedido"}
        subtotal={total}
        shippingFree={0.0}
        total={total}
        onPres={() => uploadOrder()}
      />
      <Dialog isVisible={loading}>
        <Dialog.Loading loadingProps={{ size: "large", color: "#f10569" }} />
      </Dialog>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
