import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");

const FortInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  inputStyle,
  value,
  setValue,
  prependComponet,
  appendComponet,
  secureTextEntry,
  KeyboardType = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = "",
  maxLengt,
}) => {
  return (
    <View
      style={{
        ...containerStyle,
        top: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 55,
          marginTop: height > 800 ? 8 : 0,
          borderRadius: 12,
          backgroundColor: "#DDDDDD",
          ...inputContainerStyle,
        }}
      >
        {prependComponet}
        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          placeholder={placeholder}
          placeholderTextColor={"#898B9A"}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          maxLength={maxLengt}
          value={value}
          onChangeText={(text) => setValue(text)}
          keyboardType={"number-pad"}
          selectionColor="#f10569"
        />
        {appendComponet}
      </View>
    </View>
  );
};

export default FortInput;

const styles = StyleSheet.create({});
