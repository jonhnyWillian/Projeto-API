import { ref, computed, onMounted } from "vue";
import { getProducts } from "@/services/productService";

export function useProducts() {
  const products = ref([]);
  const search = ref("");
  const selectedCategory = ref("");
  const loading = ref(true);
  const error = ref("");

  onMounted(async () => {
    try {
      const res = await getProducts();
      products.value = res.products;
      console.log("Produtos carregados:", res.products);
    } catch (e) {
      error.value = "Erro ao carregar produtos.";
    } finally {
      loading.value = false;
    }
  });

  const categories = computed(() => {
    if (!Array.isArray(products.value)) return [];
    return [...new Set(products.value.map((p) => p.category))];
  });

  const filteredProducts = computed(() =>
    products.value.filter(
      (p) =>
        p.title.toLowerCase().includes(search.value.toLowerCase()) &&
        (!selectedCategory.value || p.category === selectedCategory.value)
    )
  );

  return {
    products,
    filteredProducts,
    search,
    selectedCategory,
    setSearch: (val) => (search.value = val),
    setSelectedCategory: (val) => (selectedCategory.value = val),
    categories,
    loading,
    error,
  };
}
