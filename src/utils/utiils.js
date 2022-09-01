import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const setNavigation = (
  navigation,
  title,
  canGoBack = false,
  isWhite = false,
  isFromAdsBack = false,
  goParentCategory
) => {
  navigation.setOptions({
    headerLeft: ({}) =>
      canGoBack ? (
        <TouchableOpacity
          style={{ paddingLeft: 10 }}
          onPress={() => {
            isFromAdsBack ? goParentCategory() : navigation.goBack();
          }}
        >
          <Entypo
            name="chevron-small-left"
            size={30}
            color={isWhite ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      ) : null,
    headerTitle: () => (
      <Text
        style={{
          fontWeight: "bold",
          color: isWhite ? "#fff" : "#000",
          marginEnd: 60,
        }}
      >
        {title}
      </Text>
    ),
  });
};
export { setNavigation };
