<template>
  <img :src="icon" alt="icon heart" />
</template>

<script lang="ts" setup>
import iconHeartBlack from "~/assets/image/icon-heart-black.png";
import iconHeartRed from "~/assets/image/icon-heart-red.png";
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
});

const icon = props.color === "red" ? iconHeartRed : iconHeartBlack;
</script>

<script lang="ts">
export default {
  name: "HeartIcon",
};
</script>
