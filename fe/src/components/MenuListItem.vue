<template>
  <div class="menu-list-item row justify-start align-center q-ma-lg q-pt-md">
    <q-card class="bg-primary text-secondary text-bold text-center" flat>
      <q-card-section>
        {{ props.item.date.toFormat('d') }}<br />
        {{ props.item.date.toFormat('MMM') }}
      </q-card-section>
    </q-card>
    <div class="col-grow text-h5 q-pl-xl" style="line-height: 4.6rem">
      {{ props.item.meal }}
    </div>
    <div>
      <q-select
        class="inline-block"
        :class="searchExtended ? 'extended' : 'collapsed'"
        dense
        options-dense
        hide-dropdown-icon
        v-model="model"
        use-input
        hide-selected
        fill-input
        input-debounce="200"
        :options="options"
        @blur="searchExtended = false"
        @focus="searchExtended = true"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
      >
        <template v-slot:append>
          <q-btn
            size="md"
            color="secondary"
            text-color="primary"
            dense
            flat
            icon="search"
            aria-label="Search for a specific meal"
            @click="searchExtended = true"
          >
            <the-tooltip :text="t('Search_for_a_specific_meal')" />
          </q-btn>
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              {{ t('No_results') }}
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-btn
        class="sync-btn q-ml-sm"
        :class="{ spinning: loadingMeal }"
        style="margin-top: -2px"
        size="md"
        color="secondary"
        text-color="primary"
        dense
        flat
        icon="sync"
        aria-label="Generate new random meal for this day"
        @click="loadMeal"
      >
        <the-tooltip :text="t('Generate_new_random_meal_for_this_day')" />
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MenuDay } from '../types';
import { QSelect } from 'quasar';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  item: MenuDay;
}>();

const searchExtended = ref(false);
const data = ['one', 'two', 'three'];
const options = ref(data);
const loadingMeal = ref(false);

const filterFn = (
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abort: () => void
): void => {
  if (val.length < 1) {
    abort();
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = data.filter((v) => v.toLowerCase().indexOf(needle) > -1);
  });
};

const loadMeal = (): void => {
  loadingMeal.value = true;
  setTimeout(() => {
    loadingMeal.value = false;
  }, 1000);
};
</script>

<style lang="scss" scoped>
.menu-list-item {
  border-top: 1px solid rgba($primary, 0.3);
}

.q-select {
  transition: width 0.5s;
  :deep(.q-field__control:before) {
    transition: border-bottom 0.5s linear;
  }
  :deep(.q-field__control:after) {
    display: none;
  }
  &.collapsed {
    width: 2.4rem;
    :deep(.q-field__control:before) {
      border-bottom: 1px solid transparent;
    }
  }
  &.extended {
    width: 15rem;
    :deep(.q-field__control:before) {
      border-bottom: 1px solid $primary;
    }
  }
}

.sync-btn.spinning {
  :deep(.q-icon) {
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
