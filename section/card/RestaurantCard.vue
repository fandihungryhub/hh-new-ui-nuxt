<template>
  <RestaurantCardLoading v-if="isLoading" />
  <RestaurantCard v-else v-bind="props" />
</template>
<script lang="ts" setup>
import RestaurantCardLoading from "~/components/restaurant/RestaurantCardLoading.vue";
import RestaurantCard from "~/components/restaurant/RestaurantCardNew.vue";
import type { Props as RestaurantCardProps } from "~/components/restaurant/RestaurantCardNew.vue";
import { toRefs } from "vue";

export interface Props extends RestaurantCardProps {
  isLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  customText: "",
  isAds: false,
  isDelivery: false,
  isDineIn: false,
  isXperience: false,
  showFavButton: false,
  favouriteIcon: "",
});

const { isLoading } = toRefs(props);
</script>
<script lang="ts">
export default {
  name: "RestaurantCard",
};
</script>
