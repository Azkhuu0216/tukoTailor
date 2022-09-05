import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import { AuthContext } from "../../provider/AuthProvider.ios";
import CONSTANT from "../../styles/local";
import * as Constant from "../../styles/globalStyles";
import AntIcon from "react-native-vector-icons/AntDesign";
import { windowHeight, windowWidth } from "../../utils/Dimentions";
import ImagePicker from "react-native-image-crop-picker";
import Spinner from "react-native-loading-spinner-overlay";
import storage from "@react-native-firebase/storage";
import images from "../../../assets/images";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [uploading, setUploading] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const [image, setImage] = useState(null);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const { register } = useContext(AuthContext);
  const [transferred, setTransferred] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const signupData = async () => {
    if (
      first_name != "" &&
      last_name != "" &&
      phone_number != "" &&
      address != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      setSpinner(true);

      if (emailValid == true) {
        if (password === confirmPassword) {
          const imageUrl = await uploadImage();
          register(
            email,
            password,
            first_name,
            last_name,
            phone_number,
            address,
            imageUrl,
            position
          );
          setEmail("");
          setConfirmPassword("");
          setPassword("");
        } else {
          setSpinner(false);
          Alert.alert(CONSTANT.Oops, "Password Not Match");
        }
      } else {
        setSpinner(false);
        Alert.alert(CONSTANT.Oops, "Incorrect Email");
      }
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.profileAddcompletedata);
    }
  };
  const choosePictureFromGallery = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const validate = (userEmail) => {
    console.log(userEmail);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(userEmail) === false) {
      setEmailValid(false);
      return false;
    } else {
      setEmailValid(true);
      setEmail(userEmail);
    }
  };

  const getmaleGenderData = () => {
    setfemale(false);
    setmale(true);
    setGender("male");
  };

  const getfemaleGenderData = () => {
    setfemale(true);
    setmale(false);
    setGender("female");
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
      console.log(e);
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={spinner} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}
        >
          <View style={[styles.mainCardStyle, { marginTop: 60 }]}>
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
                marginTop: -65,
                marginBottom: 20,
              }}
            >
              {image == null ? (
                <Image
                  style={styles.signUpLogo}
                  source={
                    finalImage != null ? { uri: finalImage } : images.profile
                  }
                />
              ) : (
                <Image
                  style={styles.signUpLogo}
                  source={image != null ? { uri: image } : images.profile}
                />
              )}
              <TouchableOpacity
                onPress={() => choosePictureFromGallery()}
                style={[
                  styles.checkBoxSelectorStyle,
                  {
                    backgroundColor: Constant.greenColor,
                    marginTop: -40,
                    marginRight: -12,
                    alignSelf: "flex-end",
                  },
                ]}
              >
                <AntIcon name="camera" size={15} color={Constant.whiteColor} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <FormInput
            labelValue={first_name}
            onChangeText={(Userfirst_name) => setfirst_name(Userfirst_name)}
            placeholderText={CONSTANT.profilefirst_name}
            autoCorrect={false}
          />
          <FormInput
            labelValue={last_name}
            onChangeText={(Userlast_name) => setlast_name(Userlast_name)}
            placeholderText={CONSTANT.profilelast_name}
            autoCorrect={false}
          />
          {/* <View style={styles.checkBoxWrapperStyle}>
            <TouchableOpacity
              onPress={() => getmaleGenderData()}
              style={styles.checkBoxStyle}
            >
              <Text>{CONSTANT.male}</Text>
              <View
                style={[
                  styles.checkBoxSelectorStyle,
                  {
                    backgroundColor:
                      gender == "male"
                        ? Constant.greenColor
                        : Constant.whiteColor,
                  },
                ]}
              >
                <Octicons
                  name="primitive-dot"
                  size={24}
                  color={Constant.whiteColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => getfemaleGenderData()}
              style={styles.checkBoxStyle}
            >
              <Text>{CONSTANT.female}</Text>
              <View
                style={[
                  styles.checkBoxSelectorStyle,
                  {
                    backgroundColor:
                      gender == "female"
                        ? Constant.greenColor
                        : Constant.whiteColor,
                  },
                ]}
              >
                <Octicons
                  name="primitive-dot"
                  size={24}
                  color={Constant.whiteColor}
                />
              </View>
            </TouchableOpacity>
          </View> */}
          <FormInput
            labelValue={phone_number}
            onChangeText={(Userphone_number) =>
              setphone_number(Userphone_number)
            }
            placeholderText={CONSTANT.profilePhone}
            autoCorrect={false}
            inputType={"phone-pad"}
          />
          <FormInput
            labelValue={address}
            onChangeText={(UserAddress) => setAddress(UserAddress)}
            placeholderText={CONSTANT.profileAddress}
            autoCorrect={false}
          />

          <FormInput
            labelValue={position}
            onChangeText={(position) => setPosition(position)}
            placeholderText="Position"
            autoCorrect={false}
          />

          <FormInput
            // labelValue={email}
            onChangeText={(userEmail) => validate(userEmail)}
            placeholderText={CONSTANT.signupEmail}
            iconType="user"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <FormInput
            // labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText={CONSTANT.signupPassword}
            iconType="lock"
            iconclick={true}
            secure={true}
          />

          <FormInput
            // labelValue={confirmPassword}
            onChangeText={(userPassword) => setConfirmPassword(userPassword)}
            placeholderText={CONSTANT.signupCpassword}
            iconType="lock"
            iconclick={true}
            secure={true}
          />

          <FormButton
            buttonTitle={CONSTANT.signupSignup}
            onPress={() => signupData()}
          />

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              {CONSTANT.signupByregisteringconfirm}{" "}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.color_textPrivate,
                  { color: Constant.orangeColor },
                ]}
              >
                {CONSTANT.signupTermsservice}
              </Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}> {CONSTANT.signupand} </Text>
            <Text
              style={[
                styles.color_textPrivate,
                { color: Constant.orangeColor },
              ]}
            >
              {CONSTANT.signupPrivacyPolicy}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.login_footer}>
          <Text style={styles.navButtonText}>
            {CONSTANT.signupHaveaccountsignin}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={[styles.login_signUpText, { color: Constant.blueColor }]}
            >
              {CONSTANT.signupSignin}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constant.primaryColor,
    flex: 1,
  },
  scrollViewStyle: {
    marginHorizontal: 20,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    color: Constant.whiteColor,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "SourceSansPro-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: Constant.whiteColor,
  },
  login_logo: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  login_logoicon: {
    width: 160,
    height: 50,
  },
  login_footer: {
    height: 50,
    flexDirection: "row",
    backgroundColor: Constant.darkBlueClor,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxWrapperStyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  checkBoxSelectorStyle: {
    height: 32,
    width: 32,
    borderColor: Constant.GainsboroColor,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxStyle: {
    width: "48%",
    marginTop: 5,
    marginBottom: 10,
    height: windowHeight / 15,
    borderColor: Constant.gray80Color,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Constant.whiteColor,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  mainCardStyle: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 8,
    paddingTop: 15,
  },
  logoStyle: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: -10,
  },
  signUpLogo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: "center",
    marginTop: -10,
  },
});
