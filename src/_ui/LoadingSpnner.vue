<template>
  <div class="text-center text-gray-500 py-8 animate-pulse">
    🔄 {{ message }}
  </div>
</template>

<script setup>
defineProps({ message: String });
</script>
