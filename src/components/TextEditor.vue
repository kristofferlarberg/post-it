<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, watch } from "vue";

import CloseIcon from "./CloseIcon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  active: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue", "remove-note", "set-active"]);

const statusButtonValue = ref("Save");

const editor = useEditor({
  editable: props.active,
  content: props.modelValue,
  extensions: [StarterKit],
  autofocus: true,
});

watch(
  () => props.active,
  (active) => {
    editor.value.setEditable(active);
    statusButtonValue.value = active ? "Save" : "Edit";
  }
);

function setActive() {
  if (!props.active) {
    emit("set-active");
    editor.value.commands.focus();
  }
}

function saveValue() {
  if (props.modelValue === editor.value.getHTML()) return;
  else emit("update:modelValue", editor.value.getHTML());
}

function toggleEditable() {
  setActive();
  saveValue();
}
</script>

<template>
  <div
    class="h-96 w-96 bg-black-primary p-3 text-lg text-white-secondary dark:bg-white-primary dark:text-black-primary"
  >
    <editor-content
      :editor="editor"
      class="p-4 text-lg text-white-secondary dark:text-black-secondary"
    />
    <button
      v-if="editor"
      class="absolute right-10 top-0 bg-black-primary text-white-secondary"
      @click="toggleEditable"
    >
      {{ statusButtonValue }}
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
