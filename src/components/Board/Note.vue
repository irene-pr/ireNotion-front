
<template>
  <article
    class="note note-paragraph"
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
    <h3 v-if="note.title !== '' && note.title !== undefined">
      {{ note.title }}
    </h3>
    <p v-if="note.paragraph !== '' && note.paragraph !== undefined">
      {{ note.paragraph }}
    </p>
  </article>
  <article
    class="note note-list"
    v-if="note.type === 'list'"
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
    <h3 v-if="note.title !== '' && note.title !== undefined">
      {{ note.title }}
    </h3>
    <ul v-if="note.list.length !== 0">
      <li  v-for="element in note.list" :note="note" :key="element">{{element}}</li>
    </ul>   
  </article>
  <article
    class="note note-checklist"
    v-if="note.type === 'checklist'"
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
    <h3 v-if="note.title !== '' && note.title !== undefined">
      {{ note.title }}
    </h3>
    <div v-if="note.list.length !== 0">
      <div  v-for="element in note.list" :note="note" :key="element">
        <input type="checkbox" id="checklist" :checked="element.checked">
        <label for="checklist">{{element.sentence}}</label>
      </div>
    </div>

  </article>
  <article
    class="note note-image"
    v-if="note.type === 'image'"
    :class="note.color"
  >
    <font-awesome-icon
      icon="times"
      class="form__icon-close"
      @click="onClickDelete"
    ></font-awesome-icon>
    <img :src="note.file" alt="{{note.file}}" width="300" height="300" />
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
    width: 92%;
  }

  &-paragraph {
    word-wrap: break-word;
    h3 {
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
  &-list {
    word-wrap: break-word;
    h3 {
      padding: 0 0 10px 10px;
      font-family: $hand-writing;
      font-weight: bold;
      font-size: 26px;
    }
    ul {
      padding-left: 20px;
    }
    li {
      list-style-type: circle;
      font-family: $hand-writing;
      font-size: 18px;
      font-weight: 100;
    }
  }
  &-checklist {
    word-wrap: break-word;
    h3 {
      padding: 0 0 10px 10px;
      font-family: $hand-writing;
      font-weight: bold;
      font-size: 26px;
    }
    input { 
      background-color: red;
      cursor: pointer;
    }
    
    label {
      margin-left: 10px;
      font-family: $hand-writing;
      font-size: 18px;
      font-weight: 100;
      }
  }
  &-image {
    padding: 0;
    img {
      width: 100%;
      height: 100%;
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
