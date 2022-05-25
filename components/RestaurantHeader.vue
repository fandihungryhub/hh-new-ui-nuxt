<template>
  <div class="px-3">
    <div class="flex justify-between py-3 border-b border-gray-200">
      <span class="font-black">{{ name }}</span>
      <div>
        <span class="p-2 text-xs bg-yellow-200 rounded-md">{{ reviewScore }}</span>
      </div>
    </div>

    <div class="py-3 border-b border-gray-200">
      <div class="mb-1 text-sm">Information</div>
      <div class="flex text-xs">
        <div class="flex items-center mr-2">
          <span class="icon-placeholder"></span>
          <span>{{ location }}</span>
        </div>

        <div class="flex items-center mr-2">
          <span class="icon-placeholder"></span>
          <span>{{ cuisine }}</span>
        </div>

        <div class="flex items-center">
          <span class="icon-placeholder"></span>
          <span>{{ openingHour }}</span>
        </div>
      </div>
    </div>

    <div class="py-3 text-xs text-blue-500" v-if="isHaveBranch">
      <a href="">View Other Branch</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  reviewCount: {
    type: Number,
    required: true
  },
  reviewScore: {
    type: Number,
    required: true
  },
  location: {
    tyepe: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  openingHour: {
    type: String,
    required: true
  },
  branchId: {
    type: Number,
    required: true
  }
});

const isHaveBranch = typeof props.branchId === 'number' && props.branchId > 0 ? true : false;

onMounted(() => {
  console.log('res header on mounted');
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'RestaurantHeader',
  mounted() {
    console.log('BARRA');
  }
});
</script>
