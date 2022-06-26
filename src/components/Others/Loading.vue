<template>
  <div class="loading-page" :class="'loading-page--' + themeSurfaces">
    <div v-if="this.num === 0" class="circle-animation">
      <div></div>
    </div>
    <div v-else-if="this.num === 1" class="grid-animation">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-else-if="this.num === 2" class="spinner-animation">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Loading",
  data() {
    return {
      num: Math.floor(Math.random() * 3),
    };
  },
  computed: {
    ...mapState("theme", ["themeSurfaces"]),
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

.grid-animation {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.grid-animation div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $theme-pink;
  animation: grid-animation 1.2s linear infinite;
}
.grid-animation div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.grid-animation div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.grid-animation div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.grid-animation div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.grid-animation div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.grid-animation div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.grid-animation div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.grid-animation div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.grid-animation div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes grid-animation {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.spinner-animation {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.spinner-animation div {
  transform-origin: 40px 40px;
  animation: spinner-animation 1.2s linear infinite;
}
.spinner-animation div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: $theme-pink;
}
.spinner-animation div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.spinner-animation div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.spinner-animation div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.spinner-animation div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.spinner-animation div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.spinner-animation div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.spinner-animation div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.spinner-animation div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.spinner-animation div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.spinner-animation div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.spinner-animation div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.spinner-animation div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes spinner-animation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
