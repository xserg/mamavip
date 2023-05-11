<template>
  <div class="mainContainer">
		<div class="contentWrap" :class="{hiddenWrap: celebrateWrap}">

			<div class="popup_wrap" :class="{ghostWrap: !thePopup}">
				<div class="popup_box">
					<span class="the_title blockWrap fontSize16 alignCenter marginB12 fontFamilyB">Вы уверены, что хотите выйти?</span>
					<div class="buttons_wrap flexWrap">
						<span class="theButton buttonPrimary" @click="showPopup">Отмена</span>
						<span class="theButton buttonTertiary" @click="goLogout">Да, выйти</span>
					</div>
				</div>
				<!-- <popup-slider class="slider_wrap" :posts="sertificateslist" /> -->
			</div>

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
				<h1 class="theTitle alignCenter">Профиль</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap" v-if="!getLoadingStatus && this.getCurrUser">

				<div class="userinfo_wrap topWrap marginB12">
					<div class="userinfo_alert flexWrap" v-if="!this.getCurrUser.user.name">
						<span class="the_icon"></span>
						<span class="the_title blockWrap fontFamilyEB alignCenter">Заполните профиль</span>
						<p class="the_info blockWrap fontSize14 alignCenter">Это необходимо, чтобы пользоваться сервисом</p>
						<router-link class="theButton buttonTransparent fontFamilyB" to="/profile/edit" @click="setRouterAnimate">Заполнить</router-link>
					</div>
					<div class="userinfo_box" v-else>
						<div class="userinfo_card">
							<div v-if="this.getCurrUser.user.photo_small" class="card_photo_wrap filled">
								<img :src="this.getCurrUser.user.photo_small ? 'https://api.xn--80axb4d.online/storage/' + this.getCurrUser.user.photo_small + '?' + Date.now() : ''" alt="profile_image">
							</div>
							<span v-else class="card_photo_wrap"></span>
							<div class="card_info_wrap">
								<span class="card_name" v-if="this.getCurrUser.user.name">Привет, {{ this.getCurrUser.user.name }}!</span>
								<div class="card_name" v-else>
									<span class="the_value">Заполните профиль</span>
									<span class="card_button theButton buttonTransparent buttonOptimal"></span>
								</div>
								<p v-if="!this.getCurrUser.user.name" class="the_info blockWrap fontSize14 alignCenter">Это необходимо, чтобы пользоваться сервисом</p>

								<!-- <span class="card_name">Екатерина</span> -->
								<span class="card_status fontSize14" v-if="this.getCurrUser.user.is_mother == 0 && this.getCurrUser.user.name && pregnancyWeeks < 39">Ваш срок — примерно {{ pregnancyWeeks }} недель(-и) </span>
								<span class="card_status fontSize14" v-if="this.getCurrUser.user.is_mother == 0 && this.getCurrUser.user.name && pregnancyWeeks >= 39">Вас уже можно поздравить?</span>
								<span class="card_status fontSize14" v-if="this.getCurrUser.user.is_mother == 1 && this.getCurrUser.user.name">{{ babyAge }}</span>
							</div>
							<router-link class="card_button theButton buttonTransparent buttonOptimal" to="/profile/edit" @click="setRouterAnimate"></router-link>
						</div>

						<div class="">
							<Form @submit="celebrateBirthday" :validation-schema="schema">
								<div class="hiddenForm">
									<Field name="name" placeholder="Имя" v-model="this.getCurrUser.user.name" />
									<Field name="birthdate" type="date" placeholder="Выберите дату..." v-model="this.getCurrUser.user.birthdate" />
									<Field name="phone" type="tel" placeholder="+7" v-model="this.getCurrUser.user.phone" />
									<Field ref="isMotherStatus" name="is_mother" placeholder="Ребенок родился" v-model="babyWasBorn" />
									<Field ref="bornFalse" name="pregnancy_weeks" type="number" placeholder="В неделях" v-model="pregnancyWeeks" />
									<Field ref="bornTrue" name="baby_born" type="date" placeholder="Выберите дату..." v-model="this.getCurrUser.user.baby_born" />
								</div>
								<button class="user_info_button theButton buttonPrimary fontSize16" v-if="this.getCurrUser.user.is_mother == 0 && pregnancyWeeks >= 39">Отметить рождение малыша</button>
							</Form>
						</div>
						
					</div>
				</div>

				<div class="tabsinfo_wrap midWrap marginB12 fontSize16">
					<router-link class="link_button" to="/profile/saved" @click="setRouterAnimate">
						<div class="left_wrap">
							<span class="the_icon save_icon"></span>
							<span class="the_title">Сохранённые лекции</span>
						</div>
						<span class="the_count">{{ this.getCurrUser.user.saved_lectures_count }}</span>
					</router-link>
					<router-link class="link_button" to="/profile/bought" @click="setRouterAnimate">
						<div class="left_wrap">
							<span class="the_icon buy_icon"></span>
							<span class="the_title">Купленные лекции</span>
						</div>
						<span class="the_count">{{ this.getCurrUser.user.purchased_lectures_count }}</span>
					</router-link>
					<router-link class="link_button" to="/profile/viewed" @click="setRouterAnimate">
						<div class="left_wrap">
							<span class="the_icon see_icon"></span>
							<span class="the_title">Просмотренные лекции</span>
						</div>
						<span class="the_count">{{ this.getCurrUser.user.list_watched_lectures_count }}</span>
					</router-link>
				</div>

				<div class="moreinfo_wrap midWrap marginB12">
					<router-link class="link_button" to="/profile/help" @click="setRouterAnimate">
						<div class="left_wrap">
							<span class="the_icon help_icon"></span>
							<span class="the_title">Помощь</span>
						</div>
						<span class="the_count"></span>
					</router-link>
					<router-link class="link_button" to="/profile/about" @click="setRouterAnimate">
						<div class="left_wrap">
							<span class="the_icon info_icon"></span>
							<span class="the_title">О приложении</span>
						</div>
						<span class="the_count"></span>
					</router-link>
				</div>

			</div>

			<div v-else class="roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>

			<div class="contentSubWrap" v-if="!getLoadingStatus && this.getCurrUser">
				<div class="logutinfo_wrap bottomWrap">
					<button class="theButton buttonTertiary fontFamilyB marginAuto buttonOptimal fontSize16" @click="showPopup">Выйти из аккаунта</button>
				</div>
			</div>
			<!-- <bottom-line></bottom-line> -->
			
		</div>



		<div class="contentWrap" :class="{ghostWrap: !celebrateWrap}">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonBack" @click="finishSelebrate"></span>
				<h1 class="theTitle alignCenter"></h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">
				<div class="celebrate_wrap topWrap marginB12">
					<img class="the_img" src="./../assets/images/baby.png" alt="baby">
					<span class="the_title fontFamilyEB alignCenter">Поздравляем с рождением малыша!</span>
				</div>
				<div class="moreelements_wrap bottomWrap">
					<div class="videoSliderWrap">

						<span class="the_title">Посмотрите лекции из подборки</span>
						<span class="the_subtitle marginB12 fontFamilyEB">Рекомендованное</span>

						<elements-slider v-if="getPromopack.data" :posts="getPromopack.data"/>

						<span class="theButton buttonTertiary buttonOptimal" @click="finishSelebrate">Позже</span>

					</div>
				</div>
			</div>

		</div>


		


	</div>
