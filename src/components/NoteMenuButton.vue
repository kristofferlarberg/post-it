<script setup>
const props = defineProps({
  ariaLabel: { type: String, default: "" },
});

defineEmits(["handleClick"]);
</script>

<template>
  <button
    class="h-[30px] w-[30px]"
    :aria-label="props.ariaLabel"
    @click="$emit('handleClick')"
  >
    <slot />
  </button>
</template>
