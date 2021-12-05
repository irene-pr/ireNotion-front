<template>
  <div class="register-container">
    <router-link :to="paths.home">
      <h1 class="register-container__main-heading">ire<span>N</span>otion</h1>
    </router-link>

    <form class="register-form" @submit.prevent="onSubmit" autocomplete="off">
      <div class="register-form__input-container">
        <label class="register-form__label" for="name">Name</label>
        <input
          type="text"
          id="name"
          class="register-form__input"
          v-model="name"
          placeholder="Mario"
        />
        <label class="register-form__label" for="username">Username</label>
        <input
          type="text"
          id="username"
          class="register-form__input"
          v-model="username"
          placeholder="mario123"
        />
        <label class="register-form__label" for="password">Password</label>
        <input
          type="password"
          id="password"
          class="register-form__input"
          v-model="password"
          placeholder="at least 7 characters"
        />
        <label class="register-form__label" for="repeat-password"
          >Repeat password</label
        >
        <input
          type="password"
          id="repeat-password"
          class="register-form__input"
          v-model="repeatPassword"
          placeholder="at least 7 characters"
        />
      </div>
      <p class="message">
        {{ messageShown }}
      </p>
      <button
        class="register-form__button register-form__button--signup"
        type="submit"
        :disabled="
          name === '' ||
          username === '' ||
          password === '' ||
          repeatPassword === ''
        "
      >
        SIGN <span>UP</span>
      </button>
    </form>

    <div class="divider">
      <div class="divider__line divider__line--first"></div>
      <p class="divider__or">or</p>
      <div class="divider__line divider__line--second"></div>
    </div>
    <router-link :to="paths.login">
      <button class="register-form__button register-form__button--login">
        LOG <span>IN</span>
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { IUserRegisterData } from "@/types/interfaces";
import paths from "../../router/paths";
import router from "@/router";

export default defineComponent({
  name: "RegisterForm",
  components: {},
  data() {
    return {
      paths,
      name: "",
      username: "",
      password: "",
      repeatPassword: "",
      messageShown: "",
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    async onSubmit() {
      if (
        this.name !== "" &&
        this.username !== "" &&
        this.password !== "" &&
        this.repeatPassword !== "" &&
        this.password === this.repeatPassword &&
        this.password.length >= 7 &&
        this.password.length <= 20
      ) {
        const userRegisterData: IUserRegisterData = {
          name: this.name,
          username: this.username,
          password: this.password,
        };

        await this.registerUser(userRegisterData);
        router.push(paths.login);
      } else if (this.password !== this.repeatPassword) {
        this.messageShown = "The passwords don't match. Try again";
      } else if (this.password.length < 7 || this.password.length > 20) {
        this.messageShown =
          "The password must have between 7 and 20 characters";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/_variables";
@import "@/styles/_extends";

.register-container {
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
      color: $theme-blue;
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
.register-form {
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
      color: $theme-blue;
    }
  }
  &__button {
    @extend %button;
    position: initial;
    &--login {
      @extend %button--login;
      margin: 12px 0;
    }
    &--signup {
      @extend %button--signup;
    }
    &:disabled {
      opacity: 0.6;
      cursor: initial;
    }
    span {
      @extend %button--span;
      color: $theme-blue;
    }
  }
}
.message {
  height: 15px;
  margin: 20px 0;
  @extend %label-text;
  font-size: 12px;
  color: $theme-blue;
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
