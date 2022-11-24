<template>
  <RestaurantCardSliderMain v-if="!props.isLoading" v-bind="props" />
  <RestaurantCardSliderLoading v-else />
</template>

<script lang="ts" setup>
import RestaurantCardSliderMain, {
  Props as MainProps,
} from "./RestaurantCardSliderMain.vue";
import RestaurantCardSliderLoading from "./RestaurantCardSliderLoading.vue";

export interface Props extends MainProps {
  isLoading: boolean;
}

const props = defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: "RestauratnCardSlider",
};
</script>
