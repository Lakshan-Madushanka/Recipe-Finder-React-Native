import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";

import MealItem from "../components/MealItem";

const MealList = (props) => {
  const favMeals = useSelector((state) => state.mealsReducer.favMeals);

  const renderMealsItem = (items) => {
    const isFavMeal = favMeals.some((meal) => meal.id === items.item.id);

    return (
      <MealItem
        name={items.item.title}
        affordability={items.item.affordability}
        complexity={items.item.complexity}
        imageUrl={items.item.imageUrl}
        duration={items.item.duration}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: items.item.id,
              mealTitle: items.item.title,
              isFav: isFavMeal,
            },
          });
        }}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={props.listData}
        renderItem={renderMealsItem}
        style={styles.mealContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default MealList;
