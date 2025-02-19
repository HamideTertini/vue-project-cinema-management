<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Cinema Management. All rights reserved.</p>
      <ul class="footer-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/categories">Categories</router-link></li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #222;
  color: white;
  text-align: center;
  padding: 15px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}

.container {
  max-width: 1400px;

  padding: 0 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.footer-links li {
  display: inline;
  margin: 0 10px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
