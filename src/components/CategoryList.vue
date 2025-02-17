<template>
  <div>
    <h2>Categories</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <button @click="$emit('editCategory', category)">Edit</button>
            <button @click="deleteCategory(category.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/axios'
export default {
  data() {
    return { categories: [] }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    async deleteCategory(id) {
      if (confirm('Are you sure you want to delete this category?')) {
        try {
          await axios.delete(`/categories/${id}`)
          this.fetchCategories()
        } catch (error) {
          console.error('Error deleting category:', error)
        }
      }
    },
  },
  mounted() {
    this.fetchCategories()
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
button:first-child {
  background: #28a745;
  color: white;
}
button:last-child {
  background: #dc3545;
  color: white;
}
</style>
