<template>
  <div class="mainContainer" :class="{fixed: heightLock}" id="homeContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
				<h1 class="theTitle alignCenter">Главное</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap" v-if="this.getInfos.data && this.getCurrUser">


				<!-- ПРОФИЛЬ -->
				<div class="userinfo_wrap topWrap marginB12">
					<div class="userinfo_box">
						<router-link class="userinfo_card" to="/profile/edit" @click="setRouterAnimate">
							<div v-if="this.getCurrUser.user.photo_small" class="card_photo_wrap">
								<img :src="this.getCurrUser.user.photo_small" alt="profile_image">
							</div>
							<span v-else class="card_photo_wrap"></span>
							<div class="card_info_wrap">
								<span class="card_name" v-if="this.getCurrUser.user.name">Привет, {{ this.getCurrUser.user.name }}!</span>
								<div class="card_name" v-else>
									<span class="the_value">Заполните профиль</span>
									<span class="card_button theButton buttonTransparent buttonOptimal"></span>
								</div>
								<span class="card_status fontSize14" v-if="!this.getCurrUser.user.name">Это необходимо, чтобы пользоваться сервисом</span>

								<span class="card_status fontSize14" v-if="this.getCurrUser.user.name && this.getCurrUser.user.is_mother == 0 && pregnancyWeeks < 39">Ваш срок — примерно {{ pregnancyWeeks }} недель(-и)</span>
								<span class="card_status fontSize14" v-if="this.getCurrUser.user.is_mother == 0 && pregnancyWeeks >= 39">Вас уже можно поздравить?</span>
								<span class="card_status fontSize14" v-if="this.getCurrUser.user.is_mother == 1">{{ babyAge }}</span>
								
							</div>
							
						</router-link>
					</div>
				</div>
				<!-- ПРОФИЛЬ END -->

				

				<!-- РЕКОМЕНДУЕМ -->
				<div v-if="currLoadingStatus || !getCurrUser.user || !getRecommended" class="recommended_box midWrap marginB12 roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>

				<div v-else class="recommended_box midWrap marginB12" :class="{recommended_box: getCurrUser.user.next_free_lecture_available == null || getAvailableTimer.isExpired, notavailable_box: getCurrUser.user.next_free_lecture_available !== null || !getAvailableTimer.isExpired, error_box: getRecommended === 'e' }">
					<div v-if="!getAvailableTimer">
						<span class="the_title fontFamilyEB fontSize20 blockWrap">{{ this.getInfos.data.app_info[0].recommended_title }}</span>
						<span class="the_subtitle marginB12 fontSize14 blockWrap">{{ this.getInfos.data.app_info[0].recommended_subtitle }}</span>
						<div class="element_box" v-if="getRecommended && getRecommended !== 'e' ">
							<element 
							v-if="getRecommended"
							:post="getRecommended"
							/>
						</div> 
						<div v-else class="roller_box">
							<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
						</div>
					</div>
					<div class="message_wrap" v-else>
						<span class="mess_icon"></span>
						<span class="mess_title fontFamilyEB">График просмотра</span>
						<span class="mess_desc">Следующая лекция доступна через <br>{{ getAvailableTimer.hours }} ч. {{ getAvailableTimer.minutes }} мин. {{ getAvailableTimer.seconds }} сек.</span>
					</div>
					
					<div class="element_box" v-if="getRecommended === 'e'">
						<img class="the_img" src="./../assets/images/noResponse.png">
						<span class="info_title fontFamilyB">Данные не загрузились</span>
						<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
						<span @click="this.fetchRecommended()" class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>

				</div>
				<!-- РЕКОМЕНДУЕМ END -->


				<!-- ПРОМОПАК -->
				<div v-if="currLoadingStatus || !getPromopack.data" class="videos_box midWrap marginB12">
					<div class="roller_box">
						<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
					</div>
				</div>

				<div class="videos_box midWrap marginB12" v-else :class="{error_box: getPromopack === 'e'}">
					
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/promopack" @click="setRouterAnimate">Акции</router-link>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
					
					<div class="element_box" v-if="getPromopack.data && getPromopack.data.length">
						<elements-slider  
							:posts="getPromopack.data"
						/>
					</div>
					<div class="roller_box" v-else>
						<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
					</div>

					<div class="element_box" v-if="getPromopack === 'e'">
						<img class="the_img" src="./../assets/images/noResponse.png">
						<span class="info_title fontFamilyB">Данные не загрузились</span>
						<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
						<span @click="this.fetchPromopack(6)" class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>

				</div>

				<!-- ПРОМОПАК END -->


				<!-- КАТАЛОГ -->
				<div class="midWrap marginB12" :class="{catalog_box: !catalogError, error_box: catalogError }" v-if="!catalogError">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/catalog" @click="setRouterAnimate">{{ this.getInfos.data.app_info[0].lectures_catalog_title }}</router-link>
					<span class="the_subtitle marginB12 fontSize14 blockWrap">{{ this.getInfos.data.app_info[0].lectures_catalog_subtitle }}</span>
					
					<div class="element_box" v-if="!catalogError">
						<calalog-slider 
							v-if="catalogList.data"
							:posts="catalogList.data"
						/>
						<div v-else class="roller_box">
							<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
						</div>
					</div>

					<div class="element_box" v-else>
						<img class="the_img" src="./../assets/images/noResponse.png">
						<span class="info_title fontFamilyB">Данные не загрузились</span>
						<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
						<span @click="this.fetchCatalog()" class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>

				</div>
				<!-- КАТАЛОГ END -->


				<!-- ЛЕКТОРЫ -->
				<div class="teachers_box midWrap marginB12">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/lectors" @click="setRouterAnimate">{{ this.getInfos.data.app_info[0].out_lectors_title }}</router-link>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
					<div class="element_box">
						<!-- <element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/> -->
						<teacher-slider v-if="teachersList.data" :teachers="teachersList.data"/>
						<div v-else class="roller_box">
							<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
						</div>
					</div>
				</div>
				<!-- ЛЕКТОРЫ END -->


				<!-- НЕ ПРОСМОТРЕННЫЕ -->
				<div v-if="currLoadingStatus || !getCurrUser.user" class="videos_box bottomWrap">
					<div class="roller_box">
						<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
					</div>
				</div>
				<div v-if="!currLoadingStatus && getNotViewed && getNotViewed !== undefined" class="videos_box bottomWrap" :class="{error_box: getNotViewed.length}">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap"  to="/forview" @click="setRouterAnimate">{{ this.getInfos.data.app_info[0].not_viewed_yet_title }}</router-link>
					<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
					<div class="element_box" v-if="getNotViewed !== 'e'">
						<!-- <element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/> -->
						<elements-slider 
							:posts="getNotViewed"
						/>
					</div>
					<div class="element_box" v-else>
						<img class="the_img" src="./../assets/images/noResponse.png">
						<span class="info_title fontFamilyB">Данные не загрузились</span>
						<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
						<span class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>
				</div>
				
				<!-- НЕ ПРОСМОТРЕННЫЕ END -->


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

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
		Element,
		ElementsSlider,
		CalalogSlider,
		TeacherSlider,
    // DefaultLikes,
  },

	data(){
		return{
			loadingStatus: true,
			pregnancyWeeks: 0,
			babyAge: '',
		}
	},


	computed:{
		...mapState({
			heightLock: state => state.heightLock,
			catalogError: state =>state.content.catalogError,
			promopackError: state =>state.content.promopackError,
		}),
		...mapGetters({
			currLoadingStatus: 'content/currLoadingStatus',
			getCurrUser: 'getCurrUser',
			getInfos: 'getInfos',
			getAvailableTimer: 'getAvailableTimer',
			catalogList: 'content/catalogList',
			getPromopack: 'content/getPromopack',
			getRecommended: 'content/getRecommended',
			teachersList: 'content/teachersList',
			getNotViewed: 'content/getNotViewed',
			sortedElementsPromopack: 'content/sortedElementsPromopack',
		}),
	},


	methods:{
    ...mapMutations({
			// setAvailableTimer: 'setAvailableTimer',
      setRouterAnimate: 'setRouterAnimate',
    }),
		...mapActions({
			fetchUserData: 'fetchUserData',
      fetchLectors: 'content/fetchLectors',
			fetchCatalog: 'content/fetchCatalog',
			fetchPromopack: 'content/fetchPromopack',
			fetchRecommended: 'content/fetchRecommended',
			fetchNotViewed: 'content/fetchNotViewed',
    }),

		switchloadingStatus(bool){
			this.loadingStatus = bool;
		},

		setPregnancyWeeks(){
			if(this.getCurrUser.user.pregnancy_start){
				const currentDate = new Date();
				const startDate = new Date(this.getCurrUser.user.pregnancy_start);
				const days = Math.floor((currentDate - startDate) /
					(24 * 60 * 60 * 1000));
				const convertToWeeks = Math.ceil(days / 7);
				// console.log(convertToWeeks);
				this.pregnancyWeeks = Number(convertToWeeks);
			}
		},

		setBabyAge(){
			if(this.getCurrUser.user.baby_born){
				const currentDate = new Date();
				const startDate = new Date(this.getCurrUser.user.baby_born);
				const days = Math.floor((currentDate - startDate) /
					(24 * 60 * 60 * 1000));
				const convertToMonths = Math.round(days / 30);
				if(convertToMonths < 1){
					var currentAge = 'Малыш родился';
				}else if(convertToMonths >= 1 && convertToMonths <= 11){
					if(convertToMonths == 1){
						var currentAge = 'Малышу примерно ' + convertToMonths + ' месяц';
					}else if(convertToMonths == 2 || convertToMonths == 3 || convertToMonths == 4){
						var currentAge = 'Малышу примерно ' + convertToMonths + ' месяца';
					}else{
						var currentAge = 'Малышу примерно ' + convertToMonths + ' месяцев';
					}
				}else if(convertToMonths >= 12){
					if(convertToMonths >= 12 && convertToMonths <= 23){
						var currentAge = 'Малышу примерно год';
					}else if(convertToMonths >= 24 && convertToMonths <= 35){
						const years = Math.floor(convertToMonths / 12);
						var currentAge = 'Малышу примерно ' + years + ' года';
					}else{
						const years = Math.floor(convertToMonths / 12);
						var currentAge = 'Малышу примерно ' + years + ' лет';
					}
				}
				this.babyAge = currentAge;
			}
		},

	},


	mounted() {
		this.fetchUserData();
		this.setPregnancyWeeks();
		this.setBabyAge();

		this.fetchRecommended();
		this.switchloadingStatus(false);

		// this.setAvailableTimer();

		this.fetchPromopack(6);

		this.fetchCatalog();
		
    this.fetchLectors();
		
		this.fetchNotViewed(6);

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
							overflow: hidden;
							&.filled{
								background-image: url('../assets/images/profile.jpg');
								background-size: cover;
							}
							img{
								width: 100%;
								height: 100%;
								object-fit: cover;
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
				&.error_box .the_title::before{
					display: none;
				}
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
				.roller_box{
					min-height: 150px !important;
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
