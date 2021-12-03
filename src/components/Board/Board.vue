<template>
  <section class="board">
    <h3>This is board{{ board.name }}</h3>
    <draggable class="board__draggable-area" :board="board" @change="log">
      <Note v-for="note in board.notes" :note="note" :key="note.id" />
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
<style lang="scss" scoped>
.board {
  max-width: 480px;
  padding: 15px;
  border: 2px red dotted;
  &__draggable-area {
    padding: 15px;
    border: 2px magenta dotted;
  }
}
</style>
