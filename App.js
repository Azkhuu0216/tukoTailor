import AsyncStorage from "@react-native-async-storage/async-storage";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect } from "react";
import { LogBox, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Providers } from "./src/provider/Providers";
import CONSTANT from "./src/styles/local";
LogBox.ignoreLogs([
  "Require cycle: node_modules/react-native-popup-dialog/dist/type.js",
  "[storage/unknown] The server has terminated the upload session NativeFirebaseError: [storage/unknown] The server has terminated the upload session",
  `new NativeEventEmitter()`,
  "Possible Unhandled Promise Rejection (id: 0):",
  `setBackgroundColor`,
  "EventEmitter.removeListener('keyboardWillHide', ...):",
  "WARN",
  "EventEmitter.removeListener('keyboardWillShow', ...):",
  "EventEmitter.removeListener('change', ...):",
  "EventEmitter.removeListener('keyboardDidHide', ...):",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const App = () => {
  useEffect(() => {
    getLanguage();
  });
  const getLanguage = async () => {
    const slug = await AsyncStorage.getItem("Language");

    if (slug == "en") {
      CONSTANT.setLanguage("en");
    } else if (slug == "el") {
      CONSTANT.setLanguage("el");
    } else if (slug == "fr") {
      CONSTANT.setLanguage("fr");
    } else if (slug == "tr") {
      CONSTANT.setLanguage("tr");
    } else if (slug == "ko") {
      CONSTANT.setLanguage("ko");
    } else {
      CONSTANT.setLanguage("en");
    }
  };
  return (
    <StripeProvider publishableKey="pk_test_51LaLT3BLzfDPXfTnY8ZdWJ4QLCZN0yN6n7Wy4kKHgvCyApiTlXVKHZQzsZy4AwoaRnxLmNyUOqcTLrDPU9uLYoa100zZxMfLX7">
      <Providers />
    </StripeProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
