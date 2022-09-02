import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { setNavigation } from "../utils/utiils";
import styles from "../styles/styles";
import * as Constant from "../styles/globalStyles";

const Notification = ({ navigation }) => {
  useLayoutEffect(() => {
    setNavigation(navigation, "Мэдэгдэл", true);
  }, []);

  const notification = (label, item) => {
    return (
      <View>
        <View style={css.Edit}>
          <View style={{ width: "60%" }}>
            <Text>{label}</Text>
          </View>
          <Text style={{ fontSize: 12, color: Constant.gray90Color }}>
            2 цагийн өмнө
          </Text>
        </View>
        <View style={styles.Divider}></View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <View style={styles.Divider}></View>
      <ScrollView style={{ marginHorizontal: 20 }}>
        {notification("“Алтансүх” захиалгын хугацаа дөхлөө")}
        {notification("“Алтансүх” захиалгын хугацаа хэтэрлээ")}
        {notification("Засвар гарсан")}
        {notification("Танд захиалга нэмэгдлээ")}
      </ScrollView>
    </View>
  );
};

export default Notification;

const css = StyleSheet.create({
  Edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    height: 50,
  },
});
