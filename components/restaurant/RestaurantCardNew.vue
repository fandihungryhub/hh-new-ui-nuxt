<template>
  <div class="relative rounded-b-lg shadow-md">
    <HhImage
      :sources="image.sources"
      :src="image.src"
      :useMutator="image.useMutator"
      alt="restaurant image"
      :width="image.width || defaultImgSize.width"
      :height="image.height || defaultImgSize.height"
      class="w-full bg-gray-300 rounded-t-lg restaurant-image"
    />

    <div class="relative" :class="[isImageLeft ? 'lg:w-full w-1/2' : '']">
      <a :href="link" @click.prevent="$emit('on-click')">
        <!-- restaurant info -->
        <div class="flex p-2 pb-0 restaurant-info">
          <div class="flex flex-col flex-grow w-full">
            <!-- restaurant name -->
            <span
              class="mb-4 font-bold truncate text-dark lg:text-20-24 text-16-20 lg:font-black restaurant-name"
            >
              {{ name }}
            </span>
          </div>
        </div>
        <div class="flex p-2 pt-0 pb-0">
          <div class="flex flex-col flex-grow w-full">
            <div class="flex items-center mb-4">
              <span
                class="lg:block hidden truncate text-dark-grey text-20-24 font-normal mr-2.5 cuisine-label lg:max-w-[50%]"
                >{{ cuisine }}</span
              >
              <span
                class="lg:block hidden mr-2.5 w-[3px] h-[3px] flex-shrink-0"
              >
                <IconDotGrey class="bg-gray-500" />
              </span>
              <span v-if="isNotNew" class="lg:mr-2.5 mr-1 icon-star">
                <IconStar class="w-[18px] text-[#FFDD46]" />
              </span>
              <span
                :class="[
                  isNotNew
                    ? 'mr-1 font-normal lg:mr-2.5 text-dark-grey lg:text-20-24 text-14-18 cuisine-label uppercase'
                    : 'mr-1 font-bold lg:mr-2.5 text-white lg:text-lg text-xs cuisine-label uppercase bg-dark-grey rounded px-2 py-0.5 badge-grey',
                ]"
                >{{ isNotNew ? reviewsScore : $t("new") }}
              </span>
              <div v-if="true">
                <div v-if="totalLocation" class="flex items-center">
                  <span
                    class="lg:block hidden mr-2.5 w-[3px] h-[3px] flex-shrink-0"
                  >
                    <IconDotGrey class="bg-gray-500" />
                  </span>
                  <span class="mr-1 lg:mr-2 icon-map"
                    ><IconMapMarker class="w-[18px] h-[18px] text-red-dark"
                  /></span>
                  <span
                    class="overflow-hidden truncate lg:max-w-[75%] text-dark-grey lg:text-20-24 text-14-18 cuisine-label"
                    >{{ totalLocation }} branches</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex p-2 pt-0 pb-0">
          <div class="flex flex-col flex-grow w-full">
            <div class="flex items-center mb-4">
              <span
                v-if="acceptVoucher"
                class="lg:mr-1.5 mr-1 icon-gift w-[25px] text-red-dark"
                ><IconGiftDiscount
              /></span>
              <span class="lg:mr-1.5 mr-1 icon-tag"
                ><IconTagLabel class="w-[18px] text-red-dark"
              /></span>
              <span class="font-black text-red-dark lg:text-20-24 text-14-18"
                >From {{ moneyFormat(price) }}</span
              >
            </div>
          </div>
        </div>
      </a>
    </div>

    <div
      class="absolute left-[10px] top-[10px] bg-black text-white rounded-lg text-xs p-2"
    >
      {{ locationLabel }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import HhImage from "~/components/HhImage.vue";
import type { SrcSet } from "~/components/HhImage.vue";
import IconStar from "~icons/hh-icons/icon-star";
import IconDotGrey from "~icons/hh-icons/icon-dot-grey";
import IconTagLabel from "~icons/hh-icons/icon-tag-label";
import IconMapMarker from "~icons/hh-icons/icon-map-marker";
import IconGiftDiscount from "~icons/hh-icons/icon-gift-discount";
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
  isImageLeft?: boolean;
  name: string;
  acceptVoucher?: boolean;
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
const { totalLocation, location, price, pricingType, reviewsCount } = props;
const { t } = useI18n({ useScope: "global" });

const defaultImgSize = {
  width: "250",
  height: "141",
};

const priceLabel = `${moneyFormat(price)} ${t(pricingTypeLabel(pricingType))}`;

const locationLabel = totalLocation > 0 ? `${totalLocation} Branch` : location;

const isNotNew = computed(() => {
  return reviewsCount >= 5;
});
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
