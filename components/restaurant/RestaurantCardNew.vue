<template>
  <div class="relative">
    <HhImage
      :sources="image.sources"
      :src="image.src"
      :useMutator="image.useMutator"
      alt="restaurant image"
      :width="image.width || defaultImgSize.width"
      :height="image.height || defaultImgSize.height"
      class="w-full bg-gray-300 rounded-lg restaurant-image"
    />
    <div class="mt-2">
      <div class="mb-2 text-sm font-bold text-gray-700 truncate">
        {{ name }}
      </div>

      <div class="flex items-center mb-2">
        <div class="flex items-center mr-2 text-gray-500">
          <IconStar class="icon" />
          {{ reviewsScore }}
        </div>
        <div class="flex items-center text-gray-500">
          <IconFork class="icon" />
          {{ cuisine }}
        </div>
      </div>

      <div class="flex items-center text-red-500">
        <IconPeople class="icon" />
        {{ priceLabel }}
      </div>
    </div>
    <div
      class="absolute left-[10px] top-[10px] bg-black text-white rounded-lg text-xs p-2"
    >
      {{ locationLabel }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SrcSet } from "~/components/HhImage.vue";
import IconStar from "~/components/icons/IconStar.vue";
import IconFork from "~/components/icons/IconFork.vue";
import IconPeople from "~/components/icons/IconPeople.vue";
import { moneyFormat } from "~/helpers/string";
import { pricingTypeLabel } from "~/helpers/pack";
import { useI18n } from "vue-i18n";

export interface Props {
  id: string | number;
  link: string;
  image: {
    src: string;
    width?: string;
    height?: string;
    sources?: SrcSet[];
    useMutator?: boolean;
  };
  customText?: string;
  isAds?: boolean;
  name: string;
  price: number;
  pricingType: string;
  isDineIn?: boolean;
  isDelivery?: boolean;
  isXperience?: boolean;
  cuisine: string;
  location: string;
  totalLocation: number;
  reviewsCount: number;
  reviewsScore: string | number;
  showFavButton?: boolean;
  favouriteIcon?: string;
}

const props = defineProps<Props>();
const { totalLocation, location, price, pricingType } = props;
const { t } = useI18n({ useScope: "global" });

const defaultImgSize = {
  width: "250",
  height: "141",
};

const priceLabel = `${moneyFormat(price)} ${t(pricingTypeLabel(pricingType))}`;

const locationLabel = totalLocation > 0 ? `${totalLocation} Branch` : location;
const HhImage = defineAsyncComponent(() => import("~/components/HhImage.vue"));
</script>
<script lang="ts">
export default {
  name: "RestaurantCardNew",
};
</script>

<style scoped>
.icon {
  @apply mr-2;
}
</style>
