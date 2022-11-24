<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border rounded bg-white"
  >
    <span class="mr-8 text-2xl font-bold">
      <slot name="title"></slot>
    </span>
    <div class="flex-grow overflow-y-auto">
      <slot :params="params"></slot>
    </div>
    <button class="absolute top-0 right-0 mt-2 mr-2" @click="close">
      <IconClose height="14" width="14" class="text-black fill-current" />
    </button>
  </vue-final-modal>
</template>

<script lang="ts" setup>
import { VueFinalModal } from "vue-final-modal";
import IconClose from "~icons/hh-icons/icon-close";
</script>

<script lang="ts">
export default {
  name: 'HhModal',
  inheritAttrs: false,
}
</script>