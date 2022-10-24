import { isEmpty } from "lodash-es";
import useHttp from "~/composables/useHttp";
import { API_MINOR_VERSION, DEFAULT_ERROR_MESSAGE } from "~/constants";
import type { RestaurantAttributes } from "~/types/Restaurant";
import { restaurant, RestaurantModel } from "~/models/restaurant";
export interface GetRestaurantBySlug {
  data: Data;
  included: Included[];
  meta: Meta;
  success: boolean;
  message: null;
}

export interface Data {
  id: string;
  type: string;
  attributes: RestaurantAttributes;
  relationships: Relationships;
}

export interface Relationships {
  pictures: BloggerReviews;
  restaurantPackages: BloggerReviews;
  lastReviews: BloggerReviews;
  bloggerReviews: BloggerReviews;
}

export interface BloggerReviews {
  data: {
    id: string;
    type: string;
  }[];
}

export interface Included {
  id: string;
  type: string;
  attributes: {
    priority: number;
    caption: string;
    item: {
      url: string;
      thumb2x: {
        url: string;
      };
      thumb: {
        url: string;
      };
      thumbCover2x: {
        url: string;
      };
      thumbCover: {
        url: string;
      };
      thumbCoverSquare2x: {
        url: string;
      };
      thumbCoverSquare: {
        url: string;
      };
      bigCover: {
        url: string;
      };
      slideThumb2x: {
        url: string;
      };
      slideThumb: {
        url: string;
      };
      slideThumbSquare2x: {
        url: string;
      };
      slideThumbSquare: {
        url: string;
      };
    };
  };
}

export interface Meta {
  reviews: Reviews;
  criteoItem: {
    id: number;
    quantity: number;
    price: string;
  }[];
}

export interface Reviews {
  total: number;
  average: number;
  starsCount: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
}

export async function getRestaurantBySlug({
  slug,
  accessToken,
}: {
  slug: string;
  accessToken?: string;
}): Promise<{
  isSuccess: boolean;
  message: string;
  data: null | {
    data: RestaurantModel;
    included: Included[];
    meta: Meta;
    success: boolean;
    message: null;
  };
}> {
  const defaultErrorMessage = `${DEFAULT_ERROR_MESSAGE}, failed get restaurant data`;
  const url = `/restaurants/${slug}/slug.json`;
  const params = {
    includePackages: false,
    includePictures: true,
    previewMode: false,
    minorVersion: API_MINOR_VERSION,
    accessToken,
  };

  const { httpStatus, data, error } = await useHttp({
    url: url,
    params,
  });

  console.log("get by slug", error, httpStatus);
  const response = data as GetRestaurantBySlug;

  if (isEmpty(response) || isEmpty(response.data)) {
    return {
      isSuccess: false,
      message: `${defaultErrorMessage} ${response}`,
      data: null,
    };
  }

  if (error?.message || httpStatus !== 200) {
    return {
      isSuccess: false,
      message: response.message || error.message || defaultErrorMessage,
      data: null,
    };
  }

  const restaurantData = restaurant(response.data);

  return {
    isSuccess: true,
    message: "",
    data: {
      data: restaurantData,
      included: response.included,
      meta: response.meta,
      message: response.message,
      success: response.success,
    },
  };
}
