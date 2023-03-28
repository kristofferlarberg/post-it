<script>
import CloseIcon from "../components/CloseIcon.vue";

export default {
  components: {
    CloseIcon,
  },
  data() {
    return {
      notes: [
        { id: Math.random(), text: "Note" },
        { id: Math.random(), text: "Note again" },
        { id: Math.random(), text: "Note some more" },
      ],
      activeNote: {},
    };
  },
  methods: {
    addNote() {
      const newNote = { id: Math.random(), text: "" };
      this.notes.push(newNote);
      this.activeNote = newNote;
    },
    updateNote() {
      this.notes.find((note) => note.id === this.activeNote);
      this.activeNote = {};
    },
    removeNote(note) {
      this.notes = this.notes.filter((t) => t !== note);
    },
    editNote(note) {
      this.activeNote = note;
    },
  },
};
</script>

<template>
  <section class="m-8">
    <div class="my-12 flex flex-wrap gap-6">
      <div
        v-for="note in notes"
        :key="note.id"
        class="h-96bg-black-primary w-96 p-3 text-lg text-white-secondary dark:bg-white-primary dark:text-black-primary"
      >
        <form v-if="activeNote.id === note.id" @submit.prevent="updateNote">
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
      @click="addNote"
    >
      Add note
    </button>
  </section>
</template>
