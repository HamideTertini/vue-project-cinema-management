<template>
  <div class="cinema-landing">
    <!-- Titulli Kryesor -->
    <h1 class="title">🎬 Explore Our Movies</h1>

    <!-- Filters Section -->
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Search movies..." class="search-box" />
      <select v-model="selectedCategory" class="category-dropdown">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Movies Grid -->
    <div class="movies-grid">
      <div v-for="movie in filteredMovies" :key="movie.id" class="movie-card">
        <img :src="movie.poster_image" alt="Movie Poster" class="movie-poster" />
        <div class="movie-info">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-category">{{ movie.category?.name }}</p>
          <p class="movie-synopsis">{{ truncateSynopsis(movie.synopsis) }}</p>
          <button class="view-more-btn" @click="goToMovie(movie.id)">View More</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      movies: [],
      categories: [],
      searchQuery: '',
      selectedCategory: '',
    }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter((movie) => {
        const matchesTitle = movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = this.selectedCategory
          ? movie.category_id == this.selectedCategory
          : true
        return matchesTitle && matchesCategory
      })
    },
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
    async fetchCategories() {
      try {
        const response = await axios.get('/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    goToMovie(movieId) {
      this.$router.push(`/movies/${movieId}`)
    },
    truncateSynopsis(synopsis) {
      return synopsis.split(' ').slice(0, 8).join(' ') + '...'
    },
  },
  mounted() {
    this.fetchMovies()
    this.fetchCategories()
  },
}
</script>

<style scoped>
.cinema-landing {
  max-width: 1200px;
  margin: auto;
  padding: 40px;
  text-align: center;
  border-radius: 12px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 25px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
}

.search-box,
.category-dropdown {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  width: 250px;
}

.search-box:focus,
.category-dropdown:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
}

.movie-card {
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.movie-poster {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.movie-info {
  padding: 15px;
  text-align: center;
}

.movie-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.movie-category {
  font-size: 1rem;
  color: #666;
  margin-bottom: 8px;
}

.movie-synopsis {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 12px;
  min-height: 40px;
}

.view-more-btn {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
  transition: background 0.3s;
}

.view-more-btn:hover {
  background: #0056b3;
}
</style>
