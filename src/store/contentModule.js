import axios from 'axios';


export const contentModule = {
	state: () => ({

		posts: [],
		totalPages: '',
		statusIsLoading: false,

		catalog: [
			{
				id: '1',
				title: 'Беременность',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '2',
				title: 'Роды',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '3',
				title: 'Не роды',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '4',
				title: 'Да роды',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
		],

		currentCategory:{
			id: '1',
			title: 'Беременность',
			preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
		},



		subCategories: [
			{
				id: '1',
				title: 'Беременность',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '2',
				title: 'Роды',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '3',
				title: 'Не роды',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '4',
				title: 'Да роды',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
		],


		currentSubCategory: {
			id: '2',
			title: 'Роды',
			preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
		},


		posts: [
			{
				id: '1',
				title: 'Компонент в две или три строки, зависит от размера шрифта и места на экране',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '2',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '3',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			}
		],


		teachers: [
			{
				id: '1',
				title: 'Константин Константинопольский',
				preview: ''
			},
			{
				id: '2',
				title: 'Анна Ахматова',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '3',
				title: 'Константин Константинопольский',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
			{
				id: '4',
				title: 'Анна Ахматова T',
				preview: 'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
			},
		],


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

		sortedElements(state){
			return state.posts;
		},
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

		sortedElementsBegin(state){
			return state.posts;
		},

		recommendationElement(state){
			return state.post;
		},
		catalogList(state){
			return state.catalog;
		},
		subCategoriesList(state){
			return state.subCategories;
		},
		teachersList(state){
			return state.teachers;
		},

		sertificateslist(state){
			return state.sertificates;
		},

		currentCategory(state){
			return state.currentCategory;
		},
		currentSubCategory(state){
			return state.currentSubCategory;
		}
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
		// setPosts(state, posts){
		// 	state.posts = posts;
		// },
		// setIsPostsLoading(state, isPostsLoading){
		// 	state.isPostsLoading = isPostsLoading;
		// },
		// setSelectedSort(state, selectedSort){
		// 	state.selectedSort = selectedSort;
		// },
		// setSearchQuery(state, searchQuery){
		// 	state.searchQuery = searchQuery;
		// },
		// setPage(state, page){
		// 	state.page = page;
		// },
		// setTotalPages(state, totalPages){
		// 	state.totalPages = totalPages;
		// },

		setPosts(state, posts) {
			state.posts = posts;
		},

		setTotalPages(state, totalPages) {
			state.totalPages = totalPages
		},

		setStatusLoading(state, bool) {
			state.statusIsLoading = bool
		},

	},
	actions: {


		// async fetchPosts({state, commit}) {
		// 		try {
		// 				commit('setLoading', true);
		// 				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
		// 						params: {
		// 								_page: state.page,
		// 								_limit: state.limit
		// 						}
		// 				});
		// 				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
		// 				commit('setPosts', response.data)
		// 		} catch (e) {
		// 				console.log(e)
		// 		} finally {
		// 				commit('setLoading', false);
		// 		}
		// },

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




		async fetchPosts({state, commit}){
			try{
				// пишем коммит, так как работаем с экшеном,
				// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
				commit('setStatusLoading', true);
				// this.isPostsLoading = true;
				setTimeout( async () => {
					const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
						params: {
							// пишем state.page потому что это просто значения, не функции мутаций
							_page: state.page,
							_limit: state.limit,
						}
					});
					// this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
					commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
					
					// this.posts = response.data;
					commit('setPosts', response.data);
					
					// this.isPostsLoading = false;
					commit('setStatusLoading', false);
				}, 1000 )
				
			} catch(e){
				console.log(e);
			} finally {}
		},

		
		
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