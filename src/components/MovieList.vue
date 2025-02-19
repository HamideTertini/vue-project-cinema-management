<template>
  <div class="movies-container">
    <h1>Manage Movies</h1>
    <button @click="openForm(null)" class="add-btn">Add Movie</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Poster</th>
          <th>Title</th>
          <th>Category</th>
          <th>Director</th>
          <th>Release Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.id }}</td>
          <td><img :src="movie.poster_image" alt="Movie Poster" class="poster-img" /></td>
          <td>{{ movie.title }}</td>
          <td>{{ movie.category?.name }}</td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.release_date }}</td>
          <td>
            <button @click="openForm(movie)">Edit</button>
            <button @click="deleteMovie(movie.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Movie Form Modal -->
    <MovieForm
      v-if="showForm"
      :movie="selectedMovie"
      @save="handleSave"
      @close="showForm = false"
    />
  </div>
</template>

<script>
import axios from '@/axios'
import MovieForm from '@/components/MovieForm.vue'

export default {
  components: { MovieForm },
  data() {
    return {
      movies: [],
      showForm: false,
      selectedMovie: null,
    }
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('/movies')
        this.movies = response.data
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    openForm(movie) {
      this.selectedMovie = movie
      this.showForm = true
    },
    async deleteMovie(id) {
      if (confirm('Are you sure you want to delete this movie?')) {
        try {
          await axios.delete(`/movies/${id}`)
          this.fetchMovies()
        } catch (error) {
          console.error('Error deleting movie:', error)
        }
      }
    },
    handleSave() {
      this.showForm = false
      this.fetchMovies()
    },
  },
  mounted() {
    this.fetchMovies()
  },
}
</script>

<style scoped>
.movies-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.add-btn {
  margin-bottom: 10px;
  padding: 8px 12px;
  background: #323941;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.poster-img {
  width: 50px;
  height: auto;
  border-radius: 4px;
}
table {
  width: 100%;
  border-collapse: collapse;
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
</style>
