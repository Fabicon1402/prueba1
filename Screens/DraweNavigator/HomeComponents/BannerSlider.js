import { View, Image, Pressable } from "react-native";
import React from "react";

export default function BannerSlider({ data }) {
  return (
    <Pressable disabled={false} onPress={() => ""}>
      <Image
        source={{ uri: data.img }}
        style={{ height: 160, width: 290, borderRadius: 10, right: 13 }}
      />
    </Pressable>
  );
}
