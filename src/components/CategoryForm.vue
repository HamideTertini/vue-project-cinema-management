<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ category.id ? 'Edit Category' : 'Add Category' }}</h2>
      <form @submit.prevent="saveCategory">
        <label for="name">Category Name:</label>
        <input
          v-model="categoryData.name"
          type="text"
          id="name"
          required
          placeholder="Enter category name"
        />
        <div class="button-group">
          <button type="submit" class="primary">{{ category.id ? 'Update' : 'Save' }}</button>
          <button type="button" class="secondary" @click="$emit('close')">Cancel</button>
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
  height: 90%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 420px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.modal-content h2 {
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}
label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.primary {
  background: #323941;
  color: white;
}
.secondary {
  background: #ccc;
  color: black;
}
</style>
