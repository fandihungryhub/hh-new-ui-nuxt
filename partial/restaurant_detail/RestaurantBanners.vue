<template>
  <div>
    <div class="w-full h-[160px]" ref="bannersContainer">
      <div v-if="bannersData.length">
        <BannersSlider :banners="bannersData" :width="bannersContainerWidth" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "#imports";
import { useRestaurantDetail } from "~/stores/restaurantDetail";
import {
  getRestaurantBanners,
  GetRestaurantBanners,
} from "~/api/restaurant/getRestaurantBanners";
import { rebuildAssetURL } from "~~/helpers/url";

const BannersSlider = defineAsyncComponent(
  () => import("./RestaurantBannersSlider.vue")
);

const { tags } = useRestaurantDetail().value;
let bannersData = ref<{ link: string; img: string; alt: string }[]>([]);
const bannersContainer = ref<HTMLElement | null>(null);
const bannersContainerWidth = ref(0);

async function getBanners() {
  if (tags.length) {
    const tagIds = tags.map((tag) => tag.id);
    const { isSuccess, data, message } = await getRestaurantBanners(tagIds);
    if (isSuccess && data) {
      data.forEach((banner) => {
        const image = Array.isArray(banner.desktopVersions)
          ? rebuildAssetURL(banner.desktopVersions[0].url)
          : "";
        const caption = Array.isArray(banner.captions)
          ? banner.captions[0]
          : "";
        bannersData.value.push({
          link: banner.targetUrl,
          img: image,
          alt: caption,
        });
      });
    }
  }
}

function getBannersContainerWidth() {
  console.log("bannersContainer.value", bannersContainer.value);
  if (bannersContainer.value !== null) {
    return bannersContainer.value.offsetWidth;
  }
  return 0;
}

onMounted(() => {
  getBanners();
  bannersContainerWidth.value = getBannersContainerWidth();
  // console.log("bannersContainer", bannersContainer.value);
});
</script>
<script lang="ts">
export default {
  name: "RestaurantBanners",
};
</script>
