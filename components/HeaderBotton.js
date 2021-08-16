import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomeHeaderButton = (props) => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />;
};

export default CustomeHeaderButton;
