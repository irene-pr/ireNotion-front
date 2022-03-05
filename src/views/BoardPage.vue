<template>
  <BoardEdit v-if="isBoardEditModal" />
  <UpdateNote v-if="isUpdateNoteModal" />
  <nav class="nav-bar" :class="themeSurfaces">
    <div class="nav-bar__header-container">
      <font-awesome-icon
      v-if="themeSurfaces==='day-mode'"
      icon="sun"
      class="nav-bar__toggle-icon"
      @click="onClickToggleTheme"
      ></font-awesome-icon>
      <font-awesome-icon
        v-else
        icon="moon"
        class="nav-bar__toggle-icon"
        @click="onClickToggleTheme"
      ></font-awesome-icon>
      <h1 class="nav-bar__header" @click="onClickToggleTheme">
        Welcome, {{ userContent.name }}!
      </h1>
    </div>
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
  <main class="board-page" :class="themeSurfaces">
    <div
      class="board-array"
      :class="themeSurfaces"
      v-if="userContent.boards.length > 0"
    >
      <Board
        v-for="board in userContent.boards"
        :board="board"
        v-bind:key="board.id"
      />
    </div>
    <p class="board-page__welcome-message" v-else>
      You can start by adding a new board, click the button on top!
    </p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Board from "@/components/Board/Board.vue";
import BoardEdit from "@/components/Modals/BoardEdit.vue";
import UpdateNote from "@/components/Modals/UpdateNote.vue";

export default defineComponent({
  name: "BoardPage",
  components: { Board, BoardEdit, UpdateNote },

  computed: {
    ...mapState([
      "userContent",
      "isLoggedIn",
      "themeHeaders",
      "themeSurfaces",
      "isBoardEditModal",
      "isUpdateNoteModal",
    ]),
  },
  methods: {
    ...mapActions([
      "getUserContent",
      "checkToken",
      "logoutUser",
      "createBoard",
      "toggleTheme",
    ]),
    ...mapGetters(["redirectToHome"]),
    onClickLogout() {
      this.redirectToHome();
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
      this.redirectToHome();
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
  padding-top: 20px;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  background-color: $theme-light-color;
  min-height: 100vh;

  @media only screen and (max-width: 720px) {
    padding-top: 40px;
  }

  @media only screen and (max-width: 480px) {
    padding: 0;
  }

  &__welcome-message {
    align-self: center;
    font-size: 20px;
    font-family: $Lato;
  }
}

.nav-bar {
  width: 100%;
  position: fixed;
  padding: 10px 20px;
  z-index: 15;
  display: flex;
  justify-content: space-between;

  align-items: center;

  &__header-container{
    display:flex;
    align-items: center;
  }

  &__toggle-icon {
    font-size: 25px;

    &:hover {
      color: $theme-pink;
    }
  }

  &__header {
    font-family: "Fredericka the Great", cursive;
    font-weight: 100;
    font-size: 36px;
    padding-left: 20px;
    &:hover {
      color: $theme-pink;
    }
    @media only screen and (max-width: 720px) {
      display:none
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
    &:hover{
      border-color: $theme-pink;
    }
  }
  @media only screen and (max-width: 720px) {
    padding: 10px 3px 0 20px;
    justify-content: space-between;
  }

}
.board-array {
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  padding: 25px 0;
  display: flex;
  @media only screen and (max-width: 720px) {
    padding-top: 5px;
  }
  @media only screen and (max-width: 480px) {
    padding: 46px 0 0 0;
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
