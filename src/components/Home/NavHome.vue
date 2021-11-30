<template>
  <nav class="nav__user-area">
    <router-link :to="paths.login">
      <button class="nav__button nav__button--login">
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
import paths from "../../utils/paths";

export default defineComponent({
  name: "UserArea",
  props: {
    msg: String,
  },
  data() {
    return {
      paths,
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";

.nav__user-area {
  display: flex;
  position: fixed;
  z-index: 2;
}
.nav__button {
  width: 100px;
  height: 46px;
  position: absolute;
  top: 14px;
  opacity: 0.75;
  border: 1px solid #595959;
  box-sizing: border-box;
  border-radius: 15px;
  font-family: $Lato;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.1em;
  transform: scale(0.8);

  &--login {
    background-color: $light-color-home;
    color: $dark-color-home;
    left: 14px;
  }
  &--signup {
    background-color: $dark-color-home;
    color: $light-color-home;
    left: 116px;
  }
  span {
    color: $theme-pink;
    font-style: italic;
    font-weight: 500;
  }
}
</style>
