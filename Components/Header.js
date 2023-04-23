import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const Header = ({
  containerStyle,
  title,
  titleStyle,
  leftComponent,
  rightComponent,
  rightComponent2,
  rightComponent3,
  iconoUbi,
  onPress,
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
        height: 60,
        alignItems: "center",
        flexDirection: "row",
        ...containerStyle,
      }}
    >
      {leftComponent}
      <TouchableOpacity
        disabled={iconoUbi ? false : true}
        onPress={onPress}
        style={{
          left: 0,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {iconoUbi ? (
          <AntDesign
            name="enviromento"
            style={{ fontSize: 20, top: -2, color: "#f10569" }}
          />
        ) : null}
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            lineHeight: 22,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
        {iconoUbi ? (
          <AntDesign
            name="caretdown"
            style={{ fontSize: 10, color: "black", left: 10 }}
          />
        ) : null}
      </TouchableOpacity>

      <View
        style={{
          right: 0,
        }}
      >
        {rightComponent}
      </View>
      {rightComponent2}
      {rightComponent3}
    </View>
  );
};

export default Header;
