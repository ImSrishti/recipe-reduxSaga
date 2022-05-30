import { takeLatest, put, all, fork, call } from 'redux-saga/effects';
import * as types from './actionTypes';
import { getRecipes } from './api';

export function* onLoadRecipeAsync({ query }) {
  try {
    const response = yield call(getRecipes, query);
    yield put({ type: types.FETCH_RECIPE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_RECIPE_FAILURE, payload: error });
  }
}

export function* onLoadRecipe() {
  yield takeLatest(types.FETCH_RECIPE_START, onLoadRecipeAsync);
}

const recipeSaga = [fork(onLoadRecipe)];

export default function* rootSaga() {
  yield all([...recipeSaga]);
}
