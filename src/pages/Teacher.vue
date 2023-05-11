<template>
  <div class="mainContainer" :class="{fixed: heightLock, zindex: thePopup}">
		<div class="contentWrap" :class="{fixed: thePopup}">

			<div class="popup_r_wrap" :class="{ghostWrap: !theRPopup}">
				<div class="popup_box">
					<span class="the_title blockWrap fontSize16 alignCenter marginB12 fontFamilyB">Поставить оценку лектору</span>
					<span class="the_title blockWrap fontSize14 alignCenter marginB20 fontFamilyR">Это поможет нам стать лучше</span>
					<span class="the_title blockWrap fontSize14 alignCenter marginB12 fontFamilyB" style="color:#23292DB2;">Лектор</span>
					<div class="rating_stars">
						<span class="the_star" :class="{active: localRating == 1 || localRating == 2 || localRating == 3 || localRating == 4 || localRating == 5}" @click="preRating(2)"></span>
						<span class="the_star" :class="{active: localRating == 2 || localRating == 3 || localRating == 4 || localRating == 5}" @click="preRating(4)"></span>
						<span class="the_star" :class="{active: localRating == 3 || localRating == 4 || localRating == 5}" @click="preRating(6)"></span>
						<span class="the_star" :class="{active: localRating == 4 || localRating == 5}" @click="preRating(8)"></span>
						<span class="the_star" :class="{active: localRating == 5}" @click="preRating(10)"></span>
					</div>
					<div class="buttons_wrap flexWrap">
						<span class="theButton buttonTertiary" @click="showRPopup">Отмена</span>
						<span class="theButton buttonPrimary" :class="{disabled: localRating == 0}" @click="sendRating">Отправить</span>
					</div>
				</div>
				<!-- <popup-slider class="slider_wrap" :posts="sertificateslist" /> -->
			</div>

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

			<div class="topLine flexWrap">
				
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack"></a>
				<!-- <a @click="$router.push('/lectors/'), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack"></a> -->
				<h1 class="theTitle alignCenter">Лектор</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="popup_wrap" :class="{ghostWrap: !thePopup}" v-if="getCurrentLector.diplomas">
				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonTransparent buttonClose" @click="showPopup(), unlockHeight()"></span>
					<h1 class="theTitle alignCenter">{{ this.currSlide + 1 }}/{{ getCurrentLector.diplomas.length }}</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
				</div>
				<!-- @before-change="lockHeight()"
				@after-change="unlockHeight(), getCurSlide($refs.sertificateSlider.getCurrentSlide())"  -->
				<agile 
					ref="sertificateSlider" 
					@after-change="getCurSlide($refs.sertificateSlider.getCurrentSlide())" 
					:options="sliderOptions2" 
					:infinite="getCurrentLector.diplomas.length > 2 ? true : false" 
					:speed="400" 
					:throttleDelay="100" 
					:swipeDistance="10" 
					:timing="'ease-in-out'" 
					:as-nav-for="asNavFor2" class="theSlider slider_wrap">
					<div class="the_slide" 
						v-for="(post, index) in getCurrentLector.diplomas"
						:post="post"
						:key="index"
						:id="`popup_slide_${index}`"
					>
					<!-- @mousedown="mousedown($event)"
					@mouseup="mouseup($event)" -->
					<!-- @mousedown="handleMouseDownY" 
						@click="handleClickY($event)" -->
					<!-- @click="handleClickY($event)" -->
						<div class="the_slide_box"
						> 
							<img :src="post.preview_picture ? 'https://api.xn--80axb4d.online/storage/' + post.preview_picture : ''" alt="element">
						</div>
					</div>
				</agile>

				<!-- <popup-slider class="slider_wrap" :posts="sertificateslist" /> -->
			</div>

			<div class="contentSubWrap" v-if="!loadingStatus && getCurrentLector.id && !currLoadingStatus && this.getInfos">

				<div class="photo_wrap topWrap marginB12">
					<img v-if="getCurrentLector.photo" class="the_photo blockWrap the_photo_has" :src="getCurrentLector.photo ? 'https://api.xn--80axb4d.online/storage/' + getCurrentLector.photo : ''" >
					<span v-else class="the_photo theButton buttonTransparent blockWrap"></span>

					<!-- Средняя общая оценка: <span class="the_status rating" :class="{active: getCurrentLector.rates.rate_user !== null}" v-if="getCurrentLector.rates.rate_avg !== null ">{{ Number(getCurrentLector.rates.rate_avg/2).toFixed(1) + '/' + 10/2  }}</span> -->
					<span class="the_status rating" :class="{active: getCurrentLector.rates.rate_user !== null}" v-if="getCurrentLector.rates.rate_user !== null ">{{ Number(getCurrentLector.rates.rate_user/2).toFixed(0) + '/' + 10/2  }}</span>
					<span class="the_status rating" :class="{active: getCurrentLector.rates.rate_user !== null}" v-else>{{ '-' }}</span>

					<span class="the_title blockWrap fontFamilyB">{{ getCurrentLector.name }}</span>
					<p class="the_desc fontSize12 marginB12">{{ getCurrentLector.position }} • стаж: {{ lectorYears }} лет</p>
				
					<span class="theButton buttonSecondary buttonOptimal marginAuto setRating" v-if="localRating >= 1" @click="showRPopup">Сменить оценку</span>
					<span class="theButton buttonSecondary buttonOptimal marginAuto setRating" v-else @click="showRPopup">Поставить оценку</span>
				</div> 

				<div class="midWrap desc_box content_box marginB12">
					<span class="the_title blockWrap fontFamilyEB fontSize20">{{this.getInfos.data.app_info[0].about_lector_title}}</span>
					<div class="desc_subbox" :class="{active: moreDesc == true, fixed_height: getCurrentLector.description.length > 250}" v-html="getCurrentLector.description"/>
					<span v-show="getCurrentLector.description.length > 250" class="show_more" @click="showMoreDesc">{{  moreDesc ? 'Скрыть' : 'Подробнее' }}</span>
				</div>

				<div class="catalog_box midWrap marginB12"  v-if="getCurrentLector.diplomas.length">
					<span class="the_title fontFamilyEB fontSize20 blockWrap marginB12">{{this.getInfos.data.app_info[0].diplomas_title}}</span>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
					<div class="element_box">
						
						<agile 
							@before-change="lockHeight()"
							@after-change=" unlockHeight(), getCurSlide($refs.sertificateSlider.getCurrentSlide())" 
							ref="sertificatesSlider" 
							:options="sliderOptions1"
							:infinite="getCurrentLector.diplomas.length > 2 ? true : false" 
							:speed="400" 
							:throttleDelay="100" 
							:swipeDistance="10" 
							:timing="'ease-in-out'" 
							:as-nav-for="asNavFor1" 
							class="theSlider"
							:class="{active: listLoaded}"
						>
							<div class="the_element" 
								v-for="(post, index) in getCurrentLector.diplomas"
								:post="post"
								:key="index"
								:id="'serfs_slide_' + post.id"
								@mousedown="handleMouseDown($event)" 
								@click="handleClick(index, $event)"
							>
								<div class="the_element_box"> 
									<img :src="post.preview_picture ? 'https://api.xn--80axb4d.online/storage/' + post.preview_picture : ''" alt="element">
								</div>
							</div>
						</agile>

					</div>
				</div>

				<div class="recommended_box videos_box bottomWrap">

					<span class="the_title fontFamilyEB fontSize20 blockWrap">{{this.getInfos.data.app_info[0].lectors_videos}}</span>
					<elements-list 
						class="contentSubWrap"
						v-if="getCurrentLectorElements.data"
						:posts="getCurrentLectorElements.data"
					></elements-list>

					<div v-else class="empty_subwrap flexWrap">
						<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
						<span class="the_title fontFamilyEB">Кажется, у текущего лектора пока нет загруженных видеоматериалов</span>
					</div>

					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Не пропустите новые лекции!</span> -->
					<!-- <div class="element_box">
						<element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/>
					</div> -->
				</div>

			</div>

			<!-- <div class="contentSubWrap roller_box" v-else> -->
				<div class="midWrap content_box info_box roller_box" v-else>
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			<!-- </div> -->

			<!-- <bottom-line></bottom-line> -->
			
		</div>


		



	</div>
