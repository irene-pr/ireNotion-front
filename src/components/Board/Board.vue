<template>
  <section class="flex m-10">
    <draggable class="dragArea list-group w-full" :board="board" @change="log">
      <Note v-for="note in board" :note="note" v-bind:key="note.id" />
    </draggable>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import Note from "@/components/Board/Note.vue";

export default defineComponent({
  name: "Board",
  components: {
    draggable: VueDraggableNext,
    Note,
  },
  data() {
    return {
      enabled: true,
      board: [
        { type: "paragraph", id: 1 },
        { type: "paragraph", id: 2 },
        { type: "paragraph", id: 3 },
        { type: "paragraph", id: 4 },
      ],
      dragging: false,
    };
  },
  methods: {
    log(event) {
      console.log(event);
    },
  },
});
</script>
