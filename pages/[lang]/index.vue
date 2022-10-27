<template>
  <main class="">
    <HomeBanner
      image=""
      :totalCover="formatThousand(1000)"
      :cityId="1"
      client:idle
    />
    <div class="hidden" style="height: 900px">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quae minus,
      mollitia doloribus illum ad harum corrupti laborum quis recusandae atque
      quo suscipit iure, aspernatur assumenda corporis labore optio eveniet?
    </div>
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
import HomeRestaurantSlider from "~/partial/home/HomeRestaurantSlider.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "~/assets/css/swiper.scss";
import "~/partial/home/home.scss";
import { formatThousand } from "~/helpers/string";
</script>
