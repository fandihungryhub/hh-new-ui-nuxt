<template>
  <div class="shadow">
    <div class="container py-2 mx-auto">
      <div class="flex items-center">
        <img
          src="@/assets/image/logo-new-full.png"
          width="90"
          height="50"
          alt="hh logo"
        />
        <div class="flex-grow w-full"></div>
        <transition
          v-show="showSeachBar"
          enter-active-class="transition duration-300 ease-in-out"
          enter-from-class="transform scale-x-0 translate-x-1/2 opacity-0"
          enter-to-class="transform scale-x-100 translate-x-0 opacity-100"
          leave-active-class="transition duration-300 ease-in-out"
          leave-from-class="transform scale-x-100 translate-x-0 opacity-100"
          leave-to-class="transform scale-x-0 translate-x-1/2 opacity-0"
          class="absolute inset-y-0 flex items-center h-8 space-x-2 bg-white rounded-l-full right-1/2"
        >
          <div>
            <input
              class="w-64 h-8 pr-6 text-sm border-0 border-b border-gray-300 focus:border-gray-400 focus:ring-0"
              type="text"
              placeholder="input search"
            />
          </div>
        </transition>
        <RiSearchLine />
        <SelectCity />
        <button
          class="flex-shrink-0 px-2 py-1 text-white rounded-lg bg-hh-red-dark"
          @click="showSeachBar = !showSeachBar"
        >
          Sign In/Register
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "#imports";
import RiArrowDownSLine from "~icons/ri/arrow-down-s-line";
import RiSearchLine from "~icons/ri/search-line";
import SelectCity from "./SelectCity.vue";

const showSeachBar = ref(false);
const a = "aaa";
const b = "aaa";
</script>

<script lang="ts">
export default {
  name: "Navbar",
};
</script>
