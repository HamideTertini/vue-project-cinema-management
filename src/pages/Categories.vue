<template>
  <div class="categories-container">
    <h1>Manage Categories</h1>
    <button class="add-btn" @click="openForm(null)">+ Add Category</button>
    <CategoryList @editCategory="openForm" @categoryDeleted="fetchCategories" />
    <CategoryForm
      v-if="showForm"
      :category="selectedCategory"
      @saved="handleSave"
      @close="showForm = false"
    />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import CategoryForm from '@/components/CategoryForm.vue'
import axios from '@/axios'

export default {
  components: { CategoryList, CategoryForm },
  data() {
    return {
      showForm: false,
      selectedCategory: null,
    }
  },
  methods: {
    openForm(category) {
      this.selectedCategory = category || { name: '' }
      this.showForm = true
    },
    handleSave() {
      this.showForm = false
      this.$refs.categoryList.fetchCategories()
    },
  },
}
</script>

<style scoped>
/* Kontejneri kryesor */
.categories-container {
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  transition: all 0.3s ease-in-out;
}

/* Titulli */
h1 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* Butoni "Add Category" */
.add-btn {
  padding: 12px 18px;
  background: #323941;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 3px 8px rgba(0, 123, 255, 0.2);
}

/* Efekt hover për butonin */
.add-btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

/* Efekt kur butoni shtypet */
.add-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.3);
}

/* Background i pastër për gjithë faqen */
body {
  background: #f4f7fc;
  font-family: 'Inter', sans-serif;
}
</style>
