<template>
  <section class="board">
    <div class="board-header">
      <div class="board-header__top">
        <h3 class="board-header__header">{{ board.name }}</h3>
        <font-awesome-icon
          icon="times"
          class="form__icon-close"
        ></font-awesome-icon>
      </div>
      <div class="board-header__buttons">
        <button
          type="button"
          class="board-header__button board-header__button--note"
          @click="onclickAddNote"
        >
          Add Note
        </button>
        <button
          type="button"
          class="board-header__button board-header__button--image"
        >
          Add Image
        </button>
      </div>
    </div>

    <draggable class="board__draggable-area" :board="board" @change="log">
      <Note
        v-for="note in board.notes"
        :note="note"
        :idBoard="board.id"
        :key="note.id"
      />
    </draggable>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { mapActions } from "vuex";
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
    ...mapActions(["createParagraphNote"]),
    log(event) {
      console.log(event);
    },
    onclickAddNote() {
      this.createParagraphNote(this.board.id);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/_variables";
@import "@/styles/_extends";

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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__header {
      margin: 0;
      font-family: "Fredericka the Great", cursive;
      font-weight: 100;
      font-size: 24px;
      padding-left: 20px;
    }
    &__top {
      width: 100%;
      position: relative;
      .form__icon-close {
        display: none;
        position: absolute;
        right: 5px;
        top: 0;
        font-size: 30px;
      }
    }

    &__buttons {
      display: flex;
      justify-content: center;
      padding: 15px 0;
    }

    &__button {
      @extend %button;
      width: 100px;
      height: 33px;
      margin: 0 10px;
      border-radius: 10px;
      font-size: 16px;
      letter-spacing: 0.05em;
    }
  }
  &:hover {
    .form__icon-close {
      display: block;
    }
  }
}
</style>
