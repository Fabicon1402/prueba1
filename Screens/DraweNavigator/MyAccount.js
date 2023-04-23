import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Header, IconButtonnn, LineDivider } from "../../Components";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as ImagePicker from "expo-image-picker";
import { db, storage, auth } from "../../Database/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dialog, Image } from "@rneui/themed";
import AwesomeAlert from "react-native-awesome-alerts";
import { ProfileValue, ViewEditAccount } from "./AccountComponents";

const MyAccount = ({ navigation }) => {
  const [alert, setAlert] = useState(false);
  const [photo, setPhoto] = useState(auth.currentUser.photoURL);
  const [nameUser, setNameUser] = useState(auth.currentUser.displayName);
  const [correo, setCorreo] = useState(auth.currentUser.email);
  const [userData, setUserData] = useState();

  const [loading, setLoading] = useState(false);
  const [loadingActi, setLoadingActi] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [mss, setMss] = useState(null);

  //FUNCIONES:

  //TRAER DATOS DE LA DB
  async function getUserData() {
    try {
      const docRef = doc(db, "users", correo);
      const datos = await getDoc(docRef);

      if (datos.exists()) {
        const [profile, name, cell, email, password, ubicacion] = datos
          .data()
          .userProfile.split("**");

        return {
          success: true,
          data: {
            profile,
            name,
            cell,
            email,
            password,
            ubicacion,
          },
        };
      } else {
        return { success: false, data: [] };
      }
    } catch (error) {
      console.warn("Error fetching user data:", error);
      return { success: false, data: [] };
    }
  }

  function traductorKeys(field, value) {
    userData[field] = value; // Actualizar el campo especificado con el nuevo valor

    const updatedString = `${userData.profile}**${userData.name}**${userData.cell}**${userData.email}**${userData.password}**${userData.ubicacion}`;
    // Crear la cadena actualizada

    return updatedString; // Devolver la cadena actualizada
  }

  function pasoAtras() {
    setAlert(false);
    navigation.goBack();
  }

  function sendMessage(campoedit) {
    setMss(campoedit);
    setShowFilterModal(true);
  }

  async function updateProfilePhoto() {
    try {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted)
        throw new Error("Permission to access media library is required");

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) return;

      const imageAsset = result.assets[0];
      const imageResponse = await fetch(imageAsset.uri);
      const imageBlob = await imageResponse.blob();
      const imageRef = ref(storage, `Perfiles/${correo}`);
      const uploadTask = uploadBytesResumable(imageRef, imageBlob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log("Error uploading photo", error);
          Alert.alert("HUBO UN ERROR");
        },
        () => {
          getDownloadURL(imageRef)
            .then(async (downloadURL) => {
              const userDocRef = doc(db, "users", `${correo}`);
              await updateDoc(userDocRef, {
                userProfile: traductorKeys("profile", downloadURL),
              });
              await updateProfile(auth.currentUser, { photoURL: downloadURL });
              setPhoto(downloadURL);
              setLoading(false);
            })
            .catch((error) => {
              console.log("Error generating download URL", error);
            });
        }
      );

      setLoading(true);
    } catch (error) {
      console.log("Error updating profile photo", error);
      Alert.alert("HUBO UN ERROR");
    }
  }

  //RENDERS DE COMPONENTES

  function renderHeader() {
    return (
      <Header
        title="MI CUENTA"
        titleStyle={{
          fontSize: 16,
          lineHeight: 22,
        }}
        containerStyle={{
          height: 50,
          marginHorizontal: 16,
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
        rightComponent3={
          <View
            style={{
              width: 25,
              height: 15,
            }}
          />
        }
      />
    );
  }

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 22,
          paddingHorizontal: 22,
          paddingVertical: 20,
          borderRadius: 15,
          backgroundColor: "#474960",
        }}
      >
        <TouchableOpacity
          onPress={() => updateProfilePhoto()}
          style={{
            width: 80,
            height: 80,
          }}
        >
          <Image
            source={
              photo
                ? { uri: photo }
                : {
                    uri: "https://cdn.yostagram.com/2022/01/mia-malkova-539.jpg",
                  }
            }
            containerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              borderWidth: 1,
              borderColor: "white",
            }}
          />

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                backgroundColor: "#f10569",
              }}
            >
              <Image
                source={require("../../assets/camera.png")}
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            marginLeft: 12,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins-SemiBold",
              lineHeight: 22,
              fontSize: 18,
            }}
          >
            {nameUser}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins-Regular",
              fontSize: 10,
            }}
          >
            {correo}
          </Text>
        </View>
      </View>
    );
  }

  function renderProfileSelection() {
    const nombreApellido = nameUser.split(" ");
    return (
      <View style={styles.profileContainer}>
        <ProfileValue
          activar={true}
          onPress={() => sendMessage("Nombre")}
          icon={require("../../assets/profile.png")}
          label="Nombre"
          editTitle={{ fontFamily: "Poppins-SemiBold" }}
          value={nameUser}
          editLabel={{ fontFamily: "Poppins-Bold" }}
        />
        <LineDivider
          contenedorPad={{ paddingHorizontal: 0 }}
          lineStyle={{ height: 3 }}
        />
        <ProfileValue
          onPress={() => sendMessage("Número")}
          icon={require("../../assets/mobile.png")}
          label="Número"
          editTitle={{ fontFamily: "Poppins-SemiBold" }}
          value={userData.cell}
          editLabel={{
            fontFamily: "Poppins-Bold",
            color: "black",
          }}
        />
        <LineDivider
          contenedorPad={{ paddingHorizontal: 0 }}
          lineStyle={{ height: 3 }}
        />
        <ProfileValue
          activar={true}
          icon={require("../../assets/correo.png")}
          label="Correo"
          editTitle={{ fontFamily: "Poppins-SemiBold" }}
          value={correo}
          editLabel={{
            fontFamily: "Poppins-Bold",
            fontSize: 16,
            textAlign: "left",
          }}
        />
        <LineDivider
          contenedorPad={{ paddingHorizontal: 0 }}
          lineStyle={{ height: 3 }}
        />
        <ProfileValue
          activar={true}
          onPress={() => sendMessage("DPersonales")}
          icon={require("../../assets/tarjeta-de-identificacion.png")}
          label="Datos"
          editTitle={{ fontFamily: "Poppins-SemiBold" }}
          value="Personales"
          editLabel={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
            textAlign: "left",
            color: "#A1A1A1",
          }}
        />

        {showFilterModal && (
          <ViewEditAccount
            isVisible={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            title={mss}
            editNumber={userData}
            updateNumber={setUserData}
            editName={nombreApellido[0]}
            updateName={setNameUser}
            editApellido={nombreApellido[1]}
          />
        )}
      </View>
    );
  }

  useEffect(() => {
    setLoadingActi(true);

    async function fetchUserData() {
      try {
        const { success, data } = await getUserData();

        if (success) {
          setUserData(data);
        } else {
          setAlert(true);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        setAlert(true);
      } finally {
        setLoadingActi(false);
      }
    }

    fetchUserData();
  }, []);

  let [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (loadingActi) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#fafbff",
        }}
      >
        <ActivityIndicator size="large" color="#f10569" />
        <AwesomeAlert
          show={alert}
          showProgress={false}
          title="Error"
          titleStyle={styles.title}
          messageStyle={styles.message}
          closeOnTouchOutside={false}
          message="Algo salió mal, inténtalo de nuevo más tarde."
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonTextStyle={styles.texto}
          confirmButtonStyle={styles.containerText}
          confirmButtonColor="#f10569"
          onConfirmPressed={() => pasoAtras()}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fafbff",
      }}
    >
      {renderHeader()}
      <View style={{ top: 5 }}>
        <LineDivider />
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 16,
          paddingBottom: 150,
        }}
      >
        {userData && renderProfileCard()}
        <Dialog isVisible={loading}>
          <Dialog.Loading loadingProps={{ size: "large", color: "#f10569" }} />
        </Dialog>
        {userData && renderProfileSelection()}
      </ScrollView>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 18,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#F5F5F8",
    backgroundColor: "white",
  },
});
