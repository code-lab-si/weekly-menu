<template>
  <div>
    <div v-show="pageState === SettingsPageState.List">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1">
          <div class="row q-pb-sm text-bold">
            <div class="col-4">
              {{ t('Dish') }}
            </div>
            <div class="col-6">{{ t('Recipe') }}</div>
            <div class="col-2"></div>
          </div>
          <div
            class="row settings-table-row q-py-sm"
            v-for="dish in dishes"
            :key="dish.id"
          >
            <div class="col-4">
              {{ dish.name }}
            </div>
            <div class="col-6">{{ dish.recipe }}</div>
            <div class="col-2">
              <q-btn
                class="float-right"
                flat
                icon="delete"
                size="sm"
                color="secondary"
                text-color="primary"
                @click="showDeleteDialog(dish)"
              />
              <q-btn
                class="float-right q-mr-sm"
                flat
                icon="edit"
                size="sm"
                color="secondary"
                text-color="primary"
                @click="showEditForm(dish)"
              />
            </div>
          </div>

          <div class="row justify-center">
            <q-btn
              icon="add"
              size="sm"
              color="primary"
              text-color="secondary"
              :label="t('Add_dish')"
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
              pageState === SettingsPageState.Create ? createDish() : editDish()
            "
          >
            <q-input
              class="q-mb-md"
              v-model="formData.name"
              :label="t('Name')"
              type="text"
              required
            ></q-input>
            <q-input
              class="q-mb-md"
              v-model="formData.recipe"
              :label="t('Recipe')"
              type="textarea"
              required
            ></q-input>
            <q-btn
              size="sm"
              class="float-right q-ml-sm"
              type="submit"
              :label="t('Create_dish')"
              color="primary"
              text-color="secondary"
            ></q-btn>
            <q-btn
              size="sm"
              class="float-right"
              :label="t('Cancel')"
              color="secondary"
              @click="pageState = SettingsPageState.List"
            ></q-btn>
          </q-form>
        </div>
      </div>
    </div>

    <q-dialog v-model="deleteDialogVisible">
      <q-card>
        <q-card-section class="row items-center">
          {{ t('Delete') }} {{ activeDish?.name }}?
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
import { useDishesStore } from '../stores/dishesStore';
import { Dish, SettingsPageState } from '../types';

const { t } = useI18n();
const dishStore = useDishesStore();

const pageState = ref<SettingsPageState>(SettingsPageState.List);
const emptyDish = (): Dish => ({
  id: '',
  name: '',
  recipe: '',
});
const formData = ref<Dish>(emptyDish());
const dishes = ref<Dish[]>(dishStore.dishes);
const activeDish = ref<Dish | null>(null);
const deleteDialogVisible = ref(false);

const showDeleteDialog = (dish: Dish): void => {
  activeDish.value = dish;
  deleteDialogVisible.value = true;
};

const deleteItem = async (): Promise<void> => {
  if (activeDish.value) {
    await dishStore.deleteDish(activeDish.value);
    dishes.value = dishStore.dishes;
    deleteDialogVisible.value = false;
  }
};

const showEditForm = (dish: Dish): void => {
  formData.value = { ...dish };
  pageState.value = SettingsPageState.Edit;
};

const editDish = async (): Promise<void> => {
  await dishStore.updateDish(formData.value);
  dishes.value = dishStore.dishes;
  pageState.value = SettingsPageState.List;
};

const showCreateForm = (): void => {
  formData.value = emptyDish();
  pageState.value = SettingsPageState.Create;
};

const createDish = async () => {
  await dishStore.createDish(formData.value);
  dishes.value = dishStore.dishes;
  pageState.value = SettingsPageState.List;
};
</script>
