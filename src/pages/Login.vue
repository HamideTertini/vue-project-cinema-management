<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit" class="auth-button">Login</button>
      </form>
      <p class="auth-footer">
        Nuk ke një llogari? <router-link to="/register">Regjistrohu</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const authStore = useAuthStore()
    const router = useRouter()

    const handleLogin = async () => {
      const success = await authStore.login({ email: email.value, password: password.value })
      if (success) {
        router.push('/dashboard')
      } else {
        alert('Login failed')
      }
    }

    return { email, password, handleLogin }
  },
}
</script>

<style scoped>
.auth-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
}

h2 {
  margin-bottom: 20px;
  color: #243b55;
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.auth-button {
  width: 100%;
  padding: 10px;
  background: #243b55;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.auth-button:hover {
  background: #d3d7df;
}

.auth-footer {
  margin-top: 15px;
  color: #555;
}

.auth-footer a {
  color: #243b55;
  text-decoration: none;
  font-weight: bold;
}
</style>
