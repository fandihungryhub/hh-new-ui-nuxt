<template>
  <div class="flex flex-col w-full">
    <!-- restaurant stats -->
    <div class="flex items-center justify-between">
      <a
        class="flex items-center"
        :href="linkSearhByCuisine(cuisine.id)"
        target="_blank"
      >
        <IconFork />
        <span class="underline">{{ cuisine.name }}</span>
      </a>
      <a :href="direction" target="_blank" class="flex items-center">
        <IconLocation />
        <span class="underline">{{ location.name }}</span>
      </a>
      <div class="flex items-center">
        <img
          class="m-2 ml-0 icon"
          loading="lazy"
          src="~/assets/image/icon-clock-black.png"
          alt=""
        />
        <span class="underline" @click="$emit('on-clock-clicked')">{{
          openingHoursShort
        }}</span>
      </div>
    </div>
    <div v-if="showTags && tags.length > 0" class="relative flex items-center">
      <img
        class="m-2 ml-0 icon"
        src="~/assets/image/icon-tag-black.png"
        alt=""
        loading="lazy"
      />
      <div class="restaurant-tags-height-limit">
        <a
          v-for="(tag, index) in tags"
          :key="index"
          class="flex-shrink-0 mr-2 text-blue-500 lowercase break-words hover:underline"
          :href="`/restaurants/search?hashtags=${tag.id}`"
          >{{ `#${tag.label}` }}
        </a>
      </div>
      <button
        class="restaurant-tags-expand-button tag-color"
        @click="onTagExpanClicked"
      >
        ...
      </button>
    </div>
    <div class="flex justify-between mb-2">
      <span
        v-if="branchId && showViewBranch"
        class="flex items-center"
        @click="$emit('on-branch-clicked')"
      >
        <img
          class="m-2 ml-0 icon"
          loading="lazy"
          src="~/assets/image/icon-location-plus-red.png"
          alt=""
        />
        <span class="text-sm cursor-pointer text-red-dark hover:underline">{{
          $t("viewOtherBranch")
        }}</span>
      </span>
    </div>
    <!-- accepting voucher -->
    <div v-if="showAcceptVoucher" class="flex items-center">
      <img
        class="mt-2 mr-2 lg:mt-0 icon"
        src="~/assets/image/ic_use_voucher.png"
        alt=""
        loading="lazy"
      />
      <span class="text-sm text-red-dark">
        {{ $t("acceptVoucher") }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRestaurantDetail } from "~/stores/restaurantDetail";
import IconFork from "~/components/icons/IconFork.vue";
import IconLocation from "~/components/icons/IconLocation.vue";
import { linkSearhByCuisine } from "~/helpers/restaurant";
const {
  reservationSystemOnly,
  branchId,
  openingHoursShort,
  location,
  cuisine,
  tags,
  lastOrder,
  reviewCount,
} = useRestaurantDetail().value;
const showAcceptVoucher = !reservationSystemOnly;
const showViewBranch = !reservationSystemOnly;
const showTags = true;
const direction = "";
const totalCovers = 1000;
const earlyReviewPoint = 10;

// type Props = {
//   cuisine: {
//     id: string | number;
//     name: string;
//   };
//   location: {
//     id: string | number;
//     name: string;
//   };
//   showTags: boolean;
//   showViewBranch: boolean;
//   openingHoursSummary: string;
//   branchId: string | number;
//   direction: string;
//   tags: { id: string | number; label: string }[];
//   showAcceptVoucher: boolean;
// };

defineEmits(["on-clock-clicked", "on-branch-clicked"]);

// const props = defineProps<Props>();

function onTagExpanClicked() {}
</script>
<script lang="ts">
export default {
  name: "RestaurantStats",
};
</script>

<style scoped>
.icon {
  @apply w-[16px];
}
</style>
