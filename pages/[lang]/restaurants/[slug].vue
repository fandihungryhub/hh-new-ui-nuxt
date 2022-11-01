<template>
  <div class="lg:bg-[#f4f6f7] min-h-screen">
    <!-- restaurant featured image -->
    <section
      class="container mx-auto lg:px-6 xl:px-0"
      v-if="restaurant.featuredImages.length"
    >
      <RestaurantFeaturedImages :images="restaurant.featuredImages" />
    </section>
    <div class="container flex mx-auto lg:px-6 xl:px-0">
      <section class="flex-grow-0 w-full lg:w-8/12 lg:mr-8 panel">
        <RestaurantHeader />
        <div>
          <ClientOnly>
            <RestaurantBanners />
            <template #fallback>
              <div class="h-[160px]"></div>
            </template>
          </ClientOnly>
        </div>
      </section>

      <div class="flex items-start justify-start lg:w-3/12">
        <section class="w-full panel">
          <RestaurantBook class="bg-white" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta, useRoute } from "#imports";
import { getRestaurantBySlug } from "~/api/restaurant/getBySlug";
import { rebuildAssetURL } from "~/helpers/url";
import RestaurantHeader from "~/partial/restaurant_detail/RestaurantHeader.vue";
import RestaurantBanners from "~/partial/restaurant_detail/RestaurantBanners.vue";
import RestaurantFeaturedImages from "~/partial/restaurant_detail/RestaurantFeaturedImages.vue";
import RestaurantBook from "~/partial/restaurant_detail/RestaurantBook.vue";
import { isNewRestaurant } from "~~/services/restaurant";
import { useRestaurantDetail } from "~~/stores/restaurantDetail";
const { slug } = useRoute().params;
const restaurant = useRestaurantDetail().value;

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
async function getRestaurantData() {
  try {
    const { isSuccess, data, message } = await getRestaurantBySlug({
      slug: slug as string,
    });

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
      restaurant.name = name;
      restaurant.lastOrder = lastBookingWasMade;
      restaurant.branchId = branchId;
      restaurant.cuisine = primaryCuisine;
      restaurant.location = primaryLocation;
      restaurant.icon = rebuildAssetURL(logoUrl.medium);
      restaurant.openingHoursShort = openingHoursShort;
      restaurant.reviewCount = reviewsCount;
      restaurant.reviewScore =
        reviewsScore % 1 === 0 ? `$"reviewsScore}.0` : reviewsScore.toString();
      restaurant.tags = hashtags;
      restaurant.isNewRestaurant = isNewRestaurant(reviewsCount);
      restaurant.totalCovers = totalCovers;
      // restaurant.lastOrder = generateLastBookingCTA({
      //   lastBooking: lastBookingWasMade,
      //   reviewsCount: reviewsCount,
      //   totalCovers: totalCovers,
      //   earlyReviewPoint: earlyBirdPoint,
      // });
      restaurant.reservationSystemOnly = reservationSystemOnly;
      if (!restaurant.featuredImages.length) {
        included.forEach((inc) => {
          if (inc.type === "restaurants-pictures") {
            restaurant.featuredImages.push({
              id: inc.id,
              caption: inc.attributes.caption,
              src: rebuildAssetURL(inc.attributes.item.url),
            });
          }
        });
      }
    }
  } catch (err) {}
}

function onShareClick() {}

function onFavouriteClick() {}

await getRestaurantData();
</script>

<style lang="scss" scoped>
.panel {
  @apply bg-white rounded-xl lg:my-4 drop-shadow;
}
</style>
