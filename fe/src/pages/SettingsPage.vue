<template>
  <q-tabs
    v-model="tab"
    narrow-indicator
    dense
    align="left"
    class="text-primary q-ma-md"
  >
    <q-tab :ripple="false" :name="Tabs.Ingredients" :label="t('Ingredients')" />
    <q-tab :ripple="false" :name="Tabs.Dishes" :label="t('Dishes')" />
    <q-tab :ripple="false" :name="Tabs.Meals" :label="t('Meals')" />
  </q-tabs>
  <div class="q-ma-md">
    <div v-show="tab === Tabs.Ingredients">
      <settings-page-ingredient />
    </div>
    <div v-show="tab === Tabs.Dishes">
      <settings-page-dish />
    </div>
    <div v-show="tab === Tabs.Meals">
      <settings-page-meal />
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsPageIngredient from 'src/components/SettingsPageIngredient.vue';
import SettingsPageDish from 'src/components/SettingsPageDish.vue';
import SettingsPageMeal from 'src/components/SettingsPageMeal.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

enum Tabs {
  Ingredients,
  Dishes,
  Meals,
}

const tab = ref(Tabs.Ingredients);
</script>
