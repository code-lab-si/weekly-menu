<template>
  <div class="row justify-between align-center">
    <div class="row align-center">
      <q-btn
        size="xl"
        color="secondary"
        text-color="primary"
        dense
        flat
        icon="chevron_left"
        aria-label="Go to prev week"
        @click="goToPrevWeek"
      >
        <the-tooltip :text="t('Go_to_prev_week')" />
      </q-btn>
      <div class="row justify-center align-middle" style="width: 13rem">
        <span
          class="selected-week text-h5"
          style="line-height: 3.5rem; cursor: pointer"
          @click="goToCurrentWeek"
        >
          {{ selectedWeekLabel }}
        </span>
        <the-tooltip :text="t('Go_to_current_week')" />
      </div>
      <q-btn
        size="xl"
        color="secondary"
        text-color="primary"
        dense
        flat
        icon="chevron_right"
        aria-label="Go to next week"
        @click="goToNextWeek"
      >
        <the-tooltip :text="t('Go_to_next_week')" />
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const currentWeek = DateTime.now().weekNumber;
const selectedDate = ref(DateTime.now());
const selectedWeekLabel = computed((): string => {
  if (selectedDate.value.weekNumber === currentWeek) {
    return t('This_week');
  }
  if (selectedDate.value.weekNumber === currentWeek + 1) {
    return t('Next_week');
  }
  if (selectedDate.value.weekNumber === currentWeek - 1) {
    return t('Previous_week');
  }

  const start = selectedDate.value.startOf('week');
  const end = selectedDate.value.endOf('week');
  return `${start.toFormat('d. MMM')} - ${end.toFormat('d. MMM')}`;
});
const goToCurrentWeek = () => {
  selectedDate.value = DateTime.now();
};
const goToNextWeek = () => {
  selectedDate.value = selectedDate.value.plus({ week: 1 });
};
const goToPrevWeek = () => {
  selectedDate.value = selectedDate.value.minus({ week: 1 });
};
</script>
