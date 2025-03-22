import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css';


const app = createApp(App)
app.use(Toast)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')
