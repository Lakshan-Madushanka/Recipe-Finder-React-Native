import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MealList from "../components/MealList";
import HeaderButton from "../components/HeaderBotton";
import { toggleFav } from "../store/actions/toggleFavAction";
import Colors from "../constants/Colors";

const MealDetailScreen = (props) => {
  const [a, b] = useState(true);
  const dispatch = useDispatch();
  const mealId = props.navigation.getParam("mealId");
  const availableMeals = useSelector((state) => state.mealsReducer.meals);

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const ingredients = selectedMeal.ingredients;
  const steps = selectedMeal.steps;

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFav(mealId));
    b(!a);
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFavourite: toggleFavHandler });
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.image}>
        <MealList listData={[selectedMeal]} navigation={props.navigation} />
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>Ingredients</Text>

          {ingredients.map((ingredient, index) => (
            <Text style={styles.text} key={index}>
              {ingredient}
            </Text>
          ))}
          <Text style={styles.title}>Steps ({steps.length})</Text>

          {steps.map((ingredient, index) => (
            <Text style={styles.text} key={index}>
              {index + 1}). {ingredient}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavouriteHandler =
    navigationData.navigation.getParam("toggleFavourite");
  const isFavourite = navigationData.navigation.getParam("isFav");
  const markAsFavourite = navigationData.navigation.getParam("markAsFavourite");

  // const markAsFavourite = () => isFav || markAsFavourite;
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavourite ? "ios-star" : "ios-star-outline"}
          color={isFavourite ? Colors.accentColor : "white"}
          //onPress={toggleFavouriteHandler}
          onPress={() => {
            if (isFavourite) {
              navigationData.navigation.setParams({
                isFav: !isFavourite,
              });
            } else {
              navigationData.navigation.setParams({ isFav: true });
            }

            toggleFavouriteHandler();
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
  },
  image: {
    height: 200,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 5,
    marginTop: 0,
  },
  scrollContainer: {
    flex: 1,
    margin: 0,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginVertical: 15,
    textAlign: "center",
  },
  text: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginBottom: 15,
    padding: 10,
    fontFamily: "open-sans",
  },
});

export default MealDetailScreen;
