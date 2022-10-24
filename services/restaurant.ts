import type { FeaturedRestaurant } from "~/types/Restaurant";
import { relativeTime } from "~/helpers/dateTime";

function createDummyFeaturedRestaurant() {
  const restaurant: FeaturedRestaurant = {
    id: "",
    type: "featured_restaurants",
    attributes: {
      startDate: "",
      totalLocations: null,
      totalReviews: 0,
      avgReviews: 0,
      branchId: null,
      cuisine: "",
      location: null,
      rank: null,
      description: null,
      customText: null,
      name: "",
      names: {
        th: "",
        en: "",
      },
      totalCovers: 0,
      restaurantId: null,
      restaurantEncryptedId: null,
      link: "",
      cover: {
        thumb: "",
        slideThumb: "",
        square: "",
        original: "",
      },
      lastBookingWasMade: "",
      packageTypes: [],
      longPackageTypes: [],
      price: {
        amount: 0,
        currency: "",
        symbol: "",
        format: "",
      },
      priceV2: {
        amount: 0,
        currency: "",
        symbol: "",
        format: "",
      },
      pricingType: "",
      covid19Safety: false,
    },
  };
  return restaurant;
}

function generateLastBookingCTA({
  lastBooking,
  reviewsCount,
  totalCovers,
  earlyReviewPoint,
}: {
  lastBooking: string;
  reviewsCount: number;
  totalCovers: number;
  earlyReviewPoint: number;
}): {
  text: "lastReservationCTA" | "newRestaurantCTA" | "totalRestaurantBookingCTA";
  value: string | number;
} {
  console.log("lastBooking", lastBooking);
  console.log("reviewsCount", reviewsCount);
  console.log("totalCovers", totalCovers);
  console.log("earlyReviewPoint", earlyReviewPoint);
  const lastBookingMadeDate = new Date(lastBooking).getTime();
  const dayBeforeYesterday = new Date().getTime() - 60 * 60 * 1000 * 24 * 3;
  if (dayBeforeYesterday <= lastBookingMadeDate) {
    const relative = relativeTime(lastBookingMadeDate);
    return {
      text: "lastReservationCTA",
      value: relative,
    };
  }
  if (reviewsCount < 5) {
    return {
      text: "newRestaurantCTA",
      value: earlyReviewPoint,
    };
  }
  return {
    text: "totalRestaurantBookingCTA",
    value: totalCovers,
  };
}

function isNewRestaurant(reviewsCount: number) {
  if (typeof reviewsCount !== "number") {
    throw new Error(
      "Failed determine is new restaurant, review count is not a number"
    );
  }
  return reviewsCount < 5 ? true : false;
}

function isActiveRestaurant(availability: string) {
  if (typeof availability !== "string") {
    throw new Error(
      "Failed determine is active restaurant, availability is not a string"
    );
  }
  if (availability.length === 0) {
    return false;
  }
  return availability === "in stock" ? true : false;
}

export {
  createDummyFeaturedRestaurant,
  generateLastBookingCTA,
  isNewRestaurant,
  isActiveRestaurant,
};
