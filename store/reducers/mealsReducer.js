import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVOURITE } from "../actions/toggleFavAction";
import { FILTER_MEAL } from "../actions/mealFilterAction";

const initialState = {
  meals: MEALS,
  favMeals: [],
  filteredMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIdIndex = state.favMeals.findIndex(
        (meal) => meal.id === action.mealId
      );

      if (existingIdIndex >= 0) {
        let updatedMeals = [...state.favMeals];
        updatedMeals.splice(existingIdIndex, 1);
        return {
          ...state,
          favMeals: updatedMeals,
        };
      } else {
        const newMeal = state.meals.find((meal) => meal.id === action.mealId);
        let updatedMeals = state.favMeals.concat(newMeal);
        return {
          ...state,
          favMeals: updatedMeals,
        };
      }

    case FILTER_MEAL:
      const appliedFilters = action.filters;

      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };

    default:
      return state;
  }
};

export default mealsReducer;
