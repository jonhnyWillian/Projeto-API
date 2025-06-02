<template>
  <div
    class="bg-red-100 text-red-700 border border-red-300 p-4 rounded text-center"
  >
    ⚠️ {{ message }}
  </div>
</template>

<script setup>
defineProps({ message: String });
</script>
