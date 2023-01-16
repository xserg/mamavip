<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
				<h1 class="theTitle alignCenter">Профиль</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">

				<div class="userinfo_wrap topWrap marginB12">
					<div class="userinfo_alert flexWrap" v-if="!profileIsFill">
						<span class="the_icon"></span>
						<span class="the_title blockWrap fontFamilyEB alignCenter">Заполните профиль</span>
						<p class="the_info blockWrap fontSize14 alignCenter">Это необходимо, чтобы пользоваться сервисом</p>
						<button class="theButton buttonTransparent fontFamilyB">Заполнить</button>
					</div>
					<div class="userinfo_box" v-else>
						<div class="userinfo_card">
							<!-- <span class="card_photo_wrap"  style="background-image:url('../assets/images/profile.jpg')"></span> -->
							<span class="card_photo_wrap"></span>
							<div class="card_info_wrap">
								<span class="card_name">Екатерина</span>
								<span class="card_status">Ваш срок — примерно 29 недель</span>
							</div>
							<router-link class="card_button theButton buttonTransparent buttonOptimal" to="/edit"></router-link>
						</div>
						<button class="user_info_button theButton buttonPrimary">Отметить рождение малыша</button>
					</div>
				</div>

				<div class="tabsinfo_wrap midWrap marginB12 fontSize16">
					<button class="link_button">
						<div class="left_wrap">
							<span class="the_icon save_icon"></span>
							<span class="the_title">Сохранённые лекции</span>
						</div>
						<span class="the_count">12</span>
					</button>
					<button class="link_button">
						<div class="left_wrap">
							<span class="the_icon buy_icon"></span>
							<span class="the_title">Купленные лекции</span>
						</div>
						<span class="the_count">7</span>
					</button>
					<button class="link_button">
						<div class="left_wrap">
							<span class="the_icon see_icon"></span>
							<span class="the_title">Просмотренные лекции</span>
						</div>
						<span class="the_count">18</span>
					</button>
				</div>

				<div class="moreinfo_wrap midWrap marginB12">
					<button class="link_button">
						<div class="left_wrap">
							<span class="the_icon help_icon"></span>
							<span class="the_title">Помощь</span>
						</div>
						<span class="the_count"></span>
					</button>
					<button class="link_button">
						<div class="left_wrap">
							<span class="the_icon info_icon"></span>
							<span class="the_title">О приложении</span>
						</div>
						<span class="the_count"></span>
					</button>
				</div>

			</div>

			<div class="contentSubWrap">
				<div class="logutinfo_wrap bottomWrap">
					<button class="theButton buttonTertiary fontFamilyB marginAuto buttonOptimal" @click="this.setAuthOut(), this.setLogPage()">Выйти из аккаунта</button>
				</div>
			</div>

			<bottom-line></bottom-line>
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'

import {mapState, mapMutations} from 'vuex';

export default {
  name: 'Profile',

	data(){
		return{
			profileIsFill: true,
		}
	},

	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),
	},

  components: {
    // DefaultLikes,
  },


	// computed:{
	// 	...mapState({
	// 		isAuth: state => state.isAuth,
	// 	}),
	// },
}
</script>


<style lang="scss" scoped>

.mainContainer{
	height: 100vh;
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;

		.contentSubWrap{
			width: 100%;
			padding: 16px 0;
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
				padding: 8px 16px;
				padding-right: calc(24px + 26px); 
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

							background-image: url('../assets/images/profile.jpg');
							background-size: cover;
						}
						.card_info_wrap{
							display: flex;
							flex-direction: column;
							.card_name{
								font-weight: 800;
								margin-bottom: 4px;
								user-select: none;
							}
							.card_status{
								padding-right: 40px;
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
				padding: 16px 0;
			}
			.moreinfo_wrap{
				background-color: #FFF;
				padding: 16px 0;
			}
			.logutinfo_wrap{
				background-color: #FFF;
				padding: 16px 0;
				padding-bottom: 24px;
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

</style>
