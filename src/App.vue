<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

input {
  width: 100%;
}

h2 {
  font-size: 17px;
  margin: 8px;
}

h4 {
  min-width: 120px;
}

#nav {
  margin: 0;
}
</style>
