<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { onMounted, ref, watch } from "vue";

import CloseIcon from "./CloseIcon.vue";
import SaveIcon from "./SaveIcon.vue";
import EditIcon from "./EditIcon.vue";
import ImageIcon from "./ImageIcon.vue";
import DeleteContentIcon from "./DeleteContentIcon.vue";

const props = defineProps({
  content: { type: String, default: "" },
  active: { type: Boolean, default: true },
  contentType: { type: String, default: "" },
});

const emit = defineEmits([
  "update:content",
  "update:contentType",
  "remove-note",
  "toggle-active",
]);

const showMenu = ref(false);

const editor = useEditor({
  editable: props.active,
  content: props.content,
  extensions: [StarterKit, Image],
  autofocus: true,
  onUpdate: ({ editor }) => {
    if (editor.getHTML().length > 0) {
      if (editor.getHTML().includes("<img src=")) {
        emit("update:contentType", "image");
      } else if (editor.getHTML() === "<p></p>") {
        emit("update:contentType", "");
      } else emit("update:contentType", "text");
    }
  },
});

onMounted(() => {
  if (props.contentType === "image" && props.active) handleImageInput();
});

watch(
  () => props.active,
  (active) => {
    editor.value.setEditable(active);
    editor.value.commands.focus();
    saveNote();
  }
);

function toggleEditable() {
  emit("toggle-active");
}

function saveNote() {
  if (props.content === editor.value.getHTML()) return;
  else emit("update:content", editor.value.getHTML());
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
  } else if (!url && !props.content) {
    emit("remove-note");
  } else return;
}

function resetNote() {
  editor.value.commands.clearContent();
  emit("update:contentType", "");
  emit("update:content", "");
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <div
    :class="[
      !props.contentType
        ? 'bg-violet-secondary'
        : 'bg-black-primary dark:bg-white-primary',
      props.contentType === 'image'
        ? 'max-h-screen overflow-hidden'
        : 'px-10 pt-12 pb-10',
      'text-lg text-white-secondary dark:text-black-secondary',
    ]"
    @mouseenter="toggleMenu"
    @mouseleave="toggleMenu"
    @focusin="showMenu = true"
  >
    <editor-content :editor="editor" />
    <div
      v-if="showMenu"
      class="absolute right-2 top-2 left-3 flex justify-between"
    >
      <div class="flex gap-3">
        <button
          v-if="props.contentType !== 'text'"
          class="h-[30px] w-[30px]"
          aria-label="Add image to note"
          @click="handleImageInput"
        >
          <ImageIcon />
        </button>
        <button
          v-if="
            (props.contentType === 'text' && active) || (!contentType && active)
          "
          class="h-[30px] w-[30px]"
          aria-label="Save note"
          @click="handleTextInput"
        >
          <SaveIcon v-if="active" />
        </button>
        <button
          v-if="
            (props.contentType !== 'image' && !active) ||
            (!contentType && !active)
          "
          class="h-[30px] w-[30px]"
          aria-label="Edit note"
          @click="handleTextInput"
        >
          <EditIcon />
        </button>
      </div>

      <button
        v-if="props.contentType"
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
