<template>
  <article class="note">
    {{ note.id }}
  </article>
</template>
<script>
import { defineComponent } from "vue";
import { Note } from "@/types/interfaces";

export default defineComponent({
  name: "Note",
  props: { note: Note },
  methods: {
    log(event) {
      console.log(event);
    },
  },
});
</script>
<style lang="scss" scoped></style>
