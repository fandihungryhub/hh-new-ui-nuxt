import { useHttp } from "#imports";
import { API_BASE_URL, API_MAJOR_VERSION } from "@/constants";
import { useReport } from "~/composables/report/useReport";

export interface APIResponse {
  success: boolean;
  data: {
    enableGiftCardFeature: boolean;
    weTravelTogetherIconUrl: string;
    showDistanceOnSearchPage: boolean;
    cultureLocale: string;
    availableLocales: string[];
    cdnUrl: string;
    appTitle: string;
    appDescription: string;
    totalRestaurant: number;
    totalCovers: number;
    supportPhone: string;
    maxImageFileSizeInMb: number;
    selectedPaymentProvider: {
      promptpay: string;
      cc: string;
    };
    restaurantPriceRange: {
      min: number;
      max: number;
      currency: string;
    };
    promptpayUnsupportedBanks: string[];
    promptpayCountdown: number;
    termConditionBigGroup: string;
    gbPrimepayPublicKey: string;
    cities: { id: number; name: string }[];
    dynamicPoints: {
      reviewReservation: number;
      newUserVoucherPoint: number;
      earlyBird: {
        maxReviews: number;
        point: number;
      };
      referrerRewardPoint: number;
    };
    packageList: {
      ayce: string;
      pp: string;
      xp: string;
      hah: string;
      hs: string;
      sm: string;
      bfp: string;
    };
    packageTagLines: {
      ayce: string;
      pp: string;
      xp: string;
      hah: string;
      hs: string;
      sm: string;
      bfp: string;
    };
    useAsyncBooking: boolean;
    wttLinkUrl: string;
    bannerVoucherUrl: string;
    mobileBannerVoucherUrl: string;
    webV2Host: string;
    limitedSeatsShowing: string;
    deliveryFeeCurrency: string;
    deliveryFeePerKmInBaht: number;
    freeDeliveryFeeThresholdInBaht: number;
    deliveryRadius: number;
    minGroupBookingPartySize: number;
    deliveryFeeInBaht: number;
  };
  message: null;
}

export async function getConfig(): Promise<{
  isSuccess: boolean;
  data: null | APIResponse;
  message: string;
}> {
  const { data, error } = await useHttp({
    url: `${API_BASE_URL}/${API_MAJOR_VERSION}/config.json`,
    canRetry: true,
  });

  if (error.message) {
    useReport({
      level: "error",
      message: error.message,
    });
    return {
      isSuccess: false,
      message: error.message,
      data: null,
    };
  }
  return {
    isSuccess: true,
    message: "",
    data: data as APIResponse,
  };
}
