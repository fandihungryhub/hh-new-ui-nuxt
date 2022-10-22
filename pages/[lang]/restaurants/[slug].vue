<template>
  <div class="container mx-auto">
    {{ message }}
    {{ restoData }}
    <RestaurantHeader
      :name="restaurant.name"
      :icon="restaurant.icon"
      :earlyMaxReview="10"
      :earlyReviewPoint="100"
      :rating="restaurant.reviewScore"
      :ratingCount="restaurant.reviewCount"
      :cuisine="restaurant.cuisine"
      :location="restaurant.location"
      :branchId="restaurant.bramchId"
      :direction="''"
      :tags="restaurant.tags"
      :lastOrder="restaurant.lastOrder"
      :showAcceptVoucher="true"
      :showInputLocation="true"
      :featuredImages="restaurant.featuredImages"
      :openingHoursSummary="restaurant.openingHoursShort"
      :showTags="!restaurant.reservationSystemOnly"
      :showViewBranch="!restaurant.reservationSystemOnly"
    />
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta, useRoute } from "#imports";
import { getRestaurantBySlug } from "~/api/restaurant/getBySlug";
import { generateLastBookingCTA } from "~/helpers/restaurant";
import { rebuildAssetURL } from "~/helpers/url";
import RestaurantHeader from "~/partial/restaurant_detail/RestaurantHeader.vue";
import { RestaurantPage } from "~/types/Restaurant";
const { slug } = useRoute().params;

definePageMeta({
  layout: "default",
});

const restaurant: RestaurantPage = {
  name: "",
  icon: "",
  bramchId: 0,
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
};
const earlyBirdPoint = 100;
const { data: restoData } = await useFetch(
  "https://hungryhub.com/api/v5/restaurants/sui-sian-restaurant-the-landmark-bangkok-hotel/slug.json?access_token=rem0aPxU_ysdd7DB751LEkrFjZ__2xIW_7MCDauODqU&client_type=web&include_packages=false&include_pictures=true&minor_version=3&preview_mode=false"
);
const { isSuccess, data, message } = await getRestaurantBySlug({
  slug: slug as string,
});

console.log("mkmk", data);

if (isSuccess && data) {
  const {
    name,
    logoUrl,
    branchId,
    primaryCuisine,
    primaryLocation,
    openingHoursShort,
    reviewsCount,
    reviewsScore,
    hashtags,
    lastBookingWasMade,
    totalCovers,
    reservationSystemOnly,
  } = data.data.attributes;
  console.log("ICON", logoUrl);

  const included = data.included;
  restaurant.name = name;
  restaurant.bramchId = branchId;
  restaurant.cuisine = primaryCuisine;
  restaurant.location = primaryLocation;
  restaurant.icon = rebuildAssetURL(logoUrl.medium);
  restaurant.openingHoursShort = openingHoursShort;
  restaurant.reviewCount = reviewsCount;
  restaurant.reviewScore =
    reviewsScore % 1 === 0 ? `$"reviewsScore}.0` : reviewsScore.toString();
  restaurant.tags = hashtags;
  restaurant.lastOrder = generateLastBookingCTA({
    lastBooking: lastBookingWasMade,
    reviewsCount: reviewsCount,
    totalCovers: totalCovers,
    earlyReviewPoint: earlyBirdPoint,
  });
  restaurant.reservationSystemOnly = reservationSystemOnly;
  included.forEach((inc) => {
    if (inc.type === "restaurants-pictures") {
      restaurant.featuredImages.push({
        id: inc.id,
        caption: inc.attributes.caption,
        image: rebuildAssetURL(inc.attributes.item.url),
      });
    }
  });
  console.log("bubu", restaurant);
}
</script>
