<template>
  <section class="board">
    <div class="board-header" :class="themeHeaders+'-headers'">
      <div class="board-header__top" @dblclick="onClickOpenModal">
        <h2 class="board-header__header">{{ board.name }}</h2>
        <font-awesome-icon
          icon="pencil-alt"
          class="form__icon-edit"
          @click="onClickOpenModal"
        ></font-awesome-icon>
        <font-awesome-icon
          icon="times"
          class="form__icon-close"
          @click="onClickDeleteBoard"
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

    <draggable class="board__draggable-area" :board="board">
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
import { mapActions, mapState } from "vuex";
import Note from "@/components/Board/Note.vue";

export default defineComponent({
  name: "Board",
  components: {
    draggable: VueDraggableNext,
    Note,
  },
  props: ["board"],
  data() {
    return {
      enabled: true,
      dragging: false,
    };
  },
  computed: {
    ...mapState(["themeHeaders", "themeSurfaces"]),
  },
  methods: {
    ...mapActions([
      "createParagraphNote",
      "deleteBoard",
      "editNameBoard",
      "setBoardEditModal",
      "setIdForModal",
    ]),
    onclickAddNote() {
      this.createParagraphNote(this.board.id);
    },
    onClickOpenModal() {
      this.setBoardEditModal(true);
      this.setIdForModal(this.board.id);
    },
    onClickDeleteBoard() {
      this.deleteBoard(this.board.id);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/_variables";
@import "@/styles/_extends";

.board {
  width: 280px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 480px) {
    width: 100%;
    margin: 0;
  }

  .board-header {
    width: 280px;
    margin: 0 10px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media only screen and (max-width: 480px) {
      width: 92%;
    }

    &__header {
      margin: 0;
      padding: 5px 0;
      text-align: center;
      font-family: $heading-home;
      font-weight: 200;
      font-size: 20px;
    }
    &__top {
      width: 100%;
      position: relative;
      .form__icon-close {
        display: none;
        position: absolute;
        right: 13px;
        top: 9px;
        font-size: 20px;
        cursor: pointer;
        @media only screen and (max-width: 720px) {
          display: block;
        }
      }
      .form__icon-edit {
        display: none;
        position: absolute;
        left: 12px;
        top: 11px;
        font-size: 13.75px;
        cursor: pointer;
        @media only screen and (max-width: 720px) {
          display: block;
        }
      }
    }

    &__buttons {
      display: none;
      justify-content: center;
      padding-bottom: 5px;
      @media only screen and (max-width: 720px) {
        display: block;
      }
    }

    &:hover {
      .board-header__buttons {
        display: block;
      }
      .form__icon-close {
        display: block;
      }
      .form__icon-edit {
        display: block;
      }
    }

    &__button {
      @extend %button--little;
    }
  }

  &__draggable-area {
    width: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.day-mode-headers {
  background-color: $theme-light-color-night-mode;
  color: $theme-dark-color;
}
.night-mode-headers {
  background-color: $theme-dark-color-day-mode;
  color: $theme-light-color;
}
</style>
