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
}

.title {
  font-size: 2.8rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.search-box,
.category-dropdown {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  width: 280px;
}

.search-box:focus,
.category-dropdown:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-content: center;
}

.movie-card {
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(to bottom, #fff, #f9f9f9);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 100%;
  height: 270px;
  object-fit: cover;
}

.movie-info {
  padding: 10px;
  text-align: center;
}

.movie-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 3px;
}

.movie-category {
  font-size: 1rem;
  color: #000000;
  font-style: italic;
  margin-bottom: 2px;
}

.movie-synopsis {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 3px;
  min-height: 40px;
  text-align: justify;
}

.view-more-btn {
  padding: 10px 16px;
  background: #232c36;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  transition:
    background 0.3s,
    transform 0.2s;
}

.view-more-btn:hover {
  background: #0056b3;
  transform: scale(1.05);
}
</style>
