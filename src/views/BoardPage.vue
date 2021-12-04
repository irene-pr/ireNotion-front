<template>
  <nav class="nav-bar">
    <h1 class="nav-bar__header">Welcome, {{ userContent.name }}!</h1>
    <div>
      <button class="nav-bar__button" @click="onClickLogout">
        LOG <span>OUT</span>
      </button>
      <button class="nav-bar__button" @click="onClickLogout">
        LOG <span>OUT</span>
      </button>
    </div>
  </nav>
  <main class="board-page">
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
    ...mapActions(["getUserContent", "checkToken", "logoutUser"]),
    onClickLogout() {
      this.$router.push(paths.home);
      this.logoutUser();
    },
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
@import "@/styles/_extends";

* {
  margin: 0;
}

.board-page {
  background-color: $theme-light-color;
  padding-top: 50px;
}
.nav-bar {
  width: 100%;
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  background-color: $theme-light-color;
  align-items: center;
  &__header {
    font-family: "Fredericka the Great", cursive;
    font-weight: 100;
    font-size: 36px;
    padding-left: 20px;
  }
  &__button {
    @extend %button;
    width: 120px;
    span {
      @extend %button--span;
      color: $theme-pink;
    }
  }
}
.board-array {
  width: 100%;
  background: pink;
}
</style>
