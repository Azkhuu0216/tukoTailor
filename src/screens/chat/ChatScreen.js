import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import MainHeader from "../../components/MainHeader";
import Spinner from "react-native-loading-spinner-overlay";
import Icons from "react-native-vector-icons/MaterialIcons";
import { SendMessage, RecieveMessage } from "../Message";
import firebase from "../../config/firebaseConfig";
import ImgToBase64 from "react-native-image-base64";
import * as Constant from "../../styles/globalStyles";
import { AuthContext } from "../../provider/AuthProvider.ios";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CONSTANT from "../../styles/local";
import moment from "moment";
const ChatScreen = ({ route }) => {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [guestUid, setGuestUid] = useState("");
  const [currentUid, setCurrentUid] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    try {
      firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot != null) {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == user.uid) {
                if (documentSnapshot.data().role == "admin") {
                  AsyncStorage.setItem("IsAdmin", "true");
                  getData();
                } else {
                  AsyncStorage.setItem("IsAdmin", "false");
                  getData();
                }
              }
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    const currentUid = user.uid;
    const guestUid = route.params.id;

    setCurrentUid(currentUid);
    setGuestUid(guestUid);

    try {
      const IsAdmin = await AsyncStorage.getItem("IsAdmin");
      firebase
        .database()
        .ref("messages")
        .child(currentUid)
        .child(IsAdmin == "true" ? guestUid : JSON.parse(guestUid))
        .on("value", (dataSnapshot) => {
          let message = [];
          dataSnapshot.forEach((data) => {
            message.push({
              sendBy: data.val().messege.sender,
              recieveBy: data.val().messege.reciever,
              msg: data.val().messege.msg,
              image: data.val().messege.image,
              date: data.val().messege.date,
              time: data.val().messege.time,
            });
          });
          setAllMessages(message.reverse());
        });
    } catch (error) {
      alert(error);
    }
  };

  const openGallery = () => {
    launchImageLibrary("photo", (response) => {
      setLoader(true);
      ImgToBase64.getBase64String(response.uri)
        .then(async (base64String) => {
          let source = "data:image/jpeg;base64," + base64String;
          SendMessage(currentUid, guestUid, "", source, IsAdmin)
            .then((res) => {
              setLoader(false);
            })
            .catch((err) => {
              alert(err);
            });

          RecieveMessage(currentUid, guestUid, "", source, IsAdmin)
            .then((res) => {
              setLoader(false);
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => setLoader(false));
    });
  };

  const sendMessage = async () => {
    if (message) {
      const IsAdmin = await AsyncStorage.getItem("IsAdmin");
      SendMessage(currentUid, guestUid, message, "", IsAdmin)
        .then((res) => {
          console.log(res);
          setMessage("");
        })
        .catch((err) => {
          alert(err);
        });

      RecieveMessage(currentUid, guestUid, message, "", IsAdmin)
        .then((res) => {
          console.log(res);
          setMessage("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Constant.primaryColor }}>
      {/* <MainHeader title={CONSTANT.chatscreenHelpSupport} back={true} /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        inverted
        style={{ marginBottom: 60 }}
        data={allMessages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 5,
              marginHorizontal: 10,
              maxWidth: Dimensions.get("window").width / 1.4,
              alignSelf: currentUid === item.sendBy ? "flex-end" : "flex-start",
            }}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor:
                  currentUid === item.sendBy
                    ? Constant.buttonColor
                    : Constant.whiteColor,
              }}
            >
              {item.image === "" ? (
                <Text style={{ padding: 10, fontSize: 14 }}>
                  {item.msg} {"   "}{" "}
                  <Text style={{ fontSize: 10 }}>{item.time}</Text>
                </Text>
              ) : (
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: Dimensions.get("window").width / 1.4,
                      height: 250,
                      resizeMode: "cover",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      />
      <View
        style={{
          bottom: 0,
          height: 50,
          position: "absolute",
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 10,
        }}
      >
        <View style={{ width: "80%", justifyContent: "center" }}>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder={CONSTANT.chatscreenEntermessage}
            placeholderTextColor={Constant.blackColor}
            style={{
              height: 40,
              borderRadius: 20,
              backgroundColor: Constant.whiteColor,
              paddingLeft: 10,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
          onPress={() => openGallery()}
        >
          <Icons name="image" size={30} color={Constant.whiteColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => sendMessage()}
        >
          <Icons name="send" size={30} color={Constant.whiteColor} />
        </TouchableOpacity>
      </View>
      <Spinner visible={loader} />
    </SafeAreaView>
  );
};

export default ChatScreen;
