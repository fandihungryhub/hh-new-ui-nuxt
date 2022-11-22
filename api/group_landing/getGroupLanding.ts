import useHttp from "~/composables/useHttp";
import { isEmpty } from "lodash-es";
import isErrorWithMessage from "~/helpers/isErrorWithMessage";
import { GroupLanding } from "~/types/GroupLanding";

export interface GetGroupLandingPage {
  data: GroupLanding | GroupLanding[];
  success: boolean;
  message: null;
}

async function getGroupLanding(groupLandingId?: string | number): Promise<{
  isSuccess: boolean;
  message: string;
  data: null | GroupLanding | GroupLanding[];
}> {
  const defaultErrorMessage =
    "Oops, something went wrong, failed get group landing data";
  try {
    const baseUrl = `/group_landing_pages`;
    let url = "";
    if (groupLandingId) {
      url = `${baseUrl}/${groupLandingId}.json`;
    } else {
      url = `${baseUrl}.json`;
    }
    const result = await useHttp({
      url: url,
    });
    const resultData = result.data as GetGroupLandingPage;
    if (result && !isEmpty(resultData.data) && resultData.success) {
      return {
        isSuccess: true,
        message: resultData.message || "",
        data: resultData.data,
      };
    }
    return {
      isSuccess: false,
      message:
        resultData.message || result.error.message || defaultErrorMessage,
      data: null,
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

export default getGroupLanding;
