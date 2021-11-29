<template>
  <div class="hello">
    <h1>Hello</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss">
h1 {
  color: red;
}
</style>
