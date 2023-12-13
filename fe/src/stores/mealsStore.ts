import { defineStore } from 'pinia';
import { Meal } from 'src/types';

interface State {
  meals: Meal[];
}

export const useMealsStore = defineStore('meals', {
  state: (): State => ({
    meals: [
      {
        id: '1',
        dishes: [
          {
            id: '1',
            name: 'Pizza',
            recipe: 'Make pizza',
          },
          {
            id: '2',
            name: 'Pasta',
            recipe: 'Make pasta',
          },
        ],
        isFav: true,
      },
      {
        id: '2',
        dishes: [
          {
            id: '1',
            name: 'Pizza',
            recipe: 'Make pizza',
          },
          {
            id: '2',
            name: 'Pasta',
            recipe: 'Make pasta',
          },
        ],
        isFav: false,
      },
    ],
  }),
  actions: {
    async fetchMeals() {
      const res = await fetch(`${process.env.API_URL}/meals`);
      this.meals = await res.json();
    },
    async createMeal(meal: Meal) {
      const res = await fetch(`${process.env.API_URL}/meals`, {
        method: 'POST',
        body: JSON.stringify(meal),
      });
      if (res.ok) {
        this.meals.push(await res.json());
      }
    },
    async updateMeal(meal: Meal) {
      const res = await fetch(`${process.env.API_URL}/meals/${meal.id}`, {
        method: 'PUT',
        body: JSON.stringify(meal),
      });
      if (res.ok) {
        this.meals = this.meals.map((m) => (m.id === meal.id ? meal : m));
      }
    },
    async deleteMeal(meal: Meal) {
      const res = await fetch(`${process.env.API_URL}/meals/${meal.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        this.meals = this.meals.filter((m) => m.id !== meal.id);
      }
    },
  },
});
