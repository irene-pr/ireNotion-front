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
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["checkToken"]),
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
  background-image: url("../assets/background-5.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
