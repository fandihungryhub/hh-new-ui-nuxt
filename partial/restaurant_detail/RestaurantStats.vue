<template>
  <div class="flex flex-col w-full text-xs lg:text-base">
    <h2 class="text-sm font-medium lg:text-lg">Information</h2>
    <!-- restaurant stats -->
    <!-- first row -->
    <div class="flex items-center justify-between mt-1">
      <div class="flex items-center">
        <a class="stats" :href="linkSearhByCuisine(cuisine.id)" target="_blank">
          <IconFork class="icon" />
          <span>{{ cuisine.name }}</span>
        </a>
        <div class="separator"></div>
        <a :href="direction" target="_blank" class="stats">
          <IconLocation class="icon" />
          <span>{{ location.name }}</span>
        </a>
        <div class="separator"></div>
        <div class="flex items-center">
          <span class="mr-2 text-green-600">Open</span>
          <span @click="$emit('on-clock-clicked')">{{
            openingHoursShort
          }}</span>
        </div>
      </div>

      <IconArrowRight />
    </div>
    <!-- second row -->
    <!-- accepting voucher -->
    <div class="mt-2">
      <div v-if="showAcceptVoucher" class="flex items-center">
        <IconAcceptVoucher class="icon" />
        <span>
          {{ $t("acceptVoucher") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRestaurantDetail } from "~/stores/restaurantDetail";
import IconFork from "~/components/icons/IconFork.vue";
import IconLocation from "~/components/icons/IconLocation.vue";
import IconArrowRight from "~/components/icons/IconArrowRight.vue";
import IconAcceptVoucher from "~/components/icons/IconAcceptVoucher.vue";
import { linkSearhByCuisine } from "~/helpers/restaurant";
const { reservationSystemOnly, openingHoursShort, location, cuisine } =
  useRestaurantDetail().value;
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
  @apply w-[12px] mr-2;
}

.stats {
  @apply flex items-center mr-2;
}
.separator {
  width: 2px;
  height: 2px;
  @apply bg-gray-600 mr-2;
}
</style>
