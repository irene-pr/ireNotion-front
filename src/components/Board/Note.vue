<template>
  <article
    class="note note-paragraph"
    :note="note"
    v-if="note.type === 'paragraph'"
    :class="note.color"
  >
    <h4 v-if="note.title">{{ note.title }}</h4>
    <p>{{ note.paragraph }}</p>
  </article>
  <article
    class="note note-image"
    :note="note"
    v-if="note.type === 'image'"
    :class="note.color"
  >
    <img :src="note.file" alt="" />
  </article>
</template>

<script>
import { defineComponent } from "vue";
import { INote } from "@/types/interfaces";

// <pre>{{ JSON.stringify(note, null, 2) }}</pre>
export default defineComponent({
  name: "Note",
  props: { note: INote },
});
</script>
<style lang="scss" scoped>
@import "@/styles/_variables";

.note {
  width: 360px;
  margin: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  font-family: $Lato;
  * {
    margin: 0;
  }

  &-paragraph {
    word-wrap: break-word;
    h4 {
      padding: 0 0 10px 10px;
      font-family: $hand-writing;
      font-weight: bold;
      font-size: 26px;
    }
    p {
      font-family: $hand-writing;
      font-size: 18px;
      font-weight: 100;
    }
  }
  &-image {
    padding: 0;
    img {
      object-fit: contain;
    }
  }
}
.orange {
  background-color: $note-orange;
  color: black;
}
.blue {
  background-color: $note-blue;
  color: white;
}
.pink {
  background-color: $note-pink;
  color: white;
}
.yellow {
  background-color: $note-yellow;
  color: black;
}
</style>
