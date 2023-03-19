<template>

	<div class="mainContainer theLecture" :class="{fixed: heightLock}">
		<div class="contentWrap">

			<div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotification }">
				<p>{{ this.notificationMess }}</p>
				<div class="button_wrap">
					<span class="separate"></span>
					<span class="theButton close_button" @click="hideMessages"></span>
				</div>
			</div>
			<div class="errorWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showErrors }">
				<p>{{ this.notificationErrorMess }}</p>
				<div class="button_wrap">
					<span class="separate"></span>
					<span class="theButton close_button" @click="hideMessages"></span>
				</div>
			</div>
			<!-- <div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotificationIframeError }">
				<p>{{ this.notificationIframeErrorMess }}</p>
				<div class="button_wrap">
					<span class="separate"></span>
					<span class="theButton close_button" @click="hideMessages"></span>
				</div>
			</div> -->

			<div class="topLine flexWrap">
				<!-- <a @click="$router.push('/catalog/' + this.currentSubCategory.parent_slug + '/' + this.currentSubCategory.slug), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" /> -->
				<a @click="this.$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Лекция</h1>
				<div class="buttons_wrap theButton rightButton flexWrap" v-if="!loadingStatus && getCurrentLecture.id">
					<button class="theButton rightButton buttonTransparent buttonWatched fontFamilyB" :class="{active: theWatched }" @click="addToWatched"></button>
					<button class="theButton rightButton buttonTransparent buttonFav fontFamilyB" :class="{active: theFav }" @click="addToFav"></button>
				</div>
				<div class="buttons_wrap theButton rightButton flexWrap" v-else></div>
				
			</div>

			<div class="contentSubWrap" v-if="!loadingStatus && getCurrentLecture.id"> 
				<div class="topWrap content_box info_box marginB12">

					<div class="video_wrap" :class="{active: this.startLecture }" v-if="getCurrentLecture.is_free == 0 || getCurrentLecture.purchase_info.is_purchased == 1 || !getAvailableTimer">
						<div class="video_starter" @click="startWatchLecture" v-if="getCurrentLecture.is_free == 1 || getCurrentLecture.purchase_info.is_purchased == 1"></div>
						<!-- <div class="video_starter" @click="startWatchLecture"></div> -->
						<img class="video_preview" v-if="getCurrentLecture.preview_picture" :src="getCurrentLecture.preview_picture" alt="preview" />
						<span class="video_nopreview" v-else alt="preview" />
						<div class="video_iframe">
							<iframe :src="currentLectureLink" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; encrypted-media;" allowfullscreen></iframe>
						</div>
					</div>
					<div class="notavailable_wrap topWrap" v-else>
						<div class="message_wrap">
							<span class="mess_icon"></span>
							<span class="mess_title fontFamilyEB">График просмотра</span>
							<span class="mess_desc">Вы уже выбрали лекцию на сегодня.<br>Следующая лекция доступна через<br>{{ getAvailableTimer.hours }} ч. {{ getAvailableTimer.minutes }} мин. {{ getAvailableTimer.seconds }} сек.</span>
						</div>
					</div>

					<div class="top_titles">
						<span class="the_status" :class="{active: this.getCurrentLecture.list_watched == 1 }">Просмотрено</span>
						<span class="the_status promo_mark" :class="{promo_active: this.getCurrentLecture.is_promo == 1 }">На акции</span>
						<span class="the_title fontSize20 fontFamilyEB">{{ getCurrentLecture.title }}</span>
					</div>
				
					
					<div class="buttons_wrap" :class="{hiddenWrap: getCurrentLecture.purchase_info.is_purchased == 1}" v-if="getCurrentLecture.is_free !== 1 || getCurrentLecture.prices.purchase_info == 0 || getAvailableTimer">
						<span class="theButton buttonPrimary buttonOptimal marginAuto" v-if="!getCurrentLecture.prices.price_by_promo && getCurrentLecture.prices.price_by_category" @click="$router.push('/prices/'), setRouterAnimate()">Смотреть от {{ Math.round(getCurrentLecture.prices.price_by_category[0].price_for_lecture) }}₽</span>
						<span class="theButton buttonPrimary buttonOptimal marginAuto" v-if="getCurrentLecture.prices.price_by_promo" @click="$router.push('/prices/'), setRouterAnimate()">Смотреть от {{ Math.round(getCurrentLecture.prices.price_by_promo[0].price_for_promo_lecture) }}₽</span>
						<!-- <span class="theButton buttonPrimary buttonOptimal marginB12 marginAuto">199 ₽ — на 12 дней</span>
						<span class="theButton buttonSecondary buttonOptimal marginAuto">99 ₽ — на 1 день</span> -->
					</div>
				</div>

				<div class="midWrap desc_box content_box marginB12">
					<div class="desc_subbox" :class="{active: moreDesc == true, fixed_height: getCurrentLecture.description.length > 250}">
						<p>{{ getCurrentLecture.description }}</p> 
					</div>
					<span v-show="getCurrentLecture.description.length > 250" class="show_more" @click="showMoreDesc">{{  moreDesc ? 'Скрыть' : 'Подробнее' }}</span>
				</div>

				<div class="userinfo_wrap topWrap marginB12">
					<div class="userinfo_box" v-if="getCurrentLecture.lector">
						<a class="userinfo_card" @click=" this.fetchCurrentLector(getCurrentLecture.lector.id), $router.push('/lectors/' + getCurrentLecture.lector.id ), setRouterAnimate">
							<div class="card_photo_wrap" v-if="getCurrentLecture.lector.photo" :class="{filled: getCurrentLecture.lector.photo}">
								<img :src="getCurrentLecture.lector.photo" alt="lector_photo">
							</div>
							<div class="card_info_wrap">
								<!-- <span class="card_name">Заполните профиль</span> -->
								<span class="card_name">{{ getCurrentLecture.lector.name }}</span>
								<span class="card_status fontSize14">Лектор</span>
								<span class="card_button theButton buttonTransparent buttonOptimal"></span>
							</div>
							
						</a>
					</div>
				</div>


				<div class="midWrap content_box elements_box marginB12" v-if="currentSubCategoryListFilter.length && !currLoadingStatus && !loadingStatus && currentSubCategory.title && this.getInfos.data">
					<span class="the_subtitle fontSize14">{{ this.getInfos.data.app_info[0].more_in_the_collection }}</span>
					<a @click="$router.push('/catalog/' + this.currentSubCategory.parent_slug + '/' + this.currentSubCategory.slug), setRouterAnimate()" class="the_title fontSize20 fontFamilyEB">{{ currentSubCategory.title }}</a>
					<elements-slider 
						v-if="currentSubCategoryListFilter.length > 0"
						:posts="currentSubCategoryListFilter"
					/>
				</div>

				<div class="midWrap feedback_box content_box elements_box marginB12" v-if="!currLoadingStatus && !loadingStatus">
					<span class="the_subtitle fontSize14">Напиши автору лекции</span>
					<span class="the_title fontSize20 fontFamilyEB">Обратная связь</span>
					
					<Form @submit="sendFeedback" v-slot="{ errors }" class="formWrap">
						<label class="inputWrap" :class="{notValid: errors.mess }">
							<div class="inputBox">
								<Field ref="feedbackField" v-slot="{ field }" v-model="comment" name="mess">
									<textarea v-bind="field" name="comment" placeholder="Ваше сообщение"/>
									<!-- <div v-if="errors[0]">{{errors[0]}}</div> -->
								</Field>
								<!-- <Field name="mess" type="textarea" onkeypress="this.value=this.value.substring(0,5)" placeholder="Сообщение" /> -->
							</div>
								<ErrorMessage class="errorTitle" name="mess" />
						</label>
						<button class="submitButton theButton buttonPrimary buttonOptimal">Отправить</button>
					</Form>

				</div>
				

				<div class="bottomWrap moreinfo_box content_box">
					<p>Представленные материалы не являются лечением или руководством к действию. Перед любыми действиями требуется консультация специалиста. Просматривая материалы вы подтверждаете факт ознакомления с <router-link class="the_link" to="/policy" @click="setRouterAnimate">обязательным соглашением</router-link></p>
				</div>

				<!-- <div class="bottomWrap empty_wrap">
					<div class="empty_subwrap flexWrap">
						<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
						<span class="the_title fontFamilyEB">Кажется, здесь ничего нет</span>
						<span class="the_desc fontSize14">Попробуйте обновить страницу или поискать в другом месте</span>
						<span class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>
				</div> 

				<div class="bottomWrap error_wrap">
					<div class="error_subwrap flexWrap">
						<span class="the_toptitle fontSize20 fontFamilyEB">Лекции</span>
						<img class="the_img" src="./../assets/images/noResponse.png" alt="img">
						<span class="the_title fontFamilyEB">Кажется, здесь ничего нет</span>
						<span class="the_desc fontSize14">Попробуйте обновить страницу или поискать в другом месте</span>
						<span class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>
				</div> -->

				

			</div>

			

			<div class="contentSubWrap" v-else>
				<div class="midWrap content_box info_box roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>


			<!-- {{ timerCounter.minutes }}: {{ timerCounter.seconds }}
			
			{{ test }}

			<br><br>

			{{ testTimer }} -->

			<!-- <bottom-line></bottom-line> -->

		<!-- {{ getAvailableTimer.minutes }}:{{ getAvailableTimer.seconds }}

		{{ getAvailableTimer.isExpired }} -->
			
		</div>
	</div>

	
