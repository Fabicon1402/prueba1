import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Circle } from "react-native-maps";
import { Dimensions } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

import { useDispatch } from "react-redux";
import { SaveAddress } from "../../ShoppingCar/BasketSlice";

const windowWidth = Dimensions.get("window").width;

const UbicacionScreen = ({ navigation }) => {
  const [manzana, setManzana] = useState(null);
  const [origin, setOrigin] = useState({
    latitude: -11.825188,
    longitude: -77.039915,
  });
  const [count, setCount] = useState(0);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  //const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(coords);
      } catch (error) {
        setErrorMsg("Error getting location");
      }
    })();
  }, [count]);

  //FUNCIONES

  const checkIfWithinRange = (lat, long) => {
    const myLat = -11.82412;
    const myLong = -77.03775;
    const distance = getDistanceFromLatLonInKm(myLat, myLong, lat, long);
    if (distance <= 0.85) {
      return true;
    }
    return false;
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleMapTypeChange = () => {
    if (mapType === "standard") {
      setMapType("satellite");
    } else {
      setMapType("standard");
    }
  };

  function checkSaveLocation() {
    const result = checkIfWithinRange(location.latitude, location.longitude);
    if (result) {
      dispatch(
        SaveAddress({
          address: manzana,
          location: `${location.latitude},${location.longitude}`,
        })
      );
      navigation.goBack();
      return console.log("ok");
    } else {
      setAlert(true);
      return console.log("Fuera de Rango");
    }
  }

  function goBackHome() {
    setAlert(false);
    setTimeout(function () {
      navigation.goBack();
    }, 250);
  }

  //RENDERIZADO DE COMPONENTES

  function renderMap() {
    return (
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        <MapView
          mapType={mapType}
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          showsCompass={false}
        >
          {location && (
            <>
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                pinColor={"#f10569"}
                draggable
                title="Estas aquí"
                onDragEnd={(e) => {
                  console.log("Drag End", e.nativeEvent.coordinate);
                  setLocation({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                }}
              />
            </>
          )}
        </MapView>
        <View
          style={{
            position: "absolute",
            width: "100%",
            top: 8,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#BBBDC1",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            >
              <Image
                source={require("../../assets/back.png")}
                style={{ width: 20, height: 20, tintColor: "#BBBDC1" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleMapTypeChange()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#BBBDC1",
                borderWidth: 1,
                backgroundColor: "white",
              }}
            >
              <Image
                source={require("../../assets/capa.png")}
                style={{ width: 22, height: 22, tintColor: "#BBBDC1" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderInfo() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <View
          style={{
            padding: 22,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "#fafbff",
            borderColor: "#BBBDC1",
            borderWidth: 1.5,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 65,
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                justifyContent: "center",
                padding: 5,
                borderWidth: 3,
                borderColor: "#F5F5F8",
              }}
            >
              <TouchableOpacity onPress={() => setCount(count + 1)}>
                <Image
                  source={require("../../assets/location1.png")}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                right: 15,
                width: windowWidth - 77,
              }}
            >
              <TextInput
                style={styles.input}
                onChangeText={setManzana}
                value={manzana}
                selectionColor={"#f10569"}
                placeholder="Manzana - Lote ( ej. M - 10 )"
                keyboardType="ascii-capable"
                maxLength={15}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              top: 30,
              paddingBottom: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => checkSaveLocation()}
              style={{
                height: 60,
                width: windowWidth - 27,
                backgroundColor: "#f10569",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 18,
                }}
              >
                Guardar Ubicación
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fafbff",
        //alignItems: "center",
        //justifyContent: "center",
      }}
    >
      {location && (
        <AwesomeAlert
          show={alert}
          showProgress={false}
          title="Delivery restringido"
          titleStyle={styles.title}
          messageStyle={styles.message}
          closeOnTouchOutside={false}
          message="Actualmente, solo podemos hacer delivery en ubicaciones cercanas. Estamos trabajando en expandir nuestro alcance. ¡Gracias por tu comprensión!"
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Entiendo"
          confirmButtonTextStyle={styles.texto}
          confirmButtonColor="#f10569"
          onConfirmPressed={() => goBackHome()}
        />
      )}
      {renderMap()}
      {renderInfo()}
    </View>
  );
};

export default UbicacionScreen;

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 0,
    borderWidth: 1,
    paddingLeft: 12,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#F5F5F8",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    height: "50%",
    width: "100%",
  },
  button: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "#444",
    fontWeight: "bold",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    width: "100%",
    textAlign: "center",
  },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "justify",
    width: "100%",
  },
  texto: {
    fontFamily: "Poppins-SemiBold",
  },
});
