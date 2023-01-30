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

		scrollTop(){
			window.scrollTo(0,0);
		},

		setLogPage(state){
			state.newReg = false;
			this.scrollTop();
		},
		setRegPage(state){
			state.newReg = true;
			this.scrollTop();
		},
		setAuthOut(state){
			state.isAuth = false;
			this.scrollTop();
		},
		setAuthIn(state){
			state.isAuth = true;
			this.scrollTop();
		},

		setHomeTab(state){
			state.curTab = 'home';
			this.scrollTop();
		},
		setProfileTab(state){
			state.curTab = 'profile';
			this.scrollTop();
		},
		
  },
  actions: {
  },
  modules: {
		content: contentModule,
  }
})
