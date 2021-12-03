<template>
  <main class="board-page">
    <nav>
      <h1>This is the Board Page!</h1>
      <button>LOG OUT</button>
    </nav>

    <div class="board-array">
      <Board
        v-for="board in userContent.boards"
        :board="board"
        v-bind:key="board.id"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Board from "@/components/Board/Board.vue";
import paths from "@/router/paths";

export default defineComponent({
  name: "BoardPage",
  components: { Board },
  data() {
    return {
      enabled: true,
      dragging: false,
    };
  },
  computed: {
    ...mapState(["userContent", "isLoggedIn"]),
  },
  methods: {
    ...mapActions(["getUserContent", "checkToken"]),
  },
  mounted() {
    this.checkToken();
    if (!this.isLoggedIn) {
      this.$router.push(paths.home);
    }
    this.getUserContent();
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables";
* {
  margin: 0;
}

.board-page {
  background-color: $theme-light-color;
}
.board-array {
  background: pink;
}
</style>
