import axios from 'axios';


export const contentModule = {
	state: () => ({
		posts: [
			{
				id: '1',
				title: 'Компонент',
				preview: 'https://images.unsplash.com/photo-1673960508121-3407ffa4bb15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80'

			}
		],
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

		sortedElementsSaved(state){
			return state.posts;
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



	},
	actions: {

		// async fetchPosts({state, commit}){
		// 	try{
		// 		// пишем коммит, так как работаем с экшеном,
		// 		// значением берем функцию setLoading из мутаций, вторым параметром передаем то, что хотим присвоить
		// 		commit('setIsPostsLoading', true);
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
		// 			commit('setIsPostsLoading', false);
		// 		}, 1000 )
				
		// 	} catch(e){
		// 		console.log(e);
		// 	} finally {}
		// },

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