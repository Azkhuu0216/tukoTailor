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
import { createDrawerNavigator } from "@react-navigation/drawer";
import AntIcon from "react-native-vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as CONSTANT from "../styles/local";
import { AuthContext } from "../provider/AuthProvider.ios";
import Categories from "./order/Categories";
import Profile from "./profile/Profile";
import Contact from "./contact/Contact";
import OrderHistory from "./order/OrderHistory";
import settings from "./settings/settings";
import OrderAdd from "./order/OrderAdd";
import ProfileDetail from "./contact/ProfileDetail";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabStack = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={CONSTANT.AppStackCategories}
        component={Categories}
        options={{
          tabBarIcon: (props) => (
            <AntIcon name="barschart" size={18} color={Constant.primaryColor} />
          ),
        }}
      />
      <Tab.Screen
        name={CONSTANT.AppStackProfile}
        component={Profile}
        options={{
          tabBarIcon: (props) => (
            <AntIcon name="profile" size={18} color={Constant.primaryColor} />
          ),
        }}
      />
      <Tab.Screen
        name={CONSTANT.AppStackCart}
        component={Contact}
        options={{
          tabBarIcon: (props) => (
            <AntIcon
              name="shoppingcart"
              size={18}
              color={Constant.primaryColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name={CONSTANT.AppStackHistory}
        component={OrderHistory}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="history"
              size={18}
              color={Constant.primaryColor}
            />
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
          component={settings}
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
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