</template>

<script>
// @ is an alias to /src
// import Element from '@/components/Element';
import { VueAgile } from 'vue-agile'
import axios from 'axios';
import Element from '@/components/Element';
import ElementsList from '@/components/ElementsList';
// import SertificatesSlider from '@/components/SertificatesSlider';
// import PopupSlider from '@/components/PopupSlider';

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

export default {
  name: 'Profile',


	data(){ 
		return{ 

			showNotification: false,
			notificationMess: '',
			showErrors: false,
			notificationErrorMess: '',

			localRating: 0,
			theRPopup: false,

			lectorYears: '-',

			listLoaded: false,
			loadingStatus: false,
			startX: 0,

			moreDesc: false,
			thePopup: false,

			currSlide: 0,
			totalSlide: 0,
			
			lectorElements: [],

			asNavFor1: [],
			asNavFor2: [],

			sliderOptions1: {
				dots: false,
				navButtons: false,
				slidesToShow: 1.6,

				responsive: [
				{
						breakpoint: 350,
						settings: {

								slidesToShow: 2.25
								
						}
					},
					{
						breakpoint: 550,
						settings: {

								slidesToShow: 3.2
						}
					},
					{
						breakpoint: 1000,
						settings: {
						}
					}
				]
			},


			sliderOptions2: {
				dots: false,
				navButtons: false,
				slidesToShow: 1,
				responsive: [
				{
						breakpoint: 350,
						settings: {
								slidesToShow: 1
						}
					},
					{
						breakpoint: 550,
						settings: {
								slidesToShow: 1
						}
					},
					{
						breakpoint: 1000,
						settings: {
						}
					}
				]
			},


		}
	},


	components: {
		agile: VueAgile,
		Element,
		ElementsList,
		// SertificatesSlider,
		// PopupSlider,
  },


	methods: {
 
		...mapMutations({
			lockHeight: 'lockHeight',
			unlockHeight: 'unlockHeight',
			setRouterAnimate: 'setRouterAnimate',
		}),

		...mapActions({
			fetchCurrentLector: 'content/fetchCurrentLector',
			fetchCurrentLectorElements: 'content/fetchCurrentLectorElements',
		}),


		showRPopup(){
			if(this.theRPopup == true){
				this.theRPopup = false;
			}else{
				this.theRPopup = true;
			}
		},
		preRating(value){
			console.log(value);
			this.localRating = Math.round(value)/2;
		},
		sendRating(){
			if(this.localRating !== 0){
				const filterRating = {
					rate: this.localRating * 2,
				}
				try{
					setTimeout( async () => {
						const response = await axios.post('https://api.xn--80axb4d.online/v1/lector/' + this.getCurrentLector.id + '/rate', filterRating, {
							headers: {
								Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							}
						}).catch(function (error) { if (error.response){} });
						if(response){
							console.log(response);
							this.theRPopup = false;
							this.notificationMess = 'Спасибо за вашу оценку!';
							setTimeout(() => {
							this.showNotification = true;
							}, 400);
							setTimeout(() => {
								this.showNotification = false;
							}, 3000);
						}else{
							this.notificationErrorMess = 'Во время отправки оценки произошла ошибка.';
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

			}
		},


		setLectorYears(){
			if(this.getCurrentLector.career_start){
				const currentDate = new Date();
				const startDate = new Date(this.getCurrentLector.career_start);
				const years = Math.floor((currentDate - startDate) /
					(24 * 60 * 60 * 1000));
				const convertToYears = Math.ceil(years / 365);
				// console.log(convertToWeeks);
				this.lectorYears = convertToYears;
			}
		},


		goLoadList(){
			if(this.getSertificatesStatus){
				setTimeout( () => {
				this.listLoaded = true;
				}, 500);
			}
		},


		showMoreDesc(){
			if(this.moreDesc == true){
				this.moreDesc = false;
			}else{
				this.moreDesc = true;
			}
		},

		showPopup(){
			if(this.thePopup == true){
				this.thePopup = false;
			}else{
				this.thePopup = true;
			}
		},

		getCurSlide(index){
			this.currSlide = index;
		},


		handleMouseDown(event){
      this.startX = event.screenX;
    },

		handleClick(index, event){
			
			// console.log(event.screenX);
    	const delta = Math.abs(event.screenX - this.startX);
			if (delta > 10) {
				// console.log('Сработал свайп');
				this.getCurSlide(index);
			}else{
				this.getCurSlide(index);
				// console.log('Сработал клик');
				this.$refs.sertificatesSlider.goTo(index);
				this.showPopup();
			}
			this.startX = 0;
		},

		setLoadingStatus(bool){
			this.loadingStatus = bool;
		},

	

		refreshLectorElements(){
			// this.currentLectorElements.data.multiget(0,1,2,3,4,5)
			if(this.getCurrentLector.id){
				this.fetchCurrentLectorElements(this.getCurrentLector.id);
				this.lectorElements = this.getCurrentLectorElements.data;
			}
			setTimeout( () => {
				this.setLoadingStatus(false);
			}, 100);
			// setTimeout( async () => {
			// 	this.listLoaded = true;
			// }, 900);
			
		},


	},


	computed:{
		...mapState({
			heightLock: state => state.heightLock,
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			getInfos: 'getInfos',
			getSertificatesStatus: 'content/getSertificatesStatus',
			currLoadingStatus: 'content/currLoadingStatus',
			recommendationElement: 'content/recommendationElement',
			sertificateslist: 'content/sertificateslist',
			getCurrentLector: 'content/getCurrentLector',
			getCurrentLectorElements: 'content/getCurrentLectorElements',
		})
	},


	mounted () {
		
		this.fetchCurrentLector(this.$route.params.id);

		this.setLoadingStatus(true);
		this.setLectorYears();
		// this.lectorElements = [];
		this.refreshLectorElements();
		this.asNavFor1.push(this.$refs.sertificateSlider);
		this.asNavFor2.push(this.$refs.sertificatesSlider);
		if(this.getCurrentLector.rates){
			this.preRating(this.getCurrentLector.rates.rate_user);
		}
	},


	watch:{
		getCurrentLector: {
			handler(newVal){
				this.setLoadingStatus(true);
				this.setLectorYears();
				// this.lectorElements = [];
				this.refreshLectorElements();

				this.asNavFor1.push(this.$refs.sertificateSlider);
				this.asNavFor2.push(this.$refs.sertificatesSlider);

				if(this.getCurrentLector.rates){
					this.preRating(this.getCurrentLector.rates.rate_user);
				}

			},
			deep: true
		},
		getSertificatesStatus: {
			handler(newVal){
				this.goLoadList();
			},
			deep: true
		},
	},


}
</script>


<style lang="scss" scoped>

.mainContainer{
	height: 100vh;
	position: relative;
	&.zindex{
		z-index: 10000010;
	}
	.contentWrap.ghostWrap{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 0;
	}
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		// overflow: scroll;
		justify-content: flex-start;
		// height: 100vh;
		&::after{
			display: none;
		}
		&.fixed{
			overflow: hidden;
		}

		.notificationWrap, .errorWrap{
			bottom: 60px;
		}

		.popup_r_wrap{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.172);
			z-index: 10000010;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all .24s ease;
			padding-left: 16px;
			padding-right: 16px;
			.popup_box{
				max-width: 395px;
				width: 100%;
				border-radius: 12px;
				background-color: #FFF;
				padding: 16px;
				.rating_stars{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					margin-bottom: 26px;
					.the_star{
						display: block;
						width: 18px;
						min-width: 18px;
						height: 18px;
						position: relative;
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
						background-image: url('../assets/icons/star-pull.svg');
						margin: 0 3px;
						&.active{
							background-image: url('../assets/icons/star.svg');
						}
					}
				}
				.the_title{
					color: #23292D;
				}
				.buttons_wrap{
					width: calc(100% + 8px);
					margin-left: -4px;
					margin-right: -4px;
					.theButton{
						width: calc(50% - 10px);
						margin: 4px 5px;
					}
				}
			}
		}

		.popup_wrap{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.859);
			z-index: 10000010;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all .24s ease;
			.topLine{
				padding-left: 8px;
				padding-right: 8px;
				background: transparent;
				backdrop-filter: none;
				color: #FFF;
				.theButton{
					padding: 12px;
					background-image: url('./../assets/icons/close-w.svg');
					background-size: contain;
					width: 24px;
					min-width: 24px;
					max-width: 24px;
					height: 24px;
					background-position: center;
				}
				.theTitle{
					font-weight: 600;
					letter-spacing: 2px;
				}
			}
			.slider_wrap{
				height: calc(100% - 45px - 45px);
				width: calc(100% - 20px);
				// width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.theSlider{
				// margin-bottom: 12px;
				.the_slide{
					display: block;
					width: 100%;
					position: relative;
					cursor: pointer;
					transition: all .24s ease;
					height: 100%;
					&:hover{
						opacity: 1;
					}
					.the_slide_box{
						overflow: hidden;
						margin-bottom: 4px;
						position: relative;
						height: 100%;
						width: 100%;
						// padding-top: 130%;
						z-index: 1000000000;
						img{
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							object-fit: contain;
							display: block;
							user-select: none;
						}
					}
				}

			}
			}
		}

		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			
			.theSlider{
				// height: 245px;
				transition: all .45s cubic-bezier(1, -0.15, 0.63, 0.99);
				opacity: 0;
				&.active{
					opacity: 1;
				}
				.the_element{
					padding: 0 6px;
					display: block;
					width: 100%;
					position: relative;
					cursor: pointer;
					transition: all .24s ease;
					flex-grow: initial;
					&:hover{
						opacity: 1;
					}
					.the_element_box{
						border: 1px solid rgba(35, 41, 45, 0.1);
						border-radius: 8px;
						overflow: hidden;
						margin-bottom: 4px;
						position: relative;
						height: 0;
						width: 100%;
						padding-top: 130%;
						z-index: 10;
						img{
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							object-fit: cover;
							display: block;
						}
					}
					.the_title{
						display: block;
						color: #23292D;
					}
				}
			}


			.recommended_box.videos_box{
				background-color: #FFF;
				padding: 16px;
				padding-bottom: 48px;
				position: relative;
				&::after{
					display: block;
					width: 100%;
					height: 62px;
					content: '';
				}
				.empty_subwrap{
					padding-top: 16px;
					padding-bottom: 48px;
					flex-wrap: wrap;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-left: 10px;
					padding-right: 10px;
					.the_img{
						width: 56%;
						margin-left: auto;
						margin-right: auto;
						margin-bottom: 24px;
					}
					.the_title{
						color: #23292DB2;
						margin-bottom: 4px;
						text-align: center;
						max-width: 480px;
						margin-left: auto;
						margin-right: auto;
					}
					.the_desc{
						color: #23292DB2;
						text-align: center;
						max-width: 480px;
						margin-left: auto;
						margin-right: auto;

					}
					.theButton{
						margin-top: 24px;
					}
				}
				
				.contentSubWrap{
					background-color: #FFF;
					width: calc(100);
    			padding: 16px 0px 16px;
				}
			}
			
			.photo_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;
				
				.the_photo{
					cursor: pointer;
					margin: 0 auto;
					background-color: #FFEAEB;
					min-width: 150px;
					width: 150px;
					height: 150px;
					background-image: url('../assets/icons/nophoto.svg');
					background-size: 30%;
					background-position: center;
					background-repeat: no-repeat;
					margin-bottom: 8px;
					border-radius: 50%;
					object-fit: cover;
					&.the_photo_has{
						margin-bottom: 12px;
					}
				}
				.the_title{ 
					margin: 0 auto;
					margin-bottom: 4px;
					text-align: center;
					color: rgba(35, 41, 45, 0.7);
					user-select: none;
				}

				.the_status{
					width: max-content;
					margin-left: auto;
					margin-right: auto;
					color: #FD7C84;
					padding: 0 16px;
					// margin-bottom: 4px;
					display: block;
					font-size: 14px;
					height: 0px;
					opacity: 0;
					transition: height .42s ease, opacity .22s ease;
					&.rating{
						color: #EED13E;
						position: relative;
						display: flex;
						align-items: center;
						height: auto;
						opacity: 1;
						font-size: 14px;
						margin-top: 4px;
						margin-bottom: 6px;
						&::before{
							display: block;
							content: "";
							width: 18px;
							height: 18px;
							position: relative;
							background-size: contain;
							background-repeat: no-repeat;
							background-position: center;
							background-image: url('../assets/icons/star.svg');
							margin-right: 5px;
						}
					}
				}

				.the_desc{
					text-align: center;
					color: rgba(35, 41, 45, 0.5);
					user-select: none;
				}
			}

			.desc_box{
				background-color: #FFF;
				padding: 16px;
				color: #23292DB2;
				position: relative;
				.the_title{
					color: #23292D;
					margin-bottom: 4px;
				}
				.desc_subbox{
					height: auto; 
					// max-height: 54px;
					overflow: hidden;
					// transition: opacity .8s ease, max-height .8s cubic-bezier(.08,1.1,.7,.98);
					transition: opacity .8s ease, max-height .66s cubic-bezier(0.09, 0.96, 0.83, 0.98);
					font-size: 13px;
					line-height: 145%;
					&.fixed_height{
						max-height: 54px;
					}
					p{
						font-size: 13px;
						line-height: 145%;
					}
					&.active{
						max-height: 100vh;
						// transition: opacity 1s cubic-bezier(.05,.91,.25,1),max-height 1.2s cubic-bezier(.22,.45,.65,.88);
						transition: opacity 1s cubic-bezier(.05,.91,.25,1),max-height 0.6s cubic-bezier(0.69, 0.43, 0.42, 0.61);
					}
				}
				.show_more{
					cursor: pointer;
					margin-top: 8px;
					display: block;
					font-weight: 800;
					color: #FD7C84;
					transition: all .14s ease;
					width: max-content;
					font-size: 13px;
					&:hover{
						opacity: .9;
					}
				}
			}

			.catalog_box{
				background-color: #FFF;
				padding: 16px 0;
				.the_title{
					padding: 0 16px;
					position: relative;
					color: #2c3e50;
					// &::before{
					// 	content: '';
					// 	position: absolute;
					// 	right: 19px;
					// 	top: 50%;
					// 	transform: translateY(-50%);
					// 	display: block;
					// 	background-position: center;
					// 	background-repeat: no-repeat;
					// 	background-size: 20px;
					// 	background-image: url('../assets/icons/arrow-right-a.svg');
					// 	min-width: 24px;
					// 	width: 24px;
					// 	height: 24px;
					// 	border: none;
					// 	background-color: transparent;
					// }
				}
				.the_subtitle{
					padding: 0 16px;
				}
			}



		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 600px) {

	.mainContainer{
		.contentWrap{ 
		}
	}

}

</style>
