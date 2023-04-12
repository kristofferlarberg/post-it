<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ref, watch } from "vue";

import CloseIcon from "./CloseIcon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  active: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue", "remove-note", "toggle-active"]);

const isImage = ref(false);

const editor = useEditor({
  editable: props.active,
  content: props.modelValue,
  extensions: [StarterKit, Image],
  autofocus: true,
  onUpdate: ({ editor }) => {
    if (editor.getHTML().length > 0);
    {
      isImage.value = false;
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
    if (!isImage.value) isImage.value = true;
    saveNote();
  }
}
</script>

<template>
  <div
    class="bg-black-primary px-2 pt-14 pb-2 text-lg text-white-secondary dark:bg-white-primary dark:text-black-secondary"
  >
    <editor-content
      :editor="editor"
      class="first:min-h-96 first:w-96 first:p-0.5"
    />
    <button
      class="absolute right-24 top-0 bg-black-primary text-white-secondary"
      @click="handleImageInput"
    >
      setImage
    </button>
    <button
      v-if="!isImage"
      class="absolute right-10 top-0 bg-black-primary text-white-secondary"
      @click="handleTextInput"
    >
      {{ active ? "Save" : "Edit" }}
    </button>
    <button
      class="absolute right-3 top-3 h-[30px] w-[30px]"
      aria-label="Remove note"
      @click="$emit('remove-note')"
    >
      <CloseIcon />
    </button>
  </div>
</template>
