import { createApp } from 'vue'
import './styles/global.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './utils/router';
import App from './App.vue';

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false || 'none',
        }
    }
});
app.mount('#app')
