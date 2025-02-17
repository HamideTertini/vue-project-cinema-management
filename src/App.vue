<template>
  <div class="app-container">
    <!-- Navbar (Shfaqet vetëm jashtë Dashboard-it) -->
    <Navbar v-if="!$route.path.startsWith('/dashboard')" class="navbar" />

    <!-- Main Content -->
    <main class="content">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer v-if="!$route.path.startsWith('/dashboard')" class="footer" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style scoped>
/* Background i përgjithshëm */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f4f4; /* Ngjyrë e hapur për sfondin */
  font-family: Arial, sans-serif;
}

/* Navbar */
.navbar {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
}

/* Përmbajtja kryesore */
.content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Footer */
.footer {
  background-color: #222;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 14px;
}
</style>
