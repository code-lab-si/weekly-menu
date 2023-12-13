import { defineStore } from 'pinia';
import { Dish } from 'src/types';

interface State {
  dishes: Dish[];
}

export const useDishesStore = defineStore('dishes', {
  state: (): State => ({
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
  }),
  actions: {
    async fetchDishes() {
      const res = await fetch(`${process.env.API_URL}/dishes`);
      this.dishes = await res.json();
    },
    async createDish(dish: Dish) {
      const res = await fetch(`${process.env.API_URL}/dishes`, {
        method: 'POST',
        body: JSON.stringify(dish),
      });
      if (res.ok) {
        this.dishes.push(await res.json());
      }
    },
    async updateDish(dish: Dish) {
      const res = await fetch(`${process.env.API_URL}/dishes/${dish.id}`, {
        method: 'PUT',
        body: JSON.stringify(dish),
      });
      if (res.ok) {
        this.dishes = this.dishes.map((d) => (d.id === dish.id ? dish : d));
      }
    },
    async deleteDish(dish: Dish) {
      const res = await fetch(`${process.env.API_URL}/dishes/${dish.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        this.dishes = this.dishes.filter((d) => d.id !== dish.id);
      }
    },
  },
});
