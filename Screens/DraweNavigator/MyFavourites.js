import { StyleSheet, Text, View, Image } from "react-native";
import { Header, LineDivider, IconButtonnn } from "../../Components";
import React from "react";

const MyFavourites = ({ navigation }) => {
  function renderHeader() {
    return (
      <Header
        title="MIS FAVORITOS"
        titleStyle={{
          fontSize: 16,
          lineHeight: 22,
        }}
        containerStyle={{
          height: 50,
          marginHorizontal: 18,
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
        <LineDivider contenedorPad={{ paddingHorizontal: 18 }} />
      </View>

      <View style={{ marginHorizontal: 24, alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("../../assets/undraw_Loving_it_re_jfh4.png")}
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
          Aún no tienes favoritos.
        </Text>
      </View>
    </View>
  );
};

export default MyFavourites;

const styles = StyleSheet.create({});
