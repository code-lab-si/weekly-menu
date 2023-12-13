<template>
  <div class="q-pa-xl">
    <menu-list-item v-for="item of items" :key="item.date.day" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

import MenuListItem from './MenuListItem.vue';

const items = [
  {
    date: DateTime.now().plus({ days: 0 }),
    meal: 'goveja juha, restan krompir, solata',
  },
  {
    date: DateTime.now().plus({ days: 1 }),
    meal: 'goveja juha, restan krompir, solata',
  },
  {
    date: DateTime.now().plus({ days: 2 }),
    meal: 'goveja juha, restan krompir, solata',
  },
  {
    date: DateTime.now().plus({ days: 3 }),
    meal: 'goveja juha, restan krompir, solata',
  },
  {
    date: DateTime.now().plus({ days: 4 }),
    meal: 'goveja juha, restan krompir, solata',
  },
  {
    date: DateTime.now().plus({ days: 5 }),
    meal: 'goveja juha, restan krompir, solata',
  },
  {
    date: DateTime.now().plus({ days: 6 }),
    meal: 'goveja juha, restan krompir, solata',
  },
];
</script>
