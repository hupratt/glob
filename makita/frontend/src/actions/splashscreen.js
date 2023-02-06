import * as actionTypes from "./actionTypes";

export const animation = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HERO_ANIMATION_DONE,
      animation_complete: true,
      animation_class: "",
    });
  };
};
