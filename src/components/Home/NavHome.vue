<template>
  <nav class="nav__user-area">
    <router-link :to="paths.login">
      <button class="nav__button nav__button--login" disabled>
        LOG <span>IN</span>
      </button>
    </router-link>
    <router-link :to="paths.login">
      <button class="nav__button nav__button--signup">
        SIGN <span>UP</span>
      </button>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import paths from "../../router/paths";

export default defineComponent({
  name: "UserArea",
  data() {
    return {
      paths,
    };
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
