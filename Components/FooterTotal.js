import { View, Text } from "react-native";
import { LineDivider, TextButton } from "../Components";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AwesomeButton from "react-native-really-awesome-button";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const FooterTotal = ({
  subtotal,
  shippingFree,
  total,
  onPres,
  off,
  container,
  labelEdit,
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
    <View>
      <View
        style={{
          padding: 18,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "white",
          elevation: 5,
          ...container,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontFamily: "Poppins-Regular",
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            Subtotal
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            {`S/${subtotal}`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              lineHeight: 22,
              fontFamily: "Poppins-Regular",
            }}
          >
            Delivery
          </Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 22,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {`S/${shippingFree}`}
          </Text>
        </View>
        <View style={{ top: 8 }}>
          <LineDivider contenedorPad={{ paddingHorizontal: 0 }} />
        </View>

        {/* Total */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 18,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 22,
              lineHeight: 30,
              fontFamily: "Poppins-Bold",
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              fontSize: 22,
              lineHeight: 30,
              fontFamily: "Poppins-Bold",
            }}
          >
            {`S/${total.toFixed(2)}`}
          </Text>
        </View>
        {labelEdit ? (
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                borderRadius: 16,
              }}
            >
              <AwesomeButton
                progress
                onPress={onPres}
                width={width - 36}
                //height={60}
                backgroundColor="#f10569"
                backgroundDarker="#f10569"
                backgroundShadow="#f10569"
                borderRadius={16}
                activityColor="white"
                disabled={off}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 22,
                    lineHeight: 30,
                    color: "white",
                    alignSelf: "center",
                    top: 5,
                  }}
                >
                  {labelEdit}
                </Text>
              </AwesomeButton>
            </View>
          </View>
        ) : (
          <TextButton
            buttonContainerStyle={{
              height: 60,
              marginTop: 20,
              borderRadius: 12,
              backgroundColor: off ? "#BBBDC1" : "#f10569",
            }}
            label={labelEdit ? labelEdit : "Ir a pagar"}
            labelStyle={{ fontSize: 20 }}
            onPress={onPres}
            disabled={off}
          />
        )}
      </View>
    </View>
  );
};

export default FooterTotal;
