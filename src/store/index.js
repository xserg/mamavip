import { contentModule } from '@/store/contentModule'
import { auth } from "@/store/auth.module";

import { createStore } from 'vuex'

export default createStore({
  state: {
		currUser: '',
		// currUserToken: '',

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

		initialiseVuex(state) {
			if (localStorage.getItem('currUser')) {
				state.currUser = JSON.parse(localStorage.currUser)
			}
		},


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
		setAuthIn(state, user){
			state.isAuth = true;
			state.currUser = user;
			// state.currUserToken = user.access_token;
			// state.content.currUserToken = user.data.access_token;
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

		// async fetchAuth({state, commit}){
		// 	try{
		// 		// пишем коммит, так как работаем с экшеном,
		// 		// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
		// 		setTimeout( async () => {
		// 			const response = await axios.post('https://api.xn--80axb4d.online/v1/user/login', {
		// 			});
		// 			// commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
				
		// 			commit('setAuthIn', response.data);
					
		// 		}, 1000 )
				
		// 	} catch(e){
		// 		console.log(e);
		// 	} finally {}
		// },



  },
  modules: {
		content: contentModule,
		auth: auth,
  }
})
