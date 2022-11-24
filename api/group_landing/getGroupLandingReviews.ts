import { isEmpty } from "lodash-es";
import useHttp from "~/composables/useHttp";
import isErrorWithMessage from "~~/helpers/isErrorWithMessage";

export interface GroupLandingCustomerReview {
  data: {
    id: string;
    type: string;
    attributes: {
      rating: number;
      review: string;
      title: null;
      createdAt: string;
      userName: string;
      reviewRecommendedFors: {
        id: number;
        reviewId: number;
        dimensionId: number;
        createdAt: string;
        updatedAt: string;
      }[];
      encryptedId: string;
      userAvatar: {
        thumb: string;
        medium: string;
        original: string;
      };
      pictures: {
        thumb: string;
        original: string;
        caption: string;
      }[];
      avatar: string;
      restaurant: {
        id: number;
        name: string;
        link: string;
      };
      link: string;
    };
  }[];
  links: {
    self: string | null;
    first: string | null;
    prev: string | null;
    next: string | null;
    last: string | null;
  };
  success: boolean;
  message: null;
}

async function getGroupLandingReviews(
  groupLandingId: string | number,
  reviewType: string,
  pageNumber = 1,
  pageSize = 10
): Promise<{
  isSuccess: boolean;
  message: string;
  data: {
    data: GroupLandingCustomerReview["data"];
    links: GroupLandingCustomerReview["links"];
  } | null;
}> {
  if (!groupLandingId || !reviewType) {
    throw new Error(
      'Required parameter "groupLandingId" or "reviewType" is missing '
    );
  }
  const defaultErrorMessage =
    "Oops, something went wrong, failed get group landing reviews";
  try {
    const { data, error, httpStatus } = await useHttp({
      method: "GET",
      url: `/group_landing_pages/${groupLandingId}/reviews.json?review_type=${reviewType}&per_page=${pageSize}&page=${pageNumber}`,
    });
    const response = data as GroupLandingCustomerReview;
    if (isEmpty(response) || httpStatus !== 200) {
      return {
        isSuccess: false,
        message: error.message || defaultErrorMessage,
        data: null,
      };
    }
    if (!response.success) {
      return {
        isSuccess: false,
        message: response.message || defaultErrorMessage,
        data: null,
      };
    }
    return {
      isSuccess: true,
      data: response,
      message: response.message || "",
    };
  } catch (err) {
    if (isErrorWithMessage(err)) {
      return {
        isSuccess: false,
        message: err.message,
        data: null,
      };
    }
    return {
      isSuccess: false,
      data: null,
      message: defaultErrorMessage,
    };
  }
}

export default getGroupLandingReviews;
