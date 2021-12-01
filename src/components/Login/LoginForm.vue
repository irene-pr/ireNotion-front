<template>
  <div class="login-container">
    <router-link :to="paths.home">
      <h1 class="login-container__main-heading">ire<span>N</span>otion</h1>
    </router-link>
    <h2 class="login-container__secondary-heading">Welcome to ireNotion</h2>

    <form class="login-form" @submit.prevent="onSubmit" autocomplete="off">
      <div class="login-form__input-container">
        <label class="login-form__label" for="username">Username</label>
        <input
          type="text"
          id="username"
          class="login-form__input"
          v-model="username"
          placeholder="mario123"
        />
        <label class="login-form__label" for="password">Password</label>
        <input
          type="password"
          id="password"
          class="login-form__input"
          v-model="password"
          placeholder="at least 7 characters"
        />
      </div>
      <p class="message">
        {{ isMessageShown ? "Wrong username or password. Try again" : "" }}
      </p>
      <button
        class="login-form__button login-form__button--login"
        type="submit"
        :disabled="username === '' || password === ''"
      >
        LOG <span>IN</span>
      </button>
    </form>

    <div class="divider">
      <div class="divider__line divider__line--first"></div>
      <p class="divider__or">or</p>
      <div class="divider__line divider__line--second"></div>
    </div>
    <button class="login-form__button login-form__button--signup">
      SIGN <span>UP</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { UserLoginData } from "@/types/interfaces";
import paths from "../../router/paths";
import router from "@/router";

export default defineComponent({
  name: "LoginForm",
  components: {},
  data() {
    return {
      paths,
      username: "",
      password: "",
      isMessageShown: false,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async onSubmit() {
      if (this.username !== "" && this.password !== "") {
        const userLoginData: UserLoginData = {
          username: this.username,
          password: this.password,
        };
        try {
          await this.loginUser(userLoginData);
          router.push(paths.userBoard);
        } catch {
          this.isMessageShown = true;
        }
      }
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
@import "@/styles/_extends";

.login-container {
  width: 380px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $theme-light-color;
  color: $theme-dark-color;
  font-family: $Lato;

  a {
    text-decoration: none;
  }
  &__main-heading {
    font-family: $h1;
    font-size: 40px;
    font-weight: 100;
    color: $theme-dark-color;
    span {
      color: $theme-orange;
    }
  }
  &__secondary-heading {
    color: $theme-dark-color-opacity;
    font-family: $h2;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.03em;
  }
  @media only screen and (max-width: 480px) {
    height: 100%;
    width: 100%;
    justify-content: center;
  }
}
.login-form {
  padding: 30px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__input-container {
    display: flex;
    flex-direction: column;
  }

  &__label {
    padding: 5px 0 5px 2px;
    @extend %label-text;
  }
  &__input {
    height: 30px;
    padding-bottom: 0;
    border: none;
    border-bottom: 1px solid $theme-form-line;
    background-color: transparent;
    color: $theme-dark-color;
    font-size: 14px;
    &::placeholder {
      font-family: $Lato;
      opacity: 0.85;
      letter-spacing: 0;
    }
    &[type="password"] {
      font-family: Verdana, serif;
      letter-spacing: 0.125em;
    }
    &:focus {
      outline: none;
      color: $theme-orange;
    }
  }
  &__button {
    @extend %button;
    position: initial;
    &--login {
      @extend %button--login;
    }
    &--signup {
      @extend %button--signup;
      margin: 12px 0;
    }
    &:disabled {
      opacity: 0.6;
      cursor: initial;
    }
    span {
      @extend %button--span;
      color: $theme-orange;
    }
  }
}
.message {
  height: 15px;
  margin: 20px 0;
  @extend %label-text;
  font-size: 12px;
  color: $theme-orange;
}
.divider {
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &__or {
    @extend %label-text;
  }
  &__line {
    width: 50px;
    height: 0.1px;
    border-bottom: 1px solid $theme-form-line;
  }
}
</style>
