<template>
  <main class="board-page">
    <h1>This is the Board Page!</h1>
    <Board />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/Board/Board.vue";

export default defineComponent({
  name: "BoardPage",
  components: { Board },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
</style>
