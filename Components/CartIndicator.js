import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const CartIndicator = ({
  containerStyle,
  iconStyle,
  quantity,
  onPress,
  imagenP,
  carrito,
  setCarrito,
  idLocal,
  logoLocal,
  nameLocal,
  ctgLocal,
}) => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity
      style={{
        width: imagenP ? 32 : 40,
        height: imagenP ? 32 : 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: "#fccde1",
        ...containerStyle,
      }}
      onPress={() =>
        navigation.navigate("miCarrito", {
          IdLocal: idLocal,
          logoLocal: logoLocal,
          nameLocal: nameLocal,
          ctgLocal: ctgLocal,
        })
      }
    >
      <Image
        source={require("../assets/cart.png")}
        style={{ width: 20, height: 20, tintColor: "#000000", ...iconStyle }}
      />
      {quantity > 0 && (
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            height: imagenP ? 11 : 16,
            width: imagenP ? 11 : 15,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            backgroundColor: "#f10569",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: imagenP ? 8 : 9,
              fontFamily: "Poppins-Regular",
            }}
          >
            {quantity}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartIndicator;
