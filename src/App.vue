<template>
  <div id="app" class="min-h-screen flex flex-col">
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Nenhuma importação direta necessária
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>

<style>
body {
  background-color: #f8f9fa; /* fundo cinza claro */
  margin: 0;
}
</style>
