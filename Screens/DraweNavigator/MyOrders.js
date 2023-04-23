import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Header, IconButtonnn, LineDivider } from "../../Components";
import React, { useState, useEffect } from "react";
const windowWidth = Dimensions.get("window").width;
import { db } from "../../Database/Firebase";
import { collection, getDocs } from "firebase/firestore";

const MyOrders = ({ navigation }) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getDocs(collection(db, "Pedidos"))
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPedidos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setLoading(false);
      });
  }, []);

  function renderHeader() {
    return (
      <Header
        title="MIS PEDIDOS"
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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Cantidad: {item.texto}</Text>
    </View>
  );

  /*function ViewPedidos() {
    navigation.navigate("Info");
  }*/
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#fafbff",
        }}
      >
        <ActivityIndicator size="large" color="#f10569" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Pedidos</Text>
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
