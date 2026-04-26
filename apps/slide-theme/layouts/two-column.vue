<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import "../styles/index.css";

const props = defineProps<{
  /** Optional eyebrow shown above the title */
  eyebrow?: string;
  /** Optional title spanning both columns */
  title?: string;
  inverse?: boolean;
  hideBrand?: boolean;
}>();

const ctx = useSlideContext();
const fm = ctx.$frontmatter ?? {};
const eyebrow = computed(() => props.eyebrow ?? (fm.eyebrow as string | undefined));
const title = computed(() => props.title ?? (fm.title as string | undefined));
const isInverse = computed(() => Boolean(props.inverse ?? fm.inverse));
const hideBrand = computed(() => Boolean(props.hideBrand ?? fm.hideBrand));

const markSrc = computed(() => (isInverse.value ? "/matters-mark-white-filled.svg" : "/matters-mark-color.svg"));
</script>

<template>
  <div class="slidev-layout matters-two-column" :class="{ 'is-inverse': isInverse }">
    <div v-if="eyebrow" class="matters-two-column__eyebrow">{{ eyebrow }}</div>
    <h2 v-if="title" class="matters-two-column__title">{{ title }}</h2>
    <div class="matters-two-column__col">
      <slot name="left" />
    </div>
    <div class="matters-two-column__col">
      <slot name="right" />
    </div>
    <div v-if="!hideBrand" class="matters-brand-mark" aria-hidden="true">
      <img :src="markSrc" alt="" />
      <span>Matters</span>
    </div>
  </div>
</template>
