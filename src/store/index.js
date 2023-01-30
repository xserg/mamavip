import { contentModule } from '@/store/contentModule'

import { createStore } from 'vuex'

export default createStore({
  state: {
		isAuth: true,
		newReg: false,
		curTab: 'home',
  },
  getters: {
  },
  mutations: {


		setLogPage(state){
			state.newReg = false;
			window.scrollTo(0,0);
		},
		setRegPage(state){
			state.newReg = true;
			window.scrollTo(0,0);
		},
		setAuthOut(state){
			state.isAuth = false;
			window.scrollTo(0,0);
		},
		setAuthIn(state){
			state.isAuth = true;
			window.scrollTo(0,0);
		},

		setHomeTab(state){
			state.curTab = 'home';
			window.scrollTo(0,0);
		},
		setProfileTab(state){
			state.curTab = 'profile';
			window.scrollTo(0,0);
		},
		
  },
  actions: {
  },
  modules: {
		content: contentModule,
  }
})
