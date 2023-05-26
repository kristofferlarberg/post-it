<script setup>
import DeleteIcon from "./icons/DeleteIcon.vue";
import SaveTextIcon from "./icons/SaveTextIcon.vue";
import EditTextIcon from "./icons/EditTextIcon.vue";
import ImageIcon from "./icons/ImageIcon.vue";
import DeleteContentIcon from "./icons/DeleteContentIcon.vue";

const props = defineProps({
  showMenu: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  contentType: { type: String, default: "" },
});

defineEmits(["handleImageInput", "handleTextInput", "resetNote", "removeNote"]);
</script>

<template>
  <div
    :class="[
      !showMenu ? 'opacity-0' : 'opacity-100',
      'absolute right-2 top-2 left-3 flex justify-between',
    ]"
  >
    <div class="flex gap-3">
      <button
        v-if="props.contentType !== 'text'"
        class="h-[30px] w-[30px]"
        aria-label="Add image to note"
        @click="$emit('handleImageInput')"
      >
        <ImageIcon />
      </button>
      <button
        v-if="
          (props.contentType !== 'image' && active) || (!contentType && active)
        "
        class="h-[30px] w-[30px]"
        aria-label="Save note"
        @click="$emit('handleTextInput')"
      >
        <SaveTextIcon v-if="active" />
      </button>
      <button
        v-if="
          (props.contentType !== 'image' && !active) ||
          (!contentType && !active)
        "
        class="h-[30px] w-[30px]"
        aria-label="Edit note"
        @click="$emit('handleTextInput')"
      >
        <EditTextIcon />
      </button>
    </div>

    <button
      v-if="props.contentType"
      class="h-[30px] w-[30px]"
      aria-label="Remove image from note"
      @click="$emit('resetNote')"
    >
      <DeleteContentIcon />
    </button>
    <button
      class="h-[30px] w-[30px]"
      aria-label="Remove note"
      @click="$emit('removeNote')"
    >
      <DeleteIcon class="h-[30px] w-[30px]" />
    </button>
  </div>
</template>
