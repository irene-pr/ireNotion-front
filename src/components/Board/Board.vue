<template>
  <section class="board">
    <div class="board-header">
      <h3 class="board-header__header">{{ board.name }}</h3>
      <div class="board-header__buttons">
        <button class="board-header__button--note">Add Note</button>
        <button class="board-header__button--image">Add Image</button>
      </div>
    </div>

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
  max-width: 100%;
  width: min-content;
  padding: 15px;
  border: 2px red dotted;
  &__draggable-area {
    width: min-content;
    padding: 15px;
    border: 2px magenta dotted;
  }
  .board-header {
    display: flex;
    justify-content: space-between;
    &__header {
      margin: 0;
      font-family: "Fredericka the Great", cursive;
      font-weight: 100;
      font-size: 28px;
      padding-left: 20px;
    }
    &__buttons {
      display: flex;
      align-content: center;
    }
    &__button {
    }
  }
}
</style>
