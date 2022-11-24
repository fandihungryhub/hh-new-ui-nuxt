<template>
  <div
    class="font-black text-center banner-bg h-[350px] text-white"
    :style="`background-image: url(${image})`"
  >
    <div
      class="flex flex-col items-center justify-center h-full pt-10 pb-10 bg-black/50"
    >
      <h1 class="mx-5 title">
        {{ title }}
      </h1>
      <h3 class="my-2 sub-title">
        <div>
          {{
            $t("bannerCTA", {
              ns: "home",
              total: showedTotalCover,
            })
          }}
        </div>
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getBanners } from "~/api/common/banner";
import { onMounted, ref, defineAsyncComponent, computed } from "vue";
import MyButtonVue from "~/components/MyButton.vue";
import type { GetBannerAPIResponse } from "~/api/common/banner";
import { rebuildAssetURL } from "~/helpers/url";
import useCityStore from "~/stores/city";
import useConfigStore from "~/stores/config";
import { formatThousand } from "~/helpers/string";
import { storeToRefs } from "pinia";
const configStore = useConfigStore();
const cityStore = useCityStore();
const { isLoading, backendConfig } = storeToRefs(configStore);
const title = computed(() => cityStore.selectedCityHomeDescription);
const banner = ref<GetBannerAPIResponse[]>([]);
const showedTotalCover = computed(() => {
  return formatThousand(backendConfig.value.totalCovers);
});
const image = computed(() => {
  if (banner.value.length) {
    return rebuildAssetURL(banner.value[0].desktopVersions[0].url);
  }
  return null;
});

async function fetchBanners() {
  const { isSuccess, message, data } = await getBanners(
    cityStore.selectedCityId
  );
  if (data && isSuccess) {
    banner.value = data.filter((promotion) => {
      if (promotion.locations && promotion.locations.length) {
        const isLocationPromotion = promotion.locations.filter((location) =>
          location.includes("home_page")
        );
        return isLocationPromotion.length > 0 ? true : false;
      }
      return false;
    });
  }
}

onMounted(async () => {
  fetchBanners();
});
</script>
<script lang="ts">
export default {
  name: "HomeBanner",
};
</script>

<style lang="scss" scoped>
.title {
  @screen md {
    font-size: 30px;
  }
  @screen lg {
    font-size: 40px;
  }
}

.sub-title {
  font-size: 10px;
  @screen md {
    font-size: 15px;
  }
  @screen lg {
    font-size: 20px;
  }
}
</style>
