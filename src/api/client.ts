import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
})

// ✅ Response Interceptor for Global Error Handling
// api.interceptors.response.use(
//   (response) => response, // success: just return
//   (error) => {
//     const status = error.response?.status
//     const message = error.response?.data?.message || error.message

//     // 🔐 Handle auth errors
//     if (status === 401 || status === 403) {
//       console.log('🔐 Auth error — redirect to login or logout user')
//       // e.g. logout(), clear state, navigate
//     }

//     // 🌍 Handle network error
//     if (error.message === 'Network Error' || !error.response) {
//       Alert.alert('Network Error', 'Please check your internet connection.')
//     } else {
//       // 🧠 Show general error
//       Alert.alert('Error', message)
//     }

//     // ❌ Still reject for local `try/catch` if needed
//     return Promise.reject(error)
//   }
// )