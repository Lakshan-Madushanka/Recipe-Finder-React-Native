import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import MealDetailScreen from "../screens/MealDetailScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" && Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitlesStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen",
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavouriteMealsNavigator = createStackNavigator(
  {
    Favourite: FavouritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: CategoriesScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabNavigationConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabBarInfo) => (
        <Ionicons
          name="ios-restaurant"
          size={25}
          color={tabBarInfo.tintColor}
        />
      ),
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: (tabBarInfo) => (
        <Ionicons name="ios-home" size={25} color={tabBarInfo.tintColor} />
      ),
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Home</Text>
        ) : (
          "Home"
        ),
      tabBarColor: Colors.primaryColor,
    },
  },
  Favourite: {
    screen: FavouriteMealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabBarInfo) => (
        <Ionicons name="ios-star" size={25} color={tabBarInfo.tintColor} />
      ),
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favourites</Text>
        ) : (
          "Favourites"
        ),

      tabBarColor: Colors.accentColor,
    },
  },
};

const TabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabNavigationConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
        initialRouteName: "Home",
      })
    : createBottomTabNavigator(tabNavigationConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
          labelStyle: {
            fontFamily: "open-sans",
          },
          style: {
            //backgroundColor: "",
          },
        },
        initialRouteName: "Home",
      });

const FiltersStackNavigater = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: TabNavigator,
      navigationOptions: { drawerLabel: " Meals " },
    },
    Filters: FiltersStackNavigater,
  },
  {
    //contentComponent: () => <Text>LAkshan</Text>,
    contentOptions: {
      activeTintColor: Colors.accentColor,
      inactiveTintColor: "white",

      labelStyle: {
        fontFamily: "open-sans-bold",
        // fontSize: 25,
        //color: "white",
        letterSpacing: 2,
      },
    },
    drawerBackgroundColor: Colors.primaryColor,
  }
);

export default createAppContainer(MainNavigator);
