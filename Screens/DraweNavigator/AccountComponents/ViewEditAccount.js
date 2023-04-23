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
import { db, storage, auth } from "../../../Database/Firebase";
import { signOut, updateProfile } from "firebase/auth";
import { TextButton } from "../../../Components";
import { Button } from "@rneui/themed";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const ViewEditAccount = ({
  isVisible,
  onClose,
  category,
  initialIndex,
  updateIndex,
  title,
  editNumber,
  updateNumber,
  editName,
  updateName,
  editApellido,
  updateApellido,
}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [newNumber, setNewNumber] = useState(editNumber.cell);
  const [NewName, setNewName] = useState(editName);
  const [NewApellido, setNewApellido] = useState(editApellido);
  const [loading, setLoading] = useState(false);

  function UpdateIn(ind) {
    updateIndex(ind);
    setShowFilterModal(false);
  }

  function traductorKeys(field, value) {
    editNumber[field] = value; // Actualizar el campo especificado con el nuevo valor

    const updatedString = `${editNumber.profile}**${editNumber.name}**${editNumber.cell}**${editNumber.email}**${editNumber.password}**${editNumber.ubicacion}`;
    // Crear la cadena actualizada

    return updatedString; // Devolver la cadena actualizada
  }

  function updateStateNumber(valor) {
    editNumber.cell = valor;
    return editNumber;
  }

  /* ACTUALIZAR EL NUMERO DE CELULAR DEL USUARIO*/
  async function updateNumero() {
    setLoading(true);
    const NumberD = doc(db, "users", `${auth.currentUser.email}`);
    await updateDoc(NumberD, {
      userProfile: traductorKeys("cell", newNumber),
    })
      .then(() => {
        updateNumber(updateStateNumber(newNumber));
        setLoading(false);
        setShowFilterModal(false);
        // Profile updated!
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("No se puedo actualizar, intentelo más tarde");
      });
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
    outputRange: [height, height - 500],
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
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: 25,
                width: 25,
              }}
            />
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 20,
                lineHeight: 30,
              }}
            >
              EDITAR
            </Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Image
                source={require("../../../assets/cross.png")}
                style={{ width: 35, height: 35, tintColor: "#f10569" }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            {title === "Número" && (
              <View style={styles.profileContainer}>
                <View
                  style={{
                    height: 80,
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={styles.input2}
                    onChangeText={setNewNumber}
                    value={newNumber}
                    selectionColor={"#f10569"}
                    placeholder="Número de celular"
                    maxLength={9}
                    keyboardType="phone-pad"
                  />
                </View>
                <View
                  style={{
                    height: 80,
                    justifyContent: "center",
                  }}
                >
                  <TextButton
                    buttonContainerStyle={{
                      flexDirection: "row",
                      height: 60,
                      marginLeft: 0,
                      paddingHorizontal: 0,
                      borderRadius: 12,
                      backgroundColor: "#f10569",
                    }}
                    label="Actualizar"
                    onPress={() => updateNumero()}
                  />
                </View>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ViewEditAccount;

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
    borderWidth: 3,
    borderRadius: 12,
    borderColor: "#F5F5F8",
    padding: 15,
    backgroundColor: "white",
  },
  input2: {
    backgroundColor: "#fafbff",
    borderColor: "#F5F5F8",
    borderWidth: 2,
    height: 55,
    marginBottom: 0,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    color: "black",
    fontFamily: "Poppins-Regular",
  },
});
