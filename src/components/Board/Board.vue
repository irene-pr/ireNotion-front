<template>
  <section class="board">
    <div class="board-header" :class="themeHeaders">
      <div class="board-header__top">
        <h3 class="board-header__header">{{ board.name }}</h3>
        <font-awesome-icon
          icon="pencil-alt"
          class="form__icon-edit"
          @click="onClickEditNameBoard"
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
    ...mapActions(["createParagraphNote", "deleteBoard", "editNameBoard"]),
    log(event) {
      console.log(event);
    },
    onclickAddNote() {
      this.createParagraphNote(this.board.id);
    },
    onClickEditNameBoard() {
      this.editNameBoard({ idBoard: this.board.id, newName: "Edited" });
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
  width: 360px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 480px) {
    margin: 0;
  }

  .board-header {
    width: 360px;
    margin: 0 10px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media only screen and (max-width: 480px) {
      width: 90%;
    }

    &__header {
      margin: 0;
      padding: 10px 0;
      text-align: center;
      font-family: "Fredericka the Great", cursive;
      font-weight: 100;
      font-size: 24px;
    }
    &__top {
      width: 100%;
      position: relative;
      .form__icon-close {
        display: none;
        position: absolute;
        right: 15px;
        top: 11px;
        font-size: 25px;
        cursor: pointer;
        @media only screen and (max-width: 720px) {
          display: block;
        }
      }
      .form__icon-edit {
        display: none;
        position: absolute;
        left: 15px;
        top: 14px;
        font-size: 17.18px;
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
      @extend %button;
      width: 100px;
      height: 33px;
      margin: 0 10px;
      border-radius: 10px;
      font-size: 16px;
      letter-spacing: 0.05em;
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

.day-mode {
  background-color: $theme-light-color;
  color: $theme-dark-color;
}
.night-mode {
  background-color: $theme-dark-color;
  color: $theme-light-color;
}
</style>
