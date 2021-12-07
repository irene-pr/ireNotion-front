<template>
  <article
    class="note note-paragraph"
    :note="note"
    v-if="note.type === 'paragraph'"
    :class="note.color"
    @dblclick="onClickOpenModal"
  >
    <font-awesome-icon
      icon="pencil-alt"
      class="form__icon-update"
      @click="onClickOpenModal"
    ></font-awesome-icon>
    <font-awesome-icon
      icon="times"
      class="form__icon-close"
      @click="onClickDelete"
    ></font-awesome-icon>
    <h4 v-if="note.title !== ''">{{ note.title }}</h4>
    <p v-if="note.paragraph !== ''">{{ note.paragraph }}</p>
  </article>
  <article
    class="note note-image"
    :note="note"
    v-if="note.type === 'image'"
    :class="note.color"
  >
    <font-awesome-icon
      icon="times"
      class="form__icon-close"
    ></font-awesome-icon>
    <img :src="note.file" alt="" />
  </article>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "Note",
  props: ["note", "idBoard"],
  methods: {
    ...mapActions([
      "deleteNote",
      "updateNote",
      "setUpdateNoteModal",
      "setIdForModal",
    ]),
    onClickDelete() {
      const params = `${this.idBoard}/${this.note.id}`;
      this.deleteNote(params);
    },
    onClickOpenModal() {
      this.setUpdateNoteModal(true);
      this.setIdForModal(this.note.id);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/_variables";

.note {
  * {
    margin: 0;
  }

  position: relative;
  width: 100%;
  padding: 25px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  font-family: $Lato;
  box-shadow: 0px 5px 7px -4px black;

  @media only screen and (max-width: 480px) {
    width: 90%;
  }

  &-paragraph {
    word-wrap: break-word;
    h4 {
      padding: 0 0 10px 10px;
      font-family: $hand-writing;
      font-weight: bold;
      font-size: 26px;
    }
    p {
      font-family: $hand-writing;
      font-size: 18px;
      font-weight: 100;
    }
  }
  &-image {
    padding: 0;
    img {
      object-fit: contain;
    }
  }
  &:hover {
    .form__icon-close {
      display: block;
    }
    .form__icon-update {
      display: block;
    }
  }
}
.form__icon-close {
  display: none;
  position: absolute;
  right: 10px;
  top: 10px;
  @media only screen and (max-width: 720px) {
    display: block;
  }
}
.form__icon-update {
  display: none;
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 12px;
  @media only screen and (max-width: 720px) {
    display: block;
  }
}
.orange {
  background-color: $note-orange;
  color: black;
}
.blue {
  background-color: $note-blue;
  color: white;
}
.pink {
  background-color: $note-pink;
  color: white;
}
.yellow {
  background-color: $note-yellow;
  color: black;
}
.green {
  background-color: $note-green;
  color: black;
}
</style>
