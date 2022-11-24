import { useReport } from "~/composables/report/useReport";
import { getCities as fetchCities } from "~/api/common/city";
import { City } from "~/types/City";

export async function getCities(): Promise<{
  isSuccess: boolean;
  data: null | City[];
  message: string;
}> {
  const { isSuccess, data, message } = await fetchCities();

  if (!isSuccess) {
    useReport({
      level: "error",
      message: message,
    });
    return {
      isSuccess: false,
      message: message,
      data: null,
    };
  }
  return {
    isSuccess: true,
    message: "",
    data: data,
  };
}
