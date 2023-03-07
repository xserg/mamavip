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

		// currUser: '',
		currUser: {
			"user": {
					"id": 22,
					"name": null,
					"email": "test@test.test",
					"birthdate": null,
					"phone": null,
					"is_mother": 0,
					"pregnancy_start": null,
					"baby_born": null,
					"photo": null,
					"photo_small": null,
					"to_delete": 0,
					"free_lecture_watched": null,
					"email_verified_at": null,
					"created_at": "2023-03-04T10:23:30.000000Z",
					"updated_at": "2023-03-04T10:23:30.000000Z",
					"watched_lectures_count": 0,
					"purchased_lectures_count": 0,
					"saved_lectures_count": 0
			},
			"access_token": "8|dUtsnrE8LAyptzXGMb8TbjKDXNutCgv8eYXlUa2T",
			"token_type": "Bearer"
		},
		
		statusIsLoading: false,

		// Отсюда сейчас идут "фильтры" по НЕПРОСМОТРЕННЫЕ, КУПЛЕННЫЕ, СОХРАНЕННЫЕ, ПРОСМОТРЕННЫЕ
		posts: [
			{
				id: '10',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '11',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '12',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
		],

		// unknow
		totalPages: '',

		// Список Лекторов
		teachersError: false,
		teachers: [],

		// Список Каталога
		catalogError: false,
		catalog: [],

		// Текущая Активная Категория
		currentCategoryError: false,
		currentCategory:{},

		// Текущей Активной Категории - Подкатегории
		currentCategoryElementsError: false,
		currentCategoryElements: {
			data: [],
		},

		// Текущая ПОДКАТЕГОРИЯ 
		currentSubCategoryError: false,
		currentSubCategory: {},

		currentSubCategoryElementsError: false,
		currentSubCategoryElements: { 
			data: [],
		},


		sertificates: [
			{
				id: '1',
				title: 'Сертификат',
				preview: 'https://images.unsplash.com/photo-1673960508121-3407ffa4bb15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80'
			},
			{
				id: '2',
				title: 'Сертификат',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '3',
				title: 'Сертификат',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '4',
				title: 'Сертификат',
				preview: 'https://images.unsplash.com/photo-1673960508121-3407ffa4bb15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80'
			},
		],


		post: 
			{
				id: '10',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},

		// isPostsLoading: true,
		// selectedSort: '',
		// searchQuery: '',
		// page: 1,
		// limit: 10,
		// totalPages: 0,
		// sortOptions: [
		// 	{value: 'title', name: 'По названию'},
		// 	{value: 'body', name: 'По содержанию'},
		// ]
	}),
	getters: {

		getCurrUser(state){
			return state.currUser;
		},
		// Универсальный статус-состоние загрузки
		currLoadingStatus(state){
			return state.statusIsLoading;
		},

		// unknow
		sortedElements(state){
			return state.posts;
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
		sortedElementsNotview(state){
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

		// Каталог Элементы(категории)
		catalogList(state){
			return state.catalog;
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

		initialiseVuexContent(state) {
			if (localStorage.getItem('currUserContent')) {
				state.currUser = JSON.parse(localStorage.currUserContent)
			}
		},

		setCurUserContent(state, user){
			state.currUser = user;
			// state.currUserToken = user.access_token;
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