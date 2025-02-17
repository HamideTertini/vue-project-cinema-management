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
.categories-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.add-btn {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
