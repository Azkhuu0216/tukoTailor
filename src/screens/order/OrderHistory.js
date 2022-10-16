import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  RefreshControl,
} from "react-native";
import * as Constant from "../../styles/globalStyles";
import firestore from "@react-native-firebase/firestore";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../../styles/styles";

import CONSTANT from "../../styles/local";
import { ScrollView } from "react-native-virtualized-view";

const OrderHistory = ({ navigation }) => {
  const [orderData, setOrderData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [check, setCheck] = useState(true);

  useEffect(() => {
    // getAdminInfo();
    getordersData();
  }, []);

  useEffect(() => {
    setSearchData(orderData);
  }, [orderData]);

  const getordersData = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection("orders")
        .onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((documentSnapshot) => {
            setOrderData(documentSnapshot.data().selected_apparels);
            setLoading(true);
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  // const getAdminInfo = async () => {
  //   try {
  //     await firestore()
  //       .collection("users")
  //       .onSnapshot((querySnapshot) => {
  //         if (querySnapshot != null) {
  //           querySnapshot.forEach((documentSnapshot) => {
  //             // if (documentSnapshot.exists == true) {
  //             //   if (documentSnapshot.data().email === user.email) {
  //             //   } else {
  //             //     setGuestId(documentSnapshot.data().id);
  //             //   }
  //             // }

  //             if (documentSnapshot.id == user.uid) {
  //             } else {
  //               if (documentSnapshot.data().role == "admin") {
  //                 setGuestId(documentSnapshot.data().user_id);
  //               }
  //             }
  //           });
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const Order = (item) => {
    return (
      <View>
        <View style={css.OrderView}>
          <View style={css.Order}>
            <Text>{item.item.firstname}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: Constant.gray90Color }}>Огноо</Text>
            <Text>{item.item.date}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddCategories", {
                value: item.item,
                ok: true,
              });
            }}
          >
            <Text style={css.More}>Дэлгэрэнгүй</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Divider}></View>
      </View>
    );
  };

  const renderItem = (item) => {
    return <Order item={item.item} />;
  };

  const handleSearchData = (text) => {
    const newData = orderData.filter((e) => {
      const listData = e.firstname.toUpperCase();
      const itemListData = e.phone.toUpperCase();
      const textData = text.toUpperCase();

      return check
        ? listData.indexOf(textData) > -1
        : itemListData.indexOf(textData) > -1;
    });
    setSearchData(newData);
    setText(text);
  };
  const onRefresh = () => {
    getordersData();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      <View style={{ padding: 20, flex: 1 }}>
        <View style={styles.to_row_view}>
          <View style={styles.inputView}>
            <Feather
              style={{ paddingHorizontal: 10 }}
              name="search"
              type="font-awesome"
              color={Constant.gray90Color}
              size={20}
            />
            <TextInput
              style={styles.input}
              placeholder={check ? "Нэрээр хайх" : "Утасны дугаараар хайх"}
              placeholderTextColor={Constant.gray90Color}
              keyboardType="email-address"
              textContentType="email_address"
              autoCompleteType="email"
              returnKeyType="next"
              value={text}
              onChangeText={handleSearchData}
            />
          </View>
          <TouchableOpacity
            style={css.filterView}
            onPress={() => setCheck(!check)}
          >
            <AntDesign name="filter" size={25} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Divider}></View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={searchData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
            }
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({
  Order: {
    height: 35,
    width: 100,
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
  OrderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  More: {
    textDecorationLine: "underline",
    textDecorationColor: Constant.primaryColor,
    color: Constant.primaryColor,
    marginRight: 5,
  },
  filterView: {
    height: 45,
    width: 50,
    backgroundColor: Constant.grayColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 5,
  },
});

export default OrderHistory;
