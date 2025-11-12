import {  PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call, put } from 'redux-saga/effects';
import { addMeal, addMealSuccess, apiFailure, deleteMeal, deleteMealSuccess, fetchMeals, fetchMealsSuccess, updateMeal, updateMealSuccess } from './mealSlice';
import { Meal } from './mealType';
import { mealAPI } from './mealApi';


// Sagas
function* fetchMealsSaga(): Generator<any, void, any> {
  try {
    const meals = yield call(mealAPI.fetchMeals);
    yield put(fetchMealsSuccess(meals));
  } catch (error: any) {
    yield put(apiFailure(error.message));
  }
}

function* addMealSaga(action: PayloadAction<Omit<Meal, 'id'>>): Generator<any, void, any> {
  try {
    const newMeal = yield call(mealAPI.addMeal, action.payload);
    yield put(addMealSuccess(newMeal));
  } catch (error: any) {
    yield put(apiFailure(error.message));
  }
}

function* updateMealSaga(action: PayloadAction<{ id: string; updates: Partial<Meal> }>): Generator<any, void, any> {
  try {
    const updatedMeal = yield call(mealAPI.updateMeal, action.payload.id, action.payload.updates);
    yield put(updateMealSuccess(updatedMeal));
  } catch (error: any) {
    yield put(apiFailure(error.message));
  }
}

function* deleteMealSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    yield call(mealAPI.deleteMeal, action.payload);
    yield put(deleteMealSuccess(action.payload));
  } catch (error: any) {
    yield put(apiFailure(error.message));
  }
}

// Root saga
export function* mealSaga() {
  yield takeEvery(fetchMeals.type, fetchMealsSaga);
  yield takeEvery(addMeal.type, addMealSaga);
  yield takeEvery(updateMeal.type, updateMealSaga);
  yield takeEvery(deleteMeal.type, deleteMealSaga);
}