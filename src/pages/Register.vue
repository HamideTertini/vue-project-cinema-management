<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <input type="text" v-model="name" placeholder="Full Name" required />
        </div>
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <div class="input-group">
          <input
            type="password"
            v-model="password_confirmation"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" class="register-btn">Register</button>
      </form>
      <p>Ke një llogari? <router-link to="/login" class="link">Kyçu</router-link></p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const authStore = useAuthStore()
    const router = useRouter()
    const errorMessage = ref('')

    const handleRegister = async () => {
      try {
        await authStore.register({
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        })
        router.push('/login')
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message)
        errorMessage.value = error.response?.data.errors
          ? Object.values(error.response.data.errors).flat().join(' ')
          : 'Registration failed'
      }
    }

    return { name, email, password, password_confirmation, handleRegister, errorMessage }
  },
}
</script>

<style scoped>
.register-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  color: #333;
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

.register-btn {
  width: 100%;
  padding: 10px;
  border: none;
  background: #141e30;
  color: white;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

.register-btn:hover {
  background: #cecdcf;
}

.link {
  color: #141e30;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
