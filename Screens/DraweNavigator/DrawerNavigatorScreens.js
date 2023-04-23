import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { auth } from "../../Database/Firebase";
import { signOut } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

//Screens
import HomeScreen from "./HomeScreen";
import MyOrders from "./MyOrders";
import MyFavourites from "./MyFavourites";
import MyAccount from "./MyAccount";
import RegisterMyBusiness from "./RegisterMyBusiness";
import HelpOnline from "./HelpOnline";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(auth.currentUser.photoURL);

  function updatePhotoProfile() {
    setPhoto(auth.currentUser.photoURL);
  }

  const onSignOut = () => {
    signOut(auth).catch((error) => console.error());
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
    <View style={{ flex: 1, paddingHorizontal: 0, backgroundColor: "#fafbff" }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              left: 10,
              paddingBottom: 25,
              width: 200,
            }}
            onPress={() => ""}
          >
            <Image
              source={
                photo
                  ? {
                      uri: photo,
                    }
                  : {
                      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    }
              }
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
              }}
            />
            <View style={{}}>
              <View
                style={{
                  marginLeft: 12,
                  width: 120,
                  height: 25,
                  flexWrap: "nowrap",
                  maxWidth: 120,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    fontFamily: "Poppins-SemiBold",
                    color: "black",
                  }}
                >
                  {auth.currentUser.displayName}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                  }}
                >
                  Ver tu perfil
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{ right: 12, top: -8 }}
              onPress={() => updatePhotoProfile()}
            >
              <Image
                style={{
                  width: 22,
                  height: 22,
                }}
                source={require("../../assets/refresh.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#fafbff",
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          top: -5,
        }}
      >
        <TouchableOpacity
          onPress={() => onSignOut()}
          style={{ paddingVertical: 0 }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <MaterialIcons name="logout" size={28} color="black" />
            <Text
              style={{ fontSize: 13, fontFamily: "Poppins-Regular", left: 10 }}
            >
              Cerrar sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigatorScreens = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return <CustomDrawer {...props} />;
      }}
      screenOptions={{
        drawerStyle: { width: windowWidth / 1.4 },
        drawerActiveBackgroundColor: "#f10569",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "black",
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          justifyContent: "center",
          width: 300,
          top: 3,
        },
      }}
    >
      <Drawer.Screen
        name="Inico"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="home" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mis pedidos"
        component={MyOrders}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mis favoritos"
        component={MyFavourites}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mi cuenta"
        component={MyAccount}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Registrar mi Negocio"
        component={RegisterMyBusiness}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="storefront" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Ayuda en línea"
        component={HelpOnline}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="support-agent" size={28} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorScreens;

const styles = StyleSheet.create({});
