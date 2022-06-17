<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header class="px-8 pt-8">
    <div>post-it</div>
  </header>

  <main class="h-screen">
    <RouterView />
  </main>
</template>

<style>
#app {
  font-weight: normal;
}
</style>
