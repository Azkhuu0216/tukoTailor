/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import * as Constant from "../styles/globalStyles";

const Loader = (props) => {
  const { backgroundColor, isWhite } = props;

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10, color: Constant.whiteColor }}>
        Түр хүлээнэ үү...
      </Text>
      <ActivityIndicator
        size="large"
        color={isWhite ? Constant.primaryColor : "white"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constant.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 1000,
  },
});

export default Loader;
