import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import * as Constant from "../styles/globalStyles";
import Entypo from "react-native-vector-icons/Entypo";

const DropDown = ({ data, name, onChange, value, width, style }) => {
  // const [value, setValue] = useState<any>(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Dropdown
      style={[
        { width: width },
        styles.dropdown,
        isFocus && { borderColor: Constant.primaryColor },
        style,
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? name : "..."}
      searchPlaceholder="Хайх..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        // setValue(item.value);
        onChange(item.value);

        // setValue;
        setIsFocus(false);
      }}
      activeColor={Constant.whiteColor}
      renderRightIcon={() => (
        <Entypo
          style={styles.icon}
          color={Constant.gray90Color}
          name={isFocus ? "chevron-small-down" : "chevron-small-right"}
          size={28}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    // width: width,
    borderWidth: 1,
    backgroundColor: Constant.whiteColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginRight: 15,
  },
  icon: {
    color: Constant.gray90Color,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 18,
    color: Constant.gray90Color,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: Constant.blackColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

export default DropDown;
