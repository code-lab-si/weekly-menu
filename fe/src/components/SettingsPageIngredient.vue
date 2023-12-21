<template>
  <div>
    <div v-show="pageState === SettingsPageState.List">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1">
          <div class="row q-pb-sm text-bold">
            <div class="col-5">
              {{ t('Name') }}
            </div>
            <div class="col-5">{{ t('Season') }}</div>
            <div class="col-2"></div>
          </div>
          <div
            class="row settings-table-row q-py-sm"
            v-for="ingredient in ingredients"
            :key="ingredient.id"
          >
            <div class="col-5">
              {{ ingredient.name }}
            </div>
            <div class="col-5">{{ ingredient.season }}</div>
            <div class="col-2">
              <q-btn
                class="float-right"
                flat
                icon="delete"
                size="sm"
                color="secondary"
                text-color="primary"
                @click="showDeleteDialog(ingredient)"
              />
              <q-btn
                class="float-right q-mr-sm"
                flat
                icon="edit"
                size="sm"
                color="secondary"
                text-color="primary"
                @click="showEditForm(ingredient)"
              />
            </div>
          </div>

          <div class="row justify-center">
            <q-btn
              icon="add"
              size="sm"
              color="primary"
              text-color="secondary"
              :label="t('Add_ingredient')"
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
              pageState === SettingsPageState.Create
                ? createIngredient()
                : editIngredient()
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
              v-model="formData.season"
              :label="t('Season')"
              type="text"
              required
            ></q-input>
            <q-btn
              class="float-right q-ml-sm"
              type="submit"
              :label="t('Save')"
              color="primary"
              text-color="secondary"
            ></q-btn>
            <q-btn
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
          {{ t('Delete') }} {{ formData.name }}?
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
import { Ingredient, SettingsPageState } from '../types';
import { useIngredientsStore } from 'src/stores/ingredientsStore';

const { t } = useI18n();
const ingredientsStore = useIngredientsStore();

const pageState = ref<SettingsPageState>(SettingsPageState.List);
const emptyIngredient = (): Ingredient => ({
  id: '',
  name: '',
  season: '',
});
const formData = ref<Ingredient>(emptyIngredient());

const ingredients = ref<Ingredient[]>(ingredientsStore.ingredients);
const activeIngredient = ref<Ingredient | null>(null);
const deleteDialogVisible = ref(false);

const showDeleteDialog = (ingredient: Ingredient): void => {
  activeIngredient.value = ingredient;
  deleteDialogVisible.value = true;
};

const deleteItem = async (): Promise<void> => {
  if (activeIngredient.value) {
    await ingredientsStore.deleteIngredient(activeIngredient.value);
    ingredients.value = ingredientsStore.ingredients;
    deleteDialogVisible.value = false;
  }
};

const showEditForm = (ingredient: Ingredient): void => {
  formData.value = { ...ingredient };
  pageState.value = SettingsPageState.Edit;
};

const editIngredient = async (): Promise<void> => {
  await ingredientsStore.updateIngredient(formData.value);
  ingredients.value = ingredientsStore.ingredients;
  pageState.value = SettingsPageState.List;
};

const showCreateForm = (): void => {
  formData.value = emptyIngredient();
  pageState.value = SettingsPageState.Create;
};

const createIngredient = async (): Promise<void> => {
  await ingredientsStore.createIngredient(formData.value);
  ingredients.value = ingredientsStore.ingredients;
  pageState.value = SettingsPageState.List;
};
</script>
