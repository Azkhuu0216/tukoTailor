import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from "react-native-popup-dialog";
import * as Constant from "../styles/styles";

const Dailogbox = (props, { navigation }) => {
  const [dialoigeVisible, setDialoigeVisible] = useState(props.activeDialog);

  const CancleDialouge = () => {
    setDialoigeVisible(false);
  };
  return (
    <View style={styles.container}>
      <Dialog
        dialogStyle={{
          marginHorizontal: 20,
          backgroundColor: Constant.primaryColor,
          borderColor: Constant.buttonColor,
          borderWidth: 2,
          overflow: "hidden",
        }}
        visible={dialoigeVisible}
        footer={
          <DialogFooter>
            <DialogButton
              textStyle={{
                fontSize: 15,
                fontWeight: "700",
                color: Constant.whiteColor,
              }}
              text={"Yes"}
              onPress={() => CancleDialouge()}
            />
            <DialogButton
              textStyle={{
                fontSize: 15,
                fontWeight: "700",
                color: Constant.whiteColor,
              }}
              text={"No"}
              onPress={() => CancleDialouge()}
            />
          </DialogFooter>
        }
      >
        <DialogContent>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginVertical: 10,
              color: Constant.buttonColor,
              textAlign: "center",
            }}
          >
            Attention!!!
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 10,
              color: Constant.whiteColor,
            }}
          >
            Are You Sure For This Action..
          </Text>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default Dailogbox;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    //backgroundColor: '#fff',
  },
});
