
<template>
<div v-if="total < 5">
  <button @click.prevent="onClickAddElement" @click.stop>
    +
  </button>
  <input type="text" v-model="sentence"/>
</div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "AddElementToList",
  props: ["total"],
  data() {
    return {
      sentence: "",
    };
  },
  methods: {
    ...mapActions("modal", [
      "addElementToModalList"
    ]),
    onClickAddElement() {
      this.addElementToModalList(this.sentence);
      this.sentence = ""
    },
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
