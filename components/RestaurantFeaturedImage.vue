<template>
  <div class="flex flex-wrap">
    <div
      v-for="(img, index) in featuredImages"
      class="relative p-1"
      :class="index <= 1 ? ' lg:w-1/5 w-1/2' : 'lg:w-1/5 w-1/3'"
    >
      <HhImage
        class="w-full"
        :sources="img.sources"
        :src="img.src"
        :useMutator="true"
        alt="restaurant image"
        :width="500"
        :lazy="false"
      />
      <div
        v-if="index === 4 && images.length > maxShowedImages"
        class="absolute top-0 left-0 flex items-center justify-center w-full h-full text-sm text-white bg-black/40 lg:text-2xl"
      >
        {{ `${images.length - maxShowedImages}+` }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
type Props = {
  images: { src: string; caption: string }[];
};

const props = defineProps<Props>();
const images = Array.isArray(props.images) ? props.images : [];
const maxShowedImages = images.length < 5 ? 2 : 5;
const showedImages = images.slice(0, maxShowedImages);
const featuredImages = showedImages.map((img, index) => {
  const sources = [
    {
      source: img.src,
      format: "webp",
      breakpoint: {
        maxWidth: 375,
      },
      width: 175,
      height: 140,
      useMutator: true,
    },
    {
      source: img.src,
      format: "webp",
      breakpoint: {
        minWidth: 640,
      },
      width: 300,
      height: 180,
      useMutator: true,
    },
    {
      source: img.src,
      format: "webp",
      breakpoint: {
        minWidth: 768,
      },
      width: 300,
      height: 180,
      useMutator: true,
    },
    {
      source: img.src,
      format: "webp",
      breakpoint: {
        minWidth: 1024,
      },
      width: 370,
      height: 240,
      useMutator: true,
    },
  ];
  return {
    caption: img.caption,
    src: img.src,
    sources,
  };
});
</script>
<script lang="ts">
export default {
  name: "RestaurantFeaturedImage",
};
</script>
