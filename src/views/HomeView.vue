<script setup>
import { ref } from "vue";
import TextEditor from "../components/TextEditor.vue";

const notes = ref([]);
const activeNote = ref(0);

function newNote() {
  const note = { id: Math.random(), text: "" };
  notes.value.push(note);
  activeNote.value = note.id;
}

function removeNote(note) {
  activeNote.value = 0;
  notes.value = notes.value.filter((el) => el !== note);
}

function toggleActive(note) {
  if (activeNote.value === note.id) activeNote.value = 0;
  else activeNote.value = note.id;
}
</script>

<template>
  <section class="m-8">
    <div class="my-12 flex flex-wrap gap-6">
      <TextEditor
        v-for="note in notes"
        :key="note.id"
        v-model="note.text"
        :active="activeNote === note.id"
        @remove-note="removeNote(note)"
        @toggle-active="toggleActive(note)"
      />
    </div>
    <button
      class="mt-6 bg-black-primary px-6 py-4 text-lg text-white-secondary"
      @click="newNote"
    >
      Add note
    </button>
  </section>
</template>