</template>

<script>
// @ is an alias to /src
// import Element from '@/components/Element';
import axios from 'axios';

import ElementsSlider from '@/components/ElementsSlider';
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import "yup-phone";

export default {
  name: 'Profile',


	setup(){
		// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
		const schema = yup.object().shape({
			name: yup.string().required('Пожалуйста, заполните это поле').typeError('Поле обязателено').min(2, 'Поле должно содержать не менее 2 символов').label('Имя'),
			birthdate: yup.date().typeError('Введите дату рождения').max(new Date(), 'Выберете корректную дату').label('День рождения'),
			is_mother: yup.string().required('Пожалуйста, заполните это поле').typeError('Поле обязателено').min(1, 'Введите корректные данные').max(1, 'Введите корректные данные').label('Ребенок рожден'),
			pregnancy_weeks: yup.number().min(0, 'Введите корректный срок').max(40, 'Введите корректный срок').typeError().label('Количество недель'),
			baby_born: yup.date().typeError('Введите дату рождения малыша').max(new Date(), "Выберете корректную дату").label('День рождения'),
			phone: yup.string().when('mobile', {
				is: (value) => value?.length > 0,
				then: yup.string().phone("", true, 'Введите корректный номер телефона'),
				otherwise: yup.string(),
			}),
			// phone: yup.string().matches(phoneRegExp, 'Phone number is not valid')
		},
		[
			['phone', 'phone'],
		]
		);
		return {
			schema, 
		}
	},


	data(){
		return{
			thePopup: false,
			profileIsFill: false,
			// yesBaby: false,
			celebrateWrap: false,
			pregnancyWeeks: 0,
			babyAge: '',
			babyWasBorn: 1,
		}
	},



	components: {
		ElementsSlider,
		Form,
    Field,
  },


	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
			setRouterAnimate: 'setRouterAnimate',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),
		...mapActions({
			fetchUserData: 'fetchUserData',
			fetchPromopack: 'content/fetchPromopack',
		}),


		celebrateBirthday(user) {
			if(user.pregnancy_weeks){
				user.pregnancy_weeks = Math.round(user.pregnancy_weeks);
			}else{
				user.pregnancy_weeks = 0;
			}
			try{
				setTimeout( () => {
					const response = 
						axios.put('https://api.xn--80axb4d.online/v1/user/profile', user, {
							headers: {
								Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
								'Content-Type': 'application/json',
								'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  							'Access-Control-Allow-Origin': '*',
							}
						}
					);
					this.fetchUserData();
					this.celebrateWrap = true;
				}, 500 );
			} catch(e){
				console.log(e);
			} finally {}
    },


		setPregnancyWeeks(){
			const currentDate = new Date();
			const startDate = new Date(this.getCurrUser.user.pregnancy_start);
			const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
			const convertToWeeks = Math.ceil(days / 7);
			// console.log(convertToWeeks);
			this.pregnancyWeeks = convertToWeeks;
		},

		setBabyAge(){
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
		},


		// Показать экран поздравлений и поменять статус ребенка
		// celebrateBirthday(){
		// 	this.yesBaby = true;
		// 	this.celebrateWrap = true;
		// },
		// Закрыть экран поздравления
		finishSelebrate(){
			this.celebrateWrap = false;
		},

		showPopup(){
			if(this.thePopup == true){
				this.thePopup = false;
			}else{
				this.thePopup = true;
			}
		},




		goLogout(){
			try{
				setTimeout( () => {
					// console.log('Запустили выход из системы');
					const response = 
						axios.delete('https://api.xn--80axb4d.online/v1/user/logout', {
							headers: {
								Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
								'Content-Type': 'application/json',
								'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  							'Access-Control-Allow-Origin': '*',
							}
						}
					);
					// console.log(response);

					this.setAuthOut(), 
					this.setLogPage()

				}, 500 );
			} catch(e){
				console.log(e);
			} finally {}
    },

	},


	computed:{
		...mapState({
			// isAuth: state => state.isAuth,
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			getLoadingStatus: 'getLoadingStatus',
			getPromopack: 'content/getPromopack',
		})
	},

	mounted(){
		this.fetchUserData();
		this.fetchPromopack(9);
		this.setPregnancyWeeks();
		this.setBabyAge();
	},

	watch:{
		getCurrUser: {
			handler(newVal){
				this.setPregnancyWeeks();
				this.setBabyAge();
				// console.log('Новое значение: ' + newVal);
			},
			deep: true
		}
	},

}
</script>


