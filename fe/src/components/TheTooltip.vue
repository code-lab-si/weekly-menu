<template>
  <q-tooltip :delay="1000">
    {{ props.text }}
  </q-tooltip>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: String,
});
</script>
