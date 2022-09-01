import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider.ios";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack.ios";
// import auth from "@react-native-firebase/auth";
// import AppStack from "./AppStack";
// import AuthStack from "./AuthProvider";
// import { AuthContext } from "./AuthProvider.ios";
// import { NavigationContainer } from "@react-navigation/native";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
