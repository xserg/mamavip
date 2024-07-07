import axios from 'axios';

import base from "@/base";

export const contentModule = {
	state: () => ({

		threadMess: '',

		requests: [],

		statusIsLoading: false,
		ajaxStatus: false,

		lectureAccess: '',

		viewedLectures: 0,

		savedLecturs: [],
		purchasedLecturs: [],
		watchedLecturs: [],
		notViewedLecturs: [],

		searchRes: [],
		searchResQuantity: '',

		// Отсюда сейчас идут "фильтры" по НЕПРОСМОТРЕННЫЕ, КУПЛЕННЫЕ, СОХРАНЕННЫЕ, ПРОСМОТРЕННЫЕ
		posts: [],

		notViewPosts: [],

		recommended: [],
		recommendeds: [],

		// unknow
		sertificatesStatus: false,
		totalPages: '',

		// Список Лекторов
		teachers: [],
		catTeachers: [],
		teachersError: false,

		todayLecture: '',
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
		currentSubCategorySameElements: {
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


		getLectureAccess(state){
			return state.lectureAccess;
		},

		getSertificatesStatus(state){
			return state.sertificatesStatus;
		},


		// Универсальный статус-состоние загрузки
		currLoadingStatus(state){
			return state.statusIsLoading;
		},
		getAjaxStatus(state){
			return state.ajaxStatus;
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

		getRecommendeds(state){
			return state.recommendeds;
		},

		getSaved(state){
			return state.savedLecturs;
		},
		getPurchased(state){
			return state.purchasedLecturs;
		},
		getWatched(state){
			return state.watchedLecturs;
		},
		getNotViewed(state){
			return state.notViewedLecturs;
		},


		sortedElementsPromopack(state){
			return state.posts;
		},


		// Лекторы Элементы
		teachersList(state){
			return state.teachers;
		},
		catTeachersList(state){
			return state.catTeachers;
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

		currentSubCategoryListFilter(state, rootState){
			if(state.currentSubCategoryElements.data){
				return state.currentSubCategorySameElements = state.currentSubCategoryElements.data.filter(p => p.id !== rootState.getCurrentLecture.id);
			}else{
				return state.currentSubCategorySameElements = [];
			}

		},

		getCurrentLecture(state){
			return state.currentLecture;
		},
		getTodayLecture(state){
			return state.todayLecture;
		},

		getRequests(state){
			return state.requests;
		},

		getSearch(state){
			return state.searchRes;
		},
		getSearchTotal(state){
			return state.searchResQuantity;
		},


		getViewedLectures(state){
			return state.viewedLectures;
		},



		// Временный вывод сертификатов (ПЕРЕДЕЛАТЬ ПОД ТЕКУЩЕГО ЛЕКТОРА)
		sertificateslist(state){
			return state.sertificates;
		},

	},
	mutations: {

		setLectureAccess(state, currLectureId) {
			state.lectureAccess = currLectureId;
		},

		setSertificatesStatus(state, bool) {
			state.sertificatesStatus = bool
		},
		// Вкл/Выкл статус загрузки
		setStatusLoading(state, bool) {
			state.statusIsLoading = bool
		},

		setAjaxStatus(state, bool) {
			state.ajaxStatus = bool
		},

		// unknow
		setPosts(state, posts) {
			state.posts = posts;
		},

		// Получить список лекторов (под axios запрос)
		setLectors(state, lectors) {
			state.teachers = lectors;
		},
		setCatLectors(state, lectors) {
			state.catTeachers = lectors;
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
		setRecommendeds(state, elements){
			state.recommendeds = elements;
		},

		setSaved(state, elements){
			state.savedLecturs = elements;
		},
		setPurchased(state, elements){
			state.purchasedLecturs = elements;
		},
		setWatched(state, elements){
			state.watchedLecturs = elements;
		},
		setNotViewed(state, elements){
			state.notViewedLecturs = elements;
		},

		setRequests(state, data){
			state.requests = data;
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

		setCurrentCategoryElements(state, categories){
			state.currentCategoryElements = categories;
		},
		setCurrentCategoryElementsError(state, bool){
			state.currentCategoryElementsError = bool;
		},

		// Обновить текущую Активную подкатегорию + ее элементы
		setCurrentSubCategory(state, category){
			state.currentSubCategory = category;
		},
		setCurrentSubCategoryError(state, bool){
			state.currentSubCategoryError = bool;
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
		setTodayLecture(state, lecture) {
			state.todayLecture = lecture;
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

		setThreadMess(state, mess){
			state.threadMess = mess;
		},

		setSearch(state, res){
			state.searchRes = res;
		},
		setSearchMore(state, res){
			// console.log(res);
			// state.searchRes = res;
			// const arr = res;
			// state.searchRes.push(arr);
			// const newArray = state.searchRes.concat(res);
			// state.searchRes = newArray;

			// res.foreach(r => {
			// 	state.searchRes.push(r);
			// })

			// const combinedArray = state.searchRes.concat(res);
			// state.searchRes = combinedArray;

			const arr1 = state.searchRes;
			const arr2 = res;
			const combinedArray = arr1.concat(arr2);
			const combine = [...combinedArray.filter(item => item !== '')]
			state.searchRes = combine;


			// const arr1 = state.searchRes;
			// const arr2 = res;
			// const comine = [...arr1.filter(item => item), ...arr2.filter(item => item)];
			// state.searchRes = comine;
		},
		setSearchTotal(state, count){
			state.searchResQuantity = count;
		},


		setViewedLectures(state, count){
			if(count){
				const viewedLecturesArray = count.filter(p => p.list_watched == 1);
				if(viewedLecturesArray.length){
					state.viewedLectures = viewedLecturesArray.length;
				}else{
					state.viewedLectures = 0;
				}
			}
			// this.currentSubCategoryList.data.length
		}


	},
	actions: {


		async fetchRequests({state, rootState, commit}){
			try{
				commit('setStatusLoading', true);
				setTimeout( async () => {
					const response = await axios.get('https://api.roddom1.vip/v1/threads', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					const requests = response.data;
					requests.data = requests.data.reverse();

					if(requests.data){
						requests.data.forEach(function(data, ind) {
							requests.data[ind].created_at = new Date(data.created_at);
						});
						commit('setRequests', requests);
					}else{
						commit('setRequests', requests);
					}

					commit('setStatusLoading', false);
					commit('setCatalogError', false);
				}, 50 )

			} catch(e){
				commit('setStatusLoading', false);
				commit('setCatalogError', true);
			} finally {}
		},


		async checkLectureAccess({state, rootState, commit}, lectureId){
			try{
				commit('setStatusLoading', true);
				commit('setLectureAccess', '');
				setTimeout( async () => {
					const response = await axios.post(base.API_URL + '/lecture/1/watch', {}, {
					// const response = await axios.post('https://api.roddom1.vip/v1/lecture/' + lectureId + '/watch', {}, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					// console.log(response.data.data);
					commit('setLectureAccess', response.data.data);
					commit('setStatusLoading', false);
				}, 50 )

			} catch(e){
				console.log(e);
			} finally {}
		},


		async fetchLectors({state, rootState, commit}){
			try{
				commit('setStatusLoading', true);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectors?per_page=100', {
					// const response = await axios.get('https://api.roddom1.vip/v1/lectors', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setLectors', response.data);
					commit('setStatusLoading', false);
				}, 50 )

			} catch(e){
				console.log(e);
			} finally {}
		},

		async fetchCatLectors({state, rootState, commit}, categorySlug){
			// console.log(categorySlug);
			try{
				commit('setStatusLoading', true);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectors/category/' + categorySlug, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setCatLectors', response.data);
					commit('setStatusLoading', false);
				}, 50 )

			} catch(e){
				console.log(e);
			} finally {}
		},


		async fetchCurrentLector({state, rootState, commit}, lectorId){
			try{
				commit('setStatusLoading', true);
				commit('setSertificatesStatus', false);
				commit('setEmptyCurrentLector');
				commit('setEmptyCurrentLectorElements');
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lector/' + lectorId, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setCurrentLector', response.data);
					commit('setStatusLoading', false);
					commit('setSertificatesStatus', true);
				},50 )

			} catch(e){
				console.log(e);
				commit('setStatusLoading', false);
			} finally {}
		},


		async fetchCurrentLectorElements({state, rootState, commit}, lectorId){
			try{
				commit('setStatusLoading', true);
				commit('setSertificatesStatus', false);
				commit('setEmptyCurrentLectorElements');
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectures?per_page=1000&page=1&filter%5Blector_id%5D=' + lectorId + '&sort=-created_at', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status){ commit('setStatusLoading', false); commit('setCurrentLectorElements', []);  } });
					commit('setCurrentLectorElements', response.data);
					commit('setStatusLoading', false);
					commit('setSertificatesStatus', true);
					commit('setCurrentLectorElementsError', false);
				}, 50 )

			} catch(e){
				commit('setStatusLoading', false);
				commit('setCurrentLectorElementsError', true);
			} finally {}
		},


		async fetchCatalog({rootState, state, commit}){
			try{
				commit('setStatusLoading', true);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/categories', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					});
					commit('setCatalog', response.data);
					commit('setStatusLoading', false);
					commit('setCatalogError', false);
				}, 50 )

			} catch(e){
				commit('setStatusLoading', false);
				commit('setCatalogError', true);
			} finally {}
		},


		async fetchRecommended({rootState, state, commit}){
			try{
				// const emptyData = '';
				commit('setStatusLoading', true);
				// commit('setRecommended', emptyData);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectures?per_page=30&page=1&filter%5Brecommended%5D=1', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  commit('setRecommended', 'e')  } });
					// console.log(response.data.data);
					if(response.data){
						commit('setRecommended', response.data.data);
					}
				}, 50 )
			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},


		async fetchRecommendeds({rootState, state, commit}){
			try{
				// const emptyData = '';
				commit('setStatusLoading', true);
				// commit('setRecommended', emptyData);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectures?per_page=30&page=1&filter%5Brecommended%5D=9', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  commit('setRecommended', 'e')  } });
					// console.log(response.data.data);
					if(response.data){
						commit('setRecommendeds', response.data.data);
					}
				}, 50 )
			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},




		// ПОЛУЧЕНИЕ КАТЕГОРИИ
		fetchCurrentCategory({state, rootState, commit}, slug){
			try{
				if(slug){
					commit('setStatusLoading', true);
					commit('setCurrentCategory', []);
					setTimeout( async () => {
						const response = await axios.get(base.API_URL + '/category/' + slug, {
							headers: {
								Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
							}
						});
						// console.log(response.data.data.data);
						// console.log(response.data);
						commit('setCurrentCategory', response.data.category);
						commit('setStatusLoading', false);
					}, 50 )
				}
			} catch(e){
				commit('setStatusLoading', false);
			} finally {}
		},


		// Получение Элементов Категорий (ТО есть Подкатегории)
		async fetchCurrentCategoryElements({state, rootState, commit}, slug){
				try{
					if(slug){
						commit('setStatusLoading', true);
						commit('setCurrentCategoryElements', []);
						setTimeout( async () => {
							const response = await axios.get(base.API_URL + '/category/' + slug, {
								headers: {
									Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
								}
							});
							commit('setCurrentCategoryElements', response.data.data);
							commit('setStatusLoading', false);
							commit('setCurrentCategoryElementsError', false);
						}, 50 )
					}
				} catch(e){
					commit('setStatusLoading', false);
					commit('setCurrentCategoryElementsError', true);
				} finally {}
		},



		//Подгрузка ПодкатегориИ
		fetchCurrentSubCategory({state, rootState, commit}, slug){
				try{
					if(slug){
						commit('setStatusLoading', true);
						commit('setCurrentSubCategory', '');
						setTimeout( async () => {
							const response = await axios.get(base.API_URL + '/category/' + slug, {
								headers: {
									Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
								}
							});
							// console.log(response.data);
							commit('setCurrentSubCategory', response.data.category);
							commit('setStatusLoading', false);
						}, 50 )
					}
				} catch(e){
					commit('setStatusLoading', false);
				} finally {}
		},

		// Подгрузка ЭЛЕМЕНТОВ Подкатегории
		async fetchCurrentSubCategoryElements({state, rootState, commit}, categoryId){
				try{
					if(categoryId){
						commit('setStatusLoading', true);
						commit('setCurrentSubCategoryElements', '');
						setTimeout( async () => {
						const response = await axios.get(base.API_URL + '/lectures?per_page=1000&page=1&filter%5Bcategory_id%5D=' + categoryId, {
							headers: {
								Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
							}
						});
						commit('setCurrentSubCategoryElements', response.data);
						commit('setStatusLoading', false);
						commit('setCurrentCategoryElementsError', false);
					}, 50 )
				}

				} catch(e){
					commit('setStatusLoading', false);
					commit('setCurrentSubCategoryElementsError', true);
				} finally {}
		},



		fetchCurrentSubCategoryAndElements({state, rootState, commit}, slug){
			try{
				if(slug){
					commit('setStatusLoading', true);
					commit('setCurrentSubCategory', '');
					setTimeout( async () => {
						const response = await axios.get(base.API_URL + '/category/' + slug, {
							headers: {
								Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
							}
						}).catch(function (error) { if (error.response.status){ commit('setStatusLoading', false); commit('setCurrentSubCategory', 'e' );  } });
						commit('setCurrentSubCategory', response.data.category);
						commit('setCurrentSubCategoryElements', '');
						setTimeout( async () => {
							const responseElems = await axios.get(base.API_URL + '/lectures?per_page=1000&page=1&filter%5Bcategory_id%5D=' + response.data.category.id, {
								headers: {
									Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
								}
							}).catch(function (error) { if (error.response.status){ commit('setStatusLoading', false); commit('setCurrentSubCategoryElements', []);  } });
							commit('setCurrentSubCategoryElements', responseElems.data);

							commit('setStatusLoading', false);
							commit('setCurrentCategoryElementsError', false);

						}, 50 )
					}, 50 )
				}

			} catch(e){
				commit('setStatusLoading', false);
			} finally {}
	},



		async fetchCurrentLecture({state, rootState, commit}, lectureId){
			try{
				if(lectureId){
					commit('setStatusLoading', true);
					commit('setEmptyCurrentLecture');
					setTimeout( async () => {
						const response = await axios.get(base.API_URL + '/lecture/' + lectureId, {
							headers: {
								Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
							}
						});
						commit('setCurrentLecture', response.data);
						commit('setStatusLoading', false);
						commit('setCurrentLectureError', false);

					}, 50 )
				}
			} catch(e){
				commit('setStatusLoading', false);
				commit('setCurrentLectureError', true);
			} finally {}
		},



		async fetchSaved({state, rootState, commit}, count){
			try{
				const emptyData = '';
				commit('setStatusLoading', true);
				commit('setSaved', emptyData);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectures?per_page=' + count + '&page=1&filter%5Bsaved%5D=1', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  commit('setSaved', 'e')  } });
					// console.log(response);
					if(response){
						if(response.data.data){
							commit('setSaved', response.data.data);
							commit('setStatusLoading', false);
						}else{
							commit('setStatusLoading', false);
						}
					}else{
						commit('setSaved', []);
						commit('setStatusLoading', false);
					}
				}, 50 )

			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},


		async fetchWatched({state, rootState, commit}, count){
			try{
				const emptyData = '';
				commit('setStatusLoading', true);
				commit('setWatched', emptyData);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectures?per_page=' + count + '&page=1&filter%5Blist-watched%5D=1', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  commit('setWatched', 'e')  } });
					if(response){
						if(response.data.data){
							commit('setWatched', response.data.data);
							commit('setStatusLoading', false);
						}else{
							commit('setStatusLoading', false);
						}
					}else{
						commit('setWatched', []);
						commit('setStatusLoading', false);
					}
				}, 50 )

			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},


		async fetchPurchased({state, rootState, commit}, count){
			try{
				const emptyData = '';
				commit('setStatusLoading', true);
				commit('setPurchased', emptyData);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/lectures?per_page=' + count + '&page=1&filter%5Bpurchased%5D=1', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  commit('setPurchased', 'e')  } });
					if(response){
						if(response.data.data){
							commit('setPurchased', response.data.data);
							commit('setStatusLoading', false);
						}else{
							commit('setStatusLoading', false);
						}
					}else{
						commit('setPurchased', []);
						commit('setStatusLoading', false);
					}
				}, 50 )

			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},


		async fetchNotViewed({state, rootState, commit}, count){
			try{
				// if(rootState.currUser.user.saved_lectures_count > 0 && rootState.currUser.user.watched_lectures_count > 0){}
					const emptyData = '';
					commit('setStatusLoading', true);
					commit('setNotViewed', emptyData);
					setTimeout( async () => {
						const response = await axios.get(base.API_URL + '/lectures?per_page=' + count + '&page=1&filter%5Bsaved%5D=1&filter%5Bnot_watched%5D=1', {
							headers: {
								Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
							}
						}).catch(function (error) { if (error.response.status !== 404){  commit('setNotViewed', 'e')  } });

						if(response){
							if(response.data.data){
								commit('setNotViewed', response.data.data);
								commit('setStatusLoading', false);
							}else{
								commit('setStatusLoading', false);
							}
						}else{
							commit('setNotViewed', []);
							commit('setStatusLoading', false);
						}
					}, 50 )
				// }
			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},


		async fetchPromopack({state, rootState, commit}, count){
			try{
				const emptyData = '';
				commit('setStatusLoading', true);
				commit('setPromopack', emptyData);
				setTimeout( async () => {
					const response = await axios.get(base.API_URL + '/promopack?per_page=' + count + '&page=1', {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  commit('setPromopack', 'e')  } });
					if(response){
						if(response.data){
							commit('setPromopack', response.data);
							commit('setStatusLoading', false);
						}else{
							commit('setStatusLoading', false);
						}
					}else{
						commit('setPromopack', []);
						commit('setStatusLoading', false);
					}
				}, 50 )

			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
					commit('setPromopackError', true);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
					commit('setPromopackError', false);
				}, 50);
			}
		},



		async fetchSearchTotal({state, rootState, commit}, category){
			try{
				// if(rootState.currUser.user.saved_lectures_count > 0 && rootState.currUser.user.watched_lectures_count > 0){}
					const emptyData = '';
					if(!category){
						var searchRequest = base.API_URL + '/lectures?per_page=100000&page=1&include=category&sort=-created_at';
					}else{
						const filterCategory = Number(category);
						var searchRequest = base.API_URL + '/lectures?per_page=100000&page=1&filter%5Bcategory_id%5D=' + filterCategory + '&include=category&sort=-created_at';
					}
					commit('setStatusLoading', true);
					commit('setSearchTotal', emptyData);
					setTimeout( async () => {
						const response = await axios.get(searchRequest, {
							headers: {
								Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
							}
						}).catch(function (error) { if (error.response.status !== 404){  commit('setSearchTotal', 'e')  } });

						if(response){
							if(response.data.data){
								commit('setSearchTotal', response.data.data.length);
								commit('setStatusLoading', false);
							}else{
								commit('setStatusLoading', false);
							}
						}else{
							commit('setSearchTotal', 0);
							commit('setStatusLoading', false);
						}
					}, 50 )
				// }
			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},

		async fetchSearch({state, rootState, commit}, confs){
			try{
				// if(rootState.currUser.user.saved_lectures_count > 0 && rootState.currUser.user.watched_lectures_count > 0){}
				const emptyData = '';
				if(!confs.page){
					var page = 1;
				}else{
					var page = confs.page;
				}
				if(!confs.category){
					var searchRequest = base.API_URL + '/lectures?per_page=12&page=' + page + '&include=category&sort=-created_at';
				}else{
					const filterCategory = Number(confs.category);
					var searchRequest = base.API_URL + '/lectures?per_page=12&page=' + page + '&filter%5Bcategory_id%5D=' + filterCategory + '&include=category&sort=-created_at';
				}
				commit('setStatusLoading', true);
				commit('setSearch', emptyData);
				setTimeout( async () => {
					const response = await axios.get(searchRequest, {
						headers: {
							Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  commit('setSearch', 'e')  } });

					if(response){
						if(response.data.data){
							commit('setSearch', response.data.data);
							commit('setStatusLoading', false);
						}else{
							commit('setStatusLoading', false);
						}
					}else{
						commit('setSearch', []);
						commit('setStatusLoading', false);
					}
				}, 50 )
				// }
			} catch(e){
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					commit('setStatusLoading', false);
				}, 50);
			}
		},


		async fetchSearchMore({state, rootState, commit}, confs){
			try{
				// if(rootState.currUser.user.saved_lectures_count > 0 && rootState.currUser.user.watched_lectures_count > 0){}
					// const emptyData = '';
					if(!confs.page){
						var page = 1;
					}else{
						var page = confs.page;
					}
					if(!confs.category){
						var searchRequest = base.API_URL + '/lectures?per_page=12&page=' + page + '&include=category&sort=-created_at';
					}else{
						const filterCategory = Number(confs.category);
						var searchRequest = base.API_URL + '/lectures?per_page=12&page=' + page + '&filter%5Bcategory_id%5D=' + filterCategory + '&include=category&sort=-created_at';
					}
					commit('setAjaxStatus', true);
					// commit('setSearchMore', emptyData);
					setTimeout( async () => {
						const response = await axios.get(searchRequest, {
							headers: {
								Authorization: rootState.currUser.token_type + ' ' + rootState.currUser.access_token,
							}
						}).catch(function (error) { if (error.response.status !== 404){  commit('setSearchMore', 'e')  } });

						if(response){
							// console.log(response.data.data);
							if(response.data.data){
								commit('setSearchMore', response.data.data);
								commit('setAjaxStatus', false);
							}else{
								commit('setAjaxStatus', false);
							}
						}else{
							commit('setSearchMore', []);
							commit('setAjaxStatus', false);
						}
					}, 50 )
				// }
			} catch(e){
				setTimeout( () => {
					// commit('setStatusLoading', false);
				}, 50);
			} finally {
				setTimeout( () => {
					// commit('setStatusLoading', false);
				}, 50);
			}
		},



	},
	namespaced: true,
}
