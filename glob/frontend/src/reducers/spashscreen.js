import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  animation_completed: false,
  animation_class: "hide-temporarily",
};

const showItems = (state, action) => {
  return updateObject(state, {
    animation_completed: action.animation_complete,
    animation_class: action.animation_class,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.HERO_ANIMATION_DONE:
      return showItems(state, action);
    default:
      return state;
  }
};

export default reducer;
