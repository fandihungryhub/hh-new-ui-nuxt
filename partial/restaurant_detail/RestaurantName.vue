<template>
  <div class="flex items-center justify-between">
    <div class="text-base font-bold truncate md:text-lg lg:text-2xl">
      {{ name }}
    </div>
    <div class="flex items-center text-xs lg:text-base">
      <button v-if="true" class="flex items-center px-2 rounded-full bg-red-10">
        <IconCube />
        <span class="ml-1 font-medium text-gray-900">3D</span>
      </button>
      <button class="flex items-center px-2 rounded-full bg-yellow-10">
        <IconStar class="mr-2" />
        <template v-if="isNewRestaurant"> </template>
        <div class="flex items-center" v-else>
          <span class="mr-1 font-medium text-gray-900">{{ reviewScore }}</span>
          <span>({{ reviewCount }})</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRestaurantDetail } from "~/stores/restaurantDetail";
import IconCube from "~/components/icons/IconCube.vue";
import IconStar from "~/components/icons/IconStar.vue";
const { name, vrLink, reviewCount, reviewScore, isNewRestaurant } =
  useRestaurantDetail().value;
</script>
<script lang="ts">
export default {
  name: "RestaurantName",
};
</script>
