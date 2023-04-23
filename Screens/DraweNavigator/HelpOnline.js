import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { Header, IconButtonnn, LineDivider } from "../../Components";
import React from "react";
const windowWidth = Dimensions.get("window").width;

const HelpOnline = ({ navigation }) => {
  function renderHeader() {
    return (
      <Header
        title="AYUDA EN LÍNEA"
        titleStyle={{
          fontSize: 16,
          lineHeight: 22,
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
  return (
    <View style={{ flex: 1, backgroundColor: "#fafbff" }}>
      {renderHeader()}
      <View style={{ top: 5 }}>
        <LineDivider />
      </View>

      <View style={{ marginHorizontal: 12, alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("../../assets/undraw_Dev_focus_re_6iwt.png")}
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
          ¿Necesitas ayuda en línea?
        </Text>
        <View style={{ alignItems: "center", top: 50 }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "http://wa.me/51985043240?text=Hola,%20necesito%20ayuda."
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
              Ayuda
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HelpOnline;

const styles = StyleSheet.create({});
