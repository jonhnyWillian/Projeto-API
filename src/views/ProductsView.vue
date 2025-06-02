<template>
  <div class="products-page">
    <h1 class="title">Lista de Produtos</h1>

    <ProductFilter
      :search="search"
      :selected-category="selectedCategory"
      :categories="categories"
      @update:search="search = $event"
      @update:category="selectedCategory = $event"
    />

    <!-- Passar função e estado para ProductTable -->
    <ProductTable
      :products="paginatedProducts"
      :sortOrder="sortOrder"
      @toggle-sort="toggleSortOrder"
    />

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import ProductFilter from "@/components/Product/ProductFilter.vue";
import ProductTable from "@/components/Product/ProductTable.vue";
import ErrorMessage from "@/_ui/ErrorMessage.vue";
import LoadingSpinner from "@/_ui/LoadingSpnner.vue";
import EmptyState from "@/_ui/EmptyState.vue";

import { useProducts } from "@/composables/useProducts";
import { ref, computed, watch } from "vue";

const {
  filteredProducts,
  search,
  selectedCategory,
  setSearch,
  setSelectedCategory,
  categories,
  loading,
  error,
} = useProducts();

const currentPage = ref(1);
const itemsPerPage = 10;

// Estado para ordenação: 'asc' | 'desc' | null
const sortOrder = ref("asc");

function toggleSortOrder() {
  if (sortOrder.value === "asc") {
    sortOrder.value = "desc";
  } else {
    sortOrder.value = "asc";
  }
}

// Computed para ordenar os produtos antes da paginação
const sortedProducts = computed(() => {
  if (!sortOrder.value) {
    console.log("Ordenação desligada. Retornando produtos filtrados.");
    return filteredProducts.value;
  }

  const sorted = [...filteredProducts.value].sort((a, b) => {
    const nameA = (a?.title || "").toLowerCase();
    const nameB = (b?.title || "").toLowerCase();

    if (nameA < nameB) return sortOrder.value === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder.value === "asc" ? 1 : -1;
    return 0;
  });

  console.log(
    "Nome do primeiro produto:",
    sorted[0]?.nome,
    sorted[0]?.name,
    sorted[0]?.title
  );
  return sorted;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedProducts.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(sortedProducts.value.length / itemsPerPage)
);

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// Resetar para página 1 ao buscar ou trocar categoria
watch([search, selectedCategory], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 1100px;
  margin: 0 auto;
}

.title {
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.pagination button {
  padding: 8px 16px;
  border: none;
  background-color: #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: #d0d0d0;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
