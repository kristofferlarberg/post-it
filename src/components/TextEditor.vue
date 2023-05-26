<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { onMounted, ref, watch } from "vue";

import DeleteIcon from "./icons/DeleteIcon.vue";
import SaveTextIcon from "./icons/SaveTextIcon.vue";
import EditTextIcon from "./icons/EditTextIcon.vue";
import ImageIcon from "./icons/ImageIcon.vue";
import DeleteContentIcon from "./icons/DeleteContentIcon.vue";

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
  emit("toggle-active");
}

function saveNote() {
  if (props.content === editor.value.getHTML()) return;
  else if (!props.content && editor.value.getHTML() === "<p></p>") {
    emit("remove-note");
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
    if (!props.content) emit("remove-note");
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
          @click="handleImageInput"
        >
          <ImageIcon />
        </button>
        <button
          v-if="
            (props.contentType !== 'image' && active) ||
            (!contentType && active)
          "
          class="h-[30px] w-[30px]"
          aria-label="Save note"
          @click="handleTextInput"
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
          @click="handleTextInput"
        >
          <EditTextIcon />
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
      >
        <DeleteIcon class="h-[30px] w-[30px]" />
      </button>
    </div>
  </div>
</template>
