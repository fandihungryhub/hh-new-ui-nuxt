<template>
  <div class="relative restaurant-banners-slider">
    <Swiper
      :navigation="{
        nextEl: '.restaurant-banners-slider .swiper-button-next',
        prevEl: '.restaurant-banners-slider .swiper-button-prev',
      }"
      :pagination="{ clickable: true }"
      :modules="[Navigation, Pagination]"
      :slides-per-view="1"
    >
      <swiper-slide v-for="banner in banners">
        <a :href="banner.link">
          <HhImage
            :width="width"
            :src="banner.img"
            :alt="banner.alt || ''"
            :use-mutator="true"
          ></HhImage>
        </a>
      </swiper-slide>
    </Swiper>
    <IconArrowLeft class="swiper-button-prev right-0 top-[40%] text-black" />
    <IconArrowRight class="swiper-button-next left-0 top-[40%] text-black" />
  </div>
</template>

<script lang="ts" setup>
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconArrowRight from "~/components/icons/IconArrowRight.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "~/assets/css/swiper.scss";

type Props = {
  banners: {
    img: string;
    link: string;
    alt?: string;
  }[];
  width: number;
};

defineProps<Props>();

const swiperLeft = ref(null);
const swiperRight = ref(null);

console.log("swiperLeft", swiperLeft.value, swiperRight.value);
</script>
<script lang="ts">
export default {
  name: "RestaurantBannersSlider",
};
</script>
