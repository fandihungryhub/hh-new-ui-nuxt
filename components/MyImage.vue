<template>
  <v-lazy-image
    v-if="isUsingExternalLazy && !isServer"
    :key="`v-lazy-image-${retryID}`"
    :src="image"
    @error="replaceErrorImage"
  />
  <img
    v-else
    :key="`native-${retryID}`"
    :src="image"
    loading="lazy"
    @error="replaceErrorImage"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import loadingPlaceHolder from "@/assets/img/skeleton-loader.svg";
import { generateRandomString } from "@afif_hh/web-toolkit/helper";
// @ts-ignore
import VLazyImage from "v-lazy-image";
import {
  imageProxy,
  isDesktop,
  isTablet,
  isSupportNativeLazyImg,
  isSupportRetina,
  isHDScreen,
  isSupportWebp,
} from "@afif_hh/web-toolkit/helper";
export default defineComponent({
  name: "MyImage",
  components: {
    VLazyImage,
  },
  props: {
    img: {
      type: String,
      required: true,
    },
    fallback: {
      type: String,
      default: "",
    },
    disableRetina: {
      type: Boolean,
      default: false,
    },
    isLazy: {
      type: Boolean,
      default: true,
    },
    mobileWidth: {
      default: 0,
      type: Number,
    },
    mobileHeight: {
      default: 0,
      type: Number,
    },
    desktopWidth: {
      default: 0,
      type: Number,
    },
    desktopHeight: {
      default: 0,
      type: Number,
    },
    preferWebp: {
      type: Boolean,
      default: true,
    },
    resizingType: {
      type: String,
      default: "fill",
    },
    enableMutator: {
      type: Boolean,
      default: true,
    },
    isServer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      image: "",
      isResized: false,
      maxRetryCount: 3,
      retryCount: 0,
      retryInterval: 1000,
      retryFunction: 0 as any,
      retryID: generateRandomString(),
      isUsingExternalLazy: false,
      isUsingRetinaVersion: false,
    };
  },
  watch: {
    img: {
      handler: function () {
        this.checkImage();
      },
      immediate: true,
    },
  },
  created() {
    this.isUsingExternalLazy = this.setLazyOption();
    this.isUsingRetinaVersion = isSupportRetina() ? !this.disableRetina : false;
  },
  beforeUnmount() {
    this.clearTimeout();
  },
  methods: {
    setLazyOption() {
      if (this.isLazy) {
        if (isSupportNativeLazyImg()) {
          return false;
        }
        return true;
      }
      return false;
    },
    checkImage() {
      try {
        if (!this.img || (this.img && this.img.length === 0)) {
          this.image = this.fallback;
          return;
        }
        if (!this.enableMutator) {
          this.image = this.img;
          return;
        }
        this.mutateImage(this.img);
      } catch (err: any) {
        throw new Error(err);
      }
    },
    replaceErrorImage() {
      if (this.retryCount < this.maxRetryCount) {
        this.retryFunction = setTimeout(() => {
          this.retryID = this.img + generateRandomString();
          this.retryCount += 1;
        }, this.retryInterval);
      } else {
        console.log(`error using image ${this.image} now using image fallback`);
        if (this.fallback) {
          this.image = this.fallback;
          return;
        }
        // default fallback image
        this.image = "";
      }
    },
    mutateImage(image: string) {
      const width =
        isDesktop || isTablet ? this.desktopHeight : this.mobileWidth;
      const height =
        isDesktop || isTablet ? this.desktopHeight : this.mobileHeight;
      const format = "webp";
      this.image = imageProxy({
        url: image,
        width: this.sizeMultiplier(width),
        height: this.sizeMultiplier(height),
        format,
        resizingType: this.resizingType,
        enlarge: 1,
        gravity: "ce",
      });
    },
    clearTimeout() {
      if (this.retryFunction && !this.isServer) {
        window.clearTimeout(this.retryFunction);
      }
    },
    sizeMultiplier(size: number) {
      if (this.isUsingRetinaVersion) {
        return Math.round(size * 2);
      } else if (isHDScreen()) {
        const enlarge = Math.round(window.devicePixelRatio * 10) / 10 + 0.4;
        return Math.round(size * enlarge);
      }
      return Math.round(size);
    },
  },
});
</script>