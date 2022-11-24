<template>
  <Story :title="title">
    <RestaurantCardLoading />
  </Story>
</template>

<script lang="ts" setup>
import RestaurantCardLoading from "../restaurant/RestaurantCardLoading.vue";
const title = "Restaurant Card Loading";
</script>
