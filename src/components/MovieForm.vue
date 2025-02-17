<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ movie?.id ? 'Edit Movie' : 'Add Movie' }}</h2>
      <form @submit.prevent="saveMovie" enctype="multipart/form-data">
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

        <label for="poster_image">Poster Image:</label>
        <input type="file" id="poster_image" @change="handleFileUpload" accept="image/*" />

        <!-- Shfaq imazhin e posterit nëse ekziston -->
        <img
          v-if="movieData.poster_image_preview"
          :src="movieData.poster_image_preview"
          class="preview-img"
        />

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
        poster_image: null,
        poster_image_preview: '',
      },
      categories: [],
    }
  },
  watch: {
    movie: {
      handler(newVal) {
        if (newVal) {
          this.movieData = { ...newVal }
          this.movieData.poster_image_preview = newVal.poster_image || ''
        } else {
          this.resetForm()
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
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.movieData.poster_image = file
        this.movieData.poster_image_preview = URL.createObjectURL(file)
      }
    },
    async saveMovie() {
      try {
        let formData = new FormData()
        formData.append('title', this.movieData.title)
        formData.append('category_id', this.movieData.category_id)
        formData.append('director', this.movieData.director)
        formData.append('release_date', this.movieData.release_date)
        formData.append('synopsis', this.movieData.synopsis)

        // Kontrollo nëse ka një imazh të ri të posterit
        if (this.movieData.poster_image instanceof File) {
          formData.append('poster_image', this.movieData.poster_image)
        }

        if (this.movie?.id) {
          // Shtojmë `_method: 'PUT'` për Laravel që të pranojë përditësimin
          formData.append('_method', 'PUT')

          await axios.post(`/movies/${this.movie.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        } else {
          await axios.post('/movies', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        }

        this.$emit('save')
        this.$emit('close')
      } catch (error) {
        console.error('Error saving movie:', error)
      }
    },
    resetForm() {
      this.movieData = {
        title: '',
        category_id: null,
        director: '',
        release_date: '',
        synopsis: '',
        poster_image: null,
        poster_image_preview: '',
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
.preview-img {
  max-width: 100px;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
