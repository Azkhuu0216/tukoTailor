import Firebase from "firebase";

const firebaseConfig = {
  api_key: "AIzaSyD7Cc632K8Dvqk7fQ5umSJMWpwWmB6eDME",
  databaseURL:
    "https://console.firebase.google.com/u/0/project/tukoapp-803ea/firestore/data/~2F",
  projectId: "tukoapp-803ea",
  appId: "1:76356547303:ios:ba93b532fdf99f5c242842",
};
// https://github.com/firebase/firebase-ios-sdk
export default Firebase.initializeApp(firebaseConfig);
