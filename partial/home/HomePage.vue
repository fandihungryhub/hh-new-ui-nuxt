<template>
  <main class="">
    <HomeBanner />
    <div class="container mx-auto">
      <iconRightArrow class="text-red-500 w-[20px]" />
      <HomeRestaurantSlider :api-order="3" :homeSectionOrder="1" />
      <HomeRestaurantSlider :api-order="1" :homeSectionOrder="1" />
      <HomeRestaurantSlider :api-order="8" :homeSectionOrder="1" />
      <HomeRestaurantSlider :api-order="6" :homeSectionOrder="1" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import "~/assets/css/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "~/assets/css/swiper.scss";
import "~/partial/home/home.scss";
import useConfigStore from "~/stores/config";
import { onMounted } from "#imports";
import HomeBanner from "~/partial/home/HomeBanner.vue";
import { getAllGroupLanding } from "~/services/group_landing/getAllGroupLanding";
import HomeRestaurantSlider from "~~/partial/home/HomeRestaurantSlider.vue";
import iconRightArrow from "~icons/hh-icons/icon-right-arrow";
const configStore = useConfigStore();
await configStore.getConfig();

onMounted(() => {
  getAllGroupLanding();
  console.log("index mounted");
});
</script>

<script lang="ts">
export default {
  name: "HomePage",
};
</script>
