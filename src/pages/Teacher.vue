<template>
  <div class="mainContainer" :class="{fixed: heightLock}">
		<div class="contentWrap" :class="{fixed: thePopup}">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1)" class="theButton leftButton buttonTransparent buttonBack"></a>
				<h1 class="theTitle alignCenter">Лектор</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="popup_wrap" :class="{ghostWrap: !thePopup}">
				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonTransparent buttonClose" @click="showPopup"></span>
					<h1 class="theTitle alignCenter">{{ this.currSlide + 1 }}/{{ sertificateslist.length }}</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
				</div>
				<agile 
					@before-change="lockHeight()"
					ref="sertificateSlider" 
					@after-change="getCurSlide($refs.sertificateSlider.getCurrentSlide()), unlockHeight()" 
					:options="sliderOptions2" 
					:speed="400" 
					:throttleDelay="100" 
					:swipeDistance="10" 
					:timing="'ease-in-out'" 
					:as-nav-for="asNavFor2" class="theSlider slider_wrap">
					<div class="the_slide" 
						v-for="(post, index) in sertificateslist"
						:post="post"
						:key="index"
						:id="`popup_slide_${index}`"
					>
					<!-- @click="showPopup" -->
						<div class="the_slide_box"> 
							<img :src="post.preview" alt="element">
						</div>
					</div>
				</agile>
				<!-- <popup-slider class="slider_wrap" :posts="sertificateslist" /> -->
			</div>

			<div class="contentSubWrap">

				<div class="photo_wrap topWrap marginB12">
					<!-- <span class="the_photo theButton buttonTransparent blockWrap" :class="{hiddenWrap: hasPhoto == true}" @click="hasPhotoTrue"></span> -->
					<img class="the_photo blockWrap the_photo_has" src="./../assets/images/profile.jpg" >
					<span class="the_title blockWrap fontFamilyB">Анна Ахматова</span>
					<p class="the_desc fontSize12 marginB12">Акушер • стаж: 12 лет</p>
				</div> 

				<div class="midWrap desc_box content_box marginB12">
					<span class="the_title blockWrap fontFamilyEB fontSize20">О лекторе</span>
					<div class="desc_subbox" :class="{active: moreDesc == true}">
						<p>(Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп (Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп (Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп (Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп.</p>
					</div>
					<span class="show_more" @click="showMoreDesc">{{  moreDesc ? 'Скрыть' : 'Подробнее' }}</span>
				</div>

				<div class="catalog_box midWrap marginB12">
					<span class="the_title fontFamilyEB fontSize20 blockWrap marginB12">Дипломы и сертификаты</span>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
					<div class="element_box">
						<!-- <sertificates-slider 
							:posts="sertificateslist"
							@showElement="showElement"
						/> -->
						<agile 
						@before-change="lockHeight()"
						@after-change="unlockHeight()" 
						ref="sertificatesSlider" :options="sliderOptions1" :speed="400" :throttleDelay="100" :swipeDistance="10" :timing="'ease-in-out'" :as-nav-for="asNavFor1" class="theSlider">
							<div class="the_element" 
								v-for="(post, index) in sertificateslist"
								:post="post"
								:key="index"
								:id="'serfs_slide_' + post.id"
								@click="showPopup(), getCurSlide(index), $refs.sertificatesSlider.goTo(index)"
							>
							<!-- @click="showPopup" -->
								<div class="the_element_box"> 
									<img :src="post.preview" alt="element">
								</div>
							</div>
						</agile>

					</div>
				</div>

				<div class="recommended_box bottomWrap">
					<span class="the_title fontFamilyEB fontSize20 blockWrap marginB12">Видео от лектора</span>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Не пропустите новые лекции!</span> -->
					<div class="element_box">
						<element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/>
					</div>
				</div>

			</div>

			<bottom-line></bottom-line>
			
		</div>



	</div>
</template>

<script>
// @ is an alias to /src
// import Element from '@/components/Element';
import { VueAgile } from 'vue-agile'

import Element from '@/components/Element';
// import SertificatesSlider from '@/components/SertificatesSlider';
// import PopupSlider from '@/components/PopupSlider';

import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
  name: 'Profile',


	data(){
		return{ 
			moreDesc: false,
			thePopup: false,

			currSlide: 0,
			totalSlide: 0,

			slides: [
				'https://images.unsplash.com/photo-1673960508121-3407ffa4bb15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
				'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
				'https://images.unsplash.com/photo-1674581648641-6362c00ac9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
			],

			asNavFor1: [],
			asNavFor2: [],

			sliderOptions1: {
				dots: false,
				navButtons: false,
				slidesToShow: 1.6,
				// infinite: false,
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
		// SertificatesSlider,
		// PopupSlider,
  },


	methods: {

		...mapMutations({
			lockHeight: 'lockHeight',
			unlockHeight: 'unlockHeight',
		}),

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
		}

	},


	computed:{
		...mapState({
			heightLock: state => state.heightLock,
		}),
		...mapGetters({
			recommendationElement: 'content/recommendationElement',
			sertificateslist: 'content/sertificateslist',
		})
	},


	mounted () {
		this.asNavFor1.push(this.$refs.sertificateSlider)
		this.asNavFor2.push(this.$refs.sertificatesSlider)
	}



}
</script>


<style lang="scss" scoped>

.mainContainer{
	height: 100vh;
	position: relative;
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
				width: 100%;
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
						z-index: 10;
						img{
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							object-fit: contain;
							display: block;
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
				.the_element{
					padding: 0 6px;
					display: block;
					width: 100%;
					position: relative;
					cursor: pointer;
					transition: all .24s ease;
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


			.recommended_box{
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
					background-size: 40%;
					background-position: center;
					background-repeat: no-repeat;
					margin-bottom: 8px;
					border-radius: 50%;
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
					max-height: 54px;
					overflow: hidden;
					transition: opacity .8s ease, max-height .8s cubic-bezier(.08,1.1,.7,.98);
					font-size: 14px;
					p{
						line-height: 19px;
					}
					&.active{
						max-height: 100vh;
						transition: opacity 1s cubic-bezier(.05,.91,.25,1),max-height 1.2s cubic-bezier(.22,.45,.65,.88);
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
