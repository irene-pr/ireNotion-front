<template>
  <router-view />
  <Loading v-if="isLoading" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import Loading from "@/components/Others/Loading.vue";

export default defineComponent({
  name: "Home",
  components: {
    Loading,
  },
  computed: {
    ...mapState("user", ["isLoading"]),
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
