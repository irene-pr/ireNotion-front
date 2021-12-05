<template>
  <nav class="nav-bar" :class="themeHeaders">
    <h1 class="nav-bar__header" @click="onClickToggleTheme">
      Welcome, {{ userContent.name }}!
    </h1>
    <div class="nav-bar__buttons">
      <button
        class="nav-bar__button nav-bar__button--new-board"
        @click="onClickCreateBoard"
      >
        New <span>Board</span>
      </button>
      <button
        class="nav-bar__button nav-bar__button--logout"
        @click="onClickLogout"
      >
        LOG <span>OUT</span>
      </button>
    </div>
  </nav>
  <main class="board-page">
    <div class="board-array" :class="themeSurfaces">
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
    ...mapState(["userContent", "isLoggedIn", "themeHeaders", "themeSurfaces"]),
  },
  methods: {
    ...mapActions([
      "getUserContent",
      "checkToken",
      "logoutUser",
      "createBoard",
      "toggleTheme",
    ]),
    onClickLogout() {
      this.$router.push(paths.home);
      this.logoutUser();
    },
    onClickCreateBoard() {
      this.createBoard();
    },
    onClickToggleTheme() {
      this.toggleTheme();
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
  padding-top: 40px;
  @media only screen and (max-width: 480px) {
    padding: 0;
  }
}

.nav-bar {
  width: 100%;
  position: fixed;
  padding: 10px 20px;
  z-index: 100;
  display: flex;
  justify-content: space-between;

  align-items: center;

  &__header {
    font-family: "Fredericka the Great", cursive;
    font-weight: 100;
    font-size: 36px;
    padding-left: 20px;
    &:hover {
      color: $theme-pink;
    }
  }
  &__button {
    @extend %button;
    width: 120px;
    span {
      @extend %button--span;
      color: $theme-pink;
    }
    &--logout {
      @extend %button--signup;
      border: 1px solid $theme-light-color;
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 15px 7px;

    &__buttons {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
.board-array {
  overflow-x: scroll;
  width: 100%;
  padding: 25px 0;
  display: flex;
  @media only screen and (max-width: 480px) {
    padding-top: 110px;
    flex-direction: column;
    align-items: center;
  }
}
.day-mode {
  background-color: $theme-light-color;
  color: $theme-dark-color;
}
.night-mode {
  background-color: $theme-dark-color;
  color: $theme-light-color;
}
</style>
