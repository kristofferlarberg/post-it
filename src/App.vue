<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">post-it</div>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  padding: 2rem;

  font-weight: normal;
}

@media (hover: hover) {
}
</style>
