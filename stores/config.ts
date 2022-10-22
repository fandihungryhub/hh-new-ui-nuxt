import { defineStore } from "pinia";
import { getConfig, APIResponse } from "~/services/common/getConfig";
import { DEFAULT_LANG } from "~/constants";

const useConfigStore = defineStore("config", {
  state: () => {
    return {
      isLoading: false,
      availableCities: [],
      selectedCity: "Bangkok",
      lang: DEFAULT_LANG,
      backendConfig: {
        enableGiftCardFeature: false,
        weTravelTogetherIconUrl: "",
        showDistanceOnSearchPage: false,
        cultureLocale: "",
        availableLocales: [],
        cdnUrl: "",
        appTitle: "",
        appDescription: "",
        totalRestaurant: 0,
        totalCovers: 0,
        supportPhone: "",
        maxImageFileSizeInMb: 0,
        selectedPaymentProvider: {
          promptpay: "",
          cc: "",
        },
        restaurantPriceRange: {
          min: 0,
          max: 0,
          currency: "",
        },
        promptpayUnsupportedBanks: [],
        promptpayCountdown: 0,
        termConditionBigGroup: "",
        gbPrimepayPublicKey: "",
        cities: [],
        dynamicPoints: {
          reviewReservation: 0,
          newUserVoucherPoint: 0,
          earlyBird: {
            maxReviews: 0,
            point: 0,
          },
          referrerRewardPoint: 0,
        },
        packageList: {
          ayce: "",
          pp: "",
          xp: "",
          hah: "",
          hs: "",
          sm: "",
          bfp: "",
        },
        packageTagLines: {
          ayce: "",
          pp: "",
          xp: "",
          hah: "",
          hs: "",
          sm: "",
          bfp: "",
        },
        useAsyncBooking: false,
        wttLinkUrl: "",
        bannerVoucherUrl: "",
        mobileBannerVoucherUrl: "",
        webV2Host: "",
        limitedSeatsShowing: "",
        deliveryFeeCurrency: "",
        deliveryFeePerKmInBaht: 0,
        freeDeliveryFeeThresholdInBaht: 0,
        deliveryRadius: 0,
        minGroupBookingPartySize: 0,
        deliveryFeeInBaht: 0,
      } as APIResponse["data"],
    };
  },
  actions: {
    async getConfig() {
      const { data, isSuccess } = await getConfig();
      if (isSuccess && data) {
        this.backendConfig = data.data;
      }
    },
  },
});

export default useConfigStore;
