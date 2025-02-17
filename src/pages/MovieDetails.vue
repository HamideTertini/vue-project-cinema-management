<template>
  <div class="movie-details" v-if="movie">
    <div class="movie-container">
      <img :src="fullPosterUrl" alt="Movie Poster" class="movie-poster" />
      <div class="movie-info">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-category">
          <strong>Category:</strong> {{ movie.category ? movie.category.name : 'Unknown' }}
        </p>
        <p class="movie-director"><strong>Director:</strong> {{ movie.director }}</p>
        <p class="movie-release">
          <strong>Release Date:</strong> {{ formattedDate(movie.release_date) }}
        </p>
        <p class="movie-synopsis">{{ movie.synopsis }}</p>
        <button class="back-button" @click="$router.push('/')">⬅ Back to Movies</button>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading movie details...</div>
</template>

<script>
import axiosInstance from '@/axios'

export default {
  data() {
    return {
      movie: null,
    }
  },
  computed: {
    fullPosterUrl() {
      return this.movie && this.movie.poster_image
        ? `http://127.0.0.1:8080/storage/posters/${this.movie.poster_image}`
        : 'https://via.placeholder.com/350x500?text=No+Image'
    },
  },
  methods: {
    async fetchMovieDetails() {
      const movieId = this.$route.params.id
      try {
        const response = await axiosInstance.get(`/movies/${movieId}`)
        this.movie = response.data
        console.log('Movie data:', this.movie)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    },
    formattedDate(date) {
      return new Date(date).toLocaleDateString()
    },
  },
  mounted() {
    this.fetchMovieDetails()
  },
}
</script>

<style scoped>
.movie-details {
  max-width: 1000px;
  margin: auto;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.movie-container {
  display: flex;
  gap: 30px;
  align-items: center;
}

.movie-poster {
  width: 350px;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.movie-info {
  text-align: left;
  max-width: 550px;
}

.movie-title {
  font-size: 2rem;
  font-weight: bold;
  color: #222;
}

.movie-category,
.movie-director,
.movie-release {
  font-size: 1.2rem;
  color: #555;
  margin: 5px 0;
}

.movie-synopsis {
  margin-top: 15px;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

.back-button {
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.back-button:hover {
  background: #0056b3;
}

@media (max-width: 800px) {
  .movie-container {
    flex-direction: column;
    text-align: center;
  }

  .movie-poster {
    width: 100%;
    height: auto;
  }

  .movie-info {
    max-width: 100%;
  }
}
</style>
