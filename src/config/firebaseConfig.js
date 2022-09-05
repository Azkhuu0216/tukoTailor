// import firebase from "@react-native-firebase/app";
// const firebaseConfig = {
//   api_key: "AIzaSyD7Cc632K8Dvqk7fQ5umSJMWpwWmB6eDME",
//   databaseURL:
//     "https://console.firebase.google.com/u/0/project/tukoapp-803ea/firestore/data/~2F",
//   projectId: "tukoapp-803ea",
//   appId: "1:76356547303:ios:ba93b532fdf99f5c242842",
// };
// let app;
// if (firebase.apps.length === 0) {
//   console.log("0------");
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
//   console.log("1------");
// }
// export default app;

import firebase from "@react-native-firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBZzYPr-gBKhoSYR4GQ5Koeaq3f7bhVEU",
  authDomain: "tukotailor-d603c.firebaseapp.com",
  projectId: "tukotailor-d603c",
  storageBucket: "tukotailor-d603c.appspot.com",
  messagingSenderId: "149692741948",
  appId: "1:149692741948:web:3f34cb89aae25cb91ec639",
  measurementId: "G-CKCN678X7G",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  console.log("0------");
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
  console.log("1------");
}
export default app;
