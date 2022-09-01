import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";

const PushController = () => {
  useEffect(() => {
    if (Platform.OS === "ios") {
      // PushNotificationIOS.addEventListener('notification', onRemoteNotification);
      messaging()
        .getToken()
        .then((token) => {
          console.log("IOS TOKEN:", token);
        });
    }

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        if (Platform.OS === "ios") {
          if (
            notification.foreground &&
            (notification.userInteraction || notification.remote)
          ) {
            PushNotification.localNotification(notification);
          }
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        } else {
          if (notification.foreground) {
            PushNotification.localNotification(notification);
          }
        }
        // if (notification.foreground)
        // {
        //   PushNotification.localNotification(notification);
        // }
        if (Platform.OS === "ios") {
          if (
            notification.foreground &&
            (notification.userInteraction || notification.remote)
          ) {
            PushNotificationIOS.addNotificationRequest(notification);
            Alert.alert("kkkkkkkkk");
          }
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        } else {
          if (notification.foreground) {
            PushNotification.localNotification(notification);
          }
        }
        console.log("NOTIFICATION:", notification);
        //Alert.alert(notification.data.Type)
        // process the notification here
        // required on iOS only
        //  notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // Android only
      senderID: "62927604648",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  // const onRemoteNotification = (notification) => {
  //   const actionIdentifier = notification.getActionIdentifier();

  //   if (actionIdentifier === 'open') {
  //     // Perform action based on open action
  //     Alert.alert( "Hello")
  //   }

  //   if (actionIdentifier === 'text') {
  //     Alert.alert( "Hello")
  //     // Text that of user input.
  //     const userText = notification.getUserText();
  //     // Perform action based on textinput action
  //   }
  // };
  return null;
};

export default PushController;
