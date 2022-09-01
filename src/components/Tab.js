import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import CONSTANT from "../styles/local";
import * as Constant from "../styles/globalStyles";

export default function Tab({ type, setType }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{
          borderBottomWidth: type ? 4 : 2,
          borderBottomColor: type
            ? Constant.primaryColor
            : Constant.GainsboroColor,
          width: "50%",
          alignItems: "center",
        }}
        onPress={() => setType(true)}
      >
        <Text style={styles.to_category_switchText}>
          {" "}
          {CONSTANT.categoriesmainMen}{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderBottomWidth: !type ? 4 : 2,
          borderBottomColor: !type
            ? Constant.primaryColor
            : Constant.GainsboroColor,
          width: "50%",
          alignItems: "center",
        }}
        onPress={() => setType(false)}
      >
        <Text style={styles.to_category_switchText}>
          {" "}
          {CONSTANT.categoriesmainWomen}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
