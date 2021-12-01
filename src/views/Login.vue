<template>
  <main class="login-page">
    <LoginForm class="login-page__form-component" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/Login/LoginForm.vue";

export default defineComponent({
  name: "Login",
  components: {
    LoginForm,
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables";

.login-page {
  height: 100vh;
  background-image: url("../assets/background-2.webp");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
