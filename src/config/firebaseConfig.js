// import Firebase from "firebase";
// const firebaseConfig = {
//   api_key: "AIzaSyBBZzYPr-gBKhoSYR4GQ5Koeaq3f7bhVEU",
//   databaseURL:
//     "https://console.firebase.google.com/u/0/project/tukotailor-d603c/firestore/data/~2F",
//   projectId: "ukotailor-d603c",
//   appId: "1:149692741948:web:3f34cb89aae25cb91ec639",
// };
// // let app;
// // if (firebase.apps.length === 0) {
// //   console.log("0------");
// //   app = firebase.initializeApp(firebaseConfig);
// // } else {
// //   app = firebase.app();
// //   console.log("1------");
// // }
// export default Firebase.initializeApp(firebaseConfig);

import firebase from "firebase";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBZzYPr-gBKhoSYR4GQ5Koeaq3f7bhVEU",
  authDomain: "tukotailor-d603c.firebaseapp.com",
  databaseURL: "https://tukotailor-d603c-default-rtdb.firebaseio.com",
  projectId: "tukotailor-d603c",
  storageBucket: "tukotailor-d603c.appspot.com",
  messagingSenderId: "149692741948",
  appId: "1:149692741948:web:3f34cb89aae25cb91ec639",
  measurementId: "G-CKCN678X7G",
};

// // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
