import firebase from "@react-native-firebase/app";
const firebaseConfig = {
  api_key: "AIzaSyD7Cc632K8Dvqk7fQ5umSJMWpwWmB6eDME",
  databaseURL:
    "https://console.firebase.google.com/u/0/project/tukoapp-803ea/firestore/data/~2F",
  projectId: "tukoapp-803ea",
  appId: "1:76356547303:ios:ba93b532fdf99f5c242842",
};
let app;
if (firebase.apps.length === 0) {
  console.log("0------");
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
  console.log("1------");
}
export default app;
