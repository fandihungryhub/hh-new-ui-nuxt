<template>
  <picture>
    <source
      v-for="imageSource in imageSources"
      :type="imageSource.format"
      :srcset="imageSource.source"
      :media="imageSource.mediaQuery"
    />
    <img
      v-bind="$attrs"
      :src="parsedSrc"
      :alt="alt"
      :width="widthInNumber"
      :height="height"
      :loading="lazy || null"
    />
  </picture>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import useImageMutator from "~/composables/useImageMutator";
import { isContainHttp } from "~/helpers/url";
import { generateSourceMediaQuery } from "~/helpers/image";

// scenario
// 1. local image can pass retina version
// 2. external image can provide single src then use image service to generete webp and retina

export type SrcSet = {
  source: string;
  format?: string;
  breakpoint?: {
    minWidth?: number;
    maxWidth?: number;
  };
  width?: number;
  height?: number;
  pixelDensity?: string;
  useMutator?: boolean;
};

export type Props = {
  alt: string;
  src: string;
  width: string | number;
  sources?: SrcSet[];
  height?: string;
  useMutator?: boolean;
  lazy?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  height: "",
  lazy: true,
});

type ImageSources = {
  format: string | undefined;
  mediaQuery: string | undefined;
  source: string | undefined;
}[];

const { sources, width, src, height, useMutator } = props;
const widthInNumber =
  typeof width === "string"
    ? parseInt(width)
    : typeof width === "number"
    ? width
    : 0;
const heightInNumber =
  typeof height === "string" && height.length
    ? parseInt(height)
    : typeof height === "number"
    ? height
    : 0;
const imageSources: ImageSources = [];

const isLocal = isContainHttp(src) ? false : true;
const parsedSrc = isLocal ? src : src;

function generateDefaultPreset() {
  const sources: ImageSources = [];

  const retinaImg = useImageMutator({
    image: src,
    width: widthInNumber * 2,
    height: heightInNumber * 2,
    isWebp: true,
  });

  sources.push({
    format: undefined,
    mediaQuery: undefined,
    source: retinaImg,
  });

  const webpImage = useImageMutator({
    image: src,
    width: widthInNumber,
    height: heightInNumber,
    isWebp: true,
  });
  const webpImageRetina = useImageMutator({
    image: src,
    width: widthInNumber * 2,
    height: heightInNumber * 2,
    isWebp: true,
  });

  const finalImgSrc = `${webpImage} 1x, ${webpImageRetina} 2x`;
  sources.push({
    format: "image/webp",
    mediaQuery: undefined,
    source: finalImgSrc,
  });

  return sources;
}

function init() {
  if (Array.isArray(sources) && sources.length) {
    sources.forEach((imgSource) => {
      const usedWidth = imgSource.width || 0;
      imageSources.push({
        format: imgSource.format ? `image/${imgSource.format}` : undefined,
        mediaQuery: imgSource.breakpoint
          ? generateSourceMediaQuery({
              maxWidth: imgSource.breakpoint.maxWidth,
              minWidth: imgSource.breakpoint.minWidth,
            })
          : undefined,
        source: imgSource.useMutator
          ? useImageMutator({
              width: usedWidth,
              height: imgSource.height || 0,
              isWebp: imgSource.format === "webp",
              image: imgSource.source,
            })
          : imgSource.source,
      });
    });
    return;
  }
  // for use case #2
  if (!isLocal) {
    if (useMutator) {
      const generateDefault = generateDefaultPreset();
      generateDefault.forEach((source) => {
        imageSources.push(source);
      });
      return;
    }
  }
}

init();
</script>

<script lang="ts">
export default {
  name: "HhImage",
};
</script>
