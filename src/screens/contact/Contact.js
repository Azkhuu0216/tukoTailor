import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
// import styles from "../styles/styles";
// import Header from "../components/Header";
import * as Constant from "../../styles/globalStyles";
// import images from "../assets/images";
import firestore from "@react-native-firebase/firestore";
import images from "../../../assets/images";
import styles from "../../styles/styles";
import Header from "../../components/Header";

const Contact = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    getUserData();
    info();
  }, []);

  const getUserData = async () => {
    try {
      await firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          const user = () => {
            return querySnapshot.docs.map((doc) => doc.data());
          };
          setuserData(user());
        });
    } catch (err) {
      console.log(err);
    }
  };
  const info = () => {
    return (
      <>
        {userData.map((e) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
            key={e.user_id}
          >
            <Image
              source={images.pro}
              style={{ height: 55, width: 60, borderRadius: 100 }}
            />
            <View style={css.Order}>
              <Text style={css.Text}>Нэр</Text>
              <Text style={css.Value}>{e.first_name}</Text>
            </View>
            <View style={css.Order}>
              <Text style={css.Text}>Албан тушаал</Text>
              <Text style={css.Value}>{e.position}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfileDetail", { value: e });
              }}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  textDecorationColor: Constant.primaryColor,
                  color: Constant.primaryColor,
                }}
              >
                Дэлгэрэнгүй
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.Divider}></View>
      </>
    );
  };
  return (
    <View style={styles.to_bg_image}>
      <Header />
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>{info()}</View>
    </View>
  );
};

export default Contact;

const css = StyleSheet.create({
  Order: {
    justifyContent: "space-between",
    height: 40,
  },
  Text: { color: Constant.gray90Color },
  Value: { fontSize: 16, fontWeight: "400" },
});
