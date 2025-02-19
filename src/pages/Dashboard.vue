<template>
  <div class="dashboard-layout">
    <DashboardSidebar />
    <div class="dashboard-content">
      <button class="back-home-button" @click="$router.push('/')">⬅ Back to Home</button>
      <!-- Welcome Message -->
      <h1 class="dashboard-title">Welcome, {{ adminName }}! 🎉</h1>
      <p class="dashboard-subtitle">Here you can manage movies and categories.</p>

      <div class="stats-container">
        <!-- Movies Card -->
        <div class="stat-card movies" @click="goToMovies">
          <div class="icon">🎬</div>
          <h2>Movies</h2>
          <p>{{ statistics.movies }}</p>
        </div>

        <!-- Categories Card -->
        <div class="stat-card categories" @click="goToCategories">
          <div class="icon">📂</div>
          <h2>Categories</h2>
          <p>{{ statistics.categories }}</p>
        </div>

        <!-- Latest Movie Card -->
        <div class="stat-card latest-movie" v-if="statistics.latest_movie">
          <div class="icon">⭐</div>
          <h2>Latest Movie</h2>
          <p>{{ statistics.latest_movie }}</p>
        </div>

        <!-- Most Popular Category Card -->
        <div class="stat-card popular-category" v-if="statistics.popular_category">
          <div class="icon">🔥</div>
          <h2>Most Used Category</h2>
          <p>{{ statistics.popular_category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import axios from 'axios'

export default {
  components: {
    DashboardSidebar,
  },
  data() {
    return {
      adminName: 'Admin', // Will be updated from API
      statistics: {
        movies: 0,
        categories: 0,
        latest_movie: null,
        popular_category: null,
      },
    }
  },
  mounted() {
    this.fetchStatistics()
  },
  methods: {
    async fetchStatistics() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://127.0.0.1:8080/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.statistics = response.data
        this.adminName = localStorage.getItem('adminName') || 'Admin' // Get name if stored
      } catch (error) {
        console.error('Error fetching statistics:', error)
      }
    },
    goToMovies() {
      this.$router.push('/dashboard/movies') // Redirects to Movies Management
    },
    goToCategories() {
      this.$router.push('/dashboard/categories') // Redirects to Categories Management
    },
  },
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
}

.dashboard-content {
  margin-left: 50px;
  padding: 20px;
  width: 100%;
}

.dashboard-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #191b1d;
}

.dashboard-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
  color: #6c757d;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.stat-card {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease-in-out,
    background 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.stat-card:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.movies {
  background: #03274d;
}

.categories {
  background: #383d4e;
}

.latest-movie {
  background: #ffc107;
}

.popular-category {
  background: #dc3545;
}
</style>
