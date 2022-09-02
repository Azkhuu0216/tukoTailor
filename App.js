import AsyncStorage from "@react-native-async-storage/async-storage";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Providers } from "./src/provider/Providers";
import CONSTANT from "./src/styles/local";

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
