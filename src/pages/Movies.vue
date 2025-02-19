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
            <button @click="openForm(movie)" class="edit-btn">Edit</button>
            <button @click="deleteMovie(movie.id)" class="delete-btn">Delete</button>
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
/* Kontejneri kryesor */
.movies-container {
  max-width: 900px;
  margin: 40px auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Titulli */
h1 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* Butoni për shtim */
.add-btn {
  padding: 10px 15px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.add-btn:hover {
  background: #218838;
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

/* Imazhet e posterit */
.poster-img {
  width: 50px;
  height: 70px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
.edit-btn {
  background: #007bff;
  color: white;
}

.edit-btn:hover {
  background: #0056b3;
}

/* Butoni Delete */
.delete-btn {
  background: #dc3545;
  color: white;
  margin-left: 8px;
}

.delete-btn:hover {
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
