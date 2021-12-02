<template>
  <section class="">
    <draggable class="" :board="board" @change="log">
      <h2>This is board{{ board.name }}</h2>
      <Note v-for="note in board.notes" :note="note" v-bind:key="note.id" />
    </draggable>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import Note from "@/components/Board/Note.vue";
import { IBoard } from "@/types/interfaces";

export default defineComponent({
  name: "Board",
  components: {
    draggable: VueDraggableNext,
    Note,
  },
  props: { board: IBoard },
  data() {
    return {
      enabled: true,
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
