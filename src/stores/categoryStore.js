// src/store/categoryStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`/api/categories/${id}`)
        this.categories = this.categories.filter((category) => category.id !== id)
      } catch (error) {
        console.error('Failed to delete category:', error)
      }
    },
  },
})
