import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const CheckBoxAction = ({ options = [], onChange, multiple = false }) => {
  const [selected, setSelected] = useState([]);

  function toggle(id, texto) {
    let index = selected.findIndex((i) => i == texto);
    let arrSelecteds = [...selected];
    if (index != -1) {
      arrSelecteds.splice(index, 1);
    } else {
      multiple ? arrSelecteds.push(texto) : (arrSelecteds = [texto]);
    }
    setSelected(arrSelecteds);
  }

  useEffect(() => {
    function prueeeba() {
      selected.map((itemms, index) => {
        return onChange(itemms);
      });
    }
    prueeeba();
  }, [selected]);

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{}}>
      {options.map((op, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 13 }}>
            {op?.text}
          </Text>
          <TouchableOpacity onPress={() => toggle(op?.id, op?.text)}>
            <Image
              source={
                selected.findIndex((i) => i == op.text) !== -1
                  ? require("../assets/check_on.png")
                  : require("../assets/check_off.png")
              }
              style={{
                width: 20,
                height: 20,
                tintColor:
                  selected.findIndex((i) => i == op.text) !== -1
                    ? "#f10569"
                    : "#DDDDDD",
              }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default CheckBoxAction;

const styles = StyleSheet.create({});
