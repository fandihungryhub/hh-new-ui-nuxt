<template>
  <div>
    {{ a }}

    {{ b }}
  </div>
</template>
<script lang="ts" setup>
import { stripHtmlTag } from "~/helpers/string";
const a = "test string";
const b = stripHtmlTag("<div>TEST</div>");
</script>
