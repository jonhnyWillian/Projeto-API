<template>
  <div class="text-center text-gray-400 py-8">🚫 {{ message }}</div>
</template>

<script setup>
defineProps({ message: String });
</script>
