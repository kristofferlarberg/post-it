<script>
import CloseIcon from "../components/CloseIcon.vue";

let id = 0;

export default {
  data() {
    return {
      newNote: "",
      notes: [
        { id: id++, text: "Note" },
        { id: id++, text: "Note again" },
        { id: id++, text: "Note some more" },
      ],
    };
  },
  components: {
    CloseIcon,
  },
  methods: {
    addNote() {
      this.notes.push({ id: id++, text: this.newNote, done: false });
      this.newNote = "";
    },
    removeNote(note) {
      this.notes = this.notes.filter((t) => t !== note);
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
        class="h-96 w-96 bg-black-primary p-3 text-lg text-white-secondary dark:bg-white-primary dark:text-black-primary"
      >
        {{ note.text }}
        <button
          @click="removeNote(note)"
          class="absolute right-3 top-3 h-[30px] w-[30px]"
          aria-label="Remove note"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  </section>
  <section class="p-8">
    <form @submit.prevent="addNote">
      <label class="hidden" for="note">Add a note</label>
      <textarea
        v-model="newNote"
        class="h-96 w-full border-2 p-3 text-lg text-black-primary"
        id="note"
        name="note"
        rows="5"
        cols="33"
        placeholder="This is you writing a note…"
      ></textarea>
      <button
        class="mt-6 bg-black-primary px-6 py-4 text-lg text-white-secondary"
      >
        Add note
      </button>
    </form>
  </section>
</template>
