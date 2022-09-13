import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Constant from "../../styles/globalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import images from "../../../assets/images";
import { AuthContext } from "../../provider/AuthProvider.ios";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../utils/Dimentions";
import styles from "../../styles/styles";

const data = [
  {
    id: 1,
    name: "Бат",
    date1: "8:30",
    date2: "20:00",
  },
  {
    id: 2,
    name: "Дорж",
    date1: "9:30",
    date2: "22:00",
  },
  {
    id: 3,
    name: "Болд",
    date1: "07:30",
    date2: "19:00",
  },
];
const TimeRegistration = () => {
  const Order = (item) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color={Constant.gray90Color}
            />
            <View style={css.Order}>
              <Text>{item.item.name}</Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: Constant.gray90Color }}>Ирсэн цаг</Text>
            <Text>{item.item.date1}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: Constant.gray90Color }}>Явсан цаг</Text>
            <Text>{item.item.date2}</Text>
          </View>
        </View>
        <View style={styles.Divider}></View>
      </View>
    );
  };
  const renderItem = (item) => {
    return <Order item={item.item} />;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Цаг бүртгэл
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            height: 50,
            width: windowWidth - 40,
            backgroundColor: Constant.primaryColor,
            borderRadius: 10,
            marginBottom: 20,
          }}
          onPress={() => {}}
        >
          <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
            Цаг бүртгэх
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimeRegistration;

const css = StyleSheet.create({
  Order: {
    height: 35,
    width: 150,
    backgroundColor: Constant.bgBackground,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
});
