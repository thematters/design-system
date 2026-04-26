<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import "../styles/index.css";

const props = defineProps<{
  /** URL/path of the background image (also accepts `image` from frontmatter) */
  image?: string;
  /** Optional uppercase eyebrow above the title */
  eyebrow?: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Hide the brand mark in the bottom-right corner */
  hideBrand?: boolean;
}>();

const ctx = useSlideContext();
const fm = ctx.$frontmatter ?? {};
const image = computed(() => props.image ?? (fm.image as string | undefined));
const eyebrow = computed(() => props.eyebrow ?? (fm.eyebrow as string | undefined));
const subtitle = computed(() => props.subtitle ?? (fm.subtitle as string | undefined));
const hideBrand = computed(() => Boolean(props.hideBrand ?? fm.hideBrand));

const bg = computed(() => (image.value ? { backgroundImage: `url(${image.value})` } : {}));
</script>

<template>
  <div class="slidev-layout matters-full-image is-inverse" :style="bg">
    <div class="matters-full-image__scrim" />
    <div class="matters-full-image__content">
      <div v-if="eyebrow" class="matters-full-image__eyebrow">{{ eyebrow }}</div>
      <h1 class="matters-full-image__title">
        <slot />
      </h1>
      <p v-if="subtitle" class="matters-full-image__subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="!hideBrand" class="matters-brand-mark" aria-hidden="true">
      <img src="/matters-mark-white-filled.svg" alt="" />
      <span>Matters</span>
    </div>
  </div>
</template>
