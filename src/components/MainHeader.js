import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../provider/AuthProvider.ios";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as Constant from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
const MainHeader = (props, { navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const navigationBack = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.back == true ? (
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            activeOpacity={0.9}
            onPress={() => {
              navigationBack.goBack();
            }}
          >
            <AntIcon name="back" size={20} color={Constant.primaryColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }}></View>
        )}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: Constant.primaryColor,
              fontSize: 15,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {props.title}
          </Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          {props.logout == true ? (
            <AntIcon
              name="logout"
              size={20}
              color={Constant.primaryColor}
              onPress={() => logout()}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};
export default MainHeader;

const styles = StyleSheet.create({
  container: {
    height: 55,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: Constant.buttonColor,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
