import { createStore, combineReducers } from "redux";

import mealsReducer from "./reducers/mealsReducer";

const rootReducer = combineReducers({
  mealsReducer,
});

const store = createStore(rootReducer);

export default store;
