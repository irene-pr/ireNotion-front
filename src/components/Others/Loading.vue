<template>
  <div class="loading-page" :class="'loading-page--' + themeSurfaces">
    <div class="circle-animation">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Loading",
  computed: {
    ...mapState(["themeSurfaces"]),
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";

.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 21;
  display: flex;
  justify-content: center;
  align-items: center;

  &--day-mode {
    background-color: $is-loading-background-light;
  }
  &--night-mode {
    background-color: $is-loading-background-dark;
  }
}

.circle-animation {
  display: inline-block;
  transform: translateZ(1px);
}
.circle-animation > div {
  display: inline-block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  background: $theme-pink;
  animation: circle-animation 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes circle-animation {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
