import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackView } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntIcon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import firestore from "@react-native-firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CONSTANT from "../styles/local";
import { AuthContext } from "../provider/AuthProvider.ios";
import Profile from "./profile/Profile";
import Contact from "./contact/Contact";
import settings from "./settings/settings";
import ProfileDetail from "./contact/ProfileDetail";
import * as Constant from "../styles/globalStyles";
import {
  AddCategories,
  Categories,
  OrderAdd,
  OrderAddScreen,
  OrderHistory,
} from "./order";
import Settings from "./settings/settings";
import Notification from "./Notification";
import ChatScreen from "./chat/ChatScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        // name={CONSTANT.AppStackCategories}
        name="Захиалга" // Нэрийг сольсон.
        component={Categories}
        options={{
          tabBarIcon: (props) => (
            <Feather name="home" size={24} color={Constant.primaryColor} />
          ),
        }}
      />
      <Tab.Screen
        // name={CONSTANT.AppStackProfile}
        name="Хайлт"
        component={OrderHistory}
        options={{
          tabBarIcon: (props) => (
            <AntIcon name="search1" size={24} color={Constant.primaryColor} />
          ),
          tabBarLabel: "Хайлт",
        }}
      />
      <Tab.Screen
        // name={CONSTANT.AppStackCart}
        name="Холбоо"
        component={Contact}
        options={{
          tabBarIcon: (props) => (
            <Feather name="users" size={24} color={Constant.primaryColor} />
          ),
        }}
      />
      <Tab.Screen
        // name={CONSTANT.AppStackCart}
        name="Чат"
        component={ChatScreen}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome
              name="wechat"
              size={24}
              color={Constant.primaryColor}
            />
          ),
        }}
      />
      <Tab.Screen
        // name={CONSTANT.AppStackHistory}
        name="Пропайл"
        component={Profile}
        options={{
          tabBarIcon: (props) => (
            <Feather name="user" size={24} color={Constant.primaryColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const { user, logout } = useContext(AuthContext);
  const [showuserside, setShowuserside] = useState(false);
  const [showAdminSide, setShowAdminSide] = useState(false);
  const [adminID, setAdminID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAddedUserAccess();
  }, []);
  const getAddedUserAccess = async () => {
    try {
      await firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.id == user.uid) {
              if (documentSnapshot.data().role == "admin") {
                setIsLoading(false);
                setShowAdminSide(true);
              } else {
                setIsLoading(false);
                setShowuserside(true);
              }
            }
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Constant.primaryColor,
            height: "100%",
          }}
        >
          <ActivityIndicator
            size="small"
            color={Constant.primaryColor}
            style={{
              height: 30,
              width: 30,
              borderRadius: 30 / 2,
              backgroundColor: Constant.whiteColor,
              elevation: 5,
            }}
          />
        </View>
      )}
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={showAdminSide ? Categories : TabStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderAdd"
          component={OrderAdd}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="AddCategories" component={AddCategories} />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
