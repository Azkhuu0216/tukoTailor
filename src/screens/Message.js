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
  var todayDate = moment();
  try {
    console.log(IsAdmin);
    return await firebase
      .database()
      .ref("messages/" + currentuser_id)
      .child(IsAdmin == "true" ? guestuser_id : JSON.parse(guestuser_id))
      .push({
        messege: {
          sender: currentuser_id,
          reciever: IsAdmin == "true" ? guestuser_id : JSON.parse(guestuser_id),
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
    var id = IsAdmin == "true" ? guestuser_id : JSON.parse(guestuser_id);
    return await firebase
      .database()
      .ref("messages/" + id)
      .child(currentuser_id)
      .push({
        messege: {
          sender: currentuser_id,
          reciever: IsAdmin == "true" ? guestuser_id : JSON.parse(guestuser_id),
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