</template>


<script> 
// import KinescopePlayer from '@kinescope/vue-kinescope-player'; 
import { defineComponent, watchEffect, onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';
import ElementsSlider from '@/components/ElementsSlider';
// import { useTimer, useStopwatch, useTime } from 'vue-timer-hook';

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';


export default defineComponent({

	
	name: 'Lecture', 

	components: {
		Form,
    Field, 
    ErrorMessage,
		ElementsSlider,
	}, 

	data(){
		return{
			loadingStatus: false,
			// hasAccess: false,
			theFav: false,
			theWatched: false,
			moreDesc: false,
			startLecture: false,
			showNotification: false,
			notificationMess: '',
			showErrors: false,
			notificationErrorMess: '',
			showNotificationIframeError: false,
			// notificationIframeErrorMess: 'Во время загрузки видео произошла ошибка',
			sameLectures: [],
			currentLectureLink: '',
		}
	},

	methods: {

		...mapMutations({
      setRouterAnimate: 'setRouterAnimate',
			setAvailableTimer: 'setAvailableTimer',
    }),
		
		...mapActions({
			fetchUserData: 'fetchUserData',
			fetchCurrentLecture: 'content/fetchCurrentLecture',
			// checkLectureAccess: 'content/checkLectureAccess',
			fetchCurrentLector: 'content/fetchCurrentLector',
			fetchCurrentCategoryElements: 'content/fetchCurrentCategoryElements',
			fetchCurrentSubCategory: 'content/fetchCurrentSubCategory',
			fetchCurrentSubCategoryElements: 'content/fetchCurrentSubCategoryElements',
			// fetchCategoryAndSubcategory: 'content/fetchCategoryAndSubcategory',
		}),

		sendFeedback(values){
			const fiterValues = {
				lectureId: this.getCurrentLecture.id,
				lectorId: this.getCurrentLecture.lector.id,
				userId: this.getCurrUser.user.id,
				message: values.mess,
			};
			// console.log('Фитбек сформирован:');
			// console.log(fiterValues);
			try{
				setTimeout( async () => {
					const response = await axios.post('https://api.xn--80axb4d.online/v1/user/login', fiterValues, {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					}).catch(function (error) { if (error.response){} });
					if(response){
						this.$refs.feedbackField.reset();
						this.notificationMess = 'Ваше сообщение успешно отправлено.';
						setTimeout(() => {
						this.showNotification = true;
						}, 400);
						setTimeout(() => {
							this.showNotification = false;
						}, 3000);
					}else{
						this.notificationErrorMess = 'Во время отправки сообщения произошла ошибка.';
						setTimeout(() => {
						this.showErrors = true;
						}, 400);
						setTimeout(() => {
							this.showErrors = false;
						}, 3000);
					}

					// this.setCurUserContent(response.data);
				}, 50 );


				
			} 
			catch(e){} 
			finally {}
		},
		
		goBack(){
			// window.history.go(-1);
			this.$router.go(-1);
			// console.log(this.$route.params.id);
			setTimeout( () => {
				// this.$router.go(-1);
				// console.log(this.$route.href);
				if(this.$router.currentRoute.value.params.id){
					this.fetchCurrentLecture(this.$router.currentRoute.value.params.id);
				}
				
				// console.log(this.$router.currentRoute.value.params.id);
			}, 50);

			
			// const oldPath = this.$route.params.id;
			// this.$router.go(-1);
			// console.log(oldPath);
			
			// if(this.$route.params.id){
			// 	this.fetchCurrentLecture(this.$route.params.id);
			// 	this.$router.push('/videos/' + this.$route.params.id);
			// }else{
			// }
		},

		checkTheFav(){
			if(this.getCurrentLecture.is_saved == 1){
				this.theFav = true;
			}else{
				this.theFav = false;
			}
		},
		checkTheWatched(){
			if(this.getCurrentLecture.list_watched == 1){
				this.theWatched = true;
			}else{
				this.theWatched = false;
			}
		},



		// checkLectureAvailable(){
		// 	if(this.getCurrUser.user.next_free_lecture_available){
		// 		const time = new Date();
		// 		const timeDiff = Math.floor((new Date(this.getCurrUser.user.next_free_lecture_available) - new Date()) / 1000);
		// 		console.log(timeDiff);
		// 		if(timeDiff > 0){
		// 			this.hasAccess = true;
		// 		}else{
		// 			this.hasAccess = false;
		// 		}
		// 	}else{
		// 		// const timeDiff = 0;
		// 		this.hasAccess = true;
		// 	}
		// },



		showMoreDesc(){
			if(this.moreDesc == true){
				this.moreDesc = false;
			}else{
				this.moreDesc = true;
			}
		},

		startWatchLecture(){
			// this.$refs.kinescope.player.play();
			// console.log('Запрос на просмотр видео запущен');
			// console.log(this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token);
			
			try{
				setTimeout( async () => {

					const headers = { 
						"Authorization": this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						'Content-Type': 'application/json',
						'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
						'Access-Control-Allow-Origin': '*',
					};
					const response = await axios.post('https://api.xn--80axb4d.online/v1/lecture/1/watch', {}, { headers }
					);
					if(response.data){
						this.startLecture = true;
						this.currentLectureLink = 'https://kinescope.io/embed/' + response.data.data['kinescope-id'];
					}else{
						setTimeout(() => {
							this.notificationMess = 'Во время загрузки видео произошла ошибка';
							this.showNotification = true;
						}, 400);
						setTimeout(() => {
							this.showNotification = false;
						}, 3000);
						// console.log('Ошибка запроса');
					}
					
					// this.setCurUserContent(response.data);
				}, 50 );
			} catch(e){
				console.log(e);
			} finally {}

		},



		addToFav(){
			if(this.theFav){
				// Удаляем из избранного
				try{
					setTimeout( () => {
						const headers = { 
							"Authorization": this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};
						const response = axios.delete('https://api.xn--80axb4d.online/v1/lecture/' + this.getCurrentLecture.id + '/save', { headers });

						// console.log(response);

						this.theFav = false;
						this.notificationMess = 'Удалили из «Сохранённых»';
						
					}, 500 );
				} catch(e){
					this.notificationMess = 'Произошла ошибка во время удаления.';
				} finally {
					setTimeout(() => {
						this.showNotification = true;
					}, 400);
					setTimeout(() => {
						this.showNotification = false;
					}, 3000);
				}

			}else{
				// Добавляем в избранное
				try{
					setTimeout( () => {
						const headers = { 
							"Authorization": this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};
						const response = axios.put('https://api.xn--80axb4d.online/v1/lecture/' + this.getCurrentLecture.id + '/save', {}, { headers });

						// console.log(response);

						this.theFav = true;
						this.notificationMess = 'Добавили в «Сохранённые»';
						
					}, 500 );
				} catch(e){
					this.notificationMess = 'Произошла ошибка во время сохранения.';
				} finally {
					setTimeout(() => {
						this.showNotification = true;
					}, 400);
					setTimeout(() => {
						this.showNotification = false;
					}, 3000);
				}

			}

		},

		// addToWatched(){
		// 	if(this.theWatched == true){
		// 		this.theWatched = false;
		// 		this.notificationMess = 'Удалили из «Просмотренных»';
		// 	}else{
		// 		this.theWatched = true;
		// 		this.notificationMess = 'Добавили в «Просмотренные»';
		// 	}
		// 	setTimeout(() => {
		// 		this.showNotification = true;
		// 	}, 400);
		// 	setTimeout(() => {
		// 		this.showNotification = false;
		// 	}, 3000);
		// },

		addToWatched(){
			if(this.theWatched){
				// Удаляем из просмотренного
				try{
					setTimeout( () => {
						const headers = { 
							"Authorization": this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};
						const response = axios.delete('https://api.xn--80axb4d.online/v1/lecture/' + this.getCurrentLecture.id + '/list-watch', { headers });

						// console.log(response);

						this.theWatched = false;
						this.notificationMess = 'Удалили из «Просмотренных»';
						
					}, 500 );
				} catch(e){
					this.notificationMess = 'Произошла ошибка во время удаления.';
				} finally {
					setTimeout(() => {
						this.showNotification = true;
					}, 400);
					setTimeout(() => {
						this.showNotification = false;
					}, 3000);
				}

			}else{
				// Добавляем в просмотренное
				try{
					setTimeout( () => {
						const headers = { 
							"Authorization": this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};
						const response = axios.put('https://api.xn--80axb4d.online/v1/lecture/' + this.getCurrentLecture.id + '/list-watch', {}, { headers });

						// console.log(response);

						this.theWatched = true;
						this.notificationMess = 'Добавили в «Просмотренные»';
						
						
					}, 500 );
				} catch(e){
					this.notificationMess = 'Произошла ошибка во время сохранения.';
				} finally {
					setTimeout(() => {
						this.showNotification = true;
					}, 400);
					setTimeout(() => {
						this.showNotification = false;
					}, 3000);
				}

			}

		},


		// handleReady(){
		// 	// this.startLecture = true;
		// 	console.log('iframe запустился');
		// },


		


		

		hideMessages(){
			this.showNotification = false;
			this.showErrors = false;
		},


		setLoadingStatus(bool){
			this.loadingStatus = bool;
		},

		clearSameLectures(){
			this.sameLectures = [];
		},

		filterSameLectures(){
			// console.log(this.currentSubCategoryList.data.length);
			if(this.currentSubCategoryList.data){
				if(this.currentSubCategoryList.data.length){
					try{
						setTimeout( async () => {
							this.sameLectures = this.currentSubCategoryList.data.filter(p => p.id !== this.getCurrentLecture.id);
						}, 50);
					}
					catch{
					}
					this.setLoadingStatus(false);
				}
			}
		},


		// getCurrLector(){
		// 	console.log('Запросили лектора');
		// },
		// getSameLectures(){
		// 	console.log('Запросили похожие лекции');
		// },
	},

	computed:{
		...mapState({
			heightLock: state => state.heightLock,
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			getInfos: 'getInfos',
			getOldLecture: 'getOldLecture',
			getAvailableTimer: 'getAvailableTimer',
			getLectureAccess: 'content/getLectureAccess',
			currLoadingStatus: 'content/currLoadingStatus',
			// sortedElements: 'content/sortedElements',
			currentSubCategory: 'content/currentSubCategory',
			getCurrentLecture: 'content/getCurrentLecture',
			currentSubCategoryList: 'content/currentSubCategoryList',
			currentSubCategoryListFilter: 'content/currentSubCategoryListFilter',
		}),

	},
 

	mounted() { 

		this.fetchUserData();
		this.setLoadingStatus(true);

		// if(){}
		this.fetchCurrentLecture(this.$route.params.id);
		
		// this.fetchCurrentCategoryElements(this.getCurrentLecture.parent_category_slug);
		this.fetchCurrentSubCategory(this.getCurrentLecture.category_slug);
		this.fetchCurrentSubCategoryElements(this.getCurrentLecture.category_id);

		// this.checkLectureAccess(this.getCurrentLecture.id);

		this.filterSameLectures();

		this.checkTheFav();
		this.checkTheWatched();

		// this.checkLectureAvailable();

		// this.fetchCategoryAndSubcategory(this.getCurrentLecture.parent_category_slug);
	// 	this.getCurrLector();
	// 	this.getSameLectures();
	},


	watch:{

		$route(to, from) {
			this.fetchCurrentLecture(to.params.id);
      // console.log('To:');
			// console.log(to.params.id);
			// console.log('From:');
			// console.log(from);
    },

		getCurrentLecture: {
			handler(newVal){

				// this.fetchCurrentLecture(this.$route.params.id);
				
				this.setLoadingStatus(true);
				
				this.fetchCurrentCategoryElements(this.getCurrentLecture.parent_category_slug);
				this.fetchCurrentSubCategory(this.getCurrentLecture.category_slug);
				this.fetchCurrentSubCategoryElements(this.getCurrentLecture.category_id);

				// this.checkLectureAccess(this.getCurrentLecture.id);
				
				this.checkTheFav();
				this.checkTheWatched();

			},
			deep: true
		},

		currentSubCategoryList: {
			handler(newVal){
				this.setLoadingStatus(true);
				this.clearSameLectures();
				this.filterSameLectures();
			},
			deep: true
		},

		
	},



});
</script>


<style lang="scss" scoped>



.mainContainer.theLecture{
	height: 100vh;
	position: relative;
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;
		.topLine{
			.buttons_wrap{
				justify-content: flex-end;
				.theButton{
					min-width: auto;
				}
				.theButton:first-of-type{
					margin-right: 22px;
				}
			}
		}
		.notificationWrap, .errorWrap{
			bottom: 60px;
		}
		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			.content_box{
				background-color: #FFF;
				padding-bottom: 5px;
				// margin-bottom: 12px;
			}
			.info_box{
				.notavailable_wrap{
					background-color: #FFF;
					padding: 16px;
					.message_wrap{
						background-color: #FFEAEB;
						border-radius: 8px;
						padding: 12px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.mess_icon{
							display: block;
							background-color: #FD7C84;
							background-image: url('./../assets/icons/calendar.svg');
							background-position: center;
							background-repeat: no-repeat;
							background-size: 50%;
							border-radius: 50%;
							width: 32px;
							height: 32px;
							margin-bottom: 8px;
						}
						.mess_title{
							display: block;
							color: #23292D;
							margin-bottom: 4px;
							text-align: center;
						}
						.mess_desc{
							line-height: 24px;
							display: block;
							color: #23292DB2;
							text-align: center;
						}
					}
				}
				.video_wrap{
					width: 100%;
					padding-top: 56.5%;
					position: relative;
					margin-bottom: 12px;
					// border: 1px solid rgba(35, 41, 45, 0.1);
					background-color: #FFEAEB;
					.video_iframe{
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 5;
						opacity: 0;
						visibility: hidden;
						iframe{
							width: 100%;
							height: 100%;
						}
					}
					.video_starter{
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 20;
						cursor: pointer;
						&::before{
							position: absolute;
							display: block;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							content: '';
							width: 48px;
							height: 48px;
							border-radius: 50%;
							background-repeat: no-repeat;
							background-size: contain;
							background-position: center;
							background-image: url('./../assets/icons/play-a.png');
							z-index: 15;
						}
					}
					.video_preview{
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 10;
						border: 1px solid rgba(35, 41, 45, 0.1);
						object-fit: cover;
					}
					.video_nopreview{
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 10;
						border: 1px solid rgba(35, 41, 45, 0.1);
						object-fit: cover;
						background-color: #fd7c8463;
					}

					&.active{
						.video_preview{
							display: none;
						}
						.video_starter{
							display: none;
						}
						.video_iframe{
							opacity: 1;
							visibility: visible;
						}
					}
					
					
				}
				.top_titles{
					position: relative;
				}
				.the_title{
					margin-bottom: 18px;
					position: relative;
					display: block;
					padding: 0 16px;
					width: calc(100% - 112px);
				}
				.the_status{
					color: #FD7C84;
					padding: 0 16px;
					// margin-bottom: 4px;
					display: block;
					font-size: 14px;
					height: 0px;
					opacity: 0;
					transition: height .42s ease, opacity .22s ease;
					&.promo_mark{
						height: max-content;
						opacity: 1;
						color: #ffa502;
						position: absolute;
						right: 16px;
						top: 0;
						width: max-content;
						padding: 4px;
						justify-content: center;
						align-items: center;
						display: flex;
						visibility: hidden;
						opacity: 0;
						align-items: center;
						background-color: #f6f6f6;
						border-radius: 5px;
						transition: all .42s ease;
						padding: 4px 10px;
						padding-left: 6px;
						&::before{
							display: block;
							content: '';
							width: 18px;
							height: 18px;
							background-image: url('../assets/icons/star.png');
							background-size: contain;
							background-repeat: no-repeat;
							background-position: center;
							margin-right: 5px;
						}
						&.promo_active{
							visibility: visible;
							opacity: 1;
						}
					}
					&.active{
						height: 22px;
						opacity: 1;
						transition: height .42s ease, opacity .82s ease;
					}
				}
				.buttons_wrap{
					padding: 0 16px 28px;
				}
			}
			
			.desc_box{
				padding: 16px;
				color: #23292DB2;
				position: relative;
				.desc_subbox{
					height: auto;
					overflow: hidden;
					transition: opacity .8s ease, max-height .66s cubic-bezier(0.09, 0.96, 0.83, 0.98);
					font-size: 14px;
					&.fixed_height{
						max-height: 57px;
					}
					p{
						line-height: 19px;
					}
					&.active{
						max-height: 80vh;
						transition: opacity 1s cubic-bezier(.05,.91,.25,1),max-height 0.6s cubic-bezier(0.69, 0.43, 0.42, 0.61);
					}
				}
				.show_more, .show_less{
					cursor: pointer;
					margin-top: 4px;
					display: block;
					font-weight: 800;
					color: #FD7C84;
					transition: all .14s ease;
					width: max-content;
					font-size: 14px;
					&:hover{
						opacity: .9;
					}
				}
			}

			.userinfo_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;

				.userinfo_box{
					.userinfo_card{
						display: flex;
						align-items: center;
						position: relative;
						cursor: pointer;
						.card_photo_wrap{
							min-width: 60px;
							width: 60px;
							height: 60px;
							display: block;
							background-position: center;
							background-repeat: no-repeat;
							background-color: #FFEAEB;
							border-radius: 50%;
							margin-right: 12px;
							background-image: url('../assets/icons/nophoto.svg');
							background-size: 35%;
							overflow: hidden;
							&.filled{
								// background-image: url('../assets/images/profile.jpg');
								// background-size: cover;
							}
							img{
								display: block;
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
						}
						.card_info_wrap{
							display: flex;
							flex-direction: column;
							padding-right: 35px;
							width: 100%;
							position: relative;
							.card_name{
								font-weight: 800;
								margin-bottom: 4px;
								user-select: none;
								color: #23292D;
								line-height: 24px;
							}
							.card_status{
								padding-right: 40px;
								color: #23292DB2;
							}
							.card_button{
								position: absolute;
								right: 0;
								top: 0;
								// top: 50%;
								// transform: translateY(-50%);
								display: block;
								background-position: right;
								background-repeat: no-repeat;
								background-size: contain;
								background-image: url('../assets/icons/arrow-right-a.svg');
								min-width: 24px;
								width: 24px;

								height: 24px;
								border: none;
								// padding: 5px;
								background-color: transparent;
							}
						}
						
					}
				}
			}


			.elements_box{
				padding: 0px;
				margin-bottom: 0;
				.the_title{
					color: #23292D;
					padding-left: 16px;
					padding-right: 16px;
					margin-bottom: 12px;
					display: block;
					position: relative;
					cursor: pointer;
					padding-bottom: 10px;
					&::before{
						content: '';
						position: absolute;
						right: 16px;
						top: 50%;
						transform: translateY(-50%);
						display: block;
						background-position: right;
						background-repeat: no-repeat;
						background-size: contain;
						background-image: url('../assets/icons/arrow-right-a.svg');
						min-width: 24px;
						width: 24px;
						height: 24px;
						border: none;
						background-color: transparent;
					}
				}
				.the_subtitle{
					padding-top: 16px;
					padding-left: 16px;
					padding-right: 16px;
					display: block;
					color: #23292DB2;
					margin-bottom: 4px;
				}
				.elements_list{
					width: 100%;
					margin-left: 0;
					margin-right: 0;
				}
			}
			.feedback_box{
				margin-bottom: 16px;
				.the_title{
					padding-bottom: 0;
					&::before{
						display: none;
					}
				}
				.formWrap{
					padding-bottom: 24px;
					padding-left: 16px;
    			padding-right: 16px;
					max-width: 600px;
					.inputWrap{
						padding-bottom: 10px;
					}
					textarea{
						position: relative;
						z-index: 5;
						width: 100%;
						border: none;
						padding: 14px 16px;
						box-shadow: 0px 16px 20px -8px rgba(253, 124, 132, 0.2);
						border-radius: 8px;
						border: 2px solid #FFF;
						transition: all .24s ease, letter-spacing .0s ease;
						outline: none;
						letter-spacing: .86px;
						box-shadow: 0px 16px 20px -8px rgba(253, 124, 132, 0.4);
						appearance: none;
						-moz-appearance: none;
						-webkit-appearance: none;
						background-color: #F3F5F6;
						box-shadow: none;
						min-height: 148px;
						letter-spacing: 0.32px;
						margin-top: 0;
						max-width: calc(600px - 32px);
					}
					textarea:focus, textarea:focus-within, textarea:active, textarea:focus-visible, textarea:target {
						border: 2px solid #FEABB0;
						transition: all .24s ease, letter-spacing .0s ease;
					}
					.submitButton{
						display: block;
					}
				}
			}
			.moreinfo_box{
				padding: 16px;
				font-size: 12px;
				color: #23292D80;
				padding-bottom: 48px;
				.the_link{
					color: #FD7C84;
				}
			}


		}
	}
}


/* -------- @media ----------- */

@media screen and (max-width: 480px) {

	.mainContainer.catalogCategory{

		.contentWrap{
			.contentSubWrap{
			}
		}
	}


}


@media screen and (max-width: 420px) {
	.mainContainer.theLecture .contentWrap .contentSubWrap .info_box .buttons_wrap .theButton{
		max-width: 395px;
		width: 100%;
	}
}


</style>
