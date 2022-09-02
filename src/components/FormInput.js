import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimentions";

import AntDesign from "react-native-vector-icons/AntDesign";

const FormInput = ({
  labelValue,
  placeholderText,
  inputType,
  iconType,
  editable,
  iconclick,
  secure,
  autoCorrect,
  ...rest
}) => {
  const [secureP, setSecureP] = useState(secure);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholderText}
        value={labelValue}
        placeholderTextColor="#767676"
        style={styles.input}
        autoCorrect={autoCorrect}
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType={inputType}
        editable={editable}
        secureTextEntry={secureP}
        {...rest}
      />

      {iconclick == true ? (
        <TouchableOpacity style={styles.iconStyle}>
          <AntDesign
            onPress={() => setSecureP(!secureP)}
            name={iconType}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.iconStyle}>
          <AntDesign name={iconType} size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  iconStyle: {
    height: "100%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 17,
    color: "#062347",
    // fontFamily: "SourceSansPro-Regular",
    width: "90%",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
