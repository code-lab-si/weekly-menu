<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="bg-dark-page">
      <q-toolbar>
        <q-toolbar-title class="text-bold text-h4">
          Weekly menu
        </q-toolbar-title>

        <q-btn
          v-show="path === '/'"
          color="primary"
          text-color="secondary"
          dense
          icon="settings"
          aria-label="Settings"
          to="/settings"
        >
          <the-tooltip :text="t('Settings')" />
        </q-btn>
        <q-btn
          v-show="path === '/settings'"
          color="primary"
          text-color="secondary"
          dense
          icon="close"
          aria-label="Settings"
          to="/"
        >
          <the-tooltip :text="t('Close')" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();

const path = computed(() => route.path);
</script>
