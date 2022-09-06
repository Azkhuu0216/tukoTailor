import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/styles";
import * as Constant from "../styles/globalStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import images from "../../assets/images";
import { AuthContext } from "../provider/AuthProvider.ios";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");
const Header = ({ name, position1 }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null); // nemsen
  const [finalImage, setFinalImage] = useState(null); // nemsen
  const [first_name, setfirst_name] = useState(""); // nemsen
  const [position, setPosition] = useState(""); // nemsen
  const [showuserside, setShowuserside] = useState(false);
  const [showAdminSide, setShowAdminSide] = useState(false);
  const { user, logout } = useContext(AuthContext);
  useEffect(() => {
    getAddedUserAccess();
  }, []);

  const getAddedUserAccess = async () => {
    try {
      await firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == user.uid) {
                setfirst_name(documentSnapshot.data().first_name); // nemsen
                setPosition(documentSnapshot.data().position); // nemsen
                setFinalImage(documentSnapshot.data().profile_image); // nemsen
                if (documentSnapshot.data().role == "admin") {
                  setShowAdminSide(true);
                } else {
                  setShowuserside(true);
                }
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const pos = position1 === undefined ? position : position1;
  const fullname = name === undefined ? first_name : name;
  return (
    <ImageBackground
      resizeMode="cover"
      style={{ height: height / 4, width: width }}
      source={images.Headbackground}
    >
      <View style={styles.to_category_header}>
        {/* <View style={{ width: "90%" }}>
       <Text style={styles.to_heaeding1_font}>
         {CONSTANT.categoriesmainSelectcategory} {"&\n"}
         {CONSTANT.categoriesmainBeyourowntailor}
       </Text>
     </View> */}
        <View //543-634 hurtel nemsen
          style={{
            marginTop: height / 4 - 40,
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "red",
            width: width - 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              borderColor: Constant.buttonColorOpacity,
              width: 100,
              height: 100,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100 / 2,
              borderWidth: 6,
            }}
          >
            {image == null ? (
              <Image
                style={styles.logoStyle}
                source={
                  finalImage != null ? { uri: finalImage } : images.profile
                }
              />
            ) : (
              <Image
                style={styles.logoStyle}
                source={image != null ? { uri: image } : images.profile}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "space-evenly",
              // backgroundColor: "red",
              width: width / 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.Text}>Өдрийн мэнд</Text>
              <Ionicons name="sunny" size={28} color={Constant.buttonColor} />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: Constant.whiteColor,
              }}
            >
              {fullname}
            </Text>
            <Text style={styles.Text}>Албан тушаал:{pos}</Text>
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: Constant.whiteColor,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginRight: 10,
            }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 100,
                backgroundColor: Constant.orangeColor,
                position: "absolute",
                top: -5,
                right: -5,
              }}
            ></View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Ionicons name="ios-notifications-outline" size={26} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Header;
