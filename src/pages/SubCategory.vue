<template>

	<div class="mainContainer catalogSubCategory">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/catalog/category"></router-link>
				<h1 class="theTitle alignCenter">Беременность</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">
				<div class="topWrap content_box info_box">
					<div class="img_wrap">
						<img class="the_img" src="./../assets/images/category.jpg" alt="" />
						<span class="empty_icon"></span>
					</div>
					<span class="the_title fontSize20 fontFamilyEB">Диагностика и беременность</span>
					<span class="the_subtitle fontSize14">В данной подкатегории мы расскажем Вам о самых разных лабораторных и инструментальных исследованиях, проводимых в период беременности, о  пренатальном скрининге и других интересных вещах.</span>
				</div>

				<div class="bottomWrap content_box elements_box">
					<span class="the_title fontSize20 fontFamilyEB">Лекции</span>
					<span class="the_subtitle fontSize14">Всего: 14 • Просмотрено: 5</span>
					<elements-list 
						class="elements_list"
						:posts="sortedElements"
					/>
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

import ElementsList from '@/components/ElementsList';

import {mapState, mapGetters, mapMutations} from 'vuex';


export default({

	name: 'SubCategory', 

	components: {
		ElementsList,
	}, 

	props: {
		category: {
			type: Object,
			requiered: true
		}
	},

	data(){
		return{
			// post: {},
		}
	},

	computed:{
		...mapState({
		}),
		...mapGetters({
			sortedElements: 'content/sortedElements',
			currentSubCategory: 'content/currentSubCategory',
		}),
	},



});
</script>


<style lang="scss" scoped>



.mainContainer.catalogSubCategory{
	height: 100vh;
	position: relative;
	.contentWrap{
		padding: 0;
		padding-top: 40px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;
		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			.empty_wrap{
				width: 100%;
				background-color: #FFF;
				.empty_subwrap{
					padding-top: 16px;
					padding-bottom: 48px;
					flex-wrap: wrap;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-left: 10px;
					padding-right: 10px;
					.the_img{
						width: 56%;
						margin-left: auto;
						margin-right: auto;
						margin-bottom: 24px;
					}
					.the_title{
						color: #23292DB2;
						margin-bottom: 4px;
						text-align: center;
						max-width: 480px;
						margin-left: auto;
						margin-right: auto;
					}
					.the_desc{
						color: #23292DB2;
						text-align: center;
						max-width: 480px;
						margin-left: auto;
						margin-right: auto;

					}
					.theButton{
						margin-top: 24px;
					}
				}
			}


			.error_wrap{
				width: 100%;
				background-color: #FFF;
				.error_subwrap{
					padding-top: 16px;
					padding-bottom: 48px;
					flex-wrap: wrap;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding-left: 10px;
					padding-right: 10px;
					.the_toptitle{
						text-align: left;
						width: 100%;
						padding-left: 6px;
						padding-right: 6px;
					}
					.the_img{
						width: 56%;
						margin-left: auto;
						margin-right: auto;
						margin-bottom: 24px;
					}
					.the_title{
						color: #23292DB2;
						margin-bottom: 4px;
						text-align: center;
						max-width: 480px;
						margin-left: auto;
						margin-right: auto;
					}
					.the_desc{
						color: #23292DB2;
						text-align: center;
						max-width: 480px;
						margin-left: auto;
						margin-right: auto;
					}
					.theButton{
						margin-top: 24px;
					}
				}
			}


			.content_box{
				background-color: #FFF;
				margin-bottom: 12px;
			}

			.info_box{
				padding: 16px;
				.img_wrap{
					width: 100%;
					padding-top: 32.5%;
					position: relative;
					margin-bottom: 12px;
					// border: 1px solid rgba(35, 41, 45, 0.1);
					overflow: hidden;
					border-radius: 8px;
					background-color: #FFEAEB;
					.empty_icon{
						position: absolute;
						z-index: 5;
						bottom: 12px;
						left: 16px;
						border-radius: 50%;
						background-image: url('./../assets/icons/folder.svg');
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
						display: block;
						width: 32px;
						height: 32px;
						
					}
					img{
						width: 100%;
						height: 100%;
						object-fit: cover;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 10;
						border: 1px solid rgba(35, 41, 45, 0.1);
						overflow: hidden;
						border-radius: 8px;
					}
				}
				.the_title{
					margin-bottom: 4px;
					position: relative;
					display: block;
				}
				.the_subtitle{
					display: block;
					color: #23292DB2;
					line-height: 150%;
				}
			}

			.elements_box{
				padding: 0px;
				margin-bottom: 0;
				padding-bottom: 12px;
				.the_title{
					padding-top: 16px;
					padding-left: 16px;
					padding-right: 16px;
					margin-bottom: 4px;
					display: block;
				}
				.the_subtitle{
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
