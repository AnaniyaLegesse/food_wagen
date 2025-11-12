import { Meal } from './mealType';

export const mealAPI = {
  fetchMeals: () => fetch('https://6852821e0594059b23cdd834.mockapi.io/Food').then(res => res.json()),
  addMeal: (meal: Omit<Meal, 'id'>) =>
    fetch('https://6852821e0594059b23cdd834.mockapi.io/Food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal),
    }).then(res => res.json()),
  updateMeal: (id: string, updates: Partial<Meal>) =>
    fetch(`https://6852821e0594059b23cdd834.mockapi.io/Food/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    }).then(res => res.json()),
  deleteMeal: (id: string) =>
    fetch(`https://6852821e0594059b23cdd834.mockapi.io/Food/${id}`, {
      method: 'DELETE',
    }),
};