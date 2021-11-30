<template>
  <div class="login-form-container">
    <router-link :to="paths.home">
      <h1>ire<span>N</span>otion</h1>
    </router-link>
    <h2>Welcome to ireNotion!</h2>
    <form class="login-form">
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="" />
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="*******" />
      <button
        class="login-form__button login-form__button--login"
        type="submit"
        :disabled="isDisabled"
        :class="
          isDisabled ? 'login-form__button login-form__button--disabled' : ''
        "
      >
        Log In
      </button>
    </form>
    <p>{{ isMessageShown ? "Wrong username or password. Try again" : "" }}</p>
    <div class="divider">
      <div class="divider__line divider__line--first"></div>
      <p class="divider__or">or</p>
      <div class="divider__line divider__line--second"></div>
    </div>
    <button class="login-form__button login-form__button--register"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import paths from "../../utils/paths";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      paths,
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
</style>
