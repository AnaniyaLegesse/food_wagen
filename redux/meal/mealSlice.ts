import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal, MealState } from './mealType';

// Initial State
const initialState: MealState = {
  meals: [],
  filteredMeals: [],
  searchTerm: '',
  loading: false,
  error: null,
};

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    // Search
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredMeals = state.meals.filter(meal =>
        meal.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    // Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // API Actions (dispatched by components)
    fetchMeals: (state) => {
      state.loading = true;
    },
    addMeal: (state, action: PayloadAction<Omit<Meal, 'id'>>) => {
      state.loading = true;
    },
    updateMeal: (state, action: PayloadAction<{ id: string; updates: Partial<Meal> }>) => {
      state.loading = true;
    },
    deleteMeal: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },

    // Success Actions (called by sagas)
    fetchMealsSuccess: (state, action: PayloadAction<Meal[]>) => {
      state.meals = action.payload;
      state.filteredMeals = action.payload;
      state.loading = false;
    },
    addMealSuccess: (state, action: PayloadAction<Meal>) => {
      state.meals.unshift(action.payload);
      state.filteredMeals.unshift(action.payload);
      state.loading = false;
    },
    updateMealSuccess: (state, action: PayloadAction<Meal>) => {
      const index = state.meals.findIndex(meal => meal.id === action.payload.id);
      if (index !== -1) {
        state.meals[index] = action.payload;
        state.filteredMeals[index] = action.payload;
      }
      state.loading = false;
    },
    deleteMealSuccess: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(meal => meal.id !== action.payload);
      state.filteredMeals = state.filteredMeals.filter(meal => meal.id !== action.payload);
      state.loading = false;
    },

    // Failure
    apiFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  setSearchTerm,
  setLoading,
  fetchMeals,
  addMeal,
  updateMeal,
  deleteMeal,
  fetchMealsSuccess,
  addMealSuccess,
  updateMealSuccess,
  deleteMealSuccess,
  apiFailure,
} = mealSlice.actions;

export const mealReducer = mealSlice.reducer;