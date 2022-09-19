import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
// import styles from "../styles/styles";
// import Header from "../components/Header";
import * as Constant from "../../styles/globalStyles";
// import images from "../assets/images";
import firestore from "@react-native-firebase/firestore";
import images from "../../../assets/images";
import styles from "../../styles/styles";
import Header from "../../components/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Modal } from "react-native-paper";
import { windowWidth } from "../../utils/Dimentions";
const Contact = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(false);
  const [userId, setUserId] = useState("");
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
              source={
                e.profile_image != null
                  ? { uri: e.profile_image }
                  : images.profile
              }
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
  const users = () => {
    return (
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
          marginHorizontal: 40,
          borderRadius: 12,
          backgroundColor: Constant.whiteColor,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            width: windowWidth - 100,
            backgroundColor: "white",
            borderRadius: 12,
            paddingVertical: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
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
              <TouchableOpacity
                onPress={() => {
                  userId && setCheck(true);
                  setUserId(e.user_id);
                  // console.log(e.user_id, "user_id----");
                }}
              >
                <MaterialCommunityIcons
                  name={
                    userId === e.user_id && check
                      ? "checkbox-marked"
                      : "checkbox-blank-outline"
                  }
                  size={24}
                />
              </TouchableOpacity>
              <Image
                source={
                  e.profile_image != null
                    ? { uri: e.profile_image }
                    : images.profile
                }
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
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            height: 50,
            width: windowWidth / 2,
            backgroundColor: Constant.primaryColor,
            borderRadius: 10,
            marginVertical: 40,
          }}
          onPress={() => navigation.navigate("Chat", { id: userId })}
        >
          <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
            Чат бичих
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <View style={styles.to_bg_image}>
      <Header />

      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>{info()}</ScrollView>
        <TouchableOpacity //1281-1297 hurtel Button nemsen
          style={{
            borderWidth: 1,
            borderColor: Constant.primaryColor,
            backgroundColor: Constant.whiteColor,
            height: 50,
            width: 50,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 35,
            right: 20,
          }}
          onPress={() => setVisible(true)}
        >
          <FontAwesome name="wechat" size={24} color={Constant.primaryColor} />
        </TouchableOpacity>
      </View>
      {users()}
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
