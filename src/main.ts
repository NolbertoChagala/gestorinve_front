import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from "primevue/toastservice";
import Lara from '@primeuix/themes/lara';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';

import App from './App.vue'
import router from './router'

const app = createApp(App)

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

app.mount('#app')
