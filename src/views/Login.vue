<template>
  <main class="login-page">
    <LoginForm />
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

<style lang="scss">
@import "@/styles/_variables";
</style>
