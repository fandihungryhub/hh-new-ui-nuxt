<template>
  <div class="lg:bg-[#f4f6f7]">
    {{ message }}
    <RestaurantHeader />
    <div class="container mx-auto lg:px-6 xl:px-0">
      <ClientOnly>
        <RestaurantBanners />
        <template #fallback>
          <div class="h-[160px]"></div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta, useRoute } from "#imports";
import { getRestaurantBySlug } from "~/api/restaurant/getBySlug";
import { rebuildAssetURL } from "~/helpers/url";
import RestaurantHeader from "~/partial/restaurant_detail/RestaurantHeader.vue";
import RestaurantBanners from "~/partial/restaurant_detail/RestaurantBanners.vue";
import { isNewRestaurant } from "~~/services/restaurant";
import { useRestaurantDetail } from "~~/stores/restaurantDetail";
const { slug } = useRoute().params;
const restaurant = useRestaurantDetail();

definePageMeta({
  layout: "default",
});

// const restaurant: RestaurantPage = {
//   name: "",
//   icon: "",
//   bramchId: 0,
//   openingHoursShort: "",
//   reviewCount: 0,
//   reviewScore: "5",
//   cuisine: {
//     id: 1,
//     name: "Seafood",
//   },
//   location: {
//     id: 1,
//     name: "Seafood",
//   },
//   tags: [
//     {
//       id: 1,
//       label: "Seafood",
//     },
//   ],
//   featuredImages: [],
//   lastOrder: "",
//   reservationSystemOnly: false,
// };
const earlyBirdPoint = 100;
const { isSuccess, data, message } = await getRestaurantBySlug({
  slug: slug as string,
});

// console.log("mkmk", data);

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
  } = data.data;
  // console.log("ICON", logoUrl);

  const included = data.included;
  restaurant.value.name = name;
  restaurant.value.lastOrder = lastBookingWasMade;
  restaurant.value.branchId = branchId;
  restaurant.value.cuisine = primaryCuisine;
  restaurant.value.location = primaryLocation;
  restaurant.value.icon = rebuildAssetURL(logoUrl.medium);
  restaurant.value.openingHoursShort = openingHoursShort;
  restaurant.value.reviewCount = reviewsCount;
  restaurant.value.reviewScore =
    reviewsScore % 1 === 0 ? `$"reviewsScore}.0` : reviewsScore.toString();
  restaurant.value.tags = hashtags;
  restaurant.value.isNewRestaurant = isNewRestaurant(reviewsCount);
  restaurant.value.totalCovers = totalCovers;
  // restaurant.value.lastOrder = generateLastBookingCTA({
  //   lastBooking: lastBookingWasMade,
  //   reviewsCount: reviewsCount,
  //   totalCovers: totalCovers,
  //   earlyReviewPoint: earlyBirdPoint,
  // });
  restaurant.value.reservationSystemOnly = reservationSystemOnly;
  if (!restaurant.value.featuredImages.length) {
    included.forEach((inc) => {
      if (inc.type === "restaurants-pictures") {
        restaurant.value.featuredImages.push({
          id: inc.id,
          caption: inc.attributes.caption,
          image: rebuildAssetURL(inc.attributes.item.url),
        });
      }
    });
  }
}
</script>
