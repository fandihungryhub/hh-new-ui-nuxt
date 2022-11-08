<template>
  <main class="">
    <HomeBanner
      image=""
      :totalCover="formatThousand(1000)"
      :cityId="1"
      client:idle
    />
    <div class="container mx-auto">
      <HomeRestaurantSlider :api-order="3" :homeSectionOrder="1" />
      <HomeRestaurantSlider :api-order="1" :homeSectionOrder="1" />
      <HomeRestaurantSlider :api-order="8" :homeSectionOrder="1" />
      <HomeRestaurantSlider :api-order="6" :homeSectionOrder="1" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import HomeBanner from "~/partial/home/HomeBanner.vue";
import "~/assets/css/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "~/assets/css/swiper.scss";
import "~/partial/home/home.scss";
import { formatThousand } from "~/helpers/string";
import useConfigStore from "~/stores/config";
import { onMounted } from "#imports";
import HomeRestaurantSlider from "~~/partial/home/HomeRestaurantSlider.vue";
const configStore = useConfigStore();
await configStore.getConfig();
onMounted(() => {
  console.log("index mounted");
});
</script>

<script lang="ts">
export default {
  name: "HomePage",
};
</script>
