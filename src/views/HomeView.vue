<script setup>
import { ref } from "vue";
import TextEditor from "../components/TextEditor.vue";

const notes = ref([]);

function newNote() {
  const note = { id: Math.random(), text: "" };
  notes.value.push(note);
}

function removeNote(note) {
  notes.value = notes.value.filter((el) => el !== note);
  console.log(notes.value);
}
</script>

<template>
  <section class="m-8">
    <div class="my-12 flex flex-wrap gap-6">
      <TextEditor
        v-for="note in notes"
        :key="note.id"
        v-model="note.text"
        @remove-note="removeNote(note)"
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
