<template>
  <div class="mx-4">
    <div v-show="isShow">
      <div
        ref="observerTarget"
        class="section-title"
        :class="isLoading ? 'is-loading' : null"
      >
        {{ title }}
      </div>
      <RestaurantCardSlider
        class="max-width"
        :restaurants="showedRestaurants"
        :slidePerView="slidePerView"
        :is-loading="isLoading"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from "@vueuse/core";
import type { Props as RestaurantCardSliderProps } from "~/section/card/RestaurantCardSlider.vue";
import { createDummyFeaturedRestaurant } from "~/services/restaurant";
import {
  getHomeSection,
  isRestaurantTags,
} from "~/services/common/homeSection";
import { selectedCityId } from "~/stores/city";
import { errorToast } from "~/lib/alert";
import { isDesktop, isMobile, isTablet } from "~/helpers/screenSize";
import {
  computed,
  onBeforeMount,
  onMounted,
  Prop,
  ref,
  Ref,
  toRefs,
  watch,
} from "vue";

const props = defineProps({
  apiOrder: {
    type: Number,
    required: true,
  },
  homeSectionOrder: {
    type: Number,
    required: true,
  },
});
const slidePerView = isDesktop ? 5 : isTablet ? 4 : 2;
const { apiOrder } = toRefs(props);
const observerTarget = ref(null);
const dummyCount = 5;
const isVisible = ref(false);
const isDataLoaded = ref(false);
const isLoading = ref(true);
const isShow = ref(true);
const title = ref("section title");
const restaurants: Ref<RestaurantCardSliderProps["restaurants"]> = ref([]);
const restaurantsDummy: Ref<RestaurantCardSliderProps["restaurants"]> = ref([]);
const showedRestaurants = computed(() => {
  return isLoading.value ? restaurantsDummy.value : restaurants.value;
});
const RestaurantCardSlider = defineAsyncComponent(
  () => import("~/section/card/RestaurantCardSlider.vue")
);
const { stop } = useIntersectionObserver(
  observerTarget,
  ([{ isIntersecting }], observerElement) => {
    isVisible.value = isIntersecting;
  }
);

async function fetchData() {
  isLoading.value = true;
  const { data, isSuccess, message } = await getHomeSection({
    order: apiOrder.value,
  });
  if (!isSuccess || !data) {
    errorToast(message);
    return;
  }
  if (data) {
    restaurants.value = [];
    title.value = data.title;
    data.data.forEach((item) => {
      if (!isRestaurantTags(item)) {
        restaurants.value.push({
          isLoading: isLoading.value,
          id: item.id,
          link: item.link,
          image: {
            src: item.cover.original,
            sources: undefined,
            width: "250",
            height: "158",
            useMutator: true,
          },
          name: item.name,
          price: item.price.amount,
          pricingType: item.pricingType,
          cuisine: item.cuisine,
          location: item.location || "",
          totalLocation: item.totalLocations || 0,
          reviewsCount: item.totalReviews,
          reviewsScore: item.avgReviews,
          isDelivery: item.anyDeliveryPackage,
          isDineIn: item.anyDeliveryPackage,
          isXperience: item.anyXperiencePackage,
        });
      }
    });
    isShow.value = restaurants.value.length > 0 ? true : false;
    isLoading.value = false;
    isDataLoaded.value = true;
    console.log("home section data", restaurants);
  }
}

function initDummy() {
  for (let index = 0; index < dummyCount; index++) {
    let temp = createDummyFeaturedRestaurant();
    const {
      link,
      name,
      price,
      pricingType,
      cuisine,
      location,
      totalLocations,
      avgReviews,
      totalReviews,
      cover,
    } = temp.attributes;
    const id = `${index}-${new Date().getTime()}`;
    restaurantsDummy.value.push({
      isLoading: isLoading.value,
      id: id,
      link: link,
      image: {
        src: cover.original,
        useMutator: true,
      },
      name: name,
      price: price.amount,
      pricingType: pricingType,
      cuisine: cuisine,
      location: location || "",
      totalLocation: totalLocations || 0,
      reviewsCount: totalReviews,
      reviewsScore: avgReviews,
    });
  }
}

initDummy();
onMounted(() => {
  watch(isVisible, (newVal) => {
    if (newVal === true && isDataLoaded.value === false) {
      fetchData();
    }
  });
  // watch(restaurants, (newVal) => {
  //   if (newVal.length === 0) {
  //     isShow.value = false;
  //     return;
  //   }
  //   isShow.value = true;
  // });
  watch(selectedCityId, (newVal) => {
    fetchData();

    // if (isVisible.value) {
    //   fetchData();
    // }
  });
});
</script>
<script lang="ts">
export default {
  name: "HomeRestaurantSlider",
};
</script>

<style scoped>
.section-title {
  @apply my-2 text-sm lg:font-black lg:text-center lg:text-xl lg:my-4;
}

.section-title.is-loading {
  @apply bg-gray-300 text-gray-300 w-9/12 lg:w-6/12 mx-auto;
}
</style>
