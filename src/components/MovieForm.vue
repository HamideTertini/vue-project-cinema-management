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

        <img
          v-if="movieData.poster_image_preview"
          :src="movieData.poster_image_preview"
          class="preview-img"
        />

        <div class="button-group">
          <button type="submit" class="primary">{{ movie?.id ? 'Update' : 'Save' }}</button>
          <button type="button" class="secondary" @click="$emit('close')">Cancel</button>
        </div>
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

        if (this.movieData.poster_image instanceof File) {
          formData.append('poster_image', this.movieData.poster_image)
        }

        if (this.movie?.id) {
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
input,
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.preview-img {
  max-width: 100px;
  margin-top: 10px;
  border-radius: 5px;
  display: block;
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

select {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  appearance: none; /* Heq stilet default të browser-it */
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

/* Shtimi i një ikone poshtë për të treguar dropdown-in */
select::after {
  content: '▼';
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #666;
  pointer-events: none;
}

select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
}

/* Opsionet e dropdown-it */
option {
  background: #fff;
  color: #333;
  padding: 10px;
  font-size: 14px;
}

/* Kur opsioni është i zgjedhur */
option:checked {
  background: #007bff;
  color: #fff;
}

/* Kur dropdown-i hapet, shfaq një animacion të lehtë */
select:active,
select:hover {
  border-color: #0056b3;
}
</style>
