import { boot } from 'quasar/wrappers';
import TheTooltip from 'components/TheTooltip.vue';

export default boot(({ app }) => {
  app.component('the-tooltip', TheTooltip);
});
