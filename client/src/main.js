import './assets/style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()
const GOOGLE_CLIENT_ID = '843486099086-3jdokjd3e93e7f5vt9bqap9cflfov7dm.apps.googleusercontent.com'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: GOOGLE_CLIENT_ID
})

app.mount('#app')
