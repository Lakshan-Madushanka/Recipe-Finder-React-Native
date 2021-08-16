import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import MealsNavigator from "./navigation/MealsNavigation";
import Colors from "./constants/Colors";
import store from "./store/store";

enableScreens();

export default function App() {
  const [isLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!isLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <View style={styles.screen}>
        <StatusBar backgroundColor={Colors.primaryColor} />
        <MealsNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
