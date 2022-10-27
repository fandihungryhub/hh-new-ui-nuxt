<template>
  <div>
    <!-- restaurant featured image -->
    <div class="relative">
      <RestaurantFeaturedImage
        class="container mx-auto lg:px-6 xl:px-0"
        :images="parsedFeaturedImages"
        v-if="parsedFeaturedImages.length"
      >
      </RestaurantFeaturedImage>

      <!-- favourite, share button -->
      <div class="absolute top-[20px] right-[20px] flex items-center">
        <div
          class="p-1 ml-1 rounded-full bg-glass w-[36px] h-[36px] flex items-center justify-center"
        >
          <IconShare @click="onShareClick" />
        </div>
        <div
          class="p-1 ml-1 rounded-full bg-glass w-[36px] h-[36px] flex items-center justify-center"
        >
          <IconHeart @click="onFavouriteClick" class="" />
        </div>
      </div>
    </div>

    <div class="container mx-auto lg:px-6 xl:px-0">
      <div class="bg-white rounded-2xl lg:my-4 header-wrapper">
        <div class="flex items-center header-section with-border">
          <!-- restaurant icon -->
          <RestaurantLogo
            v-if="icon"
            class="mr-2 w-[90px]"
            :logo="icon"
          ></RestaurantLogo>
          <div class="w-full">
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

        <!-- Restaurant location,cuisine,opening hours -->
        <div class="header-section with-border">
          <RestaurantStats> </RestaurantStats>
        </div>

        <!-- Restaurant tags -->
        <div class="header-section">
          <RestaurantTags :tags="tags" />
        </div>

        <div class="header-section" v-if="branchId && showViewBranch">
          <div class="flex justify-between mb-2">
            <span class="flex items-center" @click="onBranchClick">
              <button class="text-xs text-blue-500 cursor-pointer lg:text-sm">
                {{ $t("viewOtherBranch") }}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SrcSet } from "~/components/HhImage.vue";
import RestaurantFeaturedImage from "~/components/RestaurantFeaturedImage.vue";
import RestaurantStats from "./RestaurantStats.vue";
import RestaurantLogo from "./RestaurantLogo.vue";
import RestaurantName from "./RestaurantName.vue";
import RestaurantTags from "./RestaurantTags.vue";
import { useRestaurantDetail } from "~/stores/restaurantDetail";
import LastBooking from "~~/components/restaurant/LastBooking.vue";
import IconHeart from "~/components/icons/IconHeart.vue";
import IconShare from "~/components/icons/IconShare.vue";

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
  reservationSystemOnly,
  tags,
  branchId,
} = restaurant.value;
const isNewRestaurant = ref(false);
const showRestaurantRating = ref(true);
const showDeliveryFee = ref(false);
const showInputLocation = ref(false);
const earlyMaxReview = 100;
const earlyReviewPoint = 10;
const showViewBranch = !reservationSystemOnly;
const parsedFeaturedImages = featuredImages.map((img) => {
  return { src: img.image, caption: img.caption };
});

function shareRestaurant() {}

function onFavouriteClick() {}

function onVrLinkClicked() {}

function onRatingClick() {}

function onShareClick() {}

function onBranchClick() {}

function onClockClick() {}

function onTagExpanClicked() {}

function onBackClicked() {}
</script>

<script lang="ts">
export default {
  name: "RestaurantHeader",
};
</script>

<style lang="scss" scoped>
.bg-glass {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
}

.header-wrapper {
  @apply p-3 lg:pt-5 lg:pb-3;
}
.header-section {
  @apply py-2;

  &.with-border {
    @apply border-b border-gray-300;
  }
}
</style>
