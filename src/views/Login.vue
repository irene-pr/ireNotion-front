<template>
  <main class="login-page">
    <LoginForm class="login-page__form-component" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import LoginForm from "@/components/Login/LoginForm.vue";
import paths from "../router/paths";

export default defineComponent({
  name: "Login",
  components: {
    LoginForm,
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["checkToken"]),
  },
  mounted() {
    this.checkToken();
    if (this.isLoggedIn) {
      this.$router.push(paths.userBoard);
    }
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
