import { useState } from "#imports";
import { RestaurantPage } from "~~/types/Restaurant";
const restaurantDetail: RestaurantPage = {
  name: "",
  icon: "",
  branchId: 0,
  openingHoursShort: "",
  reviewCount: 0,
  reviewScore: "5",
  cuisine: {
    id: 1,
    name: "Seafood",
  },
  location: {
    id: 1,
    name: "Seafood",
  },
  tags: [
    {
      id: 1,
      label: "Seafood",
    },
  ],
  featuredImages: [],
  lastOrder: "",
  reservationSystemOnly: false,
  vrLink: "",
  isNewRestaurant: false,
  totalCovers: 0,
};

const useRestaurantDetail = () =>
  useState("restaurantDetail", () => restaurantDetail);
export { useRestaurantDetail };
