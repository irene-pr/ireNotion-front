<template>
  <main class="register-page">
    <RegisterForm class="register-page__form-component" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import RegisterForm from "@/components/Login/RegisterForm.vue";

export default defineComponent({
  name: "Login",
  components: {
    RegisterForm,
  },
  computed: {
    ...mapState("user", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("user", ["checkToken"]),
    ...mapGetters(["redirectToUserBoard"]),
  },
  mounted() {
    this.checkToken();
    if (this.isLoggedIn) {
      this.redirectToUserBoard();
    }
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables";

.register-page {
  height: 100vh;
  @media only screen and (min-width: 480px) {
    background-image: url("../assets/background-5.webp");
  }
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
