import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../provider/AuthProvider.ios";
import * as Constant from "../../styles/globalStyles";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import AntIcon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import CONSTANT from "../../styles/local";
import images from "../../../assets/images";
import styles from "../../styles/styles";

const { height, width } = Dimensions.get("window");

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [ovog, setOvog] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [address, setAddress] = useState("");
  const [register, setRegister] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [date, setDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [position, setPosition] = useState(null);

  const [spinner, setSpinner] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    getProfileData();
  }, []);
  const getProfileData = async () => {
    try {
      await firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            if (user.uid === documentSnapshot.id) {
              setOvog(documentSnapshot.data().ovog);
              setfirst_name(documentSnapshot.data().first_name);
              setlast_name(documentSnapshot.data().last_name);
              setphone_number(documentSnapshot.data().phone_number);
              setAddress(documentSnapshot.data().address);
              setRegister(documentSnapshot.data().register);
              setBirthDay(documentSnapshot.data().birthDay);
              setHomePhone(documentSnapshot.data().homePhone);
              setDate(documentSnapshot.data().date);
              setPosition(documentSnapshot.data().position);
              setFinalImage(documentSnapshot.data().profile_image);
            }
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  const choosePictureFromGallery = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    }).then((image) => {
      console.log(image.path, "--------image");
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const submitProfileData = async () => {
    if (
      first_name != "" &&
      last_name != "" &&
      phone_number != "" &&
      address != ""
    ) {
      setSpinner(true);
      const imageUrl = await uploadImage();
      firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          user_id: user.uid,
          ovog: ovog,
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          address: address,
          register: register,
          birthDay: birthDay,
          homePhone: homePhone,
          date: date,
          profile_image: imageUrl == null ? finalImage : imageUrl,
        })
        .then((data) => {
          setSpinner(false);
          Alert.alert(
            CONSTANT.profileUpdated,
            CONSTANT.profilePublishedsuccessfully
          );
        })
        .catch((error) => {
          setSpinner(false);
          console.log(
            "Something went wrong with updating post to firestore.",
            error
          );
        });
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.profileAddcompletedata);
    }
  };
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`profile_image/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      console.log(e, "error");
      return null;
    }
  };
  const edit = (label) => {
    return (
      <>
        <View style={css.Edit}>
          <View style={styles.height}>
            <Text style={styles.name}>{label}</Text>
            {/* <Text style={styles.Value}>Азаа</Text> */}
            <TextInput
              autoCorrect={false}
              keyboardType={
                label === "Гар утас"
                  ? "number-pad"
                  : label === "Гэрийн утас"
                  ? "number-pad"
                  : "email-address"
              }
              value={
                label === "Ургийн овог"
                  ? ovog
                  : label === "Овог"
                  ? last_name
                  : label === "Нэр"
                  ? first_name
                  : label === "Регистрийн дугаар"
                  ? register
                  : label === "Төрсөн өдөр"
                  ? birthDay
                  : label === "Гар утас"
                  ? phone_number
                  : label === "Гэрийн утас"
                  ? homePhone
                  : label === "Гэрийн хаяг"
                  ? address
                  : date
              }
              onChangeText={(t) => {
                label === "Ургийн овог"
                  ? setOvog(t)
                  : label === "Овог"
                  ? setlast_name(t)
                  : label === "Нэр"
                  ? setfirst_name(t)
                  : label === "Регистрийн дугаар"
                  ? setRegister(t)
                  : label === "Төрсөн өдөр"
                  ? setBirthDay(t)
                  : label === "Гар утас"
                  ? setphone_number(t)
                  : label === "Гэрийн утас"
                  ? setHomePhone(t)
                  : label === "Гэрийн хаяг"
                  ? setAddress(t)
                  : setDate(t);
              }}
              style={{ width: width - 64 }}
            />
          </View>
          <Feather name="edit" color={Constant.primaryColor} size={24} />
        </View>
        <View style={styles.Divider}></View>
      </>
    );
  };
  return (
    <View style={styles.to_bg_image}>
      <ImageBackground
        resizeMode="cover"
        style={{ height: height / 4, width: width }}
        source={images.Headbackground}
      >
        <View style={styles.to_category_header}>
          <View style={css.View}>
            <View style={css.View2}>
              <Text style={css.Name}>{first_name}</Text>
              <Text style={styles.Text}>Албан тушаал: {position}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={css.Profile}
              onPress={() => choosePictureFromGallery()}
            >
              {image == null ? (
                <Image
                  style={css.logoStyle}
                  source={finalImage != null ? { uri: finalImage } : null}
                />
              ) : (
                <Image
                  style={css.logoStyle}
                  source={image != null ? { uri: image } : null}
                />
              )}
              <TouchableOpacity
                onPress={() => {}}
                style={[
                  // styles.checkBoxSelectorStyle,
                  {
                    backgroundColor: Constant.greenColor,
                    marginTop: -20,
                    marginRight: -5,
                    alignSelf: "flex-end",
                  },
                ]}
              >
                <AntIcon name="camera" size={20} color={Constant.whiteColor} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.to_margin_pages}
          showsVerticalScrollIndicator={false}
        >
          {edit("Ургийн овог")}
          {edit("Овог")}
          {edit("Нэр")}
          {edit("Регистрийн дугаар")}
          {edit("Төрсөн өдөр")}
          {edit("Гар утас")}
          {edit("Гэрийн утас")}
          {edit("Гэрийн хаяг")}
          {edit("Ажилд орсон огноо")}
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
            onPress={() => submitProfileData()}
          >
            <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
              Засах
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              height: 50,
              width: width - 40,
              backgroundColor: Constant.orangeColor,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => logout()}
          >
            <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
              Гарах
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Profile;

const css = StyleSheet.create({
  Profile: {
    borderColor: Constant.buttonColorOpacity,
    width: 100,
    height: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100 / 2,
    borderWidth: 6,
  },
  View: {
    marginTop: height / 4 - 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "red",
    width: width - 20,
  },
  View2: {
    justifyContent: "space-evenly",
    width: width / 2,
  },
  Name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Constant.whiteColor,
  },
  logoStyle: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    alignSelf: "center",
  },
  Edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: "red",
    height: 50,
  },
});
