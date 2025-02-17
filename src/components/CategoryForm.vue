<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ category.id ? 'Edit Category' : 'Add Category' }}</h2>
      <form @submit.prevent="saveCategory">
        <input v-model="categoryData.name" type="text" required placeholder="Enter category name" />
        <div class="modal-actions">
          <button type="submit">{{ category.id ? 'Update' : 'Save' }}</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default {
  props: { category: Object },
  data() {
    return {
      categoryData: { name: '' },
    }
  },
  watch: {
    category: {
      handler(newVal) {
        this.categoryData = { name: newVal?.name || '' }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async saveCategory() {
      try {
        if (this.category.id) {
          await axios.put(`/categories/${this.category.id}`, this.categoryData)
        } else {
          await axios.post('/categories', this.categoryData)
        }
        this.$emit('saved')
        this.$emit('close')
      } catch (error) {
        console.error('Error saving category:', error)
      }
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}
.modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>
