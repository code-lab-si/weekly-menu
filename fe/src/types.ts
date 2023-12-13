import { DateTime } from 'luxon';

export interface MenuDay {
  date: DateTime;
  meal: string;
}

export interface Dish {
  id: string;
  name: string;
  recipe: string;
}

export interface Ingredient {
  id: string;
  name: string;
  season: string;
}

export interface Meal {
  id: string;
  dishes: Dish[];
  isFav: boolean;
}

export enum SettingsPageState {
  List,
  Create,
  Edit,
}
