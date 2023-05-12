<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ref, watch } from "vue";

import CloseIcon from "./CloseIcon.vue";
import SaveIcon from "./SaveIcon.vue";
import EditIcon from "./EditIcon.vue";
import ImageIcon from "./ImageIcon.vue";
import DeleteContentIcon from "./DeleteContentIcon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  active: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue", "remove-note", "toggle-active"]);

const contentType = ref("");
const showMenu = ref(false);

const editor = useEditor({
  editable: props.active,
  content: props.modelValue,
  extensions: [StarterKit, Image],
  autofocus: true,
  onUpdate: ({ editor }) => {
    if (editor.getHTML().length > 0) {
      if (editor.getHTML().includes("<img src=")) {
        contentType.value = "image";
      } else if (editor.getHTML() === "<p></p>") {
        contentType.value = "";
      } else contentType.value = "text";
    }
  },
});

watch(
  () => props.active,
  (active) => {
    editor.value.setEditable(active);
    editor.value.commands.focus();
  }
);

function toggleEditable() {
  emit("toggle-active");
}

function saveNote() {
  if (props.modelValue === editor.value.getHTML()) return;
  else emit("update:modelValue", editor.value.getHTML());
}

function handleTextInput() {
  toggleEditable();
  saveNote();
}

function handleImageInput() {
  const url = window.prompt("URL");

  if (url) {
    editor.value.commands.clearContent();
    editor.value.chain().focus().setImage({ src: url }).run();
    if (props.active) toggleEditable();
    saveNote();
  }
}

function resetNote() {
  editor.value.commands.clearContent();
  contentType.value = "";
  if (!props.active) toggleEditable();
  editor.value.commands.focus();
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <div
    class="bg-black-primary px-2 pt-14 pb-2 text-lg text-white-secondary dark:bg-white-primary dark:text-black-secondary"
    @mouseenter="toggleMenu"
    @mouseleave="toggleMenu"
    @focusin="showMenu = true"
  >
    <editor-content
      :editor="editor"
      :class="[
        contentType === 'image' ? 'first:w-auto first:min-w-96' : 'first:w-96',
        'p-0.5',
      ]"
    />
    <div
      v-if="showMenu"
      class="absolute right-2 top-2 left-3 flex justify-between"
    >
      <div class="flex gap-3">
        <button
          v-if="contentType !== 'text'"
          class="h-[30px] w-[30px]"
          aria-label="Add image to note"
          @click="handleImageInput"
        >
          <ImageIcon />
        </button>
        <button
          v-if="(contentType === 'text' && active) || (!contentType && active)"
          class="h-[30px] w-[30px]"
          aria-label="Save note"
          @click="handleTextInput"
        >
          <SaveIcon v-if="active" />
        </button>
        <button
          v-if="
            (contentType === 'text' && !active) || (!contentType && !active)
          "
          class="h-[30px] w-[30px]"
          aria-label="Edit note"
          @click="handleTextInput"
        >
          <EditIcon />
        </button>
      </div>

      <button
        v-if="contentType"
        class="h-[30px] w-[30px]"
        aria-label="Remove image from note"
        @click="resetNote"
      >
        <DeleteContentIcon />
      </button>
      <button
        class="h-[30px] w-[30px]"
        aria-label="Remove note"
        @click="$emit('remove-note')"
        @focusout="showMenu = false"
      >
        <CloseIcon class="h-[30px] w-[30px]" />
      </button>
    </div>
  </div>
</template>
