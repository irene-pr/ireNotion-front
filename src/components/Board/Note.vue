<template>
  <article class="note">
    {{ note.id }}
  </article>
</template>
<script>
import { defineComponent } from "vue";
import { INote } from "@/types/interfaces";

export default defineComponent({
  name: "Note",
  props: { note: INote },
  methods: {
    log(event) {
      console.log(event);
    },
  },
});
</script>
<style lang="scss" scoped></style>
