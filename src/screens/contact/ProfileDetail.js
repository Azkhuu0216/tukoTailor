import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import Feather from "react-native-vector-icons/Feather";
import styles from "../../styles/styles";
import * as Constant from "../../styles/globalStyles";

const { width, height } = Dimensions.get("window");
const edit = (label, item) => {
  return (
    <>
      <View style={css.Edit}>
        <View style={styles.height}>
          <Text style={styles.name}>{label}</Text>
          {/* <Text style={styles.Value}>Азаа</Text> */}
          <Text>{item}</Text>
        </View>
      </View>
      <View style={styles.Divider}></View>
    </>
  );
};
const ProfileDetail = ({ navigation, route }) => {
  const item = route.params?.value;
  console.log(item?.user_id);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Constant.whiteColor,
        paddingBottom: 40,
      }}
    >
      <Header
        name={item.first_name}
        position1={item.position}
        image1={item.profile_image}
      />
      <View
        style={{
          marginHorizontal: 20,
          flex: 1,
        }}
      >
        {edit("Овог", item.last_name)}
        {edit("Нэр", item.first_name)}
        {edit("Төрсөн өдөр", item.birthDay)}
        {edit("Гар утас", item.phone_number)}
        {edit("Гэрийн утас", item.homePhone)}
        {edit("Гэрийн хаяг", item.address)}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              height: 50,
              width: width - 40,
              backgroundColor: Constant.primaryColor,
              borderRadius: 10,
              marginTop: 40,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
              Буцах
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetail;

const css = StyleSheet.create({
  Edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: "red",
    height: 50,
  },
});
