import * as types from './actionTypes';

const initialstate = {
  recipes: [],
  error: null,
  loading: false,
};

const recipeReducer = (state = initialstate, action) => {
  switch (action.type) {
    case types.FETCH_RECIPE_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case types.FETCH_RECIPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default recipeReducer;
