<script>
import CloseIcon from "../components/CloseIcon.vue";

export default {
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
  components: {
    CloseIcon,
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
      <div v-for="note in notes" :key="note.id"
        class="h-96 w-96 bg-black-primary p-3 text-lg text-white-secondary dark:bg-white-primary dark:text-black-primary">
        <form v-if="activeNote.id === note.id" @submit.prevent="updateNote">
          <label class="hidden" for="note">Edit note</label>
          <textarea v-model="activeNote.text"
            class="resize-none h-80 w-full border-2 p-4 text-lg text-white-secondary dark:text-black-secondary bg-black-primary dark:bg-white-primary border-none"
            id="note" name="note" rows="5" cols="33" placeholder="This is you writing a note…" />
          <button class="absolute right-10 top-0 bg-black-primary text-white-secondary">
            Save
          </button>
        </form>
        <div v-else class="p-4 break-words">
          {{ note.text }}
          <button @click="editNote(note)" class="absolute right-12 top-0" aria-label="Edit note">
            Edit
          </button>
        </div>
        <button @click="removeNote(note)" class="absolute right-3 top-3 h-[30px] w-[30px]" aria-label="Remove note">
          <CloseIcon />
        </button>
      </div>
    </div>
    <button @click="addNote" class="mt-6 bg-black-primary px-6 py-4 text-lg text-white-secondary">
      Add note
    </button>
  </section>
</template>
