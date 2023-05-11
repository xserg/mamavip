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
	localStorage.setItem('infos', JSON.stringify(state.infos)); 
	localStorage.setItem('currUser', JSON.stringify(state.currUser)); 
	localStorage.setItem('currentCategory', JSON.stringify(state.content.currentCategory));
	localStorage.setItem('currentCategoryElements', JSON.stringify(state.content.currentCategoryElements));  
	localStorage.setItem('currentSubCategory', JSON.stringify(state.content.currentSubCategory));  
	localStorage.setItem('currentSubCategoryElements', JSON.stringify(state.content.currentSubCategoryElements));    
	localStorage.setItem('currentLecture', JSON.stringify(state.content.currentLecture));    
	localStorage.setItem('currentLector', JSON.stringify(state.content.currentLector)); 
	localStorage.setItem('todayLecture', JSON.stringify(state.content.todayLecture));  
})

app.use(store).use(router).mount('#app')
