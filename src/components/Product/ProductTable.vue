<template>
  <div class="table-wrapper">
    <table class="custom-table">
      <thead>
        <tr>
          <th @click="$emit('toggle-sort')" style="cursor: pointer">
            Nome
            <span v-if="sortOrder === 'asc'">▲</span>
            <span v-else-if="sortOrder === 'desc'">▼</span>
          </th>
          <th class="col-categoria">Categoria</th>
          <th class="col-preco">Preço ($)</th>
          <th class="col-estoque">Estoque</th>
          <th class="col-etiquetas">Etiquetas</th>
        </tr>
      </thead>
      <tbody>
        <ProductRow
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ProductRow from "./ProductRow.vue";

const { products, sortOrder } = defineProps({
  products: {
    type: Array,
    required: true,
  },
  sortOrder: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
.table-wrapper {
  max-width: 1200px;
  padding: 20px;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-border);
  table-layout: auto;
}

.custom-table thead {
  background-color: var(--color-background-mute);
  color: var(--color-heading);
  font-weight: 700;
  text-align: left;
  border-bottom: 2px solid var(--color-border);
}

.custom-table th,
.custom-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  font-size: 15px;
}

.col-nome {
  width: 250px;
}

.col-categoria {
  width: 150px;
}

.col-preco {
  width: 100px;
}

.col-estoque {
  width: 100px;
}

.col-etiquetas {
  width: 200px;
}
</style>
