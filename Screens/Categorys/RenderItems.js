import {
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import {
  Header,
  IconButtonnn,
  LineDivider,
  StepperInput,
  TextButton,
  CheckBoxAction,
} from "../../Components";
import { useDispatch } from "react-redux";
import { AddtoBasket } from "../../ShoppingCar/BasketSlice";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
const FoodDetails = ({ route, navigation }) => {
  const { opcionesD, titulo, imagen, descripcion, precio, id, precioBajada } =
    route.params;
  const [cant, setCant] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [ArrayDetalles, setArrayDetalles] = useState([]);
  const dispatch = useDispatch();

  function addItemtoCart() {
    dispatch(
      AddtoBasket({
        titulo,
        descripcion,
        precio,
        imagen,
        cant,
        precioBajada: precioBajada ? precioBajada : 0,
        id,
        mensaje,
        ArrayDetalles,
      })
    );
    navigation.goBack();
  }

  {
    /* GUARDAR DATOS ADICIONALES DEL PRODUCTO*/
  }
  function ArrayOptionsFinal(texto, idd) {
    let arrayAux = [...ArrayDetalles];
    if (arrayAux.length > 0) {
      let index = arrayAux.findIndex((i) => i.id == idd);
      if (index != -1) {
        arrayAux.splice(index, 1, { id: idd, itemSelected: texto });
      } else {
        arrayAux.push({ id: idd, itemSelected: texto });
      }
    } else {
      arrayAux.push({ id: idd, itemSelected: texto });
    }
    setArrayDetalles(arrayAux);
  }

  // COMPONENTS RENDERING

  function renderHeader() {
    return (
      <Header
        title="Detalle"
        titleStyle={{ right: 3 }}
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
        rightComponent3={<View style={{ height: 15, width: 25 }} />}
      />
    );
  }

  function renderDetail() {
    return (
      <View style={{ marginTop: 15, marginBottom: 24, paddingHorizontal: 16 }}>
        {/* Food Card */}
        <View
          style={{
            height: 210,
            borderRadius: 15,
            backgroundColor: "white",
            padding: 10,
            alignItems: "center",
            borderColor: "#F5F5F8",
            borderWidth: 1,
          }}
        >
          {/* Calories & Favourite */}

          {/* Food Image */}
          <View style={{ height: 200, alignItems: "center", width: 200 }}>
            <Image
              source={{ uri: imagen }}
              resizeMode="contain"
              style={{
                height: 190,
                width: 187,
              }}
            />
          </View>
        </View>
        {/* Food Info */}
        <View
          style={{
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: titulo.length > 12 ? 25 : 30,
              lineHeight: 36,
            }}
          >
            {titulo}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              marginTop: 8,
              color: "#525C67",
              textAlign: "justify",
              fontSize: 16,
              lineHeight: 22,
            }}
          >
            {descripcion}
          </Text>
          <View style={{ top: 20 }}>
            <LineDivider
              lineStyle={{ height: 2 }}
              contenedorPad={{ paddingHorizontal: 0 }}
            />
          </View>
          {opcionesD.length > 0 && (
            <View style={{ top: 35 }}>
              {opcionesD.map((valoress, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <Text
                    style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}
                  >
                    {valoress.tituloOption}
                  </Text>
                  <CheckBoxAction
                    options={valoress.items}
                    onChange={(op) => ArrayOptionsFinal(op, index)}
                  />
                  <View style={{ top: 10 }}>
                    <LineDivider
                      lineStyle={{ height: 2 }}
                      contenedorPad={{ paddingHorizontal: 0 }}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={{ top: 45, paddingBottom: 50 }}>
            <View style={{ top: 8 }}>
              <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
                ¿Quieres aclarar algo?{" "}
              </Text>
            </View>

            <View style={styles.profileContainer}>
              <TextInput
                style={styles.input2}
                multiline
                onChangeText={setMensaje}
                value={mensaje}
                selectionColor={"#f10569"}
                placeholder="Añade instrucciones y/o comentarios."
                maxLength={100}
                autoCorrect={false}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 120,
          alignItems: "center",
          paddingHorizontal: 16,
          paddingBottom: 12,
        }}
      >
        <StepperInput
          icono={require("../../assets/minus.png")}
          value={cant}
          onAdd={() => setCant(cant + 1)}
          onMinus={() => {
            if (cant > 1) {
              setCant(cant - 1);
            }
          }}
        />

        {/* Text Button*/}
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            flexDirection: "row",
            height: 60,
            marginLeft: 12,
            paddingHorizontal: 12,
            borderRadius: 12,
            backgroundColor: "#f10569",
          }}
          label="Agregar"
          label2={
            precioBajada ? `S/${precioBajada * cant}` : `S/${precio * cant}`
          }
          label2Style={{ fontSize: 14 }}
          onPress={() => addItemtoCart()}
        />
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
    <View style={{ flex: 1, backgroundColor: "#fafbff" }}>
      <StatusBar
        backgroundColor={"#fafbff"}
        barStyle="dark-content"
        translucent={false}
      />
      {/*Header*/}
      {renderHeader()}

      {/*Body*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderDetail()}
      </ScrollView>
      {/* Footer */}

      <LineDivider contenedorPad={{ paddingHorizontal: 0 }} />
      {renderFooter()}
    </View>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 15,
    height: 145,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#F5F5F8",
    padding: 0,
    backgroundColor: "white",
  },
  input2: {
    fontSize: 15,
    color: "black",
    fontFamily: "Poppins-Regular",
    padding: 15,
  },
});
