import { createStore, combineReducers } from "redux";
import { Comments } from "./comments";
import { Campsites } from "./campsites";
import { Partners } from "./partners";
import { Promotions } from "./promotions";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      campsites: Campsites,
      comments: Comments,
      partners: Partners,
      promotions: Promotions
    })
  );

  return store;
};
