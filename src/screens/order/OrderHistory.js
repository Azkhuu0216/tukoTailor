import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import * as Constant from "../../styles/globalStyles";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../../provider/AuthProvider.ios";
import styles from "../../styles/styles";

import CONSTANT from "../../styles/local";
import { ScrollView } from "react-native-virtualized-view";
import { useStateWithCallbackLazy } from "use-state-with-callback";
const window = Dimensions.get("window");
const PERPAGE = 20;

const OrderHistory = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [completeorder_data, setCompleteorder_data] = useState([]);
  const [dialoigeVisible, setDialoigeVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [guestId, setGuestId] = useState("");
  const [currency, setcurrency] = useState("");
  const [showNoRecord, setShowNoRecord] = useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [orderData, setOrderData] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchedAll, setFetchedAll] = useState(false);
  const [perPage, setPerPage] = useStateWithCallbackLazy(PERPAGE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getAdminInfo();
    getordersData();
    getcurrencyData();
  }, [showNoRecord]);

  const getcurrencyData = async () => {
    try {
      await firestore()
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == "currency") {
                setcurrency(documentSnapshot.data().currency[0]);
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getordersData = async () => {
    try {
      await firestore()
        .collection("orders")
        .onSnapshot((querySnapshot) => {
          querySnapshot.docs.map(
            (documentSnapshot) => {
              setOrderData(documentSnapshot.data().selected_apparels);
              setLoading(true);
            }
            // if (user.uid == documentSnapshot.id) {
            //   var sortedArray = documentSnapshot
            //     .data()
            //     .order.sort((a, b) => new Date(b.date) - new Date(a.date));
            //   setCompleteorder_data(sortedArray);
            //   setShowNoRecord(false);
            //   console.log("here is the data", documentSnapshot.data().order);
            // }
          );
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

  const _renderItem = ({ item, index }) => {
    let Main_Index = index;
    return (
      <View
        activeOpacity={0.9}
        style={{
          marginVertical: 10,
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: Constant.whiteColor,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            borderRadius: 4,
            backgroundColor: Constant.whiteColor,
          }}
        >
          <View
            style={{
              borderRadius: 4,
              backgroundColor: Constant.primaryColor,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Image
                style={{
                  height: 65,
                  width: 65,
                  borderRadius: 4,
                  marginTop: 15,
                }}
                source={{
                  uri:
                    item.image != null
                      ? item.image
                      : "https://www.padf.org/wp-content/uploads/2020/04/placeholder.png",
                }}
              />
              <View
                style={{
                  borderColor: Constant.whiteColor,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 6,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    color: Constant.whiteColor,
                    fontWeight: "700",
                    fontSize: 18,
                  }}
                >
                  {item.status}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                flex: 2,
              }}
            >
              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                {CONSTANT.orderlistID}
              </Text>

              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.order_id}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#324B69",
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                flex: 2,
              }}
            >
              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                {CONSTANT.orderhistoryfirst_name}
              </Text>

              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.first_name}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#324B69",
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                flex: 2,
              }}
            >
              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                {CONSTANT.orderhistorylast_name}
              </Text>

              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.last_name}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#324B69",
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                flex: 2,
              }}
            >
              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                {CONSTANT.orderhistoryPhone}
              </Text>

              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.phone_number}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#324B69",
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                flex: 2,
              }}
            >
              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                {CONSTANT.orderhistoryAddress}
              </Text>

              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.address}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#324B69",
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                flex: 2,
              }}
            >
              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                {CONSTANT.orderlistPrice}
              </Text>

              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {currency} {item.order_data[0].price}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#324B69",
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                flex: 2,
              }}
            >
              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  flex: 1,
                }}
              >
                {CONSTANT.orderlistDate}
              </Text>

              <Text
                style={{
                  color: Constant.whiteColor,
                  marginHorizontal: 20,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                  textAlign: "right",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.date}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#324B69",
                borderBottomWidth: 1,
                marginHorizontal: 20,
              }}
            />
            {item.status == "Processing" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    color: Constant.whiteColor,
                  }}
                >
                  {CONSTANT.orderhistoryContactSeller}
                </Text>
                <View
                  style={{
                    backgroundColor: Constant.buttonColor,
                    borderRadius: 6,
                    borderColor: Constant.GainsboroColor,
                    borderWidth: 0.6,
                  }}
                >
                  <Text
                    onPress={() =>
                      navigation.navigate("ChatScreen", {
                        id: JSON.stringify(guestId),
                      })
                    }
                    style={{
                      fontSize: 17,
                      fontWeight: "700",
                      color: Constant.primaryColor,

                      padding: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    {CONSTANT.orderhistoryChat}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <FlatList
            data={item.order_data}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: Constant.whiteColor,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 5,
                  }}
                >
                  <Text
                    style={{
                      color: Constant.blackColor,
                      marginHorizontal: 10,
                      fontSize: 17,
                      fontWeight: "700",
                      marginVertical: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Icon
                    onPress={() => {
                      setCurrentIndex(
                        Main_Index === currentIndex ? null : Main_Index
                      );
                    }}
                    name="expand-more"
                    size={30}
                    color={Constant.primaryColor}
                  />
                </View>
                {Main_Index === currentIndex && (
                  <FlatList
                    data={item.order_array}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginVertical: 5,
                          flexDirection: "column",
                          borderRadius: 4,
                          backgroundColor: Constant.grayColor,
                        }}
                      >
                        <Text
                          style={{
                            color: Constant.blackColor,
                            marginHorizontal: 10,
                            fontSize: 17,
                            fontWeight: "700",
                            marginVertical: 10,
                          }}
                        >
                          {item.name}
                        </Text>
                        <FlatList
                          data={item.steps}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item, index }) => (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 5,
                                marginHorizontal: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: Constant.blackColor,
                                  marginHorizontal: 10,
                                  fontSize: 13,
                                }}
                              >
                                {item.headingTitle}
                              </Text>

                              <Text
                                style={{
                                  color: Constant.darkGrayColor,
                                  marginHorizontal: 10,
                                  fontSize: 12,
                                  fontWeight: "700",
                                }}
                              >
                                {item.title}
                              </Text>
                            </View>
                          )}
                        />
                        <View
                          style={{
                            borderBottomColor: Constant.gray80Color,
                            borderBottomWidth: 1,
                            marginHorizontal: 20,
                            marginTop: 10,
                          }}
                        />
                        <Text
                          style={{
                            color: Constant.blackColor,
                            marginHorizontal: 20,
                            marginVertical: 10,
                            fontSize: 14,
                            fontWeight: "700",
                          }}
                        >
                          {CONSTANT.orderhistoryMeasurments}
                        </Text>
                        <FlatList
                          data={item.measurements}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item, index }) => (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 5,
                                marginHorizontal: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: Constant.blackColor,
                                  marginHorizontal: 10,
                                  fontSize: 13,
                                }}
                              >
                                {item.title}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    color: Constant.darkGrayColor,
                                    fontSize: 12,
                                    fontWeight: "700",
                                  }}
                                >
                                  {item.value}
                                </Text>
                                <Text
                                  style={{
                                    color: Constant.darkGrayColor,
                                    marginHorizontal: 10,
                                    fontSize: 10,
                                    fontWeight: "700",
                                  }}
                                >
                                  {"("} {item.sizeType} {")"}
                                </Text>
                              </View>
                            </View>
                          )}
                        />
                      </View>
                    )}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const CancleDialouge = () => {
    setDialoigeVisible(false);
    setProcessing(false);
    setCancelled(false);
    setCompleted(false);
  };
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
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationColor: Constant.primaryColor,
                color: Constant.primaryColor,
                marginRight: 5,
              }}
            >
              Дэлгэрэнгүй
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Divider}></View>
      </View>
    );
  };
  const { width, height } = Dimensions.get("window");
  const renderItem = (item) => {
    return <Order item={item.item} />;
  };
  const renderFooter = () => {
    if (isFetchedAll) {
      return null;
    }
    if (!loading) {
      return null;
    }
    // return <ActivityIndicator color={Constant.primaryColor} />;
    return;
  };

  const onRefresh = () => {
    setPerPage(PERPAGE, () => {
      setRefreshing(true);
      refetch()
        .then((res) => {
          if (!res.error) {
            setFetchedAll(false);
          }
          setRefreshing(false);
        })
        .catch((e) => {
          setRefreshing(false);
        });
    });
  };
  const onEndReached = () => {
    if (isFetchedAll) {
      return;
    }
    setPerPage(perPage + PERPAGE, () => {
      refetch()
        .then((res) => {
          if (orderData.length < perPage) {
            setFetchedAll(true);
          }
          setPerPage(orderData.length);
        })
        .catch((e) => {
          setPerPage(perPage - PERPAGE);
        });
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
      {/* <MainHeader title={CONSTANT.orderhistoryHeader} /> */}
      <View style={{ padding: 20, flex: 1 }}>
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
            placeholder={CONSTANT.categoriesmainSearch}
            placeholderTextColor={Constant.gray90Color}
            keyboardType="email-address"
            textContentType="email_address"
            autoCompleteType="email"
            returnKeyType="next"
            // onChangeText={handleSearch}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Divider}></View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={orderData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.4}
            onEndReached={onEndReached}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Constant.primaryColor]}
              />
            }
          />
          {/* {order()} */}
        </ScrollView>
      </View>
      {/* {showNoRecord == true ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: window.width * 0.3,
              width: window.width * 0.3,
              marginBottom: 10,
              borderRadius: 10,
            }}
            source={require("../assets/images/NoRecord.png")}
          />
          <Text style={{ color: Constant.whiteColor, fontSize: 20 }}>
            {CONSTANT.historyNoReacordFound}
          </Text>
        </View>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={completeorder_data}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
        />
      )} */}
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
  // backgroundVideo: {
  //   height: 250,
  //   width: "100%",
  // },
  // mediaControls: {
  //   height: "100%",
  //   flex: 1,
  //   alignSelf: "center",
  // },
  // checkBoxStyle: {
  //   marginTop: 5,
  //   marginBottom: 10,
  //   height: windowHeight / 15,
  //   borderColor: Constant.gray80Color,
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 10,
  // },
  // checkBoxSelectorStyle: {
  //   height: 25,
  //   width: 25,
  //   borderColor: Constant.GainsboroColor,
  //   borderWidth: 1,
  //   borderRadius: 25 / 2,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

export default OrderHistory;
