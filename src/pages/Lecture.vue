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

			<div class="topLine flexWrap">
				<a @click="$router.go(-1)" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Лекция</h1>
				<button class="theButton rightButton buttonTransparent buttonFav fontFamilyB" :class="{active: theFav}" @click="addToFav"></button>
			</div>

			<div class="contentSubWrap">
				<div class="topWrap content_box info_box marginB12">

					<!-- <div class="video_wrap">
						<img class="the_video" src="./../assets/images/video.jpg" alt="" />
					</div> -->
					<div class="notavailable_wrap topWrap ">
						<div class="message_wrap">
							<span class="mess_icon"></span>
							<span class="mess_title fontFamilyEB">График просмотра</span>
							<span class="mess_desc">Вы уже выбрали лекцию на сегодня.<br>Следующая лекция доступна через<br>18 ч. 59 мин. 32 сек.</span>
						</div>
					</div>
					
					
					<span class="the_status">Просмотрено</span>
					<span class="the_title fontSize20 fontFamilyEB">Название лекции какое-нибудь длинное, чтобы занимало целых две строки или даже больше</span>
					<div class="buttons_wrap">
						<span class="theButton buttonPrimary buttonOptimal marginAuto">Смотреть за 99₽</span>
						<!-- <span class="theButton buttonPrimary buttonOptimal marginB12 marginAuto">199 ₽ — на 12 дней</span>
						<span class="theButton buttonSecondary buttonOptimal marginAuto">99 ₽ — на 1 день</span> -->
					</div>
				</div>

				<div class="midWrap desc_box content_box marginB12">
					<div class="desc_subbox" :class="{active: moreDesc == true}">
						<p>(Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп (Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп (Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп (Описание лекции идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-проп.</p>
					</div>
					<span class="show_more" @click="showMoreDesc">{{  moreDesc ? 'Скрыть' : 'Подробнее' }}</span>
				</div>

				<div class="userinfo_wrap topWrap marginB12">
					<div class="userinfo_box">
						<router-link class="userinfo_card" to="/speakers/speaker">
							<!-- <span class="card_photo_wrap"></span> -->
							<span class="card_photo_wrap filled" style=""></span>
							<div class="card_info_wrap">
								<!-- <span class="card_name">Заполните профиль</span> -->
								<span class="card_name">Анна Ахматова</span>
								<span class="card_status fontSize14">Лектор</span>
								<span class="card_button theButton buttonTransparent buttonOptimal"></span>
							</div>
							
						</router-link>
					</div>
				</div>


				<div class="midWrap content_box elements_box marginB12">
					<span class="the_subtitle fontSize14">Ещё в подборке</span>
					<span class="the_title fontSize20 fontFamilyEB">Беременность</span>
					<elements-slider 
						:posts="sortedElements"
					/>
				</div>


				<div class="bottomWrap moreinfo_box content_box">
					<p>Представленные материалы не являются лечением или руководством к действию. Перед любыми действиями требуется консультация специалиста. Просматривая материалы вы подтверждаете факт ознакомления с <router-link class="the_link" to="/policy">обязательным соглашением</router-link></p>
				</div>

				<!-- <div class="bottomWrap empty_wrap">
					<div class="empty_subwrap flexWrap">
						<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
						<span class="the_title fontFamilyEB">Кажется, здесь ничего нет</span>
						<span class="the_desc fontSize14">Попробуйте обновить страницу или поискать в другом месте</span>
						<span class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>
				</div> -->

				<!-- <div class="bottomWrap error_wrap">
					<div class="error_subwrap flexWrap">
						<span class="the_toptitle fontSize20 fontFamilyEB">Лекции</span>
						<img class="the_img" src="./../assets/images/noResponse.png" alt="img">
						<span class="the_title fontFamilyEB">Кажется, здесь ничего нет</span>
						<span class="the_desc fontSize14">Попробуйте обновить страницу или поискать в другом месте</span>
						<span class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>
				</div> -->


			</div>


			<bottom-line></bottom-line>
			
		</div>
	</div>
	
	
</template>


<script>

import ElementsSlider from '@/components/ElementsSlider';

import {mapState, mapGetters, mapMutations} from 'vuex';


export default({

	name: 'Lecture', 

	components: {
		ElementsSlider,
	}, 

	data(){
		return{
			theFav: false,
			moreDesc: false,
			showNotification: false,
			notificationMess: '',
			// post: {},
		}
	},

	methods: {

		showMoreDesc(){
			if(this.moreDesc == true){
				this.moreDesc = false;
			}else{
				this.moreDesc = true;
			}
		},
		addToFav(){
			if(this.theFav == true){
				this.theFav = false;
				this.notificationMess = 'Удалили из «Сохранённых»';
			}else{
				this.theFav = true;
				this.notificationMess = 'Добавили в «Сохранённые»';
			}
			setTimeout(() => {
				this.showNotification = true;
			}, 400);
			setTimeout(() => {
				this.showNotification = false;
			}, 3000);
		},

		hideMessages(){
			this.showNotification = false;
		},

	},

	computed:{
		...mapState({
			heightLock: state => state.heightLock,
		}),
		...mapGetters({
			sortedElements: 'content/sortedElements',
			currentSubCategory: 'content/currentSubCategory',
		}),
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
		.notificationWrap{
			bottom: 60px;
		}
		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			.content_box{
				background-color: #FFF;
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
					padding-top: 58%;
					position: relative;
					margin-bottom: 12px;
					// border: 1px solid rgba(35, 41, 45, 0.1);
					background-color: #FFEAEB;
					.the_video{
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 10;
						border: 1px solid rgba(35, 41, 45, 0.1);
					}
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
				.the_title{
					margin-bottom: 12px;
					position: relative;
					display: block;
					padding: 0 16px;
				}
				.the_status{
					color: #FD7C84;
					padding: 0 16px;
					margin-bottom: 4px;
					display: block;
					font-size: 14px;
				}
				.buttons_wrap{
					padding: 0 16px 16px;
				}
			}
			
			.desc_box{
				padding: 16px;
				color: #23292DB2;
				position: relative;
				.desc_subbox{
					height: auto;
					max-height: 57px;
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
							&.filled{
								background-image: url('../assets/images/profile.jpg');
								background-size: cover;
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
					
					padding-left: 16px;
					padding-right: 16px;
					margin-bottom: 12px;
					display: block;
					position: relative;
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


</style>
