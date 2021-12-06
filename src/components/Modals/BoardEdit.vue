<template>
  <div class="modal board-edit-modal">
    <h2 class="board-edit-modal__title">Edit board name</h2>
    <form class="board-edit-form" @submit.prevent="" autocomplete="off">
      <label class="board-edit-form__label" for="newBoardName">Name</label>
      <input
        class="board-edit-form__input"
        type="text"
        id="newBoardName"
        placeholder="New board name"
      />
    </form>
  </div>
</template>
<!-- v-model="board.name" -->
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardEdit",
});
</script>

<style lang="scss">
@import "@/styles/_variables";

.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
}

.board-edit-modal {
  width: 500px;
  height: 500px;
  background: red;
}
</style>
