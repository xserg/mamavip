<template>
  <div class="mainContainer" :class="{fixed: heightLock}" id="homeContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
				<h1 class="theTitle alignCenter">Школа мам и пап "Нежность"</h1>
				<router-link to="/search" @click="setRouterAnimate" class="theButton rightButton buttonTransparent fontFamilyB buttonSearch"></router-link>
			</div>

			<div class="contentSubWrap">

				<!-- РЕКОМЕНДУЕМ -->

				<div class="recommended_box">
					<div v-if="!getAvailableTimer">
						<span class="the_title fontFamilyEB fontSize20 blockWrap"></span>
						<div class="element_box" v-if="getRecommended && getRecommended !== 'e' ">
							
							<div class="the_element" @mousedown="handleMouseDown" @click="handleClick">
								<div class="the_element_box">
									
									<img   src="./../assets/images/girl2.jpg" alt="element">			
								</div>
							</div>
						</div>
						<div v-else class="roller_box">
							<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
						</div>
					</div>
					<div class="message_wrap" v-else>
						<span class="mess_icon"></span>
						<span class="mess_title fontFamilyEB">{{ getInfos.data.app_info[0].view_schedule }}</span>
						<span class="mess_desc">{{ getInfos.data.app_info[0].watched_already }}<br>{{ getInfos.data.app_info[0].next_free_lecture_available_at }}<br>{{ getAvailableTimer.hours }} ч. {{ getAvailableTimer.minutes }} мин. {{ getAvailableTimer.seconds }} сек.</span>
					</div>

					<div class="element_box" v-if="getRecommended === 'e'">
						<img class="the_img" src="./../assets/images/noResponse.png">
						<span class="info_title fontFamilyB">Данные не загрузились</span>
						<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
						<span @click="this.fetchRecommended()" class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>

				</div>
				
				<!-- РЕКОМЕНДУЕМ END -->
				<!--  -->
				<div class="midWrap" :class="{catalog_box: !catalogError, error_box: catalogError }" v-if="!catalogError">
					<router-link class="the_title fontFamilyEB fontSize20 blockWrap" to="/home" @click="setRouterAnimate">
						Добро пожаловать в Школу Мам и Пап!</router-link>
					<span class="the_subtitle marginB12 fontSize14 blockWrap">
						Наш проект создан для решения очень важной задачи — развития и поддержки материнства. Мы понимаем, как важно любящим мамам и тем, кто планирует ими стать, иметь точку опоры. Надежного помощника, который всегда поддержит и подскажет, что делать в той или иной ситуации.

						Для этого мы создали приложение для беременных и мам, которое всегда будет рядом, где бы вы ни находились. В одном месте для вас собрана качественная и проверенная информация о беременности и родах, о грудном вскармливании и уходе за новорожденным.
					</span>
					<span class="theButton rightButton buttonTransparent fontFamilyB"  @click="this.$router.push('/home')">Далее</span>
				</div>
				<!--  END -->
			</div>

		</div>
	</div>
</template>

<script>

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Main',
  components: {

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
			//catalogList: 'content/catalogList',
			//getPromopack: 'content/getPromopack',
			getRecommended: 'content/getRecommended',
			//teachersList: 'content/teachersList',
			//getNotViewed: 'content/getNotViewed',
			//sortedElementsPromopack: 'content/sortedElementsPromopack',
		}),
	},


	methods:{
    ...mapMutations({
			// setAvailableTimer: 'setAvailableTimer',
      setRouterAnimate: 'setRouterAnimate',
    }),
		...mapActions({
			fetchRecommended: 'content/fetchRecommended',
			fetchNotViewed: 'content/fetchNotViewed',
			// fetchSaved: 'content/fetchSaved',
    }),

		switchloadingStatus(bool){
			this.loadingStatus = bool;
		},

	},


	mounted() {
		this.switchloadingStatus(false);
		// this.setAvailableTimer();
		this.fetchRecommended();
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
				//padding: 16px 0;
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
					padding-bottom: 4px;
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

.the_element{
	width: 100%;
	position: relative;
	cursor: pointer;
	transition: all .24s ease;
	display: block;
	// margin-bottom: 5px;
	padding-bottom: 8px;
	&:hover{
		opacity: 1;
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
		z-index: 20;

		.icons{
			height: max-content;
			.viewed{
				// width: 28px;
				// height: 16px;
				width: 34px;
				height: 19.5px;
				// border-radius: 8px;
				border-radius: 10px;
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				margin-right: 4px;
				// padding: 2px 8px;
				padding: 2px 10px;
				&::before{
					display: block;
					content: '';
					// width: 12px;
					// height: 12px;
					width: 15px;
					height: 15px;
					background-image: url('../assets/icons/viewed.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
			.bought{
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				margin-right: 4px;
				width: 34px;
				height: 19.5px;
				border-radius: 10px;
				padding: 2px 10px;
				&::before{
					width: 14px;
					height: 14px;
					display: block;
					content: '';
					background-image: url('../assets/icons/bag.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
			

			

		}
		
	}
	.the_element_box{
		border: 1px solid rgba(35, 41, 45, 0.1);
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 0px;
		position: relative;
		height: 0;
		width: 100%;
		padding-top: 56.6%;
		z-index: 10;
		background-color: #fff0f1;
		img{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
		.star{
			display: none !important;
			width: 30px;
			height: 30px;
			position: absolute;
			right: 0px;
			bottom: 0px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			&.active{
				display: block !important;
			}
			&::before{
				display: block;
				content: '';
				width: 22px;
				height: 22px;
				background-image: url('../assets/icons/star.png');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}
		}
	}
	.the_title{
		display: block;
		color: #23292D;

		max-height: 2.46rem;
    height: 100%;
    line-height: 1.16rem;
    text-overflow: ellipsis;
    font-size: 0.96rem;
    overflow: hidden;
		white-space: normal;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
		width: calc(100% - 20px);
	}
}


}


</style>
