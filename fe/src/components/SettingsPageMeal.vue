<template>
  <div>
    <div v-show="pageState === SettingsPageState.List">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1">
          <div class="row q-pb-sm text-bold">
            <div class="col-7">
              {{ t('Dishes') }}
            </div>
            <div class="col-3">{{ t('Is_favorite') }}</div>
            <div class="col-2"></div>
          </div>
          <div
            class="row settings-table-row q-py-sm"
            v-for="meal in meals"
            :key="meal.id"
          >
            <div class="col-7">
              {{ meal.dishes.map((d) => d.name).join(', ') }}
            </div>
            <div class="col-3">{{ meal.isFav ? 'Yes' : 'No' }}</div>
            <div class="col-2">
              <q-btn
                class="float-right"
                flat
                icon="delete"
                size="sm"
                color="secondary"
                text-color="primary"
                @click="showDeleteDialog(meal)"
              />
              <q-btn
                class="float-right q-mr-sm"
                flat
                icon="edit"
                size="sm"
                color="secondary"
                text-color="primary"
                @click="showEditForm(meal)"
              />
            </div>
          </div>

          <div class="row justify-center">
            <q-btn
              icon="add"
              size="sm"
              color="primary"
              text-color="secondary"
              :label="t('Add_meal')"
              @click="showCreateForm"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="
        pageState === SettingsPageState.Create ||
        pageState === SettingsPageState.Edit
      "
    >
      <div class="row justify-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
          <q-form
            @submit="
              pageState === SettingsPageState.Create ? createMeal() : editMeal()
            "
          >
            <q-select
              class="q-mb-md"
              v-model="formData.dishes"
              :label="t('Dishes')"
              multiple
              chips
              :options="dishOptions"
              required
              option-label="name"
            />

            <q-toggle
              class="q-mb-md"
              v-model="formData.isFav"
              :label="t('Favorite')"
            />

            <q-btn
              size="sm"
              class="float-right q-ml-sm"
              type="submit"
              :label="t('Save')"
              color="primary"
              text-color="secondary"
            />

            <q-btn
              size="sm"
              class="float-right"
              :label="t('Cancel')"
              color="secondary"
              @click="pageState = SettingsPageState.List"
            />
          </q-form>
        </div>
      </div>
    </div>

    <q-dialog v-model="deleteDialogVisible">
      <q-card>
        <q-card-section class="row items-center">
          {{ t('Delete') }}
          {{ activeMeal?.dishes.map((d) => d.name).join(', ') }}?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="t('Cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="t('Delete')"
            color="primary"
            @click="deleteItem"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Dish, Meal, SettingsPageState } from '../types';
import { useDishesStore } from '../stores/dishesStore';
import { useMealsStore } from '../stores/mealsStore';

const { t } = useI18n();
const dishesStore = useDishesStore();
const mealsStore = useMealsStore();

const pageState = ref<SettingsPageState>(SettingsPageState.List);
const emptyMeal = (): Meal => ({
  id: '',
  dishes: [],
  isFav: false,
});
const formData = ref<Meal>(emptyMeal());
const meals = ref<Meal[]>(mealsStore.meals);
const dishOptions = ref<Dish[]>(dishesStore.dishes);
const activeMeal = ref<Meal | null>(null);
const deleteDialogVisible = ref(false);

const showDeleteDialog = (meal: Meal): void => {
  activeMeal.value = meal;
  deleteDialogVisible.value = true;
};

const deleteItem = async (): Promise<void> => {
  if (activeMeal.value) {
    await mealsStore.deleteMeal(activeMeal.value);
    meals.value = mealsStore.meals;
    deleteDialogVisible.value = false;
  }
};

const showEditForm = (meal: Meal): void => {
  formData.value = { ...meal };
  pageState.value = SettingsPageState.Edit;
};

const editMeal = async (): Promise<void> => {
  await mealsStore.updateMeal(formData.value);
  meals.value = mealsStore.meals;
  pageState.value = SettingsPageState.List;
};

const showCreateForm = (): void => {
  formData.value = emptyMeal();
  pageState.value = SettingsPageState.Create;
};

const createMeal = () => {
  mealsStore.createMeal(formData.value);
  meals.value = mealsStore.meals;
  pageState.value = SettingsPageState.List;
};
</script>
