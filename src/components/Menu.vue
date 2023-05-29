<script setup>
import DeleteIcon from "./icons/DeleteIcon.vue";
import SaveTextIcon from "./icons/SaveTextIcon.vue";
import EditTextIcon from "./icons/EditTextIcon.vue";
import ImageIcon from "./icons/ImageIcon.vue";
import DeleteContentIcon from "./icons/DeleteContentIcon.vue";
import MenuButton from "./MenuButton.vue";

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
      <MenuButton
        v-if="props.contentType !== 'text'"
        aria-label="Add image to note"
        @handle-click="$emit('handleImageInput')"
      >
        <ImageIcon />
      </MenuButton>
      <MenuButton
        v-if="
          (props.contentType !== 'image' && active) || (!contentType && active)
        "
        aria-label="Save note"
        @handle-click="$emit('handleTextInput')"
      >
        <SaveTextIcon v-if="active" />
      </MenuButton>
      <MenuButton
        v-if="
          (props.contentType !== 'image' && !active) ||
          (!contentType && !active)
        "
        aria-label="Edit note text"
        @handle-click="$emit('handleTextInput')"
      >
        <EditTextIcon />
      </MenuButton>
    </div>
    <MenuButton
      v-if="props.contentType"
      aria-label="Remove content from note"
      @handle-click="$emit('resetNote')"
    >
      <DeleteContentIcon />
    </MenuButton>
    <MenuButton aria-label="Remove note" @handle-click="$emit('removeNote')">
      <DeleteIcon class="h-[30px] w-[30px]" />
    </MenuButton>
  </div>
</template>
