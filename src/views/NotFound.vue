<template>
  <main class="not-found-page">
    <h1 class="not-found-page__header">
      <span class="span-1">404</span> <span class="span-2">Not </span>
      <span class="span-3">found</span>
    </h1>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables";

.not-found-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/background-3.webp");
  background-repeat: no-repeat;
  background-size: cover;
  &__header {
    color: $theme-light-color;
    font-size: 50px;
    .span-1 {
      color: #f5bc76;
      letter-spacing: 0.1em;
      text-shadow: 6px 3px rgb(93, 1, 116);
    }
    .span-2 {
      font-style: italic;
      font-weight: 100;
    }
    .span-3 {
      color: #333fe4;
      font-family: $Lato;
      font-weight: 900;

      //-webkit-text-stroke: 1px azure;
    }
    @media only screen and (min-width: 480px) {
      font-size: 65px;
    }
    @media only screen and (min-width: 720px) {
      font-size: 80px;
    }
  }
}
</style>
