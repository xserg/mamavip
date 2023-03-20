import { contentModule } from '@/store/contentModule'
import { useTimer, useStopwatch, useTime } from 'vue-timer-hook'
// import { auth } from "@/store/auth.module";
import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {

		loadingStatus: false,
		availableTimer: '',

		infos: [],
		currUser: '',
		// currUserToken: '',
		categoryy: [],

		heightLock: false,
		isAuth: true,
		newReg: false,
		curTab: 'home',
		routerAnimation: '',
		currentFaq: {},
  },

  getters: {

		getAvailableTimer(state){
			return state.availableTimer;
		},
		curRouterAnimate(state){
			return state.routerAnimation;
		},
		getCurrUser(state){
			return state.currUser;
		},
		getInfos(state){
			return state.infos;
		},
		getLoadingStatus(state){
			return state.loadingStatus;
		},

		getCurrentFaq(state){
			return state.currentFaq;
		},

		getOldLecture(state){
			return state.oldLecture;
		},

  },

  mutations: {


		setLoadingStatus(state, bool){
			state.loadingStatus = bool;
		},


		setCurrentFaq(state, faq){
			state.currentFaq = faq;
		},

		setAvailableTimer(state, timerYes){
			const time = new Date();
			const timeDiff = Math.floor((new Date(timerYes) - new Date()) / 1000);
			// console.log(timeDiff); 
			if(timeDiff > 0){
				time.setSeconds(time.getSeconds() + timeDiff );
				const timerCounter = useTimer(time);
				state.availableTimer = timerCounter;
			}else{
				state.availableTimer = false;
			}
		},

		initialiseVuex(state) {
			if (localStorage.getItem('infos')) {
				state.infos = JSON.parse(localStorage.infos)
			}
			if (localStorage.getItem('currUser')) {
				state.currUser = JSON.parse(localStorage.currUser)
			}
			if (localStorage.getItem('currentCategory')) {
				state.content.currentCategory = JSON.parse(localStorage.currentCategory);
			}
			if (localStorage.getItem('currentCategoryElements')) {
				state.content.currentCategoryElements = JSON.parse(localStorage.currentCategoryElements)
			}
			if (localStorage.getItem('currentSubCategory')) {
				state.content.currentSubCategory = JSON.parse(localStorage.currentSubCategory)
			}
			if (localStorage.getItem('currentSubCategoryElements')) {
				state.content.currentSubCategoryElements = JSON.parse(localStorage.currentSubCategoryElements)
			}
			if (localStorage.getItem('currentLecture')) {
				state.content.currentLecture = JSON.parse(localStorage.currentLecture)
			}
			if (localStorage.getItem('currentLector')) {
				state.content.currentLector = JSON.parse(localStorage.currentLector)
			}
		},
		
		switchBabyBornStatus(state){
			if(state.currUser.user.is_mother == 0){
				state.currUser.user.is_mother = 1;
			}else{
				state.currUser.user.is_mother = 0;
			}
		},

		setInfos(state, data){
			state.infos = data;
		},


		setUserData(state, data){
			state.currUser.user = data.data;
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
			state.currUser = [];
			window.scrollTo(0,0);
		},
		
		setAuthIn(state, user){
			window.scrollTo(0,0);
			state.currUser = user;
			// state.isAuth = true;
			// state.currUserToken = user.access_token;
			// state.content.currUserToken = user.data.access_token;
			
			// actions.fetchInfos();

			// const responseInfos = axios.get('https://api.xn--80axb4d.online/v1/app/info', {
			// 	headers: {
			// 		Authorization: user.token_type + ' ' + user.access_token,
			// 	}
			// });
			// console.log(responseInfos.data);
			// state.infos = responseInfos.data;

		},

		changeUserData(state, user){
			// state.currUser.user.name = user.name;
			// state.currUser.user.birthday = user.birthdate;
			// state.currUser.user.phone = user.phone;
			// state.currUser.user.baby_born = user.baby_born;
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


		async fetchUserData({state, commit}){
			try{
				commit('setLoadingStatus', true);
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/user/profile', {
						headers: {
							Authorization: state.currUser.token_type + ' ' + state.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status == 401){  commit('setAuthOut')  } });
					// console.log(response.data);
					commit('setUserData', response.data);
					// console.log(response.data);
					if(response.data.data.next_free_lecture_available){
						commit('setAvailableTimer', response.data.data.next_free_lecture_available)
					}else{
						commit('setAvailableTimer', false)
					}
					
					
					
					commit('setLoadingStatus', false);
				}, 50 )	
			} 
			catch(e){} 
			finally {}

			
		},

		async fetchInfos({state, commit}){
			try{
				commit('setLoadingStatus', true);
				commit('setInfos', '');
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/app/info', {
						headers: {
							Authorization: state.currUser.token_type + ' ' + state.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status == 401){  commit('setAuthOut')  } });
					commit('setInfos', response.data);
					commit('setLoadingStatus', false);
				}, 50 )
				
			} catch(e){
				console.log(e);
			} finally {}
		},

		// async fetchInfos({state, commit}){
		// 	console.log('Запущен фетчинфос');
		// 	try{
		// 		setTimeout( async () => {
		// 			const response = await axios.get('https://api.xn--80axb4d.online/v1/app/info', {
		// 				headers: {
		// 					Authorization: state.currUser.token_type + ' ' + state.currUser.access_token,
		// 				}
		// 			});
		// 			commit('setInfos', response.data);
		// 		}, 1000 )
				
		// 	} catch(e){
		// 		// console.log('Ошибка');
		// 	} finally {}
		// },



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
		// auth: auth,
  }
})
