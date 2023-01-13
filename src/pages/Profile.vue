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
					<div class="userinfo_box" v-else>Молодец</div>
				</div>

				<div class="tabsinfo_wrap midWrap marginB12">
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

				<div class="logutinfo_wrap bottomWrap">
					<button class="theButton buttonTertiary fontFamilyB marginAuto buttonOptimal">Выйти из аккаунта</button>
				</div>

			</div>

			<div class="bottomLine flexWrap">
				<button class="theButton leftButton buttonTransparent fontFamilyB left_button">
					<span class="the_icon home_icon"></span>
					<span class="the_title">Главное</span>
				</button>
				<button class="theButton rightButton buttonTransparent fontFamilyB right_button active">
					<span class="the_icon profile_icon"></span>
					<span class="the_title">Профиль</span>
				</button>
			</div>
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'

export default {
  name: 'Profile',

	data(){
		return{
			profileIsFill: false,
		}
	},

  components: {
    // DefaultLikes,
  }
}
</script>


<style lang="scss" scoped>

.mainContainer{
	.contentWrap{
		padding: 0;
		margin-bottom: 80px;
		background-color: #F3F5F6;
		.bottomLine{
			background-color: #ffffffa8;
			backdrop-filter: blur(5px);
			border-bottom: 1px solid rgba(35, 41, 45, 0.1);
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 4px;
			justify-content: space-around;
			z-index: 100;
			.theButton{
				color: rgba(35, 41, 45, 0.5);
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0;
				width: 100%;
				.the_icon{
					display: block;
					min-width: 24px;
					width: 24px;
					height: 24px;
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					margin-bottom: 0px;
					&.home_icon{
						background-image: url('../assets/icons/icon-home-g.svg');
					}
					&.profile_icon{
						background-image: url('../assets/icons/icon-profile-g.svg');
					}
				}
				.the_title{}
				&.active{
					color: #FD7C84;
					.the_icon{
						&.home_icon{
						background-image: url('../assets/icons/icon-home-a.svg');
						}
						&.profile_icon{
							background-image: url('../assets/icons/icon-profile-a.svg');
						}
					}
				}
			}
			.left_button{}
			.right_button{}
		}
		.topLine{
			background-color: #ffffffa8;
			backdrop-filter: blur(5px);
			border-bottom: 1px solid rgba(35, 41, 45, 0.1);
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			padding: 0 16px;
			justify-content: space-between;
			z-index: 100;
			.theButton{
				width: 100%;
				max-width: max-content;
				min-width: 20%;
				&.rightButton{
					text-align: right;
				}
			}
			.theTitle{
				cursor: default;
				width: 100%;
				max-width: max-content;
				min-width: 60%;
				margin-top: 12px;
				margin-bottom: 12px;
				font-size: 16px;
			}
		}

		.contentSubWrap{
			width: 100%;
			padding: 16px 0;
			background-color: #F3F5F6;
			.link_button{
				border: none;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: transparent;
				width: 100%;
				position: relative;
				font-size: 16px;
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
