import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Text,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useRef } from "react";
import Entypo from "react-native-vector-icons/Entypo";
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
import { db, auth } from "../../Database/Firebase";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default function Signin({ navigation }) {
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cellBorderColor, setCellBorderColor] = useState("#BBBDC1");

  const handleCellChange = (text) => {
    if (text === "") {
      setCell(text);
      setCellBorderColor("#BBBDC1");
    } else if (text.charAt(0) !== "9") {
      setCell(text);
      setCellBorderColor("#f10551");
    } else if (text.charAt(0) === "9" && text.length !== 9) {
      setCell(text);
      setCellBorderColor("#f10551");
    } else {
      setCell(text);
      setCellBorderColor("#BBBDC1");
    }
  };

  async function CrearUsuario() {
    if (
      email !== "" &&
      password !== "" &&
      cell.charAt(0) == "9" &&
      nombre !== "" &&
      apellido !== ""
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const nombre1 = nombre.split(" ");
        const apellido1 = apellido.split(" ");
        const NombreF = nombre1[0][0].toUpperCase() + nombre1[0].substring(1);
        const ApellidoF =
          apellido1[0][0].toUpperCase() + apellido1[0].substring(1);
        const NombreOk = `${NombreF} ${ApellidoF}`;

        const userDocRef = doc(db, "users", `${email}`);
        const userDocData = {
          userProfile: `photo**${NombreOk}**${cell}**${email}**${password}**location`,
        };
        await setDoc(userDocRef, userDocData)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: NombreOk,
            });
          })
          .catch(async (error) => {
            // Si hay algún error en la escritura de datos en Firestore,
            // eliminamos la cuenta del usuario recién creado.
            await auth.currentUser.delete();
            Alert.alert("Error al crear usuario", error.message);
          });
      } catch (error) {
        Alert.alert("Error al crear usuario", error.message);
      }
    }
  }

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fafbff"} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ top: 25 }}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 38 }}>
            Bienvenido,
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              color: "#525C67",
              top: -15,
              fontSize: 16,
            }}
          >
            Regístrate para continuar.
          </Text>
        </View>
        <View style={styles.form}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              height: 55,
              alignItems: "center",
              marginBottom: 25,
              borderWidth: 1,
              borderColor: "#BBBDC1",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../../assets/usuario.png")}
              style={{
                width: 30,
                height: 30,
                position: "absolute",
                left: 5,
                tintColor: "#BBBDC1",
              }}
            />

            <TextInput
              selectionColor={"#f10569"}
              style={styles.input}
              placeholder="Nombre"
              autoCapitalize="none"
              autoCorrect={false}
              value={nombre}
              onChangeText={(text) => setNombre(text)}
              maxLength={20}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              height: 55,
              alignItems: "center",
              marginBottom: 25,
              borderWidth: 1,
              borderColor: "#BBBDC1",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../../assets/usuario.png")}
              style={{
                width: 30,
                height: 30,
                position: "absolute",
                left: 5,
                tintColor: "#BBBDC1",
              }}
            />

            <TextInput
              selectionColor={"#f10569"}
              style={styles.input}
              placeholder="Apellido"
              autoCapitalize="none"
              autoCorrect={false}
              value={apellido}
              onChangeText={(text) => setApellido(text)}
              maxLength={20}
            />
          </View>

          <View style={[styles.inputCell, { borderColor: cellBorderColor }]}>
            <Image
              source={require("../../assets/iphone.png")}
              style={{
                width: 30,
                height: 30,
                position: "absolute",
                left: 5,
                tintColor: "#BBBDC1",
              }}
            />

            <TextInput
              style={styles.input}
              maxLength={9}
              placeholder="Celular"
              autoCapitalize="none"
              keyboardType="number-pad"
              textContentType="emailAddress"
              selectionColor={"#f10569"}
              value={cell}
              onChangeText={handleCellChange}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              height: 55,
              alignItems: "center",
              marginBottom: 25,
              borderWidth: 1,
              borderColor: "#BBBDC1",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../../assets/correo.png")}
              style={{
                width: 30,
                height: 30,
                position: "absolute",
                left: 5,
                tintColor: "#BBBDC1",
              }}
            />

            <TextInput
              style={styles.input}
              maxLength={40}
              placeholder="Correo"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              selectionColor={"#f10569"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              height: 55,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#BBBDC1",
              borderRadius: 8,
              marginBottom: 50,
            }}
          >
            <Image
              source={require("../../assets/padlock.png")}
              style={{
                width: 30,
                height: 30,
                position: "absolute",
                left: 5,
                tintColor: "#BBBDC1",
              }}
            />

            <TextInput
              style={styles.input}
              selectionColor={"#f10569"}
              placeholder="Contraseña"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showPassword}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              maxLength={20}
            />
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              size={25}
              color="gray"
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <View
              style={{
                borderRadius: 16,
              }}
            >
              <AwesomeButton
                progress
                onPress={(next) => {
                  CrearUsuario();
                  setTimeout(next, 1000);
                }}
                width={width - 36}
                //height={60}
                backgroundColor={
                  cell.length == 9 &&
                  password != "" &&
                  nombre != "" &&
                  apellido != ""
                    ? "#f10569"
                    : "#f99bc3"
                }
                backgroundDarker={
                  cell.length == 9 &&
                  password != "" &&
                  nombre != "" &&
                  apellido != ""
                    ? "#f10569"
                    : "#f99bc3"
                }
                backgroundShadow={
                  cell.length == 9 &&
                  password != "" &&
                  nombre != "" &&
                  apellido != ""
                    ? "#f10569"
                    : "#f99bc3"
                }
                borderRadius={16}
                activityColor="white"
                disabled={
                  password != "" &&
                  email != "" &&
                  cell.length == 9 &&
                  password != "" &&
                  nombre != "" &&
                  apellido != ""
                    ? false
                    : true
                }
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
                  Registrarte
                </Text>
              </AwesomeButton>
            </View>
          </View>

          <View
            style={{
              marginTop: 28,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "gray",
                fontFamily: "Poppins-Regular",
                fontSize: 13,
              }}
            >
              ¿Tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("login")}>
              <Text
                style={{
                  color: "#f10569",
                  fontFamily: "Poppins-Regular",
                  fontSize: 13,
                }}
              >
                Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbff",
    paddingHorizontal: 18,
  },
  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginTop: 55,
  },
  icon: {
    padding: 0,
    justifyContent: "center",
    alignSelf: "center",
    right: 12,
  },
  form: {
    justifyContent: "center",
    marginTop: 45,
  },
  input: {
    paddingLeft: 45,
    flex: 1,
    fontSize: 16,
  },
  inputCell: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 55,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#BBBDC1",
    borderRadius: 8,
  },
});
