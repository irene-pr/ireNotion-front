<template>
  <nav class="nav__user-area">
    <button class="nav__button nav__button--login" @click="redirectToLogin">
      LOG <span>IN</span>
    </button>
    <button class="nav__button nav__button--signup" @click="redirectToRegister">
      SIGN <span>UP</span>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "UserArea",
  methods: {
    ...mapGetters(["redirectToLogin", "redirectToRegister"]),
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";
@import "@/styles/_extends";

.nav__user-area {
  display: flex;
  position: fixed;
  z-index: 2;
}
.nav__button {
  position: absolute;
  top: 14px;
  @extend %button;

  &--login {
    @extend %button--login;
    left: 14px;
  }
  &--signup {
    @extend %button--signup;
    left: 116px;
  }
  span {
    @extend %button--span;
    color: $theme-pink;
  }
}
</style>
