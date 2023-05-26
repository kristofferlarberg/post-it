<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { onMounted, ref, watch } from "vue";

import Menu from "./Menu.vue";

const props = defineProps({
  content: { type: String, default: "" },
  active: { type: Boolean, default: true },
  contentType: { type: String, default: "" },
});

const emit = defineEmits([
  "update:content",
  "update:contentType",
  "removeNote",
  "toggleActive",
]);

const showMenu = ref(false);

const editor = useEditor({
  editable: props.active,
  content: props.content,
  extensions: [StarterKit, Image],
  autofocus: true,
  onUpdate: ({ editor }) => {
    if (editor.getHTML().length > 0) {
      if (editor.getHTML() === "<p></p>" || editor.getHTML() === '<img src="">')
        emit("update:contentType", "");
      else if (editor.getHTML().startsWith("<img src=")) {
        emit("update:contentType", "image");
      } else if (editor.getHTML().startsWith("<p>")) {
        emit("update:contentType", "text");
      } else return;
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
  emit("toggleActive");
}

function saveNote() {
  if (props.content === editor.value.getHTML()) return;
  else if (!props.content && editor.value.getHTML() === "<p></p>") {
    emit("removeNote");
  } else emit("update:content", editor.value.getHTML());
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
  } else if (!url) {
    if (!props.content) emit("removeNote");
  } else return;
}

function resetNote() {
  editor.value.commands.clearContent();
  emit("update:contentType", "");
  emit("update:content", "<p></p>");
  if (props.active) toggleEditable();
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
    @mouseenter="showMenu = true"
    @mouseleave="showMenu = false"
    @focusin="showMenu = true"
    @focusout="showMenu = false"
  >
    <editor-content :editor="editor" />
    <Menu
      :show-menu="showMenu"
      :content-type="contentType"
      :active="props.active"
      @handle-text-input="handleTextInput"
      @handle-image-input="handleImageInput"
      @reset-note="resetNote"
      @remove-note="$emit('removeNote')"
    />
  </div>
</template>
