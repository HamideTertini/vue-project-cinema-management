<template>
  <div>
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
/* Kontejneri kryesor */
div {
  max-width: 800px;
  margin: 40px auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Titulli */
h2 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* Tabela */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

/* Header i tabelës */
th {
  background: #323941;
  color: white;
  padding: 12px;
  font-size: 16px;
}

/* Qelizat e tabelës */
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #333;
}

/* Efekt hover për rreshtat */
tbody tr:hover {
  background: #f4f7fc;
  transition: background 0.2s ease-in-out;
}

/* Butonat */
button {
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

/* Butoni Edit */
button:first-child {
  background: #28a745;
  color: white;
}

button:first-child:hover {
  background: #218838;
}

/* Butoni Delete */
button:last-child {
  background: #dc3545;
  color: white;
  margin-left: 8px;
}

button:last-child:hover {
  background: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
  table {
    font-size: 12px;
  }
  th,
  td {
    padding: 10px;
  }
  button {
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style>
