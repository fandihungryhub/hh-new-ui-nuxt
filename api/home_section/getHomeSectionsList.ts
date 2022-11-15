import useHttp from "~/composables/useHttp";
import isErrorWithMessage from "~~/helpers/isErrorWithMessage";
import { DEFAULT_ERROR_MESSAGE } from "~/constants";
import { isEmpty } from "lodash-es";

export interface HomeSectionListAPIResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      title: string;
      description: null | string;
      footerDescription: null | string;
      slug: string;
      sectionNumber: string;
    };
  }[];
  success: boolean;
  message: null;
}

export async function getHomeSectionList(): Promise<{
  isSuccess: boolean;
  data: HomeSectionListAPIResponse["data"] | null;
  message: string;
}> {
  const defaultErrorMessage = `${DEFAULT_ERROR_MESSAGE}, failed get home section group landing`;
  try {
    const { data, error } = await useHttp({
      url: "/homes/sections.json",
    });
    const response = data as HomeSectionListAPIResponse;
    if (isEmpty(response)) {
      return {
        isSuccess: false,
        message: error.message || defaultErrorMessage,
        data: null,
      };
    }
    return {
      isSuccess: response.success,
      message: response.message || "",
      data: response.data,
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
      message: defaultErrorMessage,
      data: null,
    };
  }
}
