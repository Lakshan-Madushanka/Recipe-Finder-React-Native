import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderBotton";
import CategoryGridItem from "../components/CategoryGridItem";
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => (
    <CategoryGridItem
      title={itemData.item.title}
      color={itemData.item.color}
      onSelect={() =>
        props.navigation.navigate({
          routeName: "CategoryMeals",
          params: { categoryId: itemData.item.id },
        })
      }
    />
  );
  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-menu"
          color={Platform.OS === "android" ? "white" : Colors.primaryColor}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "red",
  },
  gridItem: {
    flex: 1,
    backgroundColor: "blue",
    margin: 15,
    height: 35,
  },
});

export default CategoriesScreen;
