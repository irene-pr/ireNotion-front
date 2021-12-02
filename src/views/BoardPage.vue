<template>
  <main class="board-page">
    <h1>This is the Board Page!</h1>
    <Board v-for="board in boards" :board="board" v-bind:key="board.id" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Board from "@/components/Board/Board.vue";

export default defineComponent({
  name: "BoardPage",
  components: { Board },
  data() {
    return {
      enabled: true,
      boards: [],
      dragging: false,
    };
  },
  computed: {
    ...mapState(["userContent"]),
  },
  methods: {
    ...mapActions(["getUserContent"]),
  },
  mounted() {
    this.getUserContent();
    this.boards = this.userContent.boards;
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
</style>
