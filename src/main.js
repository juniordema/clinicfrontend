import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

const app = createApp(App)

// Utiliser i18n
app.use(i18n)

// Utiliser Pinia pour la gestion d'état
app.use(createPinia())

// Utiliser le routeur
app.use(router)

app.mount('#app')
