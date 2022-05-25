<template>
  <div>
    {{ $route.params.slug }}
    <RestaurantFeaturedImage
      :images="restaurant.featuredImage"
      :enable-mutator="true"
    ></RestaurantFeaturedImage>
    <RestaurantHeader
      :name="restaurant.name"
      :location="restaurant.location"
      :cuisine="restaurant.cuisine"
      :review-count="restaurant.reviewCount"
      :review-score="restaurant.reviewScore"
      :openingHour="restaurant.openingHour"
      :branch-id="restaurant.branchId"
    ></RestaurantHeader>
    <ClientOnly>
      <!-- <div>AAA ONLY CLIENT</div> -->
      <PackageCard v-bind="dummyPack"></PackageCard>
      <!-- {{ $t('greeting') }} -->
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// import { nanoid } from 'nanoid'
import { getRestaurantBySlug, getRestaurantPackages } from '@afif_hh/web-toolkit/service';
import { imageProxy, assetUrl } from '@afif_hh/web-toolkit/helper';
import { RestaurantFeaturedImage } from '@afif_hh/ui_components';
import '@afif_hh/ui_components/dist/style.css';
const slug = useRoute().params.slug as string;

const restaurant = {
  id: '0',
  name: 'Restaurant Name',
  location: 'Bangkok',
  cuisine: 'International',
  featuredImage: [],
  reviewCount: 0,
  reviewScore: 0,
  openingHour: '00.00 - 00.00',
  branchId: 0
};
async function getRestaurantData() {
  const { data, isSuccess, error } = await getRestaurantBySlug(slug, {
    includePackages: false,
    includePictures: true
  });

  if (isSuccess) {
    console.log('is succes', isSuccess);
    console.log('data resto', data);
    restaurant.id = data.data.id;
    const { name, location, cuisine, reviewsCount, reviewsScore, openingHoursShort, branchId } =
      data.data.attributes;
    const included = data.included;
    restaurant.featuredImage = included
      .filter((inc) => inc.type === 'restaurants-pictures')
      .map((picture) => assetUrl(picture.attributes.item.url));
    restaurant.name = name;
    restaurant.cuisine = cuisine;
    restaurant.location = location;
    restaurant.reviewCount = reviewsCount;
    restaurant.reviewScore = reviewsScore;
    restaurant.openingHour = openingHoursShort;
    restaurant.branchId = branchId;

    const { data: restaurantPackages } = await getRestaurantPackages(restaurant.id);
    console.log('restaurantPackages', restaurantPackages);
  }
}

function parseRestauarntPackages(packages: Awaited<ReturnType<typeof getRestaurantPackages>>) {
  packages.data;
}

const dummyPack = {
  name: 'My pack',
  description: 'Awesome',
  startDate: '2022-05-22',
  endDate: '2022-06-30',
  packageType: 'ayce',
  originalPrice: 500,
  timeLimit: '2 hours',
  pricingType: 'per_pax',
  rules: [
    {
      priceDescription: '',
      price: '500',
      minSeat: 1,
      maxSeat: 5,
      perPack: null,
      duration: null,
      kidsPriceRate: 50
    }
  ],
  isAcceptManyQuantity: false,
  isLoading: false
};

onMounted(() => {
  console.log('HAHAHAH');
});

await getRestaurantData();
</script>

<script lang="ts">
import { PackageCard } from '@afif_hh/ui_components';
defineComponent({
  components: {
    PackageCard
  },
  mounted() {
    console.log('process.client', process.client);
  }
});
</script>