<style lang="scss" scoped>

.mainContainer{
	height: 100vh;
	position: relative;
	.hiddenForm{
		position: absolute;
		height: 0;
		opacity: 0;
		overflow: hidden;
		top: 0;
		left: 0;
		width: 0;
		z-index: 1;
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
		overflow: scroll;
		justify-content: flex-start;

		.popup_wrap{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.65);
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
				.the_title{
					color: #23292D;
				}
				.buttons_wrap{
					width: calc(100% + 8px);
					margin-left: -4px;
					margin-right: -4px;
					.theButton{
						width: 100%;
						margin: 4px;
					}
				}
			}
		}


		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			.link_button{
				border: none;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: transparent;
				width: 100%;
				position: relative;
				padding: 6px 12px;
				padding-right: calc(24px + 26px); 
				border-radius: 16px;
				margin-bottom: 4px;
				&::after{
					content: '';
					position: absolute;
					right: 16px;
					top: 50%;
					transform: translateY(-50%);
					width: 24px;
					height: 24px;
					display: block;
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url('../assets/icons/arrow-right.svg');
				}
				.left_wrap{
					display: flex;
					align-items: center;
				}
				.the_count{
					color: rgba(35, 41, 45, 0.7);
				}

				.the_icon{
					min-width: 32px;
					width: 32px;
					height: 32px;
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					margin-right: 8px;
					&.save_icon{
						background-image: url('../assets/icons/profile-save.svg');
					}
					&.buy_icon{
						background-image: url('../assets/icons/profile-buy.svg');
					}
					&.see_icon{
						background-image: url('../assets/icons/profile-see.svg');
					}
					&.help_icon{
						background-image: url('../assets/icons/profile-help.svg');
					}
					&.info_icon{
						background-image: url('../assets/icons/profile-info.svg');
					}
				}
				.the_title{
					text-align: left;
					padding-right: 10px;
					color: #23292D;
				}
			}
			
			.userinfo_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;
				.userinfo_alert{
					flex-direction: column;
					align-items: center;
					background-color: #FFEAEB;
					border-radius: 8px;
					padding: 12px;
					.the_icon{
						min-width: 32px;
						width: 32px;
						height: 32px;
						background-image: url('../assets/icons/profile-fill.svg');
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;
						margin-bottom: 8px;
					}
					.the_title{
						margin-bottom: 4px;
						color: #23292D;
					}
					.the_info{
						line-height: 19px;
						margin-bottom: 8px;
					}
					.theButton{}
				}

				.userinfo_box{
					.userinfo_card{
						margin-bottom: 12px;
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
								// background-image: url('../assets/images/nophoto.jpg');
								// background-size: cover;
							}
							img{
								object-fit: cover;
								width: 100%;
								height: 100%;
							}
							
						}
						.card_info_wrap{
							display: flex;
							flex-direction: column;
							.card_name{
								font-weight: 800;
								margin-bottom: 4px;
								user-select: none;
								font-size: 14px;
							}
							.card_status{
								padding-right: 40px;
								color: #23292DB2;
							}
						}
						.card_button{
							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
							display: block;
							background-position: center;
							background-repeat: no-repeat;
							background-size: 20px;
							background-image: url('../assets/icons/edit.svg');
							min-width: 30px;
							width: 30px;
							height: 30px;
							border: none;
							padding: 5px;
							background-color: transparent;
						}
					}
					.user_info_button{
						width: 100%;
						max-width: 328px;
					}
				}
			}
			.tabsinfo_wrap{
				background-color: #FFF;
				padding: 16px 4px;
			}
			.moreinfo_wrap{
				background-color: #FFF;
				padding: 16px 4px;
			}
			.logutinfo_wrap{
				background-color: #FFF;
				padding: 16px 16px;
				padding-bottom: 24px;
			}


			.celebrate_wrap{
				background-color: #FFF;
				padding: 96px 0px;
				width: 100%;
				.the_img{
					width: 56%;
					max-width: 480px;
					margin: 0 auto;
					display: block;
				}
				.the_title{
					text-align: center;
					color: #23292DB2;
					width: 100%;
					display: block;
					font-size: 16px;
				}
			}
			.moreelements_wrap{
				background-color: #FFF;
				padding: 16px 0px;
				.videoSliderWrap{
					.the_title{
						display: block;
						color: #23292DB2;
						padding: 0 16px;
						margin-bottom: 4px;
						font-size: 14px;
					}
					.the_subtitle{
						display: block;
						margin-bottom: 12px;
						color: #23292D;
						padding: 0 16px;
						padding-right: calc(24px + 26px); 
						position: relative;
						line-height: 24px;
						font-size: 16px;
						&::after{
							content: '';
							position: absolute;
							right: 16px;
							top: 50%;
							transform: translateY(-50%);
							width: 24px;
							height: 24px;
							display: block;
							background-size: contain;
							background-position: center;
							background-repeat: no-repeat;
							background-image: url('../assets/icons/arrow-right.svg');
						}
					}

					.theButton{
						margin-left: auto;
						margin-right: auto;
					}

				}
			}
			
		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 600px) {

	.mainContainer{
		.contentWrap{
			&.stepRegSecond{
				margin-bottom: 0px;
			}
		}
	}

}

@media screen and (max-width: 420px) {
	.mainContainer .contentWrap .contentSubWrap .userinfo_wrap .userinfo_box .user_info_button{
		max-width: 395px;
	}
}

</style>
