import { contentModule } from '@/store/contentModule'

import { createStore } from 'vuex'

export default createStore({
  state: {
		heightLock: false,
		isAuth: true,
		newReg: false,
		curTab: 'home',
		routerAnimation: '',
  },
  getters: {
		curRouterAnimate(state){
			return state.routerAnimation;
		},
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


		lockHeight(state){	
			state.heightLock = true;
		},
		unlockHeight(state){
			setTimeout(() => {
				state.heightLock = false;
      }, 100);
		},


		setRouterAnimate(state){
			state.routerAnimation = 'fade';
			setTimeout(() => {
				state.routerAnimation = '';
			}, 300);
		}

		
  },
  actions: {
  },
  modules: {
		content: contentModule,
  }
})
