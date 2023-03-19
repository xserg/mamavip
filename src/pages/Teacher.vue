<template>
  <div class="mainContainer" :class="{fixed: heightLock, zindex: thePopup}">
		<div class="contentWrap" :class="{fixed: thePopup}">

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
							<img :src="post.preview_picture" alt="element">
						</div>
					</div>
				</agile>

				<!-- <popup-slider class="slider_wrap" :posts="sertificateslist" /> -->
			</div>

			<div class="contentSubWrap" v-if="!loadingStatus && getCurrentLector.id && !currLoadingStatus && this.getInfos">

				<div class="photo_wrap topWrap marginB12">
					<img v-if="getCurrentLector.photo" class="the_photo blockWrap the_photo_has" :src="getCurrentLector.photo" >
					<span v-else class="the_photo theButton buttonTransparent blockWrap"></span>
					<span class="the_title blockWrap fontFamilyB">{{ getCurrentLector.name }}</span>
					<p class="the_desc fontSize12 marginB12">{{ getCurrentLector.position }} • стаж: {{ lectorYears }} лет</p>
				</div> 

				<div class="midWrap desc_box content_box marginB12">
					<span class="the_title blockWrap fontFamilyEB fontSize20">{{this.getInfos.data.app_info[0].about_lector_title}}</span>
					<div class="desc_subbox" :class="{active: moreDesc == true, fixed_height: getCurrentLector.description.length > 250}">
						<p>{{ getCurrentLector.description }}</p> 
					</div>
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
									<img :src="post.preview_picture" alt="element">
								</div>
							</div>
						</agile>

					</div>
				</div>

				<div class="recommended_box videos_box bottomWrap">

					<span class="the_title fontFamilyEB fontSize20 blockWrap">{{this.getInfos.data.app_info[0].lectors_videos}}</span>
					<elements-list 
						class="contentSubWrap"
						:posts="getCurrentLectorElements.data"
					></elements-list>

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

import Element from '@/components/Element';
import ElementsList from '@/components/ElementsList';
// import SertificatesSlider from '@/components/SertificatesSlider';
// import PopupSlider from '@/components/PopupSlider';

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

export default {
  name: 'Profile',


	data(){ 
		return{ 
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
			fetchCurrentLectorElements: 'content/fetchCurrentLectorElements',
		}),


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
		this.setLoadingStatus(true);
		this.setLectorYears();
		// this.lectorElements = [];
		this.refreshLectorElements();
		this.asNavFor1.push(this.$refs.sertificateSlider);
		this.asNavFor2.push(this.$refs.sertificatesSlider);
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
					margin-bottom: 12px;
				}
				.desc_subbox{
					height: auto; 
					// max-height: 54px;
					overflow: hidden;
					// transition: opacity .8s ease, max-height .8s cubic-bezier(.08,1.1,.7,.98);
					transition: opacity .8s ease, max-height .66s cubic-bezier(0.09, 0.96, 0.83, 0.98);
					font-size: 14px;
					&.fixed_height{
						max-height: 54px;
					}
					p{
						line-height: 19px;
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
					font-size: 14px;
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
