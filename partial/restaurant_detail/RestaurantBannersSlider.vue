<template>
  <div class="relative restaurant-banners-slider">
    <template v-if="swiperLoaded">
      <component
        :is="swiperComponent.main.value"
        :navigation="{
          nextEl: '.restaurant-banners-slider .swiper-button-next',
          prevEl: '.restaurant-banners-slider .swiper-button-prev',
        }"
        :modules="[
          swiperModule.navigation.value,
          swiperModule.pagination.value,
        ]"
        :pagination="{ clickable: true }"
        :slides-per-view="1"
      >
        <component :is="swiperComponent.slide.value" v-for="banner in banners">
          <a :href="banner.link">
            <HhImage
              :width="width"
              :src="banner.img"
              :alt="banner.alt || ''"
              :use-mutator="true"
            ></HhImage>
          </a>
        </component>
      </component>
      <IconArrowLeft class="swiper-button-prev right-0 top-[40%] text-black" />
      <IconArrowRight class="swiper-button-next left-0 top-[40%] text-black" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconArrowRight from "~/components/icons/IconArrowRight.vue";
import { loadSwiper } from "~/lib/swiper";
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

const swiperLoaded = ref(false);
const swiperLeft = ref(null);
const swiperRight = ref(null);
const swiperComponent = {
  main: shallowRef(),
  slide: shallowRef(),
};
const swiperModule = {
  navigation: shallowRef(),
  pagination: shallowRef(),
};

async function initSwiper() {
  try {
    const importSwiper = await loadSwiper();
    if (importSwiper) {
      swiperComponent.main.value = importSwiper.main;
      swiperComponent.slide.value = importSwiper.slide;
      swiperModule.navigation.value = importSwiper.modules.navigation;
      swiperModule.pagination.value = importSwiper.modules.pagination;
      swiperLoaded.value = true;
      return;
    }
    swiperLoaded.value = false;
  } catch (err) {
    swiperLoaded.value = false;
  }
}

await initSwiper();

console.log("swiperLeft", swiperLeft.value, swiperRight.value);
</script>
<script lang="ts">
export default {
  name: "RestaurantBannersSlider",
};
</script>
