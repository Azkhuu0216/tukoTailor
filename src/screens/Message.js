import firebase from "../config/firebaseConfig";
import moment from "moment";
import { Alert } from "react-native";

export const SendMessage = async (
  currentuser_id,
  guestuser_id,
  msgValue,
  imgSource,
  IsAdmin
) => {
  // console.log(currentuser_id, "current------"),
  // console.log(guestuser_id, "guest-------");
  // console.log(IsAdmin, "admin----");
  console.log(imgSource, "imgSourde----");
  var todayDate = moment();
  try {
    return await firebase
      .database()
      .ref("messages/" + currentuser_id)
      .child(guestuser_id)
      .push({
        messege: {
          sender: currentuser_id,
          reciever: guestuser_id,
          msg: msgValue,
          image: imgSource,
          date: todayDate.format("YYYY-MM-DD"),
          time: todayDate.format("hh:mm A"),
        },
      });
  } catch (error) {
    return error;
  }
};

export const RecieveMessage = async (
  currentuser_id,
  guestuser_id,
  msgValue,
  imgSource,
  IsAdmin
) => {
  try {
    var todayDate = moment();
    var id = guestuser_id;
    return await firebase
      .database()
      .ref("messages/" + id)
      .child(currentuser_id)
      .push({
        messege: {
          sender: currentuser_id,
          reciever: guestuser_id,
          msg: msgValue,
          image: imgSource,
          date: todayDate.format("YYYY-MM-DD"),
          time: todayDate.format("hh:mm A"),
        },
      });
  } catch (error) {
    return error;
  }
};
