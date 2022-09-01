import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

const AlertBox = (props) => {
  const [showAlertState, setShowAlertState] = useState(props.initialValue);
  const showAlert = () => {
    setShowAlertState(true);
  };

  const hideAlert = () => {
    setShowAlertState(false);
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={true}
        showProgress={false}
        title={props.title}
        message={props.description}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={props.cancle}
        confirmText={props.confirm}
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          hideAlert();
        }}
      />
    </View>
  );
};
export default AlertBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
