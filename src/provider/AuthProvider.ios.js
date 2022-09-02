import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-community/google-signin";
// import { LoginManager, AccessToken } from "react-native-fbsdk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONSTANT from "../styles/local";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          if (email == null || password == null) {
            Alert.alert(CONSTANT.Oops, CONSTANT.authPleaseaddproperly);
          } else {
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              Alert.alert(CONSTANT.Oops, CONSTANT.authNouserrecordmaydeleted);
              console.log(e);
            }
          }
        },
        resetPassword: async (email) => {
          if (email == null) {
            Alert.alert(CONSTANT.Oops, CONSTANT.authAddemail);
          } else {
            try {
              await auth().sendPasswordResetEmail(email);
            } catch (e) {
              console.log(e);
            }
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.log({ error });
          }
        },
        // fbLogin: async () => {
        //   try {
        //     // Attempt login with permissions
        //     const result = await LoginManager.logInWithPermissions([
        //       "public_profile",
        //       "email",
        //     ]);

        //     if (result.isCancelled) {
        //       throw "User cancelled the login process";
        //     }

        //     // Once signed in, get the users AccesToken
        //     const data = await AccessToken.getCurrentAccessToken();

        //     if (!data) {
        //       throw "Something went wrong obtaining access token";
        //     }
        //     // Create a Firebase credential with the AccessToken
        //     const facebookCredential = auth.FacebookAuthProvider.credential(
        //       data.accessToken
        //     );

        //     // Sign-in the user with the credential
        //     await auth().signInWithCredential(facebookCredential);
        //   } catch (error) {
        //     console.log({ error });
        //   }
        // },
        register: async (
          email,
          password,
          first_name,
          last_name,
          phone_number,
          address,
          imageUrl,
          position
        ) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(function (data) {
                firestore()
                  .collection("users")
                  .doc(data.user.uid)
                  .set({
                    user_id: data.user.uid,
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: phone_number,
                    address: address,
                    position: position,
                    profile_image: imageUrl,
                    role: "user",
                  })
                  .then(() => {})
                  .catch((error) => {});
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await AsyncStorage.removeItem("cartArray");
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
