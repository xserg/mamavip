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

store.subscribe( (mutation, state) => {
	localStorage.setItem('currUser', JSON.stringify(state.currUser));  
	localStorage.setItem('currUserContent', JSON.stringify(state.content.currUser));  
})

app.use(store).use(router).mount('#app')
