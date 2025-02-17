import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import Dashboard from '../pages/Dashboard.vue'
import Movies from '../pages/Movies.vue'
import Categories from '../pages/Categories.vue'
import CinemaLanding from '../pages/CinemaLanding.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import MovieDetails from '../pages/MovieDetails.vue'

const routes = [
  { path: '/', name: 'CinemaLanding', component: CinemaLanding },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/movies/:id', name: 'MovieDetails', component: MovieDetails }, // ✅ Saktë

  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/dashboard/movies',
    name: 'Movies',
    component: Movies,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/dashboard/categories',
    name: 'Categories',
    component: Categories,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login') // Nëse nuk është i kyçur, ridrejto në login
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/') // Nëse nuk është admin, ridrejto në faqen kryesore
  } else {
    next()
  }
})

export default router
