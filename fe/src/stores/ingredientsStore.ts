import { defineStore } from 'pinia';
import { Ingredient } from 'src/types';

interface State {
  ingredients: Ingredient[];
}

export const useIngredientsStore = defineStore('ingredients', {
  state: (): State => ({
    ingredients: [
      {
        id: '1',
        name: 'Tomato',
        season: 'summer',
      },
      {
        id: '2',
        name: 'Potato',
        season: 'winter',
      },
    ],
  }),
  actions: {
    async fetchIngredients() {
      const res = await fetch(`${process.env.API_URL}/ingredients`);
      this.ingredients = await res.json();
    },
    async createIngredient(ingredient: Ingredient) {
      const res = await fetch(`${process.env.API_URL}/ingredients`, {
        method: 'POST',
        body: JSON.stringify(ingredient),
      });
      if (res.ok) {
        this.ingredients.push(await res.json());
      }
    },
    async updateIngredient(ingredient: Ingredient) {
      const res = await fetch(
        `${process.env.API_URL}/ingredients/${ingredient.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(ingredient),
        }
      );
      if (res.ok) {
        this.ingredients = this.ingredients.map((i) =>
          i.id === ingredient.id ? ingredient : i
        );
      }
    },
    async deleteIngredient(ingredient: Ingredient) {
      const res = await fetch(
        `${process.env.API_URL}/ingredients/${ingredient.id}`,
        {
          method: 'DELETE',
        }
      );
      if (res.ok) {
        this.ingredients = this.ingredients.filter(
          (i) => i.id !== ingredient.id
        );
      }
    },
  },
});
