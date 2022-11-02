<template>
  <div
    v-if="isSwiperLoaded"
    class="relative restaurant-card-slider"
    :class="isLoading ? 'is-loading' : null"
  >
    <component
      :is="swiperComponent.main.value"
      :navigation="{
        nextEl: '.restaurant-card-slider .swiper-button-next',
        prevEl: '.restaurant-card-slider .swiper-button-prev',
      }"
      :modules="[swiperModule.navigation.value, swiperModule.pagination.value]"
      :pagination="{ clickable: true }"
      :slides-per-view="slidePerView"
    >
      <component
        :is="swiperComponent.slide.value"
        v-for="restaurant in restaurantsToShow"
        :key="
          createLoopId({
            name: restaurant.name,
            id: restaurant.id,
          })
        "
        class="restaurant-card-slide"
      >
        <RestaurantCard v-bind="restaurant" :is-loading="isLoading" />
      </component>
    </component>
    <IconArrowLeft class="swiper-button-prev left-0 top-[40%] text-black" />
    <IconArrowRight class="swiper-button-next right-0 top-[40%] text-black" />
  </div>
</template>

<script lang="ts" setup>
import RestaurantCard, {
  Props as RestaurantCardProps,
} from "~/section/card/RestaurantCard.vue";
import { loadSwiper } from "~/lib/swiper";
import { onMounted, ref, toRefs, watch, reactive, computed } from "vue";
import { createLoopId } from "~/helpers/restaurant";
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconArrowRight from "~/components/icons/IconArrowRight.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "~/assets/css/swiper.scss";

export interface Props {
  restaurants: RestaurantCardProps[];
  slidePerView: number;
  isLoading?: boolean;
  showArrow?: boolean;
  showPagination?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isLoading: true,
  showArrow: true,
  showPagination: true,
});
const { restaurants, isLoading, slidePerView } = toRefs(props);
const isSwiperLoaded = ref(false);
const isReachEnd = ref(false);
const isReachStart = ref(true);
// const isShowNextArrow = computed(() => {
//   return !isReachEnd.value;
// });
// const isShowPrevArrow = computed(() => {
//   return !isReachStart.value;
// });
const swiperComponent = {
  main: shallowRef(),
  slide: shallowRef(),
};
const swiperModule = {
  navigation: shallowRef(),
  pagination: shallowRef(),
};
const restaurantsToShow = computed(() => {
  return restaurants.value;
  // if (isLoading.value || !sliderInstance.value) {
  //   return restaurants.value;
  // }
  // return virtualData.slides;
});
// const virtualStyle = computed(() => {
//   return `left: ${virtualData.offset}px;`;
// });

async function initSlider() {
  const swiper = await loadSwiper();
  if (swiper) {
    const { main, modules, slide } = swiper;
    swiperComponent.main.value = main;
    swiperComponent.slide.value = slide;
    swiperModule.navigation.value = modules.navigation;
    swiperModule.pagination.value = modules.pagination;
    isSwiperLoaded.value = true;
  }
  // let sliderConfig: SwiperOptions = {
  //   loop: false,
  //   slidesPerView: slidePerView.value,
  //   spaceBetween: 10,
  //   breakpoints: {
  //     // when window width is >= 320px
  //     640: {
  //       centerInsufficientSlides: true,
  //       slidesPerView: 3,
  //       navigation: {
  //         nextEl: next,
  //         prevEl: prev,
  //       },
  //     },
  //     768: {
  //       centerInsufficientSlides: true,
  //       slidesPerView: 3,
  //       navigation: {
  //         nextEl: next,
  //         prevEl: prev,
  //       },
  //     },
  //     1280: {
  //       centerInsufficientSlides: true,
  //       slidesPerView: 5,
  //       navigation: {
  //         nextEl: next,
  //         prevEl: prev,
  //       },
  //     },
  //   },
  //   navigation: {
  //     enabled: true,
  //     nextEl: next,
  //     prevEl: prev,
  //   },
  //   pagination: {
  //     el: pagination,
  //     clickable: true,
  //     dynamicBullets: true,
  //   },
  //   virtual: {
  //     slides: restaurants.value,
  //     renderExternal(data) {
  //       virtualData.from = data.from;
  //       virtualData.to = data.to;
  //       virtualData.slides = data.slides;
  //       virtualData.offset = data.offset;
  //     },
  //   },
  //   on: {
  //     slideChange: () => {
  //       isReachEnd.value = sliderInstance.value?.isEnd || false;
  //       isReachStart.value = sliderInstance.value?.isBeginning || false;
  //     },
  //   },
  // };
}

await initSlider();

// onMounted(() => {
//   watch(isLoading, (newVal) => {
//     if (newVal === false) {
//       initSlider();
//     }
//   });
// });
</script>
<script lang="ts">
export default {
  name: "RestaurantCardSlider",
};
</script>

<style lang="scss" scoped>
.restaurant-card-slider {
  .restaurant-card-slide {
    width: 50%;

    @apply mr-2;

    @screen lg {
      width: 20%;
    }
  }

  .swiper-button-next {
    top: 40%;
    right: -50px;
  }

  .swiper-button-next::after {
    content: none;
  }

  .swiper-button-prev {
    top: 40%;
    left: -50px;
  }

  .swiper-button-prev::after {
    content: none;
  }

  .swiper-button-next,
  .swiper-button-prev {
    @apply hidden;
    @screen sm {
      @apply block;
    }
  }
}

.restaurant-card-slider.is-loading {
  .restaurant-card-slide-wrapper {
    @apply flex items-center justify-center;
    @screen lg {
      @apply flex-wrap;
    }
  }
  .restaurant-card-slide {
    @apply pr-2;
  }
}
</style>
