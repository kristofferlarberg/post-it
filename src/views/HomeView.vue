<script setup>
import { ref, watchEffect, onMounted } from "vue";
import NoteEditor from "../components/NoteEditor.vue";

const notes = ref([]);
const activeNote = ref(0);

onMounted(() => {
  if (JSON.parse(localStorage.getItem("notes"))) {
    notes.value = JSON.parse(localStorage.getItem("notes"));
  }
});

watchEffect(() => {
  if (notes.value.length > 0) {
    localStorage.setItem("notes", JSON.stringify(notes.value));
  }
});

function newNote(type) {
  const note = { id: Math.random(), content: "", contentType: type };
  notes.value.unshift(note);
  activeNote.value = note.id;
}

function removeNote(note) {
  activeNote.value = 0;
  notes.value = notes.value.filter((el) => el !== note);
  if (notes.value.length === 0) localStorage.clear();
}

function toggleActive(note) {
  if (activeNote.value === note.id) activeNote.value = 0;
  else activeNote.value = note.id;
}
</script>

<template>
  <div
    class="flex flex-col justify-between gap-4 px-8 pt-8 sm:flex-row sm:items-center"
  >
    <header>
      <h1>post-it</h1>
    </header>
    <nav class="flex gap-6">
      <button
        class="bg-black-primary px-6 py-4 text-lg text-white-secondary hover:bg-violet-primary dark:bg-white-primary dark:text-black-secondary"
        @click="newNote('text')"
      >
        Add text
      </button>
      <button
        class="bg-black-primary px-6 py-4 text-lg text-white-secondary hover:bg-violet-primary dark:bg-white-primary dark:text-black-secondary"
        @click="newNote('image')"
      >
        Add image
      </button>
    </nav>
  </div>
  <section class="m-8">
    <div
      class="my-12 grid grid-flow-row grid-cols-1 items-center gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      <NoteEditor
        v-for="note in notes"
        :key="note.id"
        v-model:content="note.content"
        v-model:content-type="note.contentType"
        :active="activeNote === note.id"
        @remove-note="removeNote(note)"
        @toggle-active="toggleActive(note)"
      />
    </div>
  </section>
</template>
