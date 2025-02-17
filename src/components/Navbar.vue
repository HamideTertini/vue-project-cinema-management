<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <router-link to="/">🎬 Cinema</router-link>
      </div>
      <ul class="nav-links" :class="{ 'nav-active': menuOpen }">
        <li><router-link to="/">Home</router-link></li>

        <li v-if="authStore.isAdmin"><router-link to="/dashboard">Dashboard</router-link></li>

        <li v-if="!authStore.isAuthenticated"><router-link to="/login">Login</router-link></li>
        <li v-if="authStore.isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>

      <div class="burger" @click="toggleMenu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  setup() {
    const authStore = useAuthStore()

    const logout = () => {
      authStore.logout()
    }

    return { authStore, logout }
  },
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
  },
}
</script>

<style scoped>
.navbar {
  background: #222 !important;
  color: white;
  padding: 15px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  display: inline-block;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #c69c6d;
}

.burger {
  display: none;
  cursor: pointer;
}

.burger .line {
  width: 25px;
  height: 3px;
  background: white;
  margin: 5px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: #222;
    width: 200px;
    padding: 15px;
    border-radius: 5px;
  }

  .nav-links.nav-active {
    display: flex;
  }

  .burger {
    display: block;
  }
}
</style>
