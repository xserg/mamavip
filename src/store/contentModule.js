import axios from 'axios';

// export const HTTP = axios.create({
//   baseURL: `https://api.xn--80axb4d.online/v1/`,
// 	// baseURL: 'http://jsonplaceholder.typicode.com/',
// 	// headers: { X-XSRF-TOKEN: `${token}`}, 
// 	headers: {
//     Authorization: 'Bearer ' + '1|S5UQcrN2vnXSUfc8KoNh5xgEeipB2gyobh5Ms7IO',
//   }
// })


export const contentModule = {
	state: () => ({

		statusIsLoading: false,

		// Отсюда сейчас идут "фильтры" по НЕПРОСМОТРЕННЫЕ, КУПЛЕННЫЕ, СОХРАНЕННЫЕ, ПРОСМОТРЕННЫЕ
		posts: [],

		notViewPosts: [],

		recommended: [],

		// unknow
		sertificatesStatus: false,
		totalPages: '',

		// Список Лекторов
		teachers: [],
		teachersError: false,

		currentLector: {},
		currentLectorError: false,

		currentLectorElements:  [],
		currentLectorElementsError: false,

		// Список Каталога
		catalog: [],
		catalogError: false,

		promopack: [],
		promopackError: false,

		// Текущая Активная Категория
		currentCategory:{},
		currentCategoryError: false,

		// Текущей Активной Категории - Подкатегории
		currentCategoryElements: {
			data: [],
		},
		currentCategoryElementsError: false,

		// Текущая ПОДКАТЕГОРИЯ 
		currentSubCategory: {},
		currentSubCategoryError: false,

		currentSubCategoryElements: { 
			data: [],
		},
		currentSubCategoryElementsError: false,


		currentLecture: {},
		currentLectureError: {},

		post: 
			{
				id: '10',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},

	}),
	getters: {

		getSertificatesStatus(state){
			return state.sertificatesStatus;
		},


		// Универсальный статус-состоние загрузки
		currLoadingStatus(state){
			return state.statusIsLoading;
		},

		// unknow
		sortedElements(state){
			return state.posts;
		},

		getRecommended(state){
			const recommend = state.recommended;
			const recommendLengh = state.recommended.length;
			if(recommendLengh >= 1){
				const rand = Math.floor(1 + Math.random() * (recommend.length + 1 - 1));
				const randEl = recommend[rand - 1];
				return randEl;
			}else{
				const randEl = false;
				return randEl;
			}
		},

		// Лекции Пользователя (ФИЛЬТР)
		sortedElementsSaved(state){
			return state.posts;
		},
		sortedElementsBought(state){
			return state.posts;
		},
		sortedElementsViewed(state){
			return state.posts;
		},
		
		sortedElementsPromopack(state){
			return state.posts;
		},

		// unknow
		sortedElementsBegin(state){
			return state.posts;
		},

		// Рекомендованное: ЭЛЕМЕНТ
		recommendationElement(state){
			return state.post;
		},

		// Лекторы Элементы
		teachersList(state){
			return state.teachers;
		},
		getCurrentLector(state){
			return state.currentLector;
		},
		getCurrentLectorElements(state){
			return state.currentLectorElements;
		},

		// Каталог Элементы(категории)
		catalogList(state){
			return state.catalog;
		},
		getPromopack(state){
			return state.promopack;
		},

		// Текущая Категория
		currentCategory(state){
			return state.currentCategory;
		},
		// Элементы Категории (подкатегории)
		currentCategoryList(state){
			return state.currentCategoryElements;
		},

		// Текущая Подкатегория
		currentSubCategory(state){
			return state.currentSubCategory;
		},
		// Элементы Подкатегории 
		currentSubCategoryList(state){
			return state.currentSubCategoryElements;
		},

		getCurrentLecture(state){
			return state.currentLecture;
		},
		


		// Временный вывод сертификатов (ПЕРЕДЕЛАТЬ ПОД ТЕКУЩЕГО ЛЕКТОРА)
		sertificateslist(state){
			return state.sertificates;
		},
		
		
		// sortedPosts(state){
		// 	return [...state.posts].sort( (post1, post2) => {
		// 		return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
		// 	} );
		// },
		// sortedAndSearchedPosts(state, getters){
		// 	return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery))
		// }
	},
	mutations: {

		// initialiseVuexContent(state) {
		// 	if (localStorage.getItem('currentCategory')) {
		// 		state.currentCategory = JSON.parse(localStorage.currentCategory)
		// 	}
		// 	if (localStorage.getItem('currentCategoryElements')) {
		// 		state.currentCategoryElements = JSON.parse(localStorage.currentCategoryElements)
		// 	}
		// 	if (localStorage.getItem('currentSubCategory')) {
		// 		state.currentSubCategory = JSON.parse(localStorage.currentSubCategory)
		// 	}
		// 	if (localStorage.getItem('currentSubCategoryElements')) {
		// 		state.currentSubCategoryElements = JSON.parse(localStorage.currentSubCategoryElements)
		// 	}
		// },


		setSertificatesStatus(state, bool) {
			state.sertificatesStatus = bool
		},
		// Вкл/Выкл статус загрузки
		setStatusLoading(state, bool) {
			state.statusIsLoading = bool
		},

		// unknow
		setPosts(state, posts) {
			state.posts = posts;
		},

		// Получить список лекторов (под axios запрос)
		setLectors(state, lectors) {
			state.teachers = lectors;
		},
		setCurrentLector(state, lector){
			state.currentLector = lector;
		},
		setCurrentLectorError(state, bool){
			state.currentLectorError = bool;
		},
		setEmptyCurrentLector(state){
			state.currentLector = [];
		},

		setEmptyCurrentLectorElements(state){
			state.currentLectorElements = [];
		},
		setCurrentLectorElements(state, elements){
			state.currentLectorElements = elements;
		},
		setCurrentLectorElementsError(state, bool){
			state.currentLectorElementsError = bool;
		},


		setEmptyPromopack(state){
			state.promopack = [];
		},
		setPromopack(state, elements){
			state.promopack = elements;
		},
		setPromopackError(state, bool){
			state.promopackError = bool;
		},

		setRecommended(state, elements){
			state.recommended = elements;
		},

		// Получить список каталога-категорий (под axios запрос)
		setCatalog(state, categories) {
			state.catalog = categories;
		},
		setCatalogError(state, bool){
			state.catalogError = bool;
		},

		// Обновить текущую активную категорию + ее элементы
		setCurrentCategory(state, category) {
			state.currentCategory = category;
		},
		setCurrentCategoryError(state, bool){
			state.currentCategoryError = bool;
		},
		setEmptyCurrentCategoryElements(state){
			state.currentCategoryElements = [];
		},
		setCurrentCategoryElements(state, categories){
			state.currentCategoryElements = categories;
		},
		setCurrentCategoryElementsError(state, bool){
			state.currentCategoryElementsError = bool;
		},

		// Обновить текущую Активную подкатегорию + ее элементы
		setCurrentSubCategory(state, categories){
			state.currentSubCategory = categories;
		},
		setCurrentSubCategoryError(state, bool){
			state.currentSubCategoryError = bool;
		},
		setEmptyCurrentSubCategoryElements(state){
			state.currentSubCategoryElements = [];
		},
		setCurrentSubCategoryElements(state, categories){
			state.currentSubCategoryElements = categories;
		},
		setCurrentSubCategoryElementsError(state, bool){
			state.currentSubCategoryElementsError = bool;
		},

		setEmptyCurrentLecture(state){
			state.currentLecture = {};
		},
		setCurrentLecture(state, lecture) {
			state.currentLecture = lecture;
		},
		setCurrentLectureError(state, bool){
			state.currentLectureError = bool;
		},


		// unknow
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages
		},


	},
	actions: {

		async fetchLectors({state, rootState, commit}){
			try{
				// пишем коммит, так как работаем с экшеном,
				// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
				commit('setStatusLoading', true);
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/lectors', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					// commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
					commit('setLectors', response.data);
					commit('setStatusLoading', false);
				}, 1000 )
				
			} catch(e){
				console.log(e);
			} finally {}
		},


		async fetchCurrentLector({state, rootState, commit}, lectorId){
			try{
				// пишем коммит, так как работаем с экшеном,
				// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
				commit('setStatusLoading', true);
				commit('setSertificatesStatus', false);
				commit('setEmptyCurrentLector');
				commit('setEmptyCurrentLectorElements');
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/lector/' + lectorId, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					// commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
					commit('setCurrentLector', response.data);
					commit('setStatusLoading', false);
					commit('setSertificatesStatus', true);
				}, 1000 )
				
			} catch(e){
				console.log(e);
				commit('setStatusLoading', false);
			} finally {}
		},


		async fetchCurrentLectorElements({state, rootState, commit}, lectorId){
			try{
				// пишем коммит, так как работаем с экшеном,
				// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
				commit('setStatusLoading', true);
				commit('setSertificatesStatus', false);
				commit('setEmptyCurrentLectorElements');
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/lectures?per_page=1000&page=1&filter%5Blector_id%5D=' + lectorId + '&sort=-created_at', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					// commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
					commit('setCurrentLectorElements', response.data);
					commit('setStatusLoading', false);
					commit('setSertificatesStatus', true);
					commit('setCurrentLectorElementsError', false);
				}, 1000 )
				
			} catch(e){
				commit('setStatusLoading', false);
				commit('setCurrentLectorElementsError', true);
			} finally {}
		},



		async fetchCatalog({rootState, state, commit}){
			try{
				commit('setStatusLoading', true);
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/categories', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setCatalog', response.data);
					commit('setStatusLoading', false);
					commit('setCatalogError', false);
				}, 1000 )
				
			} catch(e){
				commit('setStatusLoading', false);
				commit('setCatalogError', true);
			} finally {}
		},

		async fetchPromopack({state, rootState, commit}){
			try{
				commit('setStatusLoading', true);
				commit('setEmptyPromopack');
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/promopack?per_page=8&page=1', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setPromopack', response.data);
					commit('setStatusLoading', false);
					commit('setPromopackError', false);
				}, 1000 )
				
			} catch(e){
				commit('setStatusLoading', false);
				commit('setPromopackError', true);
			} finally {}
		},





		async fetchCategoryElements({state, rootState, commit}, slug){
			try{
				commit('setStatusLoading', true);
				commit('setEmptyCurrentCategoryElements');
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/category/' + slug, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setCurrentCategoryElements', response.data);
					commit('setStatusLoading', false);
					commit('setCurrentCategoryElementsError', false);
				}, 1000 )
			} catch(e){
				commit('setStatusLoading', false);
				commit('setCurrentCategoryElementsError', true);
			} finally {}
		},



		async fetchSubCategoryElements({state, rootState, commit}, categoryId){
			try{
				commit('setStatusLoading', true);
				commit('setEmptyCurrentSubCategoryElements');
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/lectures?per_page=15&filter%5Bcategory_id%5D=' + categoryId, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setCurrentSubCategoryElements', response.data);
					commit('setStatusLoading', false);
					commit('setCurrentCategoryElementsError', false);
				}, 1000 )
				
			} catch(e){
				commit('setStatusLoading', false);
				commit('setCurrentSubCategoryElementsError', true);
			} finally {}
		},


		async fetchCurrentLecture({state, rootState, commit}, lectureId){
			try{
				commit('setStatusLoading', true);
				commit('setEmptyCurrentLecture');
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/lecture/' + lectureId, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setCurrentLecture', response.data);
					commit('setStatusLoading', false);
					commit('setCurrentLectureError', false);
				}, 1000 )
				
			} catch(e){
				commit('setStatusLoading', false);
				commit('setCurrentLectureError', true);
			} finally {}
		},


		async fetchRecommended({state, rootState, commit}){
			try{
				commit('setStatusLoading', true);
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/lectures?per_page=30&page=1&filter%5Bwatched%5D=1&filter%5Brecommended%5D=1&sort=-created_at', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setRecommended', response.data.data);
					commit('setStatusLoading', false);
				}, 1000 )
				
			} catch(e){
				commit('setStatusLoading', false);
			} finally {}
		},



		async fetchCategoryAndSubcategory({state, rootState, commit}, subcategory_id){
			// console.log(subcategory_id);
			try{
				const emptyData = [];
				commit('setStatusLoading', true);
				// commit('setCurrentCategory', emptyData);
				// commit('setCurrentSubCategory', emptyData);
				setTimeout( async () => {
					const response = await axios.get('https://api.xn--80axb4d.online/v1/category/' + subcategory_id, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					console.log(response);
					// commit('setCurrentCategory', emptyData);
					// commit('setCurrentSubCategory', emptyData);
					commit('setStatusLoading', false);
				}, 500 )
			} catch(e){
				commit('setStatusLoading', false);
			} finally {}
		},
		

		// async loadMorePosts({state, commit}) {
		// 		try {
		// 				commit('setPage', state.page + 1)
		// 				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
		// 						params: {
		// 								_page: state.page,
		// 								_limit: state.limit
		// 						}
		// 				});
		// 				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
		// 				commit('setPosts', [...state.posts, ...response.data]);
		// 		} catch (e) {
		// 				console.log(e)
		// 		}
		// },




		// async fetchPosts({state, commit}){
		// 	try{
		// 		// пишем коммит, так как работаем с экшеном,
		// 		// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
		// 		commit('setStatusLoading', true);
		// 		// this.isPostsLoading = true;
		// 		setTimeout( async () => {
		// 			const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
		// 				params: {
		// 					// пишем state.page потому что это просто значения, не функции мутаций
		// 					_page: state.page,
		// 					_limit: state.limit,
		// 				}
		// 			});
		// 			// this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
		// 			commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
					
		// 			// this.posts = response.data;
		// 			commit('setPosts', response.data);
					
		// 			// this.isPostsLoading = false;
		// 			commit('setStatusLoading', false);
		// 		}, 1000 )
				
		// 	} catch(e){
		// 		console.log(e);
		// 	} finally {}
		// },



		// async fetchLectors({state, commit}){
		// 	try{
		// 		// пишем коммит, так как работаем с экшеном,
		// 		// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
		// 		commit('setStatusLoading', true);
		// 		setTimeout( async () => {
		// 			const response = await HTTP.get('/lectors', {
		// 			});
		// 			// commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
				
		// 			commit('setLectors', response.data);
					
		// 			commit('setStatusLoading', false);
		// 		}, 1000 )
				
		// 	} catch(e){
		// 		console.log(e);
		// 	} finally {}
		// },


		// axios.create({
		// 	baseURL: `https://api.xn--80axb4d.online/v1/`,
		// 	// baseURL: 'http://jsonplaceholder.typicode.com/',
		// 	// headers: { X-XSRF-TOKEN: `${token}`}, 
		// 	headers: {
		// 		Authorization: 'Bearer ' + '1|S5UQcrN2vnXSUfc8KoNh5xgEeipB2gyobh5Ms7IO',
		// 	}


		
		// async loadMorePosts({state, commit}){
		// 	try{
		// 		setTimeout( async () => {
					
		// 			// this.page += 1;
		// 			commit('setPage', state.page += 1);

		// 			const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
		// 				params: {
		// 					_page: state.page,
		// 					_limit: state.limit,
		// 				}
		// 			});
		// 			// this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
		// 			commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
					
		// 			// this.posts = [...this.posts, ...response.data];
		// 			commit('setPosts', [...state.posts, ...response.data] );
		// 		}, 10 )
				
		// 	} catch(e){
		// 		// alert('Ошибка');
		// 		console.log(e);
		// 	} finally {}
		// },

	},
	namespaced: true,
}