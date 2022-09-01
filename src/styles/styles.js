import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import * as Constant from "../styles/globalStyles";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  // Global style
  to_row_view: {
    flexDirection: "row",
  },

  to_container: {
    flex: 1,
    backgroundColor: "#062347",
  },

  to_margin_pages: {
    marginHorizontal: 20,
  },
  height: {
    justifyContent: "space-between",
    height: 40,
  },
  name: { color: Constant.gray90Color },
  Value: { fontSize: 16, fontWeight: "400" },
  // Login & Signup

  //Logo
  login_logo: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  login_logoicon: {
    width: 160,
    height: 50,
  },
  //Text inputs and Button
  login_input: {
    width: "100%",
    height: 45,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#062347",
    fontFamily: "SourceSansPro-Regular",
  },
  login_passwordinput: {
    width: "90%",
    height: 45,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#062347",
    fontFamily: "SourceSansPro-Regular",
  },
  login_passwordeye: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 10,
    width: "10%",
    borderBottomEndRadius: 6,
    borderTopRightRadius: 6,
    marginLeft: -1,
  },

  login_button: {
    backgroundColor: "#f1c40f",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  login_ButtonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#062347",
    alignSelf: "center",
    fontFamily: "Manrope-Regular",
  },
  login_fpText: {
    alignSelf: "center",
    color: "#107bc0",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 25,
    fontFamily: "SourceSansPro-Regular",
  },
  //Social Icons
  login_SocialMedia: {
    marginVertical: 60,
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
  //Footer
  login_footer: {
    height: 50,
    flexDirection: "row",
    backgroundColor: "#041832",
    justifyContent: "center",
    alignItems: "center",
  },
  login_signUpText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "SourceSansPro-Regular",
  },

  //Categories

  to_bg_image: {
    flex: 1,
    backgroundColor: Constant.whiteColor,
    // resizeMode: "cover",
    // justifyContent: "center",
  },
  firstBack: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: Constant.primaryColor,
  },
  //category header
  to_category_header: {
    height: 120,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  to_heaeding1_font: {
    fontSize: 24,
    color: "#ffffff",
    fontFamily: "Manrope-Regular",
  },

  to_category_profile_bg: {
    bottom: 0,
    height: 76,
    width: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginRight: 10,
    width: "20%",
  },
  to_category_profile_img: {
    position: "absolute",
    bottom: 3,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#062347",
  },
  //search Field
  inputView: {
    height: 45,
    backgroundColor: Constant.grayColor,
    borderRadius: 5,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    marginBottom: 20,

    // shadowColor: "#000",
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 1,
    // },
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 4,
    color: Constant.primaryColor,
    paddingHorizontal: 10,
  },

  to_heaeding2_font: {
    fontSize: 22,
    color: "#062347",
    fontFamily: "Manrope-Regular",
    fontWeight: "700",
    marginVertical: 10,
  },

  to_category_switchText: {
    padding: 6,
    fontSize: 16,
    fontWeight: "900",
    color: "#062347",
    fontFamily: "Manrope-Regular",
  },
  to_category_switchTabsView: {
    flexDirection: "column",
  },
  //category card view
  to_category_card: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 5,
    width: "48%",
    elevation: 3,
  },
  to_category_card_img: {
    height: 200,
    width: "100%",
  },
  to_category_card_title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    padding: 10,
  },
  logoStyle: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderWidth: 1,
    alignSelf: "center",
  },
  Text: {
    fontSize: 18,
    color: Constant.whiteColor,
    marginRight: 10,
    fontWeight: "500",
  },
  Give: {
    fontSize: 12,
    color: Constant.gray90Color,
    textAlign: "center",
  },
  Divider: {
    borderBottomWidth: 2,
    borderBottomColor: Constant.GainsboroColor,
  },
});

export default styles;
