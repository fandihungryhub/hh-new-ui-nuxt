import useHttp from "~/composables/useHttp";
import { DEFAULT_ERROR_MESSAGE } from "~/constants";
import qs from "qs";
import { isEmpty } from "lodash-es";
import { APILink } from "~~/types/Common";
import isErrorWithMessage from "~~/helpers/isErrorWithMessage";

export interface GetByTagsResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      startDate: string;
      totalLocations: number | null;
      totalReviews: number;
      avgReviews: number;
      branchId: number | null;
      cuisine: string;
      location: null | string;
      rank: null;
      description: string;
      customText: null | string;
      name: string;
      names: {
        th: string;
        en: string;
      };
      totalCovers: number;
      restaurantId: number | null;
      restaurantEncryptedId: null | string;
      link: string;
      cover: {
        thumb: string;
        slide_thumb: string;
        square: string;
        original: string;
      };
      lastBookingWasMade: string;
      packageTypes: string[];
      longPackageTypes: {
        typeShort: string;
        type: string;
      }[];
      price: {
        amount: number;
        currency: string;
        symbol: string;
        format: string;
      };
      priceV2: {
        amount: number;
        currency: string;
        symbol: string;
        format: string;
      };
      pricingType: string;
      covid19Safety: boolean;
    };
    relationships: {
      groupLandingPage: {
        data: {
          id: number;
          groupType: string;
          groupId: number;
          createdAt: string;
          updatedAt: string;
          slug: string;
          groupSingleType: null;
          sectionType: null;
          title: string;
          description: string;
          footerDescription: null;
          titleTh: string;
          titleEn: string;
          descriptionTh: string;
          descriptionEn: string;
          footerDescriptionTh: null;
          footerDescriptionEn: null;
        } | null;
      };
      city: {
        data: {
          id: number;
          countryId: number;
          name: string;
          createdAt: string;
          updatedAt: string;
          homeDescription: string;
          homeDescriptionTh: string;
          homeDescriptionEn: string;
        };
      };
    };
  }[];
  links: APILink;
  success: boolean;
  message: null;
}

export default async function getByTags({
  tagId,
  compactMode = true,
  pageNumber = 10,
  pageSize = 1,
}: {
  tagId: string | number;
  compactMode: boolean;
  pageSize: number;
  pageNumber: number;
}): Promise<{
  isSuccess: boolean;
  message: string;
  links: null | APILink;
  data: null | GetByTagsResponse["data"];
}> {
  const defaultErrorMessage = `${DEFAULT_ERROR_MESSAGE}, failed get restaurant by tags`;
  try {
    if (!tagId) {
      throw new Error("Invalid tag id");
    }
    const param = {
      compactMode: compactMode,
      page: {
        size: pageSize,
        number: pageNumber,
      },
    };
    const queryString = qs.stringify(param, {
      encode: false,
    });
    const { data, error } = await useHttp({
      url: `/restaurant_tags/${tagId}?${queryString}`,
    });
    const response = data as GetByTagsResponse;
    if (isEmpty(response)) {
      return {
        isSuccess: false,
        message: error.message || DEFAULT_ERROR_MESSAGE,
        data: null,
        links: null,
      };
    }
    if (response.data) {
      return {
        isSuccess: response.success,
        message: response.message || "",
        data: response.data,
        links: response.links,
      };
    }
    return {
      isSuccess: false,
      message: response.message || defaultErrorMessage,
      data: null,
      links: null,
    };
  } catch (err) {
    if (isErrorWithMessage(err)) {
      return {
        isSuccess: false,
        message: err.message,
        data: null,
        links: null,
      };
    }
    return {
      isSuccess: false,
      message: defaultErrorMessage,
      data: null,
      links: null,
    };
  }
}
