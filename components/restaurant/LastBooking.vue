<template>
  <div>
    {{ lastBookingText }}
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { generateLastBookingCTA } from "~/services/restaurant";

type Props = {
  lastBooking: string;
  reviewsCount: number;
  totalCovers: number;
  earlyReviewPoint: number;
};
const props = defineProps<Props>();
const { t } = useI18n({ useScope: "global" });

let lastBookingText = getLastBookingLabel();

function getLastBookingLabel() {
  const lastBookingCTA = generateLastBookingCTA({
    lastBooking: props.lastBooking,
    reviewsCount: props.reviewsCount,
    totalCovers: props.totalCovers,
    earlyReviewPoint: props.earlyReviewPoint,
  });

  if (lastBookingCTA.text === "lastReservationCTA") {
    return t("lastReservationCTA", { time: lastBookingCTA.value });
  }
  if (lastBookingCTA.text === "newRestaurantCTA") {
    return t("newRestaurantCTA", { point: lastBookingCTA.value });
  }
  return t("totalRestaurantBookingCTA", { total: lastBookingCTA.value });
}
</script>

<script lang="ts">
export default {
  name: "LastBooking",
};
</script>
