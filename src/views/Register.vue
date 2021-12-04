<template>
  <main class="register-page">
    <RegisterForm class="register-page__form-component" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import paths from "@/router/paths";

export default defineComponent({
  name: "Login",
  components: {
    RegisterForm,
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

.register-page {
  height: 100vh;
  background-image: url("../assets/background-5.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
