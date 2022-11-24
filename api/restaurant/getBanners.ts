import useHttp from "~/composables/useHttp";
import { DEFAULT_ERROR_MESSAGE } from "~/constants";

export interface GetRestaurantBanners {
  id: number;
  name: null;
  locations: any[];
  locales: string[];
  targetUrl: string;
  mobileVersions: {
    url: string;
  }[];
  desktopVersions: {
    url: string;
  }[];
  captions: string[];
  active: boolean;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
  restaurantTagGroupId: null;
  mobileRetinaVersions: {
    url: string;
  }[];
  desktopRetinaVersions: {
    url: string;
  }[];
  restaurantTagId: number;
  description: null | string;
  descriptionTh: null | string;
  descriptionEn: null | string;
}
export async function getRestaurantBanners(tagIds: number[] | string[]) {
  const defaultErrorMessage = `${DEFAULT_ERROR_MESSAGE}, failed get restaurant banners`;

  const { httpStatus, error, data } = await useHttp({
    url: "/banners.json",
    params: {
      restaurantTagIds: tagIds,
    },
  });

  const responseData = data as GetRestaurantBanners[];

  if (error?.message || httpStatus !== 200) {
    return {
      isSuccess: false,
      message: error.message || defaultErrorMessage,
      data: null,
    };
  }

  return {
    isSuccess: true,
    message: "",
    data: responseData,
  };
}
