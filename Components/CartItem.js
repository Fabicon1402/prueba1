import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ToPayAuxView } from "../Components";

const CartItem = ({ item, isSelected, onPress, UpdateCash }) => {
  const [dinero, setDinero] = useState("0.00");
  const [showFilterModal, setShowFilterModal] = useState(false);

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        height: 65,
        alignItems: "center",
        marginTop: 8,
        paddingHorizontal: 16,
        borderWidth: 3,
        borderRadius: 12,
        borderColor: isSelected ? "#f10569" : "#F5F5F8",
      }}
      onPress={onPress}
    >
      {/* Card Image*/}
      <View
        style={{
          right: 5,
          width: 60,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "#F5F5F8",
        }}
      >
        <Image
          source={item.icon}
          resizeMode="center"
          style={{
            width: 33,
            height: 33,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              marginLeft: 7,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {item.name}
          </Text>

          {item.name == "Efectivo" && (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginLeft: 7,
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                }}
              >
                Pagarás con
              </Text>
              <TouchableOpacity
                onPress={() => setShowFilterModal(true)}
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    marginLeft: 7,
                    fontFamily: "Poppins-Bold",
                    fontSize: 12,
                    top: -4,
                  }}
                >
                  {`S/${dinero}  `}
                </Text>

                <AntDesign name="caretdown" size={10} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={
                isSelected
                  ? require("../assets/check_on.png")
                  : require("../assets/check_off.png")
              }
              style={{
                width: 25,
                height: 25,
                tintColor: isSelected ? "#f10569" : "#DDDDDD",
              }}
            />
          </TouchableOpacity>
        </View>
        {showFilterModal && (
          <ToPayAuxView
            isVisible={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            updateDinero={setDinero}
            updateDineroAux={UpdateCash}
          />
        )}
      </View>
    </View>
  );
};

export default CartItem;
