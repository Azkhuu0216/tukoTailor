import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../../styles/styles";
import * as Constant from "../../styles/globalStyles";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider.ios";
import MainHeader from "../../components/MainHeader";
import CONSTANT from "../../styles/local";
import LinearGradient from "react-native-linear-gradient";
import Header from "../../components/Header";
import Tab from "../../components/Tab";
import { ScrollView } from "react-native-virtualized-view";
import images from "../../../assets/images";

const { width, height } = Dimensions.get("window");

const Categories = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [type, setType] = useState(true);
  const [myOrder, setMyOrder] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const [dialoigeVisible, setDialoigeVisible] = useState(false);
  const [showuserside, setShowuserside] = useState(false);
  const [showAdminSide, setShowAdminSide] = useState(false);
  const [showDesginer, setShowDesigner] = useState(false);
  const [adminID, setAdminID] = useState("");
  const [order_data, setorder_data] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [date, setDate] = useState("00/00/0000");
  const [earning, setEarning] = useState("0");
  const [datePriceArray, setDatePriceArray] = useState([]);
  const [graphDataArray, setGraphDataArray] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState("");
  const [totalorders, setTotalorders] = useState("");
  const [totalPendingorders, setTotalPendingorders] = useState("");
  const [totalProcessingorders, setTotalProcessingorders] = useState("");
  const [totalCancelorders, setTotalCancelorders] = useState("");
  const [orderPerDate, setOrderPerDate] = useState(null);
  const [currency, setcurrency] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastDate, setLastDate] = useState("");

  const _onRefresh = () => {
    // console.log("_onRefresh");
    setRefreshing(true);
    getcurrencyData();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  // function switchTab() {
  //   if (activeTab === "MyOrder") {
  //     setActiveTab("AllOrder");
  //   } else {
  //     setActiveTab("MyOrder");
  //   }
  // }

  useEffect(() => {
    getDate();
  }, [currentDate]);

  useEffect(() => {
    getAddedUserAccess();
    getcurrencyData();
    getAddedCategoriesData();
    // getordersData();
  }, [totalEarnings]);

  // const getordersData = async () => {
  //   try {
  //     await firestore()
  //       .collection("orders")
  //       .onSnapshot((querySnapshot) => {
  //         if (querySnapshot != null) {
  //           var totalEarning = 0;
  //           var totalorders = 0;
  //           var totalPendingorders = 0;
  //           var totalProcessingorders = 0;
  //           var totalCancelorders = 0;
  //           setorder_data(querySnapshot._docs);

  //           for (var i = 0; i < order_data.length; i++) {
  //             for (var j = 0; j < order_data[i]._data.order.length; j++) {
  //               if (order_data[i]._data.order[j].status === "Completed") {
  //                 totalorders = totalorders + 1;
  //                 totalEarning =
  //                   totalEarning +
  //                   parseInt(order_data[i]._data.order[j].order_data[0].price);
  //                 datePriceArray.push({
  //                   date: order_data[i]._data.order[j].date,
  //                   price: order_data[i]._data.order[j].order_data[0].price,
  //                 });
  //               }
  //               if (order_data[i]._data.order[j].status === "Pending") {
  //                 totalPendingorders = totalPendingorders + 1;
  //               }
  //               if (order_data[i]._data.order[j].status === "Processing") {
  //                 totalProcessingorders = totalProcessingorders + 1;
  //               }
  //               if (order_data[i]._data.order[j].status === "Cancelled") {
  //                 totalCancelorders = totalCancelorders + 1;
  //               }
  //             }
  //           }
  //           setTotalorders(JSON.stringify(totalorders));
  //           setTotalPendingorders(JSON.stringify(totalPendingorders));
  //           setTotalProcessingorders(JSON.stringify(totalProcessingorders));
  //           setTotalCancelorders(JSON.stringify(totalCancelorders));
  //           setTotalEarnings(JSON.stringify(totalEarning));
  //         }
  //       });

  //     var totalPrice = 0;
  //     for (
  //       var i = datePriceArray.length - 1;
  //       i >= datePriceArray.length - parseInt(totalorders);
  //       i--
  //     ) {
  //       for (var j = 0; j < graphDataArray.length; j++) {
  //         if (graphDataArray[j].fullDate === datePriceArray[i].date) {
  //           totalPrice = totalPrice + parseInt(datePriceArray[i].price);
  //           graphDataArray[j].receivedOrder =
  //             graphDataArray[j].receivedOrder + 1;
  //         }
  //       }
  //     }
  //   } catch (err) {}
  // };
  const getAddedUserAccess = async () => {
    try {
      await firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == user.uid) {
                if (documentSnapshot.data().role == "admin") {
                  setShowAdminSide(true);
                } else if (documentSnapshot.data().position == "Дизайнер") {
                  setShowuserside(true);
                  setShowDesigner(true);
                } else {
                  setShowuserside(true);
                }
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
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
  let index = 0;

  const getAddedCategoriesData = async () => {
    try {
      await firestore()
        .collection("orders")
        .onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((documentSnapshot) => {
            setAllOrder(documentSnapshot.data().selected_apparels);
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item, index }) => {
    return <OrderItem item={item} index={index} />;
  };
  const myrenderItem = ({ item, index }) => {
    return <MyOrderItem item={item} index={index} />;
  };
  const OrderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddCategories", { value: item, ok: true })
        }
      >
        <View style={css.orderView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                marginRight: 5,
              }}
            >
              {index + 1}.
            </Text>
            <View style={css.firstname}>
              <Text>{item.firstname}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.Give}>Өгсөн</Text>
            <Text style={{ textAlign: "justify" }}>{item.date}</Text>
          </View>
          {/* <View>
            <Text style={styles.Give}>Авах</Text>
            <Text>{date2}</Text>
          </View> */}
          <Feather name="check-circle" size={24} color={Constant.greenColor} />
          <Feather
            name="phone-forwarded"
            size={18}
            color={Constant.grayIconColor}
          />
          <Feather name="user-check" size={18} color={Constant.grayIconColor} />
        </View>
        <View style={styles.Divider}></View>
      </TouchableOpacity>
    );
  };
  const MyOrderItem = ({ item, index }) => {
    return (
      item.id == user.uid && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddCategories", { value: item, ok: true })
          }
        >
          <View style={css.orderView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={css.firstname}>
                <Text>{item.firstname}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.Give}>Өгсөн</Text>
              <Text style={{ textAlign: "justify" }}>{item.date}</Text>
            </View>
            {/* <View>
            <Text style={styles.Give}>Авах</Text>
            <Text>{date2}</Text>
          </View> */}
            <Feather
              name="check-circle"
              size={24}
              color={Constant.greenColor}
            />
            <Feather
              name="phone-forwarded"
              size={18}
              color={Constant.grayIconColor}
            />
            <Feather
              name="user-check"
              size={18}
              color={Constant.grayIconColor}
            />
          </View>
          <View style={styles.Divider}></View>
        </TouchableOpacity>
      )
    );
  };
  // console.log(newMainCategorymaleArray, "NewData-----");
  function MyOrder() {
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={allOrder}
          renderItem={myrenderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
  function AllOrder() {
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={allOrder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  const CancleDialouge = () => {
    setDialoigeVisible(false);
    setShowuserside(true);
  };

  const SelectedDate = (index, item) => {
    setDate(item.fullDate);
    var totalPrice = 0;
    // var orderCount = 0;
    for (
      var i = datePriceArray.length - 1;
      i >= datePriceArray.length - parseInt(totalorders);
      i--
    ) {
      if (item.fullDate === datePriceArray[i].date) {
        // orderCount = orderCount + 1
        totalPrice = totalPrice + parseInt(datePriceArray[i].price);
      }
    }
    // setOrderPerDate(orderCount)
    //graphDataArray[index].receivedOrder = orderCount
    setEarning(totalPrice);
    setSelectedValue(index);
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const newData = mainCategorymaleArray.filter((item) => {
      return item.name.toLowerCase().includes(formattedQuery);
    });
    const newDatafemale = mainCategoryfemaleArray.filter((item) => {
      return item.name.toLowerCase().includes(formattedQuery);
    });
    setNewMainCategorymaleArray(newData);
    setNewMainCategoryfemaleArray(newDatafemale);
  };

  const getDate = () => {
    // console.log("currentDate", currentDate);
    var now = currentDate;
    var endOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 6
    );
    setLastDate(endOfWeek);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    do {
      const date =
        now.getDate().toString().length > 1
          ? now.getDate()
          : "0" + now.getDate() + "";
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const finalDate = date + " " + monthNames[now.getMonth()] + "," + year;
      const fDate = monthNames[now.getMonth()] + "," + year;
      setDate(fDate);
      graphDataArray.push({
        date: now.getDate(),
        totalLimit: 10,
        receivedOrder: orderPerDate != null ? orderPerDate : 0,
        fullDate: finalDate,
      });
      now = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    } while (now > endOfWeek);
  };

  const handleLoadMore = () => {
    setCurrentDate(lastDate);
  };
  return (
    <View style={styles.to_bg_image}>
      {showuserside && (
        <View style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, backgroundColor: Constant.whiteColor }}>
              <Header />
              <View style={{ padding: 10, marginTop: 10 }}>
                <Tab type={type} setType={setType} />
                {type ? <MyOrder /> : <AllOrder />}
              </View>
            </View>
          </ScrollView>
          {showDesginer && (
            <TouchableOpacity //1281-1297 hurtel Button nemsen
              style={css.ActionButton}
              onPress={() => navigation.navigate("OrderAdd")}
            >
              <Ionicons name="add" size={24} color={Constant.whiteColor} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {showAdminSide && (
        <View style={styles.firstBack}>
          <View>
            <MainHeader
              title={CONSTANT.categoriesmainDashboard}
              logout={true}
            />
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={_onRefresh}
                  tintColor={Constant.buttonColor}
                />
              }
              style={{ backgroundColor: Constant.primaryColor }}
            >
              <LinearGradient
                style={css.DateList}
                colors={["#083164", Constant.primaryColor]}
              >
                <View style={css.DateView}>
                  <Text style={css.DateText}>{date}</Text>
                  <Text style={css.currency}>
                    {currency} {earning}
                  </Text>
                </View>
                <FlatList
                  inverted
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={graphDataArray}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.1}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => SelectedDate(index, item)}
                      style={css.ColumnView}
                    >
                      <Text
                        style={{
                          color:
                            selectedValue === index
                              ? Constant.whiteColor
                              : Constant.whiteColor,
                          fontWeight: selectedValue === index ? "700" : "700",
                          marginBottom: 5,
                        }}
                      >
                        {item.date}
                      </Text>
                      {item.receivedOrder == 0 ? null : (
                        <View
                          style={{
                            height: item.receivedOrder * 20,
                            width: 40,
                            backgroundColor:
                              selectedValue === index
                                ? Constant.buttonColor
                                : "#324B69",
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingBottom: 10,
                          }}
                        ></View>
                      )}
                    </TouchableOpacity>
                  )}
                />
              </LinearGradient>

              <LinearGradient
                style={{ marginHorizontal: 10, borderRadius: 4 }}
                colors={[Constant.primaryColor, Constant.primaryColor]}
              >
                <View style={css.mainStatus}>
                  <View style={css.StatusView}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("OrderList", {
                          selectedOrderType: "Pending",
                        })
                      }
                      style={css.Status}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={{ height: 40, width: 40, marginRight: 15 }}
                          source={require("../../../assets/images/order04.png")}
                        />
                        <View style={{ width: "65%" }}>
                          <Text
                            style={{
                              color: Constant.whiteColor,
                              fontWeight: "700",
                              fontSize: 17,
                            }}
                          >
                            {totalPendingorders.length == 1
                              ? "0" + totalPendingorders
                              : totalPendingorders}
                          </Text>
                          <Text
                            style={{ color: Constant.whiteColor, fontSize: 12 }}
                          >
                            {CONSTANT.pendingOrder}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("OrderList", {
                          selectedOrderType: "Processing",
                        })
                      }
                      style={css.Status}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={{ height: 40, width: 40, marginRight: 15 }}
                          source={require("../../../assets/images/order05.png")}
                        />

                        <View style={{ width: "65%" }}>
                          <Text
                            style={{
                              color: Constant.whiteColor,
                              fontWeight: "700",
                              fontSize: 17,
                            }}
                          >
                            {totalProcessingorders.length == 1
                              ? "0" + totalProcessingorders
                              : totalProcessingorders}
                          </Text>
                          <Text
                            style={{ color: Constant.whiteColor, fontSize: 12 }}
                          >
                            {CONSTANT.processingorders}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={css.StatusView}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("OrderList", {
                          selectedOrderType: "Completed",
                        })
                      }
                      style={css.Status}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={{ height: 40, width: 40, marginRight: 15 }}
                          source={require("../../../assets/images/order03.png")}
                        />
                        <View style={{ width: "65%" }}>
                          <Text
                            style={{
                              color: Constant.whiteColor,
                              fontWeight: "700",
                              fontSize: 17,
                            }}
                          >
                            {totalorders.length == 1
                              ? "0" + totalorders
                              : totalorders}
                          </Text>
                          <Text
                            style={{ color: Constant.whiteColor, fontSize: 12 }}
                          >
                            {CONSTANT.completedorders}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("OrderList", {
                          selectedOrderType: "Cancelled",
                        })
                      }
                      style={css.Status}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          resizeMode={"cover"}
                          style={{ height: 40, width: 40, marginRight: 15 }}
                          source={require("../../../assets/images/order02.png")}
                        />
                        <View style={{ width: "65%" }}>
                          <Text
                            style={{
                              color: Constant.whiteColor,
                              fontWeight: "700",
                              fontSize: 17,
                            }}
                          >
                            {totalCancelorders.length == 1
                              ? "0" + totalCancelorders
                              : totalCancelorders}
                          </Text>
                          <Text
                            style={{ color: Constant.whiteColor, fontSize: 12 }}
                          >
                            {CONSTANT.cancelledorders}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderList", {
                    selectedOrderType: "Pending",
                  })
                }
                style={css.ViewOrder}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    resizeMode={"cover"}
                    style={{ height: 30, width: 30, marginRight: 15 }}
                    source={images.tuko}
                  />
                  <Text
                    style={{ color: Constant.primaryColor, fontWeight: "700" }}
                  >
                    {CONSTANT.categoriesmainVieworders}
                  </Text>
                </View>
                <View style={{}}>
                  <View
                    style={{
                      backgroundColor: Constant.grayColor,
                      borderRadius: 15,
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ marginHorizontal: 20 }}>
                      {CONSTANT.categoriesmainView}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("settings")}
                style={css.ViewOrder}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    resizeMode={"cover"}
                    style={{ height: 30, width: 30, marginRight: 15 }}
                    source={images.tuko}
                  />
                  <Text
                    style={{ color: Constant.primaryColor, fontWeight: "700" }}
                  >
                    {CONSTANT.categoriesmainSetting}
                  </Text>
                </View>
                <View style={{}}>
                  <View
                    style={{
                      backgroundColor: Constant.grayColor,
                      borderRadius: 15,
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ marginHorizontal: 20 }}>
                      {CONSTANT.categoriesmainView}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Contact", { params: "admin" })
                }
                style={css.ViewOrder}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    resizeMode={"cover"}
                    style={{ height: 30, width: 30, marginRight: 15 }}
                    source={images.tuko}
                  />
                  <Text
                    style={{ color: Constant.primaryColor, fontWeight: "700" }}
                  >
                    Members
                  </Text>
                </View>
                <View style={{}}>
                  <View
                    style={{
                      backgroundColor: Constant.grayColor,
                      borderRadius: 15,
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ marginHorizontal: 20 }}>
                      {CONSTANT.categoriesmainView}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default Categories;

const css = StyleSheet.create({
  orderView: {
    flexDirection: "row",
    width: width - 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    // backgroundColor: "red",
  },
  firstname: {
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
  ActionButton: {
    backgroundColor: Constant.primaryColor,
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 35,
    right: 20,
  },
  DateList: {
    marginHorizontal: 10,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginTop: 15,
  },
  DateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  DateText: {
    fontSize: 15,
    fontWeight: "700",
    color: Constant.whiteColor,
  },
  currency: {
    fontSize: 15,
    fontWeight: "700",
    color: Constant.buttonColor,
  },
  ColumnView: {
    height: 200,
    overflow: "hidden",
    backgroundColor: "#041832",
    borderRadius: 25,
    width: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: 8,
  },
  StatusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  Status: {
    width: "49%",
    padding: 5,
    height: 100,
    backgroundColor: Constant.darkBlueClor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  mainStatus: {
    height: 210,
    marginVertical: 15,
    padding: 5,
    borderRadius: 4,
  },
  ViewOrder: {
    backgroundColor: Constant.whiteColor,
    marginHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
