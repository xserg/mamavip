import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import store from '@/store' 

import components from '@/components/Elements/' // импорт всех компонентов

const app = createApp(App);

// пробежать по циклу компонентов, чтобы все были подключены
components.forEach(component => {
	app.component(component.name, component);
});


app.use(store).use(router).mount('#app')
