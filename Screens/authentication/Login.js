import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Text,
  Alert,
  StatusBar,
  ScrollView,
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
import { Input, Icon } from "@rneui/themed";
import { db, auth } from "../../Database/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AwesomeButton from "react-native-really-awesome-button";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //INICIAR SESION

  const handleLogin = () => {
    if (Email.length < 10) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Invalid password",
        "Password should be at least 6 characters."
      );
      return;
    }
    signInWithEmailAndPassword(auth, Email, password)
      .then(() => {
        console.log("Login success");
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/user-not-found":
            Alert.alert(
              "User not found",
              "The email address is not registered."
            );
            break;
          case "auth/wrong-password":
            Alert.alert("Wrong password", "The password is incorrect.");
            break;
          case "auth/network-request-failed":
            Alert.alert(
              "Network error",
              "Please check your network connection."
            );
            break;
          default:
            Alert.alert("Login error", error.message);
        }
      });
  };

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
        <View style={{ top: 30 }}>
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
            Inicia sesión para continuar.
          </Text>
        </View>
        <View style={styles.form}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              height: 65,
              alignItems: "center",
              marginBottom: 35,
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
              placeholder="Correo"
              autoCapitalize="none"
              keyboardType="email-address"
              selectionColor={"#f10569"}
              autoFocus={true}
              maxLength={40}
              value={Email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              height: 65,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#BBBDC1",
              borderRadius: 8,
              marginBottom: 60,
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
              onChangeText={(text) => setpassword(text)}
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

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                borderRadius: 16,
              }}
            >
              <AwesomeButton
                progress
                onPress={(next) => {
                  handleLogin();
                  setTimeout(next, 1000);
                }}
                width={width - 36}
                //height={60}
                backgroundColor="#f10569"
                backgroundDarker="#f10569"
                backgroundShadow="#f10569"
                borderRadius={16}
                activityColor="white"
                disabled={Email !== "" && password != "" ? false : true}
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
                  Iniciar Sesión
                </Text>
              </AwesomeButton>
            </View>
          </View>
          <View
            style={{
              marginTop: 35,
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
              ¿No tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("signin")}>
              <Text
                style={{
                  color: "#f10569",
                  fontFamily: "Poppins-Regular",
                  fontSize: 13,
                }}
              >
                Regístrate
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
  icon: {
    padding: 0,
    justifyContent: "center",
    alignSelf: "center",
    right: 12,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  form: {
    justifyContent: "center",
    marginTop: 80,
  },
  input: {
    paddingLeft: 45,
    flex: 1,
    fontSize: 16,
  },
  button: {},
});
