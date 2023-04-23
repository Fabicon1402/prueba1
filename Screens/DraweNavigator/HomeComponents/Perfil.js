import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const Perfil = ({imagenP,containerStyle, iconStyle, quantity, onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
  >
    <Image
      source={
        imagenP
          ? { uri: imagenP }
          : {
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            }
      }
      style={{ width:40, height:40, borderRadius: 5 }}
    />
    {quantity > 0 && (
      <View
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          height: 15,
          width: 15,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          backgroundColor: "#f10569",
        }}
      >
        <Text style={{ color: "white", fontSize: 10 }}>{quantity}</Text>
      </View>
    )}
  </TouchableOpacity>
  )
}

export default Perfil