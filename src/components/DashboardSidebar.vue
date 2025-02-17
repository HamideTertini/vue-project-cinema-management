<template>
  <aside class="sidebar">
    <h2 class="sidebar-title">Admin Panel</h2>
    <ul class="sidebar-menu">
      <li>
        <router-link to="/dashboard/movies">Movies</router-link>
      </li>
      <li>
        <router-link to="/dashboard/categories">Categories</router-link>
      </li>

      <li>
        <button @click="logout" class="logout-btn">Logout</button>
      </li>
    </ul>
  </aside>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  methods: {
    logout() {
      const authStore = useAuthStore()
      authStore.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #343a40;
  color: white;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-menu li {
  margin-bottom: 15px;
}

.sidebar-menu a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.sidebar-menu a:hover {
  text-decoration: underline;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 20px;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
