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
  background: linear-gradient(135deg, #1f1f1f, #292929);
  color: white;
  padding: 15px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease-in-out;
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
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.logo a:hover {
  color: #f4a261;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 25px;
  transition: all 0.3s ease-in-out;
}

.nav-links li {
  display: inline-block;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background: #f4a261;
  color: #222;
  transform: scale(1.05);
}

.burger {
  display: none;
  cursor: pointer;
}

.burger .line {
  width: 30px;
  height: 3px;
  background: white;
  margin: 6px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: rgba(30, 30, 30, 0.95);
    width: 220px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .nav-links.nav-active {
    display: flex;
  }

  .nav-links li {
    margin: 10px 0;
  }

  .burger {
    display: block;
  }

  .burger.open .line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .burger.open .line:nth-child(2) {
    opacity: 0;
  }

  .burger.open .line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>
