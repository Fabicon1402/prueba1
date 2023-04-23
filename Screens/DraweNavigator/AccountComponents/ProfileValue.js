import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";


const ProfileValue = ({
  icon,
  label,
  value,
  onPress,
  editTitle,
  editLabel,
  activar
}) => {
  return (
    <TouchableOpacity
        disabled={activar}
      style={{
        flexDirection: "row",
        height: 80,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          backgroundColor: "#fafbff",
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: "#f10569",
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}
      >
        {label && (
          <Text
            style={{
              color: "#A1A1A1",
              fontSize: 16,
              lineHeight: 22,
              ...editTitle,
            }}
          >
            {label}
          </Text>
        )}
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,

              ...editLabel,
            }}
          >
            {value}
          </Text>
        </View>
      </View>

      <Image
        source={require("../../../assets/right_arrow.png")}
        style={{
          width: 15,
          height: 15,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileValue;

const styles = StyleSheet.create({});
