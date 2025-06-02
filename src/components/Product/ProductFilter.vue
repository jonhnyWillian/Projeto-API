<template>
  <div class="filter-container">
    <input
      v-model="localSearch"
      @input="$emit('update:search', localSearch)"
      placeholder="Buscar produto..."
      class="input-field"
    />

    <select
      v-model="localCategory"
      @change="$emit('update:category', localCategory)"
      class="input-field"
    >
      <option value="">Todas as categorias</option>
      <option v-for="cat in categories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  search: String,
  selectedCategory: String,
  categories: Array,
});

const emit = defineEmits(["update:search", "update:category"]);

const localSearch = ref(props.search);
const localCategory = ref(props.selectedCategory);

watch(
  () => props.search,
  (val) => {
    localSearch.value = val;
  }
);

watch(
  () => props.selectedCategory,
  (val) => {
    localCategory.value = val;
  }
);
const inputStyle = {
  padding: "8px 12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginRight: "12px",
  backgroundColor: "#fff",
  color: "#333",
  fontSize: "14px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  outline: "none",
};
</script>
<style scoped>
.filter-container {
  padding: 16px 20px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  flex-wrap: wrap;
}

.input-field {
  flex: 1;
  min-width: 590px; /* largura maior */
  padding: 10px 18px; /* altura maior */
  border: 1px solid #000000;
  border-radius: 6px;
  font-size: 16px; /* texto maior */
  background-color: rgb(255, 255, 255);
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}
</style>
