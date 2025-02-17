<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ movie?.id ? 'Edit Movie' : 'Add Movie' }}</h2>
      <form @submit.prevent="saveMovie">
        <label for="title">Title:</label>
        <input v-model="movieData.title" type="text" id="title" required />

        <label for="category">Category:</label>
        <select v-model="movieData.category_id" id="category" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <label for="director">Director:</label>
        <input v-model="movieData.director" type="text" id="director" required />

        <label for="release_date">Release Date:</label>
        <input v-model="movieData.release_date" type="date" id="release_date" required />

        <label for="synopsis">Synopsis:</label>
        <textarea v-model="movieData.synopsis" id="synopsis" required></textarea>

        <label for="poster_image">Poster URL:</label>
        <input v-model="movieData.poster_image" type="text" id="poster_image" required />

        <button type="submit">{{ movie?.id ? 'Update' : 'Save' }}</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  props: {
    movie: Object,
  },
  data() {
    return {
      movieData: {
        title: '',
        category_id: null,
        director: '',
        release_date: '',
        synopsis: '',
        poster_image: '',
      },
      categories: [],
    }
  },
  watch: {
    movie: {
      handler(newVal) {
        if (newVal) {
          this.movieData = { ...newVal }
        } else {
          this.movieData = {
            title: '',
            category_id: null,
            director: '',
            release_date: '',
            synopsis: '',
            poster_image: '',
          }
        }
      },
      deep: true,
      immediate: true,
    },
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
    async saveMovie() {
      try {
        if (this.movie?.id) {
          await axios.put(`/movies/${this.movie.id}`, this.movieData)
        } else {
          await axios.post('/movies', this.movieData)
        }
        this.$emit('save')
        this.$emit('close')
      } catch (error) {
        console.error('Error saving movie:', error)
      }
    },
  },
  mounted() {
    this.fetchCategories()
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
  width: 400px;
}
</style>
