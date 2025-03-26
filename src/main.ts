import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import ToastService from "primevue/toastservice";
import Lara from '@primeuix/themes/lara';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';


import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css';


const app = createApp(App)
app.use(Toast)
app.use(ToastService)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: false || 'none',
        },
    }
});
app.use(ConfirmationService);
app.component('ConfirmDialog', ConfirmDialog);
app.use(ToastService);
app.component('Button', Button);

app.mount('#app')
