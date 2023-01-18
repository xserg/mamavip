<template>
  <div class="mainContainer">

		<div class="contentWrap" :class="{hiddenWrap: !this.hasElements}">

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/profile"></router-link>
				<h1 class="theTitle alignCenter">Купленные</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap elements_wrap flexWrap">
				
				<div class="the_element marginB12">
					<div class="info_line flexWrap">
						<div class="icons flexWrap">
							<span class="viewed blockWrap"></span>
							<span class="premium blockWrap"></span>
						</div>
						<span class="play"></span>
					</div>
					<div class="the_element_box">
						<img src="./../assets/images/element.jpg" alt="element">
					</div>
					<span class="the_title fontSize14 fontFamilyEB">Название лекции какое-нибудь длинное, чтобы занимало целых две строки или даже...</span>
				</div>
				<div class="the_element marginB12">
					<div class="info_line flexWrap">
						<div class="icons flexWrap">
							<span class="viewed blockWrap"></span>
							<span class="premium blockWrap"></span>
						</div>
						<span class="play"></span>
					</div>
					<div class="the_element_box">
						<img src="./../assets/images/element.jpg" alt="element">
					</div>
					<span class="the_title fontSize14 fontFamilyEB">Название лекции какое-нибудь длинное, чтобы занимало целых две строки или даже...</span>
				</div>
				<div class="the_element marginB12">
					<div class="info_line flexWrap">
						<div class="icons flexWrap">
							<span class="viewed blockWrap"></span>
							<span class="premium blockWrap"></span>
						</div>
						<span class="play"></span>
					</div>
					<div class="the_element_box">
						<img src="./../assets/images/element.jpg" alt="element">
					</div>
					<span class="the_title fontSize14 fontFamilyEB">Название лекции какое-нибудь длинное, чтобы занимало целых две строки или даже...</span>
				</div>
				<div class="the_element marginB12">
					<div class="info_line flexWrap">
						<div class="icons flexWrap">
							<span class="viewed blockWrap"></span>
							<span class="premium blockWrap"></span>
						</div>
						<span class="play"></span>
					</div>
					<div class="the_element_box">
						<img src="./../assets/images/element.jpg" alt="element">
					</div>
					<span class="the_title fontSize14 fontFamilyEB">Название лекции какое-нибудь длинное, чтобы занимало целых две строки или даже...</span>
				</div>
				<div class="the_element marginB12">
					<div class="info_line flexWrap">
						<div class="icons flexWrap">
							<span class="viewed blockWrap"></span>
							<span class="premium blockWrap"></span>
						</div>
						<span class="play"></span>
					</div>
					<div class="the_element_box">
						<img src="./../assets/images/element.jpg" alt="element">
					</div>
					<span class="the_title fontSize14 fontFamilyEB">Название лекции какое-нибудь длинное, чтобы занимало целых две строки или даже...</span>
				</div>
				<div class="the_element marginB12">
					<div class="info_line flexWrap">
						<div class="icons flexWrap">
							<span class="viewed blockWrap"></span>
							<span class="premium blockWrap"></span>
						</div>
						<span class="play"></span>
					</div>
					<div class="the_element_box">
						<img src="./../assets/images/element.jpg" alt="element">
					</div>
					<span class="the_title fontSize14 fontFamilyEB">Название лекции какое-нибудь длинное, чтобы занимало целых две строки или даже...</span>
				</div>

			</div>

			<div class="contentSubWrap empty_wrap flexWrap" :class="{hiddenWrap: this.hasElements}">
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет просмотренных лекций</span>
				<span class="theButton buttonPrimary buttonOptimal">Искать лекции</span>
			</div>

			<bottom-line></bottom-line>
			
		</div>




		<div class="contentWrap centered" :class="{hiddenWrap: this.hasElements}">

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/profile"></router-link>
				<h1 class="theTitle alignCenter">Купленные</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap empty_wrap flexWrap" :class="{hiddenWrap: this.hasElements}">
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет купленных лекций</span>
				<!-- <p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p> -->
				<router-link class="theButton buttonPrimary buttonOptimal" to="/" @click="this.setHomeTab()">Искать лекции</router-link>
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
  name: 'ProfileBought',

	data(){
		return{
			hasElements: false,
		}
	},

	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
			setHomeTab: 'setHomeTab',
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

		&.centered{
			justify-content: center;
			align-items: center;
		}

		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			// background-color: #F3F5F6;
			&.elements_wrap{
				width: calc(100% + 16px);
				padding: 8px 16px 16px;
				flex-wrap: wrap;
				margin-left: -8px;
				margin-right: -8px;
				.the_element{
					width: calc(50% - 16px);
					position: relative;
					margin-left: 8px;
					margin-right: 8px;
					cursor: pointer;
					transition: all .24s ease;
					&:hover{
						opacity: .86;
					}
					.info_line{
						padding: 8px 12px;
						width: 100%;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						justify-content: space-between;
						display: flex;

						.icons{
							height: max-content;
							.viewed{
								width: 28px;
								height: 16px;
								border-radius: 8px;
								background: rgba(255, 255, 255, 0.7);
								backdrop-filter: blur(10px);
								margin-right: 4px;
								padding: 2px 8px;
								&::before{
									display: block;
									content: '';
									width: 12px;
									height: 12px;
									background-image: url('../assets/icons/viewed.svg');
									background-size: contain;
									background-repeat: no-repeat;
									background-position: center;
								}
							}
							.premium{
								padding: 2px 8px;
								width: 28px;
								height: 16px;
								border-radius: 8px;
								background: #FD7C84;
								box-shadow: 0px 2px 4px rgba(253, 124, 132, 0.5);
								&::before{
									display: block;
									content: '';
									width: 12px;
									height: 12px;
									background-image: url('../assets/icons/premium.svg');
									background-size: contain;
									background-repeat: no-repeat;
									background-position: center;
								}
							}

						}
						.play{
							width: 40px;
							height: 40px;
							border-radius: 50%;
							background: rgba(255, 255, 255, 0.7);
							backdrop-filter: blur(10px);
							padding: 8px;
							&::before{
								content: '';
								width: 100%;
								height: 100%;
								display: block;
								background-image: url('../assets/icons/play.png');
								background-size: contain;
								background-position: center;
								background-repeat: no-repeat;
							}
						}
					}
					.the_element_box{
						border: 1px solid rgba(35, 41, 45, 0.1);
						border-radius: 8px;
						overflow: hidden;
						margin-bottom: 4px;
						img{
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

			&.empty_wrap{
				padding-top: 45px;
    		padding-bottom: 48px;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				max-width: 480px;
				.the_img{
					width: 100%;
				}
				.the_title{
					color: #23292DB2;
					margin-bottom: 4px;
					text-align: center;
				}
				.the_desc{
					color: #23292DB2;
					text-align: center;
					margin-bottom: 4px;
				}
				.theButton{
					margin-top: 24px;
				}
			}

		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 480px) {

	.mainContainer{
		.contentWrap{

			.contentSubWrap{
				&.elements_wrap{
					width: 100%;
					padding: 8px 16px 16px;
					margin-left: 0px;
					margin-right: 0px;
					.the_element{
						width: 100%;
						margin-left: 0px;
						margin-right: 0px;
					}
				}
			}
		}
	}


}

</style>
