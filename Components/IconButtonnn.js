import React from "react";
import { TouchableOpacity, Image } from "react-native";

const IconButtonnn = ({ containerStyle, icon, iconStyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...containerStyle }}>
      <Image
        source={icon}
        style={{ width: 30, height: 30, tintColor: "#FFFFFF", ...iconStyle }}
      />
    </TouchableOpacity>
  );
};

export default IconButtonnn;
