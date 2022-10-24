<template>
  <div>
    <!-- restaurant featured image -->
    <div class="relative">
      <RestaurantFeaturedImage
        :images="parsedFeaturedImages"
        v-if="parsedFeaturedImages.length"
      >
      </RestaurantFeaturedImage>

      <IconHeart
        @click="onFavouriteClick"
        class="inline-block ml-1 w-[25px] absolute top-[20px] right-[20px] bg-glass"
      />
    </div>
    <div class="flex items-center restaurant-detail-section">
      <!-- restaurant icon -->
      <RestaurantLogo
        v-if="icon"
        class="mr-2 w-[90px]"
        :logo="icon"
      ></RestaurantLogo>
      <div>
        <RestaurantName class="mb-1"></RestaurantName>
        <LastBooking
          class="text-xs font-medium text-red-500 lg:text-base"
          :last-booking="lastOrder"
          :reviews-count="reviewCount"
          :total-covers="totalCovers"
          :early-review-point="earlyReviewPoint"
        />
      </div>
    </div>
    <div class="flex flex-col items-center w-full mt-6 md:px-6 lg:px-0">
      <!-- restaurant name (mobile) -->
      <div
        class="flex items-center w-full mb-1 text-gray-700 bg-white restaurant-name-bar lg:hidden"
      >
        <LeftArrowIcon @click="onBackClicked" />
        <h1 class="flex justify-center flex-auto mx-auto font-black">
          {{ name }}
        </h1>
        <img
          src="~/assets/image/icon-share-red.png"
          class="mx-1 w-[20px] h-[20px]"
          alt="share icon"
          @click="shareRestaurant"
        />
      </div>

      <div class="flex items-center w-full">
        <div class="hidden w-full lg:flex">
          <div class="flex flex-col">
            <!-- restaurant name (tab and up) -->
            <div
              class="items-center hidden w-full px-3 mb-1 bg-white restaurant-name-bar lg:flex"
            >
              <h1 class="text-xl font-black">
                {{ name }}
              </h1>
              <img
                src="~/assets/image/icon-share-red.png"
                class="mx-1 w-[20px] h-[20px]"
                alt="share icon"
                @click="shareRestaurant"
              />
            </div>

            <RestaurantStats> </RestaurantStats>
          </div>
        </div>

        <!-- restaurant image -->
        <div class="relative w-full">
          <!-- restaurant icon -->
          <RestaurantLogo
            v-if="icon"
            class="absolute flex mr-2 lg:hidden w-[70px] top-[10px] left-[10px]"
            :logo="icon"
          />
          <!-- restaurant rating -->
          <div
            v-if="showRestaurantRating"
            class="mb-2 restaurant-rating absolute bottom-[-40px] left-[20px] w-[80px]"
            :class="isNewRestaurant ? 'new' : ''"
            @click="onRatingClick"
          >
            <div
              class="flex items-center justify-center px-2 ml-auto font-black text-center text-white bg-red-dark hover:bg-red-light rounded-xl"
            >
              <template v-if="isNewRestaurant">
                <span class="py-1 mr-1 text-2xl uppercase">{{
                  $t("new")
                }}</span>
                <span
                  class="font-normal text-2xs"
                  v-html="
                    $t('firstReview', {
                      review: earlyMaxReview,
                      point: `${moneyFormat(earlyReviewPoint)}+`,
                    })
                  "
                ></span>
              </template>
              <template v-else>
                <span class="mr-1">{{ reviewScore }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="inline icon-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
              </template>
            </div>
          </div>

          <div
            v-if="vrLink"
            class="absolute"
            style="bottom: -30px; right: 10px"
          >
            <a
              id="vr-button"
              :href="vrLink"
              class="flex items-center justify-center px-2 text-sm font-medium leading-6 border rounded-full border-red-dark text-red-dark"
              rel="noopener noreferrer"
              target="_blank"
              @click="onVrLinkClicked"
            >
              <img
                src="~/assets/image/icon-cube.png"
                alt="3D view"
                class="inline mr-1"
                width="13"
                loading="lazy"
              />
              <span> 3D View </span>
            </a>
          </div>
        </div>
      </div>

      <!-- restaurant info -->

      <div class="w-full pt-6 mt-4 restaurant-info">
        <!-- restaurant profile -->
        <div class="flex items-center px-6 lg:hidden">
          <RestaurantStats></RestaurantStats>
        </div>
        <!-- input location  -->
        <template v-if="showInputLocation">
          <div v-if="!showDeliveryFee" class="mx-6 mt-1">
            <button
              class="w-full py-1 text-sm leading-5 capitalize border rounded-full border-red-dark text-red-dark"
              @click="showDeliveryFee = true"
            >
              {{ $t("calculateDeliveryFee") }}
            </button>
          </div>
          <!-- <InputDelivery
            v-if="preferShowDeliveryFee"
            class="px-3"
            no-packages
            show-promotion
          /> -->
          <!-- <RestaurantCovidRating
            v-if="showCovidRating"
            :staff-protection="covidRating.staffProtection"
            :social-distancing="covidRating.socialDistancing"
            :overall-cleanliness="covidRating.overallCleanliness"
            class="mt-2"
          /> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { moneyFormat } from "~/helpers/string";
import { ref } from "vue";
import LeftArrowIcon from "../../components/icons/LeftArrowIcon.vue";
import HhImage, { SrcSet } from "~/components/HhImage.vue";
import RestaurantFeaturedImage from "~/components/RestaurantFeaturedImage.vue";
import RestaurantStats from "./RestaurantStats.vue";
import RestaurantLogo from "./RestaurantLogo.vue";
import RestaurantName from "./RestaurantName.vue";
import { useRestaurantDetail } from "~/stores/restaurantDetail";
import LastBooking from "~~/components/restaurant/LastBooking.vue";
import IconHeart from "~/components/icons/IconHeart.vue";

type ParsedFeaturedImages = {
  caption: string;
  id: string;
  src: string;
  sources: SrcSet[];
};

// type Props = {
//   name: string;
//   icon: string;
//   earlyMaxReview: number | string;
//   earlyReviewPoint: number | string;
//   rating: string | number;
//   ratingCount: number;
//   vrLink?: string;
//   cuisine: {
//     id: string | number;
//     name: string;
//   };
//   location: {
//     id: string | number;
//     name: string;
//   };
//   openingHoursSummary: string;
//   branchId: string | number;
//   direction: string;
//   tags: { id: string | number; label: string }[];
//   lastOrder: string;
//   showAcceptVoucher: boolean;
//   showInputLocation: boolean;
//   featuredImages: { id: string; caption: string; image: string }[];
//   showTags: boolean;
//   showViewBranch: boolean;
// };

// const props = withDefaults(defineProps<Props>(), {
//   name: "",
//   icon: "",
//   showTags: true,
//   showViewBranch: true,
// });

const restaurant = useRestaurantDetail();
const {
  name,
  icon,
  reviewCount,
  reviewScore,
  featuredImages,
  vrLink,
  lastOrder,
  totalCovers,
} = restaurant.value;
const isNewRestaurant = ref(false);
const showRestaurantRating = ref(true);
const showDeliveryFee = ref(false);
const showInputLocation = ref(false);
const earlyMaxReview = 100;
const earlyReviewPoint = 10;
const parsedFeaturedImages = featuredImages.map((img) => {
  return { src: img.image, caption: img.caption };
});

function shareRestaurant() {}

function onFavouriteClick() {}

function onVrLinkClicked() {}

function onRatingClick() {}

function onClockClick() {}

function onTagExpanClicked() {}

function onBackClicked() {}
</script>

<script lang="ts">
export default {
  name: "RestaurantHeader",
};
</script>

<style scoped>
.bg-glass {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
}
</style>
