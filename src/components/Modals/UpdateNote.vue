<template>
  <div class="modal" :class="'modal--' + themeSurfaces" @dblclick="closeModal">
    <div
      class="note-update-modal"
      :class="'note-update-modal--' + themeSurfaces"
    >
      <font-awesome-icon
        icon="times"
        class="form__icon-close"
        @click="closeModal"
      ></font-awesome-icon>
      <h2 class="note-update-modal__title">Edit the note</h2>
      <p
        class="note-update-modal__tip"
        :class="'note-update-modal__tip--' + themeSurfaces"
      >
        tip: you can leave empty fields, they won't leave an empty space.
      </p>
      <form
        class="note-update-form-paragraph"
        @submit.prevent="onSubmitParagraph"
        autocomplete="off"
        v-if="this.note.type === 'paragraph'"
      >
        <div class="note-update-form-paragraph__title">
          <label class="note-update-form-paragraph__label" for="title"
            >Title</label
          >
          <input
            class="note-update-form-paragraph__input"
            type="text"
            id="title"
            v-model="note.title"
            placeholder="New title"
          />
        </div>
        <div class="note-update-form-paragraph__text">
          <label class="note-update-form-paragraph__label" for="text"
            >Text
          </label>
          <textarea
            class="note-update-form-paragraph__input"
            type="text"
            id="text"
            v-model="note.paragraph"
            placeholder="New text"
          />
        </div>
        <p>Color</p>
        <div class="note-update-form-paragraph__color">
          <div class="radio-container">
            <label class="note-update-form-paragraph__label" for="pink"
              >Pink</label
            >
            <input
              class="note-update-form-paragraph__input"
              type="radio"
              id="pink"
              value="pink"
              v-model="note.color"
            />
          </div>
          <div class="radio-container">
            <label class="note-update-form-paragraph__label" for="yellow"
              >Yellow</label
            >
            <input
              class="note-update-form-paragraph__input"
              type="radio"
              id="yellow"
              value="yellow"
              v-model="note.color"
            />
          </div>
          <div class="radio-container">
            <label class="note-update-form-paragraph__label" for="blue"
              >Blue</label
            >
            <input
              class="note-update-form-paragraph__input"
              type="radio"
              id="blue"
              value="blue"
              v-model="note.color"
            />
          </div>
          <div class="radio-container">
            <label class="note-update-form-paragraph__label" for="orange"
              >Orange</label
            >
            <input
              class="note-update-form-paragraph__input"
              type="radio"
              id="orange"
              value="orange"
              v-model="note.color"
            />
          </div>
        </div>

        <button
          class="note-update-form-paragraph__button"
          type="submit"
          :class="'note-update-form-paragraph__button--' + themeSurfaces"
          :disabled="note === ''"
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
import { IBoard, INote } from "@/types/interfaces";

export default defineComponent({
  name: "UpdateNote",
  data() {
    return {
      note: {
        type: "",
        order: "",
        color: "",
        title: "",
        paragraph: "",
        list: [],
        file: "",
      },
    };
  },
  computed: {
    ...mapState(["userContent", "themeSurfaces", "idForModal"]),
  },
  methods: {
    ...mapActions([
      "updateNote",
      "setUpdateNoteModal",
      "setIdForModal",
      "getUserContent",
    ]),
    onSubmitParagraph() {
      const note = {
        color: this.note.color,
        title: this.note.title,
        paragraph: this.note.paragraph,
      };
      this.updateNote({ idNote: this.idForModal, updatedNote: note });
      this.closeModal();
    },
    closeModal() {
      this.setUpdateNoteModal(false);
      this.setIdForModal("");
    },
  },
  mounted() {
    this.note = {
      ...this.userContent.boards
        .filter(
          ({ notes }: IBoard) =>
            notes.filter(({ id }: INote) => id === this.idForModal).length !== 0
        )[0]
        .notes.filter(({ id }: INote) => id === this.idForModal)[0],
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
@import "@/styles/_extends";

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
    background-color: rgba(255, 255, 255, 0.7);

    input {
      color: $theme-dark-color;
    }
    textarea {
      color: $theme-dark-color;
    }
  }
  &--night-mode {
    background-color: rgba(0, 0, 0, 0.7);

    input {
      color: $theme-light-color;
    }
    textarea {
      color: $theme-light-color;
    }
  }
}

.note-update-modal {
  position: relative;
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;

  &--day-mode {
    background-color: $theme-light-color;
    color: $theme-dark-color;
    border: 2px solid $theme-dark-color-opacity;
  }
  &--night-mode {
    background-color: $theme-dark-color;
    color: $theme-light-color;
    border: 2px solid $theme-light-color-opacity;
  }

  &__title {
    margin-bottom: 0;
    font-weight: 400;
  }
  &__tip {
    padding: 0 40px;
    text-align: center;
    font-size: 13px;
    &--day-mode {
      color: $theme-dark-color-opacity;
    }
    &--night-mode {
      color: $theme-light-color-opacity;
    }
  }
  .note-update-form-paragraph {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
      margin-bottom: 20px;
    }
    &__text {
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      textarea {
        resize: none;
        height: 100px;
        width: 180px;
        border: 1px solid $theme-form-line;
        font-family: $Lato;
      }
      label {
        padding-right: 22px;
      }
    }
    p {
      color: $theme-pink;
    }
    &__color {
      margin: 0 0 25px 0;
      display: flex;
      flex-direction: column;

      .radio-container {
        height: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
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

  .form__icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
