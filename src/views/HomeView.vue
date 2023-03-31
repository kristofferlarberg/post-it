<script setup>
import { ref } from "vue";

import CloseIcon from "../components/CloseIcon.vue";

const notes = ref([{ id: Math.random(), text: "Note" }]);
const activeNote = ref({});

function newNote() {
  const note = { id: Math.random(), text: "" };
  notes.value.push(note);
  activeNote.value = note;
}

function saveNote() {
  notes.value.map((note) =>
    note.id === activeNote.value.id ? activeNote : note
  );
  activeNote.value = {};
}

function removeNote(note) {
  notes.value = notes.value.filter((t) => t !== note);
}

function editNote(note) {
  activeNote.value = note;
}
</script>

<template>
  <section class="m-8">
    <div class="my-12 flex flex-wrap gap-6">
      <div
        v-for="note in notes"
        :key="note.id"
        class="h-96 w-96 bg-black-primary p-3 text-lg text-white-secondary dark:bg-white-primary dark:text-black-primary"
      >
        <form v-if="activeNote.id === note.id" @submit.prevent="saveNote">
          <label class="hidden" for="note">Edit note</label>
          <textarea
            id="note"
            v-model="activeNote.text"
            class="h-80 w-full resize-none border-2 border-none bg-black-primary p-4 text-lg text-white-secondary dark:bg-white-primary dark:text-black-secondary"
            name="note"
            rows="5"
            cols="33"
            placeholder="This is you writing a note…"
          />
          <button
            class="absolute right-10 top-0 bg-black-primary text-white-secondary"
          >
            Save
          </button>
        </form>
        <div v-else class="break-words p-4">
          {{ note.text }}
          <button
            class="absolute right-12 top-0"
            aria-label="Edit note"
            @click="editNote(note)"
          >
            Edit
          </button>
        </div>
        <button
          class="absolute right-3 top-3 h-[30px] w-[30px]"
          aria-label="Remove note"
          @click="removeNote(note)"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
    <button
      class="mt-6 bg-black-primary px-6 py-4 text-lg text-white-secondary"
      @click="newNote"
    >
      Add note
    </button>
  </section>
</template>
