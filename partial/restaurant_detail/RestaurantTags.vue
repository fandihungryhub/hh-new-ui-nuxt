<template>
  <div>
    <div class="flex flex-wrap items-center p-2 rounded-lg shadow">
      <a
        :href="linkSearchByTags(tag.id)"
        class="px-2 py-1 mr-1 text-xs text-gray-600 bg-gray-100 rounded-lg lg:text-base"
        v-for="tag in tags"
      >
        {{ tag.label }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { linkSearchByTags } from "~/helpers/restaurant";
type Props = {
  tags: {
    id: string | number;
    label: string;
  }[];
};

defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: "RestaurantTags",
};
</script>
