<template>
  <div class="flex items-center">
    <RestaurantCardLoading class="w-[256px] mr-4" v-for="n in count" />
  </div>
</template>

<script lang="ts" setup>
import RestaurantCardLoading from "~/components/restaurant/RestaurantCardLoading.vue";
const count = 5;
</script>
<script lang="ts">
export default {
  name: "RestaurantCardSliderLoading",
};
</script>
