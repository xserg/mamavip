<template>
  <div class="mainContainer" :class="{fixed: heightLock}" id="homeContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
				<h1 class="theTitle alignCenter">Главное</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">

	
				<div class="userinfo_wrap topWrap marginB12">
					<div class="userinfo_box">
						<router-link class="userinfo_card" to="/profile/edit" @click="setRouterAnimate">
							<span class="card_photo_wrap"></span>
							<!-- <span class="card_photo_wrap filled" style=""></span> -->
							<div class="card_info_wrap">
								<span class="card_name">
									<span class="the_value">Заполните профиль</span>
									<span class="card_button theButton buttonTransparent buttonOptimal"></span>
								</span>
								<!-- <span class="card_name">Привет, Екатерина!</span> -->
								<span class="card_status fontSize14">Это необходимо, чтобы пользоваться сервисом</span>
								<!-- <span class="card_status fontSize14">Ваш срок — примерно 29 недель</span> -->
								<!-- <span class="card_status fontSize14">Вас уже можно поздравить?</span> -->
								
							</div>
							
						</router-link>
					</div>
				</div>

				<div class="recommended_box midWrap marginB12">
					<span class="the_title fontFamilyEB fontSize20 blockWrap">Рекомендуем</span>
					<span class="the_subtitle marginB12 fontSize14 blockWrap">Не пропустите новые лекции!</span>
					<div class="element_box">
						<element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/>
					</div>
				</div>

				<div class="notavailable_box midWrap marginB12">
					<span class="the_title fontFamilyEB fontSize20 blockWrap">Рекомендуем</span>
					<span class="the_subtitle marginB12 fontSize14 blockWrap">Не пропустите новые лекции!</span>
					<div class="message_wrap">
						<span class="mess_icon"></span>
						<span class="mess_title fontFamilyEB">График просмотра</span>
						<span class="mess_desc">Следующая лекция доступна через <br>18 ч. 59 мин. 32 сек.</span>
					</div>
				</div>



				<div class="catalog_box midWrap marginB12">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/catalog" @click="setRouterAnimate">Каталог лекций</router-link>
					<span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span>
					<div class="element_box">
						<calalog-slider 
							:posts="catalogList"
						/>
					</div>
				</div>

				<div class="error_box midWrap marginB12">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/catalog" @click="setRouterAnimate">Каталог лекций</router-link>
					<span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span>
					
					<img class="the_img" src="./../assets/images/noResponse.png">

					<span class="info_title fontFamilyB">Данные не загрузились</span>
					<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
					<span class="theButton buttonTertiary buttonOptimal">Обновить</span>
				</div>

				<div class="teachers_box midWrap marginB12">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/speakers" @click="setRouterAnimate">Наши лекторы</router-link>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
					<div class="element_box">
						<!-- <element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/> -->
						<teacher-slider :teachers="teachersList"/>
					</div>
				</div>

				<div class="videos_box bottomWrap">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/forview" @click="setRouterAnimate">Вы ещё не смотрели</router-link>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
					<div class="element_box">
						<!-- <element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/> -->
						<elements-slider :posts="sortedElementsNotview"/>
					</div>
				</div>

				<!-- <bottom-line></bottom-line> -->
			</div>
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import Element from '@/components/Element';
import ElementsSlider from '@/components/ElementsSlider';
import CalalogSlider from '@/components/CatalogSlider';
import TeacherSlider from '@/components/TeacherSlider';

