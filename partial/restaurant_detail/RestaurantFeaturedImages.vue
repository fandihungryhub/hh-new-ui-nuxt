<template>
  <div class="relative">
    <RestaurantFeaturedImage :images="images" />

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
</template>

<script lang="ts" setup>
import RestaurantFeaturedImage from "~/components/RestaurantFeaturedImage.vue";
import IconShare from "~/components/icons/IconShare.vue";
import IconHeart from "~/components/icons/IconHeart.vue";

type Props = {
  images: { src: string; caption: string }[];
};
defineProps<Props>();

function onFavouriteClick() {}

function onShareClick() {}
</script>
<script lang="ts">
export default {
  name: "RestaurantFeaturedImages",
};
</script>
