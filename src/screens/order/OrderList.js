import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import * as Constant from "../../styles/globalStyles";
import styles1 from "../../styles/styles";
import MainHeader from "../../components/MainHeader";
import firestore from "@react-native-firebase/firestore";
import { windowHeight, windowWidth } from "../../utils/Dimentions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendGridEmail } from "react-native-sendgrid";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import CONSTANT from "../../styles/local";
import Spinner from "react-native-loading-spinner-overlay";
const window = Dimensions.get("window");
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from "react-native-popup-dialog";

const OrderList = ({ navigation, route }) => {
  const [order_data, setorder_data] = useState([]);
  const [activeTab, setActiveTab] = useState(route.params.selectedOrderType);
  const [dialoigeVisible, setDialoigeVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [currency, setcurrency] = useState("");
  const [settingEmailArray, setSettingEmailArray] = useState([]);
  const [cancelEmail, setCancelEmail] = useState("");
  const [completeEmail, setCompleteEmail] = useState("");
  const [email_address, setemail_address] = useState("");
  const [processingHeading, setProcessingHeading] = useState("");
  const [completedHeading, setCompletedHeading] = useState("");
  const [cancelledHeading, setCancelledHeading] = useState("");
  const [logo, setLogo] = useState("");
  const [processEmail, setProcessEmail] = useState("");
  const [product_title, setproduct_title] = useState("");
  const [api_key, setapi_key] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [totalCompletedorders, setTotalCompletedorders] = useState(0);
  const [totalPendingorders, setTotalPendingorders] = useState(0);
  const [totalProcessingorders, setTotalProcessingorders] = useState(0);
  const [totalCancelorders, setTotalCancelorders] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);

  function switchTab(clicktab) {
    if (clicktab === "com") {
      setActiveTab("Completed");
    } else if (clicktab === "pro") {
      setActiveTab("Processing");
    } else if (clicktab === "can") {
      setActiveTab("Cancelled");
    } else if (clicktab === "pen") {
      setActiveTab("Pending");
    }
  }

  useEffect(() => {
    getordersData();
    getcurrencyData();
    getEmailGridData();
  }, [totalCompletedorders]);

  const getcurrencyData = async () => {
    try {
      await firestore()
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == "currency") {
                console.log(
                  "currency Data",
                  documentSnapshot.data().currency,
                  setcurrency(documentSnapshot.data().currency[0])
                );
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getEmailGridData = async () => {
    try {
      await firestore()
        .collection("settings")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == "general") {
                setapi_key(documentSnapshot.data().settings[0].api_key);
                setLogo(documentSnapshot.data().settings[0].logo);
                setemail_address(
                  documentSnapshot.data().settings[0].email_address
                );
                setproduct_title(
                  documentSnapshot.data().settings[0].product_title
                );
              } else if (documentSnapshot.id == "processing_order_email") {
                setProcessingHeading(
                  documentSnapshot.data().settings[0].header
                );
                setProcessEmail(documentSnapshot.data().settings[0].content);
              } else if (documentSnapshot.id == "cancel_order_email") {
                setCancelledHeading(documentSnapshot.data().settings[0].header);
                setCancelEmail(documentSnapshot.data().settings[0].content);
              } else if (documentSnapshot.id == "completed_order_email") {
                setCompletedHeading(documentSnapshot.data().settings[0].header);
                setCompleteEmail(documentSnapshot.data().settings[0].content);
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getordersData = async () => {
    setSpinner(true);
    try {
      await firestore()
        .collection("orders")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot != null) {
            var totalCompletedorders = 0;
            var totalPendingorders = 0;
            var totalProcessingorders = 0;
            var totalCancelorders = 0;
            querySnapshot.docs.map((documentSnapshot) => {
              console.log(documentSnapshot.data().selected_apparels);
              setorder_data(documentSnapshot.data().selected_apparels);
              for (var i = 0; i < order_data.length; i++) {
                for (var j = 0; j < order_data[i]._data.order.length; j++) {
                  if (order_data[i]._data.order[j].status === "Completed") {
                    totalCompletedorders = totalCompletedorders + 1;
                  }
                  if (order_data[i]._data.order[j].status === "Pending") {
                    totalPendingorders = totalPendingorders + 1;
                  }
                  if (order_data[i]._data.order[j].status === "Processing") {
                    totalProcessingorders = totalProcessingorders + 1;
                  }
                  if (order_data[i]._data.order[j].status === "Cancelled") {
                    totalCancelorders = totalCancelorders + 1;
                  }
                }
              }
              setTotalCompletedorders(JSON.stringify(totalCompletedorders));
              setTotalPendingorders(JSON.stringify(totalPendingorders));
              setTotalProcessingorders(JSON.stringify(totalProcessingorders));
              setTotalCancelorders(JSON.stringify(totalCancelorders));
              setSpinner(false);
            });
          }
        });
    } catch (err) {
      setSpinner(false);
      console.log(err);
    }
  };

  const _renderItem = ({ item, index }) => {
    let Main_Index = index;
    var orderLength = 0;
    return (
      <>
        <View
          activeOpacity={0.9}
          style={{
            marginBottom: 10,
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: Constant.whiteColor,
            marginHorizontal: 10,
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={item._data.order}
            renderItem={({ item, index }) => (
              <>
                {activeTab === item.status ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                      borderRadius: 4,
                      backgroundColor: Constant.whiteColor,
                      marginBottom: 10,
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
                          marginTop: 15,
                        }}
                      >
                        <Image
                          style={{
                            height: 65,
                            width: 65,
                            borderRadius: 4,
                          }}
                          source={{
                            uri:
                              item.image != null
                                ? item.image
                                : "https://www.padf.org/wp-content/uploads/2020/04/placeholder.png",
                          }}
                        />
                        {item.status == "Processing" && (
                          <View
                            style={{
                              backgroundColor: Constant.buttonColor,
                              borderRadius: 6,
                              borderColor: Constant.GainsboroColor,
                              borderWidth: 0.6,
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              onPress={() =>
                                navigation.navigate("ChatScreen", {
                                  id: item.id,
                                })
                              }
                              style={{
                                fontSize: 17,
                                fontWeight: "700",
                                color: Constant.primaryColor,

                                padding: 12,
                                marginHorizontal: 10,
                              }}
                            >
                              Start Chat
                            </Text>
                          </View>
                        )}
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
                          {CONSTANT.orderlistfirst_name}
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
                          {CONSTANT.orderlistlast_name}
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
                          {CONSTANT.orderlistPhone}
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
                          {CONSTANT.orderlistAddress}
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
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          margin: 10,
                          alignItems: "center",
                          flex: 2,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "700",
                            color: Constant.whiteColor,
                            marginLeft: 10,
                            flex: 1,
                          }}
                        >
                          {CONSTANT.orderlistUpdatestatus}
                        </Text>
                        <View
                          style={{
                            borderWidth: 1,
                            padding: 12,
                            borderRadius: 6,
                            marginRight: 10,
                            borderColor: "#324B69",
                            flexDirection: "row",
                            backgroundColor: "#041832",
                            paddingHorizontal: 16,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <Text
                            onPress={() =>
                              activeTab == "Completed"
                                ? null
                                : activeTab == "Cancelled"
                                ? null
                                : MakeDialogeBoxVisible(index, Main_Index)
                            }
                            style={{
                              fontSize: 17,
                              fontWeight: "700",
                              color: Constant.whiteColor,
                            }}
                          >
                            {item.status}{" "}
                          </Text>
                          {item.status == "Pending" ? (
                            <Icon
                              name="pending-actions"
                              size={18}
                              color={Constant.whiteColor}
                            />
                          ) : item.status == "Processing" ? (
                            <Feather
                              name="loader"
                              size={18}
                              color={Constant.whiteColor}
                            />
                          ) : item.status == "Completed" ? (
                            <Icon
                              name="file-download-done"
                              size={18}
                              color={Constant.whiteColor}
                            />
                          ) : item.status == "Cancelled" ? (
                            <Icon
                              name="cancel"
                              size={18}
                              color={Constant.whiteColor}
                            />
                          ) : null}
                          {/* <Icon name="message" size={20} color={Constant.whiteColor} /> */}
                        </View>
                      </View>
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
                              alignItems: "center",
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
                              {CONSTANT.orderlistOrderDetails}
                            </Text>
                            <Icon
                              onPress={() => {
                                // Alert.alert(JSON.stringify(Main_Index))
                                setCurrentIndex(
                                  Main_Index === currentIndex
                                    ? null
                                    : Main_Index
                                );
                              }}
                              name="expand-more"
                              size={30}
                              color={Constant.primaryColor}
                            />
                          </View>

                          {Main_Index === currentIndex && (
                            <>
                              <Text
                                style={{
                                  color: Constant.blackColor,
                                  marginHorizontal: 20,
                                  fontSize: 17,
                                  fontWeight: "700",
                                  marginVertical: 10,
                                }}
                              >
                                {item.title}
                              </Text>
                              <FlatList
                                data={item.order_array}
                                keyExtractor={(x, i) => i.toString()}
                                renderItem={({ item, index }) => (
                                  <View
                                    style={{
                                      marginHorizontal: 10,
                                      marginVertical: 10,
                                      paddingBottom: 5,
                                      flexDirection: "column",
                                      borderRadius: 4,
                                      backgroundColor: Constant.grayColor,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: Constant.blackColor,
                                        marginHorizontal: 20,
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
                                      {CONSTANT.orderlistMeasurments}
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
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    {/* <View 
                style={{alignItems:"center" , justifyContent:'center' ,flex:1 , backgroundColor:Constant.primaryColor }}>
                <Image
                        style={{
                          height: window.width *0.30,
                          width: window.width *0.30,
                          marginBottom: 10,
                          borderRadius:10
                        }}
                        source={require('../assets/images/NoRecord.png')}
                      />
                      <Text style={{color:"#fff" , fontSize:20}}>No Record found</Text>
              </View> */}
                  </>
                )}
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </>
    );
  };

  const CancleDialouge = () => {
    setDialoigeVisible(false);
    setProcessing(false);
    setCancelled(false);
    setCompleted(false);
  };

  const ManageProcessing = async () => {
    setDialoigeVisible(false);
    setProcessing(true);
    setCancelled(false);
    setCompleted(false);
    const index = await AsyncStorage.getItem("index");
    const Main_Index = await AsyncStorage.getItem("Main_Index");
    order_data[Main_Index]._data.order[index].status = "Processing";

    await firestore()
      .collection("orders")
      .doc(order_data[Main_Index]._data.order[index].id)
      .set({
        order: order_data[Main_Index]._data.order,
      })
      .then(() => {
        setProcessing(false);
        SendEmailFunction(
          "Processing",
          order_data[Main_Index]._data.order[index].first_name,
          order_data[Main_Index]._data.order[index].last_name,
          order_data[Main_Index]._data.order[index].email,
          order_data[Main_Index]._data.order[index].order_data[0].title,
          order_data[Main_Index]._data.order[index].order_id
        );
        Alert.alert(
          CONSTANT.orderlistStatusUpdated,
          CONSTANT.orderlistStatusupdatedsuccessfully
        );
      })
      .catch((error) => {
        console.log(
          "Something went wrong with updating post to firestore.",
          error
        );
      });
  };

  const ManageCompleted = async () => {
    setDialoigeVisible(false);
    setProcessing(false);
    setCancelled(false);
    setCompleted(true);
    const index = await AsyncStorage.getItem("index");
    const Main_Index = await AsyncStorage.getItem("Main_Index");
    order_data[Main_Index]._data.order[index].status = "Completed";

    await firestore()
      .collection("orders")
      .doc(order_data[Main_Index]._data.order[index].id)
      .set({
        order: order_data[Main_Index]._data.order,
      })
      .then(() => {
        setCompleted(false);
        SendEmailFunction(
          "Completed",
          order_data[Main_Index]._data.order[index].first_name,
          order_data[Main_Index]._data.order[index].last_name,
          order_data[Main_Index]._data.order[index].email,
          order_data[Main_Index]._data.order[index].order_data[0].title,
          order_data[Main_Index]._data.order[index].order_id
        );
        Alert.alert(
          CONSTANT.orderlistStatusUpdated,
          CONSTANT.orderlistStatusupdatedsuccessfully
        );
      })
      .catch((error) => {
        console.log(
          "Something went wrong with updating post to firestore.",
          error
        );
      });
  };

  const ManageCancelled = async () => {
    setDialoigeVisible(false);
    setProcessing(false);
    setCancelled(true);
    setCompleted(false);

    const index = await AsyncStorage.getItem("index");
    const Main_Index = await AsyncStorage.getItem("Main_Index");
    order_data[Main_Index]._data.order[index].status = "Cancelled";

    await firestore()
      .collection("orders")
      .doc(order_data[Main_Index]._data.order[index].id)
      .set({
        order: order_data[Main_Index]._data.order,
      })
      .then(() => {
        setCancelled(false);
        SendEmailFunction(
          "Cancelled",
          order_data[Main_Index]._data.order[index].first_name,
          order_data[Main_Index]._data.order[index].last_name,
          order_data[Main_Index]._data.order[index].email,
          order_data[Main_Index]._data.order[index].order_data[0].title,
          order_data[Main_Index]._data.order[index].order_id
        );
        Alert.alert(
          CONSTANT.orderlistStatusUpdated,
          CONSTANT.orderlistStatusupdatedsuccessfully
        );
      })
      .catch((error) => {
        console.log(
          "Something went wrong with updating post to firestore.",
          error
        );
      });
  };

  const MakeDialogeBoxVisible = async (index, Main_Index) => {
    setDialoigeVisible(true);
    await AsyncStorage.setItem("index", JSON.stringify(index));
    await AsyncStorage.setItem("Main_Index", JSON.stringify(Main_Index));
  };

  const SendEmailFunction = (
    status,
    first_name,
    last_name,
    email,
    cat_name,
    id
  ) => {
    if (status == "Processing") {
      var heading = processingHeading.replace("%order_id%", id);
      var processingContent = processEmail.replace(
        "%name%",
        first_name + " " + last_name
      );
      var Details =
        '<div style="background-color:#f7f7f7;padding:20px;border-radius:5px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px;padding-left: 0px;" align="center"><img align="center" border="0" src="' +
        logo +
        '" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;" width="168.2"/></td></tr></table><div style="color: #236fa1; line-height: 130%; text-align: center; word-wrap:break-word;"><p style="font-size: 14px; line-height: 130%;color:#062347;"><span style="font-size: 40px; line-height: 93.6px;"><span style="line-height:93.6px; font-size:40px;">Welcome To </br>' +
        product_title +
        '<br /></span></span></p></div><div style="line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;color:#062347;font-weight:bolder"><span style="font-size: 35px; line-height: 42px;">Processing<br /></span></p></div><div style="line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 20px ; line-height: 140%;color:#062347;"><span style="font-size: 20px ; line-height: 19.6px;"> ' +
        processingContent.replace("%category_id%", cat_name) +
        "</span></p></div></div>";
    } else if (status == "Completed") {
      var heading = completedHeading.replace("%order_id%", id);
      var completedContent = completeEmail.replace(
        "%name%",
        first_name + " " + last_name
      );
      var Details =
        '<div style="background-color:#f7f7f7;padding:20px;border-radius:5px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px;padding-left: 0px;" align="center"><img align="center" border="0" src="' +
        logo +
        '" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;" width="168.2"/></td></tr></table><div style="color: #236fa1; line-height: 130%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 130%;color:#062347;"><span style="font-size: 40px; line-height: 93.6px;"><span style="line-height: 93.6px; font-size: 40px;">Welcome To </br>' +
        product_title +
        '<br /></span></span></p></div><div style="line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;color:#062347;font-weight:bolder"><span style="font-size: 35px; line-height: 42px;">Completed<br /></span></p></div><div style="line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 20px ; line-height: 140%;color:#062347;"><span style="font-size: 20px ; line-height: 19.6px;"> ' +
        completedContent.replace("%category_id%", cat_name) +
        "</span></p></div></div>";
    } else if (status == "Cancelled") {
      var heading = cancelledHeading.replace("%order_id%", id);
      var cancelledContent = cancelEmail.replace(
        "%name%",
        first_name + " " + last_name
      );
      var Details =
        '<div style="background-color:#f7f7f7;padding:20px;border-radius:5px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px;padding-left: 0px;" align="center"><img align="center" border="0" src="' +
        logo +
        '" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;" width="168.2"/></td></tr></table><div style="color: #236fa1; line-height: 130%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 130%;color:#062347;"><span style="font-size: 40px; line-height: 93.6px;"><span style="line-height: 93.6px; font-size: 40px;">Welcome To </br>' +
        product_title +
        '<br /></span></span></p></div><div style="line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;color:#062347;font-weight:bolder"><span style="font-size: 35px; line-height: 42px;">Cancelled<br /></span></p></div><div style="line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 20px ; line-height: 140%;color:#062347;"><span style="font-size: 20px ; line-height: 19.6px;"> ' +
        cancelledContent.replace("%category_id%", cat_name) +
        "</span></p></div></div>";
    }

    const Api_key = api_key;
    const Sender = email_address;
    const Receiver = email;

    const sendRequest = sendGridEmail(
      Api_key,
      Receiver,
      Sender,
      heading,
      Details,
      "text/html"
    );
    sendRequest
      .then((response) => {
        console.log("Success", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.primaryColor }}>
      <MainHeader title={CONSTANT.orderlistHeader} back={true} />
      <Spinner visible={spinner} />
      <View>
        <Dialog
          onTouchOutside={() => {
            setDialoigeVisible(false);
          }}
          dialogStyle={{
            marginHorizontal: 20,
            backgroundColor: Constant.primaryColor,
            borderColor: Constant.buttonColor,
            borderWidth: 2,
            overflow: "hidden",
          }}
          visible={dialoigeVisible}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: Constant.whiteColor,
                }}
                text={CONSTANT.orderlistNothanks}
                onPress={() => CancleDialouge()}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginVertical: 10,
                color: Constant.buttonColor,
              }}
            >
              {CONSTANT.orderlistPayattention}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginVertical: 10,
                color: Constant.whiteColor,
              }}
            >
              {CONSTANT.orderlistPleaseUpdatestatusorder}
            </Text>
            {activeTab == "Pending" && (
              <>
                <TouchableOpacity
                  onPress={() => ManageProcessing()}
                  style={styles.checkBoxStyle}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: Constant.whiteColor,
                      fontWeight: "700",
                    }}
                  >
                    {CONSTANT.orderlistProcessing}
                  </Text>
                  <View
                    style={[
                      styles.checkBoxSelectorStyle,
                      {
                        backgroundColor: processing
                          ? Constant.buttonColor
                          : Constant.whiteColor,
                      },
                    ]}
                  >
                    <Entypo
                      name="check"
                      size={17}
                      color={Constant.whiteColor}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => ManageCancelled()}
                  style={styles.checkBoxStyle}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: Constant.whiteColor,
                      fontWeight: "700",
                    }}
                  >
                    {CONSTANT.orderlistCancelled}
                  </Text>
                  <View
                    style={[
                      styles.checkBoxSelectorStyle,
                      {
                        backgroundColor: cancelled
                          ? Constant.buttonColor
                          : Constant.whiteColor,
                      },
                    ]}
                  >
                    <Entypo
                      name="check"
                      size={17}
                      color={Constant.whiteColor}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
            {activeTab == "Processing" && (
              <>
                <TouchableOpacity
                  onPress={() => ManageCompleted()}
                  style={styles.checkBoxStyle}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: Constant.whiteColor,
                      fontWeight: "700",
                    }}
                  >
                    {CONSTANT.orderlistCompleted}
                  </Text>
                  <View
                    style={[
                      styles.checkBoxSelectorStyle,
                      {
                        backgroundColor: completed
                          ? Constant.buttonColor
                          : Constant.whiteColor,
                      },
                    ]}
                  >
                    <Entypo
                      name="check"
                      size={17}
                      color={Constant.whiteColor}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => ManageCancelled()}
                  style={styles.checkBoxStyle}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: Constant.whiteColor,
                      fontWeight: "700",
                    }}
                  >
                    {CONSTANT.orderlistCancelled}
                  </Text>
                  <View
                    style={[
                      styles.checkBoxSelectorStyle,
                      {
                        backgroundColor: cancelled
                          ? Constant.buttonColor
                          : Constant.whiteColor,
                      },
                    ]}
                  >
                    <Entypo
                      name="check"
                      size={17}
                      color={Constant.whiteColor}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </DialogContent>
        </Dialog>
      </View>
      {order_data && (
        <>
          <View
            style={{
              //padding: 10,
              marginTop: 10,
              backgroundColor: Constant.whiteColor,
              marginHorizontal: 10,
              borderRadius: 4,
              marginBottom: 5,
              overflow: "hidden",
            }}
          >
            <View style={styles1.to_category_switchTabsView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderBottomWidth: activeTab === "Pending" ? 4 : 2,
                    borderBottomColor:
                      activeTab === "Pending"
                        ? Constant.buttonColor
                        : Constant.GainsboroColor,
                    backgroundColor:
                      activeTab === "Pending"
                        ? Constant.buttonColor
                        : Constant.whiteColor,
                    width: "100%",
                    alignItems: "center",
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                  onPress={() => switchTab("pen")}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Icon
                      name="pending-actions"
                      size={22}
                      color={
                        activeTab === "Pending"
                          ? Constant.primaryColor
                          : Constant.darkGrayColor
                      }
                    />
                    <Text style={styles1.to_category_switchText}>
                      {" "}
                      {CONSTANT.pendingOrder}{" "}
                    </Text>
                  </View>
                  <View
                    style={{ justifyContent: "center", flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        color: Constant.primaryColor,
                        fontWeight: "700",
                        fontSize: 17,
                      }}
                    >
                      {" "}
                      ({totalPendingorders}){" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    borderBottomWidth: activeTab === "Processing" ? 4 : 2,
                    borderBottomColor:
                      activeTab === "Processing"
                        ? Constant.buttonColor
                        : Constant.GainsboroColor,
                    backgroundColor:
                      activeTab === "Processing"
                        ? Constant.buttonColor
                        : Constant.whiteColor,
                    width: "100%",
                    alignItems: "center",
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                  onPress={() => switchTab("pro")}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Feather
                      name="loader"
                      size={22}
                      color={
                        activeTab === "Processing"
                          ? Constant.primaryColor
                          : Constant.darkGrayColor
                      }
                    />
                    <Text style={styles1.to_category_switchText}>
                      {" "}
                      {CONSTANT.processingorders}{" "}
                    </Text>
                  </View>
                  <View
                    style={{ justifyContent: "center", flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        color: Constant.primaryColor,
                        fontWeight: "700",
                        fontSize: 17,
                      }}
                    >
                      {" "}
                      ({totalProcessingorders}){" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  borderBottomWidth: activeTab === "Completed" ? 4 : 2,
                  borderBottomColor:
                    activeTab === "Completed"
                      ? Constant.buttonColor
                      : Constant.GainsboroColor,
                  backgroundColor:
                    activeTab === "Completed"
                      ? Constant.buttonColor
                      : Constant.whiteColor,
                  width: "100%",
                  alignItems: "center",
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
                onPress={() => switchTab("com")}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Icon
                    name="file-download-done"
                    size={22}
                    color={
                      activeTab === "Completed"
                        ? Constant.primaryColor
                        : Constant.darkGrayColor
                    }
                  />
                  <Text style={styles1.to_category_switchText}>
                    {" "}
                    {CONSTANT.completedorders}{" "}
                  </Text>
                </View>
                <View
                  style={{ justifyContent: "center", flexDirection: "row" }}
                >
                  <Text
                    style={{
                      color: Constant.primaryColor,
                      fontWeight: "700",
                      fontSize: 17,
                    }}
                  >
                    {" "}
                    ({totalCompletedorders}){" "}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderBottomWidth: activeTab === "Cancelled" ? 4 : 2,
                  borderBottomColor:
                    activeTab === "Cancelled"
                      ? Constant.buttonColor
                      : Constant.GainsboroColor,
                  backgroundColor:
                    activeTab === "Cancelled"
                      ? Constant.buttonColor
                      : Constant.whiteColor,
                  width: "100%",
                  alignItems: "center",
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
                onPress={() => switchTab("can")}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Icon
                    name="cancel"
                    size={22}
                    color={
                      activeTab === "Cancelled"
                        ? Constant.primaryColor
                        : Constant.darkGrayColor
                    }
                  />
                  <Text style={styles1.to_category_switchText}>
                    {" "}
                    {CONSTANT.cancelledorders}{" "}
                  </Text>
                </View>
                <View
                  style={{ justifyContent: "center", flexDirection: "row" }}
                >
                  <Text
                    style={{
                      color: Constant.primaryColor,
                      fontWeight: "700",
                      fontSize: 17,
                    }}
                  >
                    {" "}
                    ({totalCancelorders}){" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={order_data}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    width: "100%",
  },
  mediaControls: {
    height: "100%",
    flex: 1,
    alignSelf: "center",
  },
  checkBoxStyle: {
    marginTop: 5,
    marginBottom: 10,
    height: windowHeight / 15,
    borderColor: Constant.gray80Color,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  checkBoxSelectorStyle: {
    height: 25,
    width: 25,
    borderColor: Constant.GainsboroColor,
    borderWidth: 1,
    borderRadius: 25 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderList;
