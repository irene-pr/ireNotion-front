<template>
  <div class="modal" :class="'modal--' + themeSurfaces" @dblclick="closeModal">
    <div class="board-edit-modal" :class="themeSurfaces">
      <h2 class="board-edit-modal__title">Edit the board name</h2>
      <form
        class="board-edit-form"
        @submit.prevent="onSubmit"
        autocomplete="off"
      >
        <div class="board-edit-form__name">
          <label class="board-edit-form__label" for="newBoardName">Name</label>
          <input
            class="board-edit-form__input"
            type="text"
            id="newBoardName"
            v-model="name"
            placeholder="New board name"
          />
        </div>
        <button
          class="board-edit-form__button"
          type="submit"
          :class="'board-edit-form__button--' + themeSurfaces"
          :disabled="name === ''"
        >
          Edit
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { IBoard } from "@/types/interfaces";

export default defineComponent({
  name: "BoardEdit",
  data() {
    return {
      name: "holi",
    };
  },
  computed: {
    ...mapState(["userContent", "themeSurfaces", "idForModal"]),
  },
  methods: {
    ...mapActions(["editNameBoard", "setBoardEditModal", "setIdForModal"]),
    onSubmit() {
      this.editNameBoard({ idBoard: this.idForModal, newName: this.name });
      this.closeModal();
    },
    closeModal() {
      this.setBoardEditModal(false);
      this.setIdForModal("");
    },
  },
  mounted() {
    this.name = this.userContent.boards.filter(
      ({ id }: IBoard) => id === this.idForModal
    )[0].name;
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
@import "@/styles/_extends";

.day-mode {
  background-color: $theme-light-color;
  color: $theme-dark-color;
}
.night-mode {
  background-color: $theme-dark-color;
  color: $theme-light-color;
}

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $Lato;

  &--day-mode {
    background-color: rgba(255, 255, 255, 0.5);

    input {
      color: $theme-dark-color;
    }
  }
  &--night-mode {
    background-color: rgba(0, 0, 0, 0.5);

    input {
      color: $theme-light-color;
    }
  }
}

.board-edit-modal {
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &__title {
    margin-bottom: 0;
    font-weight: 400;
  }
  .board-edit-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__name {
      margin: 25px 0;
    }
    &__label {
      padding-right: 20px;
    }
    &__input {
      height: 30px;
      padding-bottom: 0;
      border: none;
      border-bottom: 1px solid $theme-form-line;
      background-color: transparent;
      font-size: 14px;

      &:focus {
        outline: none;
        color: $theme-pink;
      }
    }

    &__button {
      @extend %button--little;
      margin-bottom: 10px;
      &--day-mode {
        background-color: rgba(255, 255, 255, 0.5);
        color: $theme-dark-color;
        border: 1px solid $theme-dark-color;
      }
      &--night-mode {
        background-color: rgba(0, 0, 0, 0.5);
        color: $theme-light-color;
        border: 1px solid $theme-light-color;
      }
    }
  }
}
</style>
