import { View, Text } from "react-native";
import React from "react";
import IconButtonnn from "./IconButtonnn";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const StepperInput = ({
  containerStyle,
  contenedor,
  value,
  onAdd,
  onMinus,
  textstyle,
  botones,
  contText,
  icono,
}) => {
  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        width: 130,
        backgroundColor: "#F5F5F8",
        borderRadius: 12,
        ...containerStyle,
      }}
    >
      <IconButtonnn
        containerStyle={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          ...contenedor,
        }}
        icon={icono}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: value > 1 ? "#f10569" : "#898B9A",
          ...botones,
        }}
        onPress={onMinus}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          ...contText,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 22,
            lineHeight: 30,
            ...textstyle,
          }}
        >
          {value}
        </Text>
      </View>

      <IconButtonnn
        containerStyle={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          ...contenedor,
        }}
        icon={require("../assets/plus.png")}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: "#f10569",
          ...botones,
        }}
        onPress={onAdd}
      />
    </View>
  );
};

export default StepperInput;
