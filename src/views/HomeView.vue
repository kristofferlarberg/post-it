<script>
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
  <main>
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.text }}
        <button @click="removeNote(note)">X</button>
      </li>
    </ul>
    <form @submit.prevent="addNote">
      <input v-model="newNote" />
      <button>Add note</button>
    </form>
  </main>
</template>
