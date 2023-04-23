import React, { useState, createContext, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./Database/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import { Store } from "./Store";

//IMPORT AUTHENTICATION SCREENS
import Signin from "./Screens/authentication/Signin";
import Login from "./Screens/authentication/Login";
import Splash from "./Screens/authentication/Splash";
//SCREENS
import DrawerNavigatorScreens from "./Screens/DraweNavigator/DrawerNavigatorScreens";
import LicoreriaScreen from "./Screens/Categorys/Licoreria/LicoreriaScreen";
import RestaurantsList from "./Screens/Categorys/Restaurants/RestaurantsList";
import ProfileRestaurant from "./Screens/Categorys/Restaurants/ProfileRestaurant";
import RenderItems from "./Screens/Categorys/RenderItems";
import MyCart from "./Screens/Categorys/MyCart";
import CheckoutScreen from "./Screens/Categorys/CheckoutScreen";
import LocationScreen from "./Screens/Location/LocationScreen";



const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function Screens() {
  return (
    <Provider store={Store}>
      <Stack.Navigator
        defaultScreenOptions={DrawerNavigatorScreens}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={DrawerNavigatorScreens} />
        <Stack.Screen name="licoreria" component={LicoreriaScreen} />
        <Stack.Screen name="restaurantesList" component={RestaurantsList} />
        <Stack.Screen name="perfilRestaurante" component={ProfileRestaurant} />
        <Stack.Screen name="render" component={RenderItems} />
        <Stack.Screen name="miCarrito" component={MyCart} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="location" component={LocationScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Splash}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"#f10569"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <Screens /> : <AuthStack />}
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
const styles = StyleSheet.create({});
