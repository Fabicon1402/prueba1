import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const TextButton = ({
  buttonContainerStyle,
  label,
  labelStyle,
  label2 = "",
  label2Style,
  onPress,
  disabled
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
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:disabled?"gray": "#f10569",
        ...buttonContainerStyle,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 15,
          lineHeight: 22,
          fontFamily: "Poppins-SemiBold",
          ...labelStyle
        }}
      >
        {label}
      </Text>

      {label2 != "" && (
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            color: "#FFFFFF",
            fontSize: 15,
            fontFamily:"Poppins-SemiBold",
            lineHeight: 22,
            ...label2Style
          }}
        >
            {label2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
