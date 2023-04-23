import { View, Text } from "react-native";
import React from "react";

const LineDivider = ({ lineStyle,contenedorPad }) => {
  return (
    <View style={{paddingHorizontal:22,...contenedorPad}}>
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#F5F5F8",
          ...lineStyle,
        }}
      />
    </View>
  );
};

export default LineDivider;
