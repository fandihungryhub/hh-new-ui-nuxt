import { getHomeSection as homeSection } from "~/api/home_section/getHomeSection";
import type {
  FeaturedRestaurants,
  RestaurantTags,
} from "~/api/home_section/getHomeSection";
import { featuredResturant } from "~/models/restaurant";
import type { FeaturedRestaurantModel } from "~/models/restaurant";

export function isRestaurantTags(
  sectionData: FeaturedRestaurants | RestaurantTags | FeaturedRestaurantModel
): sectionData is RestaurantTags {
  return (sectionData as RestaurantTags).type === "restaurant_tags";
}

async function getHomeSection({
  pageNumber,
  pageSize,
  order,
  cityId,
}: {
  pageNumber?: number;
  pageSize?: number;
  order: number;
  cityId: number | string;
}) {
  const { isSuccess, data, message } = await homeSection({
    pageNumber,
    pageSize,
    order,
    cityId: cityId,
  });
  if (!isSuccess || !data) {
    return {
      isSuccess: false,
      message: message,
      data: null,
    };
  }

  const remapData = data.data.map((sectionData) => {
    if (!isRestaurantTags(sectionData)) {
      return featuredResturant(sectionData);
    }
    return sectionData;
  });
  return {
    isSuccess,
    message,
    data: {
      ...data,
      data: remapData,
    },
  };
}

export { getHomeSection };
