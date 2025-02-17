import { defineStore } from 'pinia'
import axios from '../axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => {
      console.log('Current role in Vue (after refresh):', state.role) // SHIKO KËTË NË CONSOLE
      return state.role === 'admin'
    },
  }, // Këtu është vendosur `,` për të ndarë `getters` dhe `actions`

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/login', credentials)

        console.log('Login Response:', response.data) // Kontrollo nëse `role` vjen nga backend

        this.token = response.data.token
        this.role = response.data.role || 'user' // Sigurohu që nuk mbetet undefined

        localStorage.setItem('token', this.token)
        localStorage.setItem('role', this.role)

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        console.log('Role saved in state:', this.role)
        console.log('Role saved in localStorage:', localStorage.getItem('role'))

        return true
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.')
      }
    },

    async register(userData) {
      try {
        const response = await axios.post('/register', userData)
        this.token = response.data.token
        this.role = response.data.role

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('role', response.data.role)

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return true
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Registration failed. Please try again.')
      }
    },

    logout() {
      this.token = null
      this.role = null

      localStorage.removeItem('token')
      localStorage.removeItem('role')

      delete axios.defaults.headers.common['Authorization']
    },
  },
})
