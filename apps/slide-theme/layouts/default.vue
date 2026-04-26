<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import "../styles/index.css";

const props = defineProps<{
  /** Optional small uppercase label above the title */
  eyebrow?: string;
  /** When true, swap to the inverse (dark) palette + white-filled brand mark */
  inverse?: boolean;
  /** Hide the brand mark in the bottom-right corner */
  hideBrand?: boolean;
}>();

// Slidev exposes the current slide frontmatter via useSlideContext.
const ctx = useSlideContext();
const eyebrow = computed(() => props.eyebrow ?? (ctx.$frontmatter?.eyebrow as string | undefined));
const isInverse = computed(() => Boolean(props.inverse ?? ctx.$frontmatter?.inverse));
const hideBrand = computed(() => Boolean(props.hideBrand ?? ctx.$frontmatter?.hideBrand));

const markSrc = computed(() => (isInverse.value ? "/matters-mark-white-filled.svg" : "/matters-mark-color.svg"));
</script>

<template>
  <div class="slidev-layout matters-default" :class="{ 'is-inverse': isInverse }">
    <div v-if="eyebrow" class="matters-default__eyebrow">{{ eyebrow }}</div>
    <hr class="matters-default__rule" />
    <div class="matters-default__body">
      <slot />
    </div>
    <div v-if="!hideBrand" class="matters-brand-mark" aria-hidden="true">
      <img :src="markSrc" alt="" />
      <span>Matters</span>
    </div>
  </div>
</template>
