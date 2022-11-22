import getGroupLanding from "~/api/group_landing/getGroupLanding";
import dayjs from "~/lib/dayjs";
import { useReport } from "~~/composables/report/useReport";
import { getFromUserStorage, saveToUserStorage } from "~~/helpers/userStorage";

const storageKeyLastUpdate = "hungryhub_group_landing_last_updated";

function getLastUpdate() {
  const { success, data } = getFromUserStorage({
    key: storageKeyLastUpdate,
    type: "localstorage",
  });
  return success ? (data as string) : "";
}

function setLastUpdate() {
  const val = dayjs().format("DD-MM-YYYY HH:ss");
  saveToUserStorage({ key: storageKeyLastUpdate, type: "localstorage", val });
}

function shouldGetAllGroupLanding() {
  const today = dayjs();
  const savedLastUpdated = getLastUpdate();
  const lastUpdated = dayjs(savedLastUpdated, "DD-MM-YYYY HH:ss");
  const isLastUpdatedValid = lastUpdated.isValid();
  const isLastUpdatedExpired = () => {
    if (!isLastUpdatedValid) {
      return true;
    }
    return today.isSameOrBefore(lastUpdated, "hour") === false ? true : false;
  };

  return isLastUpdatedExpired();
}

export async function getAllGroupLanding() {
  const allow = shouldGetAllGroupLanding();
  if (allow) {
    const { isSuccess, message, data } = await getGroupLanding();
    if (!isSuccess) {
      useReport({
        level: "error",
        message: message,
      });
      return {
        isSuccess,
        message,
        data,
      };
    }
    setLastUpdate();
    return {
      isSuccess,
      message,
      data,
    };
  }
  return null;
}
