import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

const Popular = ({ data, editTitle, editSub, navigation }) => {
  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => ""}
        activeOpacity={0.8}
        style={{
          marginLeft: index == 0 ? 0 : 10,
        }}
      >
        <View
          style={{
            height: 180,
            width: 300,
            borderRadius: 8,
          }}
        >
          <View
            style={{
              height: 100,
              top: -2,
              width: 300,
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.bg }}
              style={{
                height: 102,
                width: 300,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              }}
            />
            <View
              style={{
                position: "absolute",
                alignSelf: "flex-start",
                paddingLeft: 15,
              }}
            >
              <Image
                source={{ uri: item.img }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 6,
                }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderBottomEndRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomWidth: 1,
              borderEndWidth: 1,
              borderLeftWidth: 1,
              borderColor: "#CFD0D7",
            }}
          >
            <View
              style={{
                paddingLeft: 15,
                top: 4,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ ...editTitle }}>{item.title}</Text>
              </View>
              <View style={{}}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../../assets/calories.png")}
                />
              </View>
            </View>
            <View style={{ paddingLeft: 15, flexDirection: "row", top: -4 }}>
              <View
                style={{
                  justifyContent: "center",
                  top: -2,
                }}
              >
                <Image
                  source={require("../../../assets/clock.png")}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: "#898B9A",
                    left: 2,
                  }}
                />
              </View>
              <Text style={{ ...editSub, left: 4 }}>
                {" "}
                {`${item.tiempo - 5}-${item.tiempo} min`}{" "}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={shuffleArray(data)}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingEnd: 0,
          left: 0,
        }}
      />
    </View>
  );
};

export default Popular;
