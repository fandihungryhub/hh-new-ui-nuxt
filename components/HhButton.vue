<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
  rounded?: boolean;
  block?: boolean;
  outlined?: boolean;
  loadingText?: string;
  color?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "submit",
  loadingText: "please wait",
  textColor: "white",
  color: "red-dark",
});

const classes = computed(() => {
  interface ClassButton {
    defaultClass: string;
    bgColor: string;
    textColor: string;
    rounded: string;
    outlined: string;
    icon: string;
    block: string;
  }
  const classButton: ClassButton = {
    defaultClass:
      "py-1 px-2 rounded-md text-center text-sm shadow-lg  transition-all cursor-pointer",
    bgColor: `bg-${props.color}`,
    textColor: `text-${props.textColor}`,
    rounded: "",
    outlined: "",
    icon: "",
    block: "",
  };
  if (props.block) {
    classButton.block = "w-full block";
  }
  if (props.rounded) {
    classButton.rounded = "!rounded-full !px-3";
  }

  if (props.outlined) {
    classButton.outlined = `hh-outlined border border-${props.color}`;
    classButton.bgColor = "bg-white";
    classButton.textColor = `text-${props.color}`;
  }

  if (props.icon) {
    classButton.icon = "flex justify-center items-center";
  }
  const classes = Object.values(classButton);
  return classes;
});
</script>

<template>
  <button class="hh-button" :disabled="props.disabled" :class="classes">
    <template v-if="!loading">
      <slot>Click Me </slot>
    </template>
    <template v-else>
      <slot name="loader">
        {{ loadingText }}
      </slot>
    </template>
  </button>
</template>
<style lang="scss" scoped>
.hh-button {
  &:disabled {
    @apply text-white cursor-not-allowed bg-gray-500;
  }

  &:hover {
    @apply transition-all;
    filter: brightness(1.06);
  }
  &.hh-outlined {
    &:hover {
      @apply transition-all;
      filter: brightness(0.95);
    }
  }
}
</style>
