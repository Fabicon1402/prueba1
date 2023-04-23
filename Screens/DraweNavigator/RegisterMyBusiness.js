import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Header, IconButtonnn } from "../../Components";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
const windowWidth = Dimensions.get("window").width;

const RegisterMyBusiness = ({ navigation }) => {
  function renderHeader() {
    return (
      <Header
        title="REGISTRAR"
        titleStyle={{
          fontSize: 16,
          lineHeight: 22,right:5
        }}
        containerStyle={{
          height: 50,
          marginHorizontal: 12,
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
      {renderHeader()}

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/MyBusiness.jpg")}
              style={{
                width: "135%",
                height: 230,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#f10569",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                top: 15,
                paddingBottom: 28,
                paddingHorizontal: 20,
              }}
            >
              <View style={{ top: 5 }}>
                <AntDesign name="checkcircle" size={25} color="white" />
              </View>
              <View style={{ width: windowWidth - 100, right: 15 }}>
                <Text
                  style={{ color: "white", fontFamily: "Poppins-SemiBold" }}
                >
                  Va a mejorar la visibilidad de tu local.
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                top: 15,
                paddingBottom: 28,
                paddingHorizontal: 20,
              }}
            >
              <View style={{ top: 5 }}>
                <AntDesign name="checkcircle" size={25} color="white" />
              </View>
              <View style={{ width: windowWidth - 100, right: 15 }}>
                <Text
                  style={{ color: "white", fontFamily: "Poppins-SemiBold" }}
                >
                  Van a aumentar tus ventas.
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                top: 15,
                paddingBottom: 28,
                paddingHorizontal: 20,
              }}
            >
              <View style={{ top: 5 }}>
                <AntDesign name="checkcircle" size={25} color="white" />
              </View>
              <View style={{ width: windowWidth - 100, right: 15 }}>
                <Text
                  style={{ color: "white", fontFamily: "Poppins-SemiBold" }}
                >
                  Vas a optimizar tu sistema de entrega a domicilio.
                </Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: "#fafbff", paddingBottom: 75 }}>
            <View
              style={{
                paddingHorizontal: 20,
                top: 25,
                alignItems: "center",
                paddingBottom: 50,
              }}
            >
              <Text style={{ fontFamily: "Poppins-Bold", fontSize: 22 }}>
                Te llega el pedido,
              </Text>
              <Text style={{ fontFamily: "Poppins-Bold", fontSize: 22 }}>
                preparas y entregas
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                top: 25,
                paddingHorizontal: 20,
                paddingBottom: 75,
              }}
            >
              <Image
                source={require("../../assets/order-food.png")}
                style={{ width: 75, height: 75, tintColor: "black" }}
              />
              <View style={{ top: 10, width: windowWidth - 48 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#525C67",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  El cliente realiza un pedido a tu local desde Apay.
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                top: 25,
                paddingHorizontal: 20,
                paddingBottom: 75,
              }}
            >
              <Image
                source={require("../../assets/shopping-bag.png")}
                style={{ width: 75, height: 75 }}
              />
              <View style={{ top: 10, width: windowWidth - 48 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#525C67",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Recibes el pedido y comienzas a preparar lo antes posible.
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                top: 25,
                paddingHorizontal: 20,
                paddingBottom: 75,
              }}
            >
              <Image
                source={require("../../assets/delivery-man.png")}
                style={{ width: 75, height: 75 }}
              />
              <View style={{ top: 10, width: windowWidth - 48 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#525C67",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  El repartidor retira el pedido en tu local y lo lleva al
                  cliente.
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                top: 25,
                paddingHorizontal: 20,
                paddingBottom: 75,
              }}
            >
              <Image
                source={require("../../assets/take-away.png")}
                style={{ width: 75, height: 75 }}
              />
              <View style={{ top: 10, width: windowWidth - 48 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#525C67",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  El cliente recibe el pedido.
                </Text>
              </View>
            </View>
            <View
              style={{ alignItems: "center", top: 25, paddingHorizontal: 20 }}
            >
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "http://wa.me/51985043240?text=Hola,%20quiero%20ser%20parte%20de%20la%20familia%20Apay. "
                  );
                }}
                style={{
                  height: 50,
                  backgroundColor: "#f10569",
                  width: windowWidth - 45,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 16,
                  }}
                >
                  Registrarme
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterMyBusiness;

const styles = StyleSheet.create({});
