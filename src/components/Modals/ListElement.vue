
<template>
<div>
  <button @click="onClickDeleteElement" @click.stop>
    -
  </button>
  <input type="list" v-model="sentence" @change.prevent="onChange"/>
</div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "ListElement",
  props: ["element", "index"],
  data() {
    return {
      sentence: this.element
    };
  },
  computed: {
    ...mapState("modal", ["listForModal"]),
  },
  methods: {
    ...mapActions("modal", [
      "deleteElementFromModalList",
      "setListForModal"
    ]),
    onClickDeleteElement() {
      this.deleteElementFromModalList(this.index);
    },
    onChange(event) {
      const list = [...this.listForModal]
      list[this.index] = event.target.value
      this.setListForModal(list)
    }
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/_variables";

button {
  margin-right: 5px;
  border: none;
  background-color: transparent;
  color: $theme-pink;
  font-weight: bolder;
}
input {
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
</style>
