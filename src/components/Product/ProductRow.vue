<template>
  <tr class="border-t hover:bg-gray-50 transition-colors">
    <td class="px-4 py-2 font-medium text-gray-800">{{ product.title }}</td>
    <td class="px-4 py-2 text-gray-600">{{ product.category }}</td>
    <td class="px-4 py-2 text-gray-800">${{ product.price.toFixed(2) }}</td>
    <td class="px-4 py-2 text-gray-600">{{ product.stock }}</td>
    <td class="px-4 py-2 flex gap-2 flex-wrap">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
        {{ product.brand }}
      </span>
      <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
        ⭐ {{ product.rating }}
      </span>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
