import { createApp } from 'vue'
import './styles/global.css'
import HomeView from './views/Dashboard.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './utils/router';

const app = createApp(HomeView)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app')
