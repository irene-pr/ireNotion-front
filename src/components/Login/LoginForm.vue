<template>
  <div class="login-form-container">
    <pre>{{ JSON.stringify({ isDisabled, username, password }, null, 2) }}</pre>
    <router-link :to="paths.home">
      <h1 class="login-form__main-heading">ire<span>N</span>otion</h1>
    </router-link>
    <h2 class="login-form__secondary-heading">Welcome to ireNotion!</h2>
    <form class="login-form" @submit.prevent="onSubmit" @change="onChange">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="mario123"
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="*******"
      />
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
    <button class="login-form__button login-form__button--register">
      Sign Up
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { UserLoginData } from "@/types/interfaces";
import paths from "../../utils/paths";
import router from "@/router";

export default defineComponent({
  name: "LoginForm",
  components: {},
  data() {
    return {
      paths,
      isDisabled: true,
      username: "",
      password: "",
      isMessageShown: false,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    onChange() {
      if (this.username.length > 0 && this.password.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    async onSubmit() {
      if (this.username !== "" && this.password !== "") {
        const userLoginData: UserLoginData = {
          username: this.username,
          password: this.password,
        };
        try {
          await this.loginUser(userLoginData);
          router.push(paths.userBoard);
        } catch (error) {
          this.isMessageShown = true;
        }
      }
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
</style>
