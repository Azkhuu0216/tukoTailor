import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import { AuthContext } from "../../provider/AuthProvider.ios";
import * as CONSTANT from "../../styles/local";
import MainHeader from "../../components/MainHeader";
import * as Constant from "../../styles/globalStyles";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const { resetPassword } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={"Нууц үг сэргээх"} back={true} />
      <ScrollView style={styles.scrollViewStyle}>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="И-мэйлээ оруулна уу."
          iconType="user"
          keyboardType="email-address"
          autoCorrect={false}
        />

        <FormButton buttonTitle="Илгээх" onPress={() => resetPassword(email)} />
      </ScrollView>
      <View style={styles.login_footer}>
        <Text style={styles.navButtonText}>Хэрэв та бүртгэлтэй бол?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={[styles.login_signUpText, { color: Constant.blueColor }]}
          >
            Нэвтрэх
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constant.primaryColor,
    flex: 1,
  },
  scrollViewStyle: {
    padding: 20,
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
  navButtonText: {
    color: Constant.whiteColor,
    fontSize: 18,
    fontWeight: "500",
    // fontFamily: "SourceSansPro-Regular",
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
    color: "grey",
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
  login_signUpText: {
    fontSize: 18,
    marginLeft: 8,
  },
});
