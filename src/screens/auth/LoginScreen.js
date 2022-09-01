import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import { AuthContext } from "../../provider/AuthProvider.ios";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as CONSTANT from "../../styles/local";
import * as Constant from "../../styles/globalStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, googleLogin, fbLogin } = useContext(AuthContext);

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(Constant.primaryColor);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>
        <View style={styles.login_logo}>
          <Animatable.Image
            style={styles.login_logoicon}
            source={require("../../../assets/images/tailoron.png")}
            animation="fadeInUp"
            delay={900}
          ></Animatable.Image>
        </View>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText={CONSTANT.loginEmail}
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
        <FormButton
          buttonTitle={CONSTANT.loginSignIn}
          onPress={() => login(email, password)}
        />
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("forgetPassword")}
        >
          <Text style={styles.navButtonText}>
            {CONSTANT.loginForgotpassword}
          </Text>
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
        <Text style={styles.login_signUpText}>{CONSTANT.loginNotmember}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text
            style={[styles.login_signUpText, { color: Constant.blueColor }]}
          >
            {CONSTANT.loginRegister}
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
    fontFamily: "SourceSansPro-Regular",
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
    fontFamily: "SourceSansPro-Regular",
  },
});
