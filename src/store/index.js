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
		},
		setRegPage(state){
			state.newReg = true;
		},
		setAuthOut(state){
			state.isAuth = false;
		},
		setAuthIn(state){
			state.isAuth = true;
		},

		setHomeTab(state){
			state.curTab = 'home';
		},
		setProfileTab(state){
			state.curTab = 'profile';
		},
		
  },
  actions: {
  },
  modules: {
		content: contentModule,
  }
})
