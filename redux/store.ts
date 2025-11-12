import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { mealSaga } from './meal/mealSaga';
import {mealReducer} from './meal/mealSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    meals: mealReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(mealSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;