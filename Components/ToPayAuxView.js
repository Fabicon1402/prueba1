import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Dialog, CheckBox, ListItem, Avatar } from "@rneui/themed";
import { TextButton } from "../Components";

const { width, height } = Dimensions.get("window");

const ToPayAuxView = ({
  isVisible,
  onClose,
  category,
  title,
  updateDinero,
  updateDineroAux,
}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [loading, setLoading] = useState(false);
  const [saveDinero, setSaveDinero] = useState(null);

  function UpdateMoney() {
    updateDinero(saveDinero);
    updateDineroAux(saveDinero);
    setShowFilterModal(false);
  }

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, height - 450],
  });

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <StatusBar
        backgroundColor={"rgba(0, 0, 0, 0.7)"}
        barStyle="dark-content"
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <Dialog isVisible={loading}>
          <Dialog.Loading loadingProps={{ size: "large", color: "#f10569" }} />
        </Dialog>
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            top: modalY,
            left: 0,
            width: "100%",
            height: "100%",
            padding: 16,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            backgroundColor: "#fafbff",
          }}
        >
          <View style={{ flex: 1, paddingBottom: 190 }}>
            <ScrollView contentContainerStyle={{}}>
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingBottom: 15,
                }}
              >
                <View
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
                <View
                  style={{
                    width: "70%",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 0,
                    height: 110,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Bold",
                      fontSize: 28,
                      textAlign: "center",
                      top: 0,
                    }}
                  >
                    ¿Cuánto es tu efectivo?
                  </Text>
                </View>

                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Image
                    source={require("../assets/cross.png")}
                    style={{ width: 35, height: 35, tintColor: "#f10569" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: "55%",
                    flexDirection: "row",
                    top: 25,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#F5F5F8",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      left: 30,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color: "black",
                        fontFamily: "Poppins-Bold",
                        top: 5,
                      }}
                    >
                      S/
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      left: 30,
                    }}
                  >
                    <TextInput
                      style={styles.input2}
                      onChangeText={(text) => setSaveDinero(text)}
                      value={saveDinero}
                      selectionColor={"#f10569"}
                      placeholder="0"
                      maxLength={3}
                      keyboardType="phone-pad"
                      placeholderTextColor={"black"}
                      autoFocus={true}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.profileContainer}></View>
              <View
                style={{
                  top: -5,
                  height: 80,
                  justifyContent: "center",
                }}
              >
                <TextButton
                  disabled={false}
                  buttonContainerStyle={{
                    flexDirection: "row",
                    height: 60,
                    marginLeft: 0,
                    paddingHorizontal: 0,
                    borderRadius: 12,
                  }}
                  label="Agregar"
                  onPress={() => UpdateMoney()}
                />
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ToPayAuxView;

const styles = StyleSheet.create({
  inputt: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  profileContainer: {
    marginTop: 18,
    paddingHorizontal: 18,
    padding: 15,
    height: 100,
  },
  input2: {
    height: 75,
    width: 100,
    fontSize: 30,
    padding: 0,
    margin: 0,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
  inputtt: {
    fontSize: 15,
    color: "black",
    fontFamily: "Poppins-Regular",
    padding: 15,
    backgroundColor: "red",
  },
});
