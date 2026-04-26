<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import "../styles/index.css";

const props = defineProps<{
  /** Small uppercase label above the title (e.g. "PRODUCT PITCH · 2026") */
  eyebrow?: string;
  /** Optional subtitle paragraph below the big title */
  subtitle?: string;
  /** Optional meta line in the bottom-left (date, author, version) */
  meta?: string;
  /** Use inverse (black background) variant */
  inverse?: boolean;
  /** Hide brand mark */
  hideBrand?: boolean;
}>();

const ctx = useSlideContext();
const fm = ctx.$frontmatter ?? {};
const eyebrow = computed(() => props.eyebrow ?? (fm.eyebrow as string | undefined));
const subtitle = computed(() => props.subtitle ?? (fm.subtitle as string | undefined));
const meta = computed(() => props.meta ?? (fm.meta as string | undefined));
const isInverse = computed(() => Boolean(props.inverse ?? fm.inverse));
const hideBrand = computed(() => Boolean(props.hideBrand ?? fm.hideBrand));

const markSrc = computed(() => (isInverse.value ? "/matters-mark-white-filled.svg" : "/matters-mark-color.svg"));
</script>

<template>
  <div class="slidev-layout matters-cover" :class="{ 'is-inverse': isInverse }">
    <div v-if="eyebrow" class="matters-cover__eyebrow">{{ eyebrow }}</div>
    <h1 class="matters-cover__title">
      <slot />
    </h1>
    <p v-if="subtitle" class="matters-cover__subtitle">{{ subtitle }}</p>
    <div v-if="meta" class="matters-cover__meta">{{ meta }}</div>
    <div v-if="!hideBrand" class="matters-brand-mark" aria-hidden="true">
      <img :src="markSrc" alt="" />
      <span>Matters</span>
    </div>
  </div>
</template>
