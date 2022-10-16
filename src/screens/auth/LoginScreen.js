import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import { AuthContext } from "../../provider/AuthProvider.ios";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Constant from "../../styles/globalStyles";
import CONSTANT from "../../styles/local";
import images from "../../../assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isRememberMe, setIsRememberMe] = useState("");
  const [check, setCheck] = useState(false);
  const { login, googleLogin, fbLogin } = useContext(AuthContext);

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(Constant.primaryColor);
  }, []);

  const handleRememberMe = () => {
    setCheck(!check);

    if (check) {
      return AsyncStorage.removeItem("rememberMe");
    }
    AsyncStorage.setItem("rememberMe", "true");
  };

  const checkRemember = async () => {
    AsyncStorage.getItem("rememberMe").then((e) => {
      if (e === "true") {
        setIsRememberMe(true);
        AsyncStorage.getItem("loggedUser")
          .then((j) => {
            setEmail(j);
          })
          .catch((p) => {
            console.log(p);
          });
      }
    });
  };

  useEffect(() => {
    checkRemember();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>
        <View style={styles.login_logo}>
          <Animatable.Image
            style={styles.login_logoicon}
            source={images.tuko}
            animation="fadeInUp"
            delay={900}
          ></Animatable.Image>
        </View>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="И-мэйл"
          iconType="mail"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText={CONSTANT.loginPassword}
          iconType="eyeo"
          iconclick={true}
          secure={true}
        />
        <TouchableOpacity
          style={styles.Secure}
          onPress={() => handleRememberMe()}
        >
          <MaterialCommunityIcons
            name={check ? "checkbox-marked" : "checkbox-blank-outline"}
            size={23}
            style={styles.checkIcon}
          />

          <Text style={styles.Seem}>Намайг сана</Text>
        </TouchableOpacity>
        <FormButton
          buttonTitle="Нэвтрэх"
          onPress={() => login(email, password)}
        />
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("forgetPassword")}
        >
          <Text style={styles.navButtonText}>Нууц үг сэргээх</Text>
        </TouchableOpacity>

        {/* <View style={styles.login_SocialMedia}>
          <Animatable.View animation="fadeInUp" delay={1000}>
            <View>
              <TouchableOpacity
                style={[styles.login_iconButton, {backgroundColor: Constant.facebookColor}]}>
                <Icon name="facebook-f" color={Constant.whiteColor} size={20} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={1300}>
            <View>
              <TouchableOpacity
                style={[styles.login_iconButton, {backgroundColor: Constant.tweetColor}]}>
                <Icon name="twitter" color={Constant.whiteColor} size={20} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={1600}>
            <View>
              <TouchableOpacity
                style={[styles.login_iconButton, {backgroundColor: Constant.googleColor}]}>
                <Icon name="google-plus-g" color={Constant.whiteColor} size={20} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={1900}>
            <View>
              <TouchableOpacity
                style={[styles.login_iconButton, {backgroundColor: Constant.instaColor}]}>
                <Icon name="instagram" color={Constant.whiteColor} size={20} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View> */}
      </ScrollView>
      <View style={styles.login_footer}>
        <Text style={styles.login_signUpText}>Хэрэв та бүртгэлгүй бол?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text
            style={[styles.login_signUpText, { color: Constant.blueColor }]}
          >
            Бүртгүүлэх
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.primaryColor,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: Constant.darkBlueClor,
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
    alignSelf: "center",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: Constant.blueColor,
    // fontFamily: "SourceSansPro-Regular",
  },
  login_logo: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  login_logoicon: {
    width: 90,
    height: 90,
  },
  login_SocialMedia: {
    width: "80%",
    marginVertical: 40,
    marginHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  login_iconButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  login_footer: {
    height: 50,
    flexDirection: "row",
    backgroundColor: Constant.darkBlueClor,
    justifyContent: "center",
    alignItems: "center",
  },
  login_signUpText: {
    color: Constant.whiteColor,
    fontSize: 18,
    fontWeight: "500",
    // fontFamily: "SourceSansPro-Regular",
  },
  Secure: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkIcon: {
    marginRight: 5,
    color: Constant.whiteColor,
  },
  Seem: {
    fontSize: 16,
    color: Constant.whiteColor,
  },
});