import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
  name: 'Home',
  components: {
		Element,
		ElementsSlider,
		CalalogSlider,
		TeacherSlider,
    // DefaultLikes,
  },


	computed:{
		...mapState({
			heightLock: state => state.heightLock,
		}),
		...mapGetters({
			recommendationElement: 'content/recommendationElement',
			catalogList: 'content/catalogList',
			teachersList: 'content/teachersList',
			sortedElementsNotview: 'content/sortedElementsNotview',
		}),
	},


	methods:{
    ...mapMutations({
      setRouterAnimate: 'setRouterAnimate',
    }),
	},

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
		overflow: scroll;
		justify-content: flex-start;

		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			
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
							width: 100%;
							position: relative;
							.card_name{
								font-weight: 800;
								margin-bottom: 4px;
								user-select: none;
								color: #23292D;
								position: relative;
								padding-right: 48px;
							}
							.card_status{
								padding-right: 40px;
								color: #23292DB2;
							}
							.card_button{
								position: absolute;
								right: 0;
								// top: -5px;
								top: 50%;
								transform: translateY(-50%);
								display: block;
								background-position: center;
								background-repeat: no-repeat;
								background-size: 20px;
								background-image: url('../assets/icons/arrow-right.svg');
								min-width: 30px;
								width: 30px;
								height: 30px;
								border: none;
								padding: 5px;
								background-color: transparent;
							}
						}
						
					}
				}
			}

			.recommended_box{
				background-color: #FFF;
				padding: 16px;
				.the_title{
					margin-bottom: 4px;
				}
			}
			.catalog_box{
				background-color: #FFF;
				padding: 16px 0;
				.the_title{
					padding: 0 16px;
					position: relative;
					color: #2c3e50;
					&::before{
						content: '';
						position: absolute;
						right: 19px;
						top: 50%;
						transform: translateY(-50%);
						display: block;
						background-position: center;
						background-repeat: no-repeat;
						background-size: 20px;
						background-image: url('../assets/icons/arrow-right-a.svg');
						min-width: 24px;
						width: 24px;
						height: 24px;
						border: none;
						background-color: transparent;
					}
				}
				.the_subtitle{
					padding: 0 16px;
				}
			}

			.teachers_box{
				background-color: #FFF;
				padding: 16px 0;
				.the_title{
					color: #2c3e50;
					padding: 0 16px;
					margin-bottom: 12px;
					position: relative;
					&::before{
						content: '';
						position: absolute;
						right: 19px;
						top: 50%;
						transform: translateY(-50%);
						display: block;
						background-position: center;
						background-repeat: no-repeat;
						background-size: 20px;
						background-image: url('../assets/icons/arrow-right-a.svg');
						min-width: 24px;
						width: 24px;
						height: 24px;
						border: none;
						background-color: transparent;
					}
				}
			}

			.videos_box{
				background-color: #FFF;
				padding: 16px 0;
				.the_title{
					padding: 0 16px;
					margin-bottom: 12px;
					position: relative;
					color: #2c3e50;
					&::before{
						content: '';
						position: absolute;
						right: 19px;
						top: 50%;
						transform: translateY(-50%);
						display: block;
						background-position: center;
						background-repeat: no-repeat;
						background-size: 20px;
						background-image: url('../assets/icons/arrow-right-a.svg');
						min-width: 24px;
						width: 24px;
						height: 24px;
						border: none;
						background-color: transparent;
					}
				}
			}


			.error_box{
				background-color: #FFF;
				padding: 16px 0;
				.the_title{
					padding: 0 16px;
					position: relative;
					color: #2c3e50;
					&::before{
						content: '';
						position: absolute;
						right: 19px;
						top: 50%;
						transform: translateY(-50%);
						display: block;
						background-position: center;
						background-repeat: no-repeat;
						background-size: 20px;
						background-image: url('../assets/icons/arrow-right-a.svg');
						min-width: 24px;
						width: 24px;
						height: 24px;
						border: none;
						background-color: transparent;
					}
				}
				.the_subtitle{
					padding: 0 16px;
				}

				.the_img{
					width: 55.6%;
					margin: 0 auto;
					margin-bottom: 24px;
					display: block;
				}

				.info_title{
					color: #23292DB2;
					margin-bottom: 4px;
					text-align: center;
					width: 100%;
					display: block;
				}
				.info_subtitle{
					color: #23292DB2;
					margin-bottom: 24px;
					text-align: center;
					width: 100%;
					display: block;
				}
				.theButton{
					margin: 0 auto;
					width: calc(100% - 32px);

				}
			}


			.notavailable_box{
				background-color: #FFF;
				padding: 16px;
				.the_title{
					margin-bottom: 4px;
				}
				.the_subtitle{}
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

		}
	}
}


</style>
