import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealList from "../components/MealList";
import { CATEGORIES } from "../data/dummy-data";

const CategoryMeals = (props) => {
  const availableMeals = useSelector(
    (state) => state.mealsReducer.filteredMeals
  );

  selectedCategoryId = props.navigation.getParam("categoryId");

  selectedCategory = CATEGORIES.find(
    (category) => category.id === selectedCategoryId
  );

  const meals = availableMeals.filter((meal) => {
    return meal.categoryIds.includes(selectedCategoryId);
  });

  if (meals.length === 0) {
    return (
      <View style={styles.content}>
        <Text style={styles.fallBackText}>
          No meals found, maybe check your filters?
        </Text>
      </View>
    );
  }
  return <MealList listData={meals} navigation={props.navigation} />;
};

CategoryMeals.navigationOptions = (navigationData) => {
  categoryId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    padding: 35,
    color: "red",
    backgroundColor: "#C7C7C7",
  },
});

export default CategoryMeals;
