<template>

	<div class="mainContainer catalogSubCategory">




		<div class="contentWrap" v-if="currentSubCategory.title && !currLoadingStatus">

			<div class="topLine flexWrap">

				<span class="theButton leftButton buttonTransparent buttonBack" @click="$router.go(-1), setRouterAnimate()"></span>
				<!-- <span class="theButton leftButton buttonTransparent buttonBack" @click="$router.push('/catalog/' + this.currentSubCategory.parent_slug), setRouterAnimate()"></span> -->

				<h1 class="theTitle alignCenter">{{ this.currentSubCategory.title }}</h1>
				<!-- <span class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</span> -->
				<router-link to="/search" @click="setRouterAnimate" class="theButton rightButton buttonTransparent fontFamilyB buttonSearch"></router-link>
			</div>

			<div class="contentSubWrap" >
				<div class="topWrap content_box info_box marginB12">
					<div class="img_wrap">
						<img class="the_img" v-if="this.currentSubCategory.preview_picture" :src="this.currentSubCategory.preview_picture  ? this.currentSubCategory.preview_picture : ''" alt="subcategory_image" />
						<span class="empty_icon"></span>
					</div>
					<span class="the_title fontSize20 fontFamilyEB">{{ this.currentSubCategory.title }}</span>
					<div class="the_subtitle fontSize14 marginB12" v-html="this.currentSubCategory.description"/>
					<!-- <span class="the_subtitle fontSize14 marginB12">{{ this.currentSubCategory.description }}</span> -->

					<!-- <span class="theButton buttonPrimary buttonOptimal marginAuto marginB12" v-if="currentSubCategoryList.data && this.currentSubCategory.prices[0].price_for_category !== null" @click="$router.push('/category_prices/'), setRouterAnimate()">Купить от {{ this.currentSubCategory.prices[0].price_for_category }}₽</span>
					<span class="theButton buttonPrimary buttonOptimal marginAuto marginB12" v-if="currentSubCategoryList.data && this.currentSubCategory.prices[0].price_for_category == null && this.currentSubCategory.prices[1].price_for_category !== null" @click="$router.push('/category_prices/'), setRouterAnimate()">Купить от {{ this.currentSubCategory.prices[1].price_for_category }}₽</span>
					<span class="theButton buttonPrimary buttonOptimal marginAuto marginB12" v-if="currentSubCategoryList.data && this.currentSubCategory.prices[0].price_for_category == null && this.currentSubCategory.prices[1].price_for_category == null && this.currentSubCategory.prices[2].price_for_category !== null" @click="$router.push('/category_prices/'), setRouterAnimate()">Купить от {{ this.currentSubCategory.prices[2].price_for_category }}₽</span> -->

					<div v-if="Number(currentSubCategory.prices[0].price_for_category) == 0 && Number(currentSubCategory.prices[1].price_for_category) == 0 && Number(currentSubCategory.prices[2].price_for_category) == 0"></div>
					<div v-else><span v-if="currentSubCategory.parent_id !== 38" class="theButton buttonPrimary buttonOptimal marginAuto marginB12" @click="$router.push('/subcategory_prices/'), setRouterAnimate()">{{ getInfos.data.app_info[0].buy_subcategory }}</span></div>
				</div>

				<div v-if="currentSubCategoryList.data">

					<div class="midWrap content_box elements_box marginB12" style="margin-bottom:12px;" v-if="currentSubCategoryList.data">
						<span class="the_title fontSize20 fontFamilyEB">Лекции</span>
						<span class="the_subtitle fontSize14">Всего: {{ this.currentSubCategoryList.data.length ? this.currentSubCategoryList.data.length : '-' }} • Просмотрено: {{getViewedLectures}}</span>
						<elements-list
							v-if="currentSubCategoryList.data.length > 0"
							class="elements_list"
							:posts="currentSubCategoryList.data"
						/>
					</div>

					<div class="bottomWrap content_box elements_box" >
						<!-- ЛЕКТОРЫ -->
						<div class="teachers_box bottomWrap marginB12">
							<!-- <span class="the_title fontFamilyEB fontSize20 blockWrap">{{ this.getInfos.data.app_info[0].out_lectors_title }}</span> -->
							<span class="the_title fontFamilyEB fontSize20 blockWrap">Лекторы категории</span>
							<!-- <span class="the_subtitle marginB12 fontSize14 blockWrap">Выберите тему, которая вас интересует</span> -->
							<div class="contentSubWrapTeachers" v-if="catTeachersList.data && catTeachersList.data.length">
								<teacher-element class="the_element" v-for="teacher in catTeachersList.data" :key="teacher" :teacher="teacher" />
								<!-- <teacher-slider v-if="catTeachersList.data" :teachers="catTeachersList.data"/> -->
							</div>
							<div v-else class="roller_box">
								<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
							</div>
						</div>
						<!-- ЛЕКТОРЫ END -->
					</div>
				</div>


				<div v-else class="bottomWrap empty_wrap">
					<div class="empty_subwrap flexWrap">
						<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
						<span class="the_title fontFamilyEB">Кажется, здесь ничего нет</span>
						<span class="the_desc fontSize14">Попробуйте обновить страницу или поискать в другом месте</span>
						<span class="theButton buttonTertiary buttonOptimal" @click="this.fetchCurrentSubCategoryAndElements(this.$route.params.slug)">Обновить</span>
					</div>
				</div>

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

			<!-- <div class="contentSubWrap">
				<div v-if="!currentSubCategory && !currLoadingStatus" class="bottomWrap empty_wrap">
					<div class="empty_subwrap flexWrap">
						<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
						<span class="the_title fontFamilyEB">Кажется, здесь ничего нет</span>
						<span class="the_desc fontSize14">Попробуйте обновить страницу или поискать в другом месте</span>
						<span class="theButton buttonTertiary buttonOptimal">Обновить</span>
					</div>
				</div>
			</div> -->






			<!-- <bottom-line></bottom-line> -->

		</div>

		<div class="contentWrap" v-else>
			<div class="bottomWrap content_box elements_box roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		</div>





	</div>


</template>


<script>

import ElementsList from '@/components/ElementsList';
import TeacherSlider from '@/components/TeacherSlider';
import TeacherElement from '@/components/TeacherElement';

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';


export default({

	name: 'SubCategory',

	components: {
		ElementsList,
		TeacherSlider,
		TeacherElement,
	},

	props: {
		category: {
			type: Object,
			requiered: true
		}
	},

	data(){
		return{
			// viewedLectures: 0,
			// post: {},
		}
	},

	methods:{
    ...mapMutations({
      setRouterAnimate: 'setRouterAnimate',
			setViewedLectures: 'content/setViewedLectures',
    }),
		...mapActions({
			fetchCurrentSubCategoryAndElements: 'content/fetchCurrentSubCategoryAndElements',
			fetchCatLectors: 'content/fetchCatLectors',
    }),



		// setViewedLectures(){
		// 	if(this.currentSubCategoryList.data){
		// 		const viewedLecturesArray = this.currentSubCategoryList.data.filter(p => p.list_watched == 1);
		// 		if(viewedLecturesArray.length){
		// 			this.viewedLectures = viewedLecturesArray.length
		// 		}else{
		// 			this.viewedLectures = 0;
		// 		}
		// 	}
		// 	// this.currentSubCategoryList.data.length
		// }
	},


	computed:{
		...mapState({
		}),
		...mapGetters({
			getInfos: 'getInfos',
			currLoadingStatus: 'content/currLoadingStatus',
			sortedElements: 'content/sortedElements',
			currentSubCategory: 'content/currentSubCategory',
			currentSubCategoryList: 'content/currentSubCategoryList',
			catTeachersList: 'content/catTeachersList',
			getViewedLectures: 'content/getViewedLectures',
		}),
	},


	mounted(){
		// console.log(this.$route.params);
		this.fetchCurrentSubCategoryAndElements(this.$route.params.slug);
		this.setViewedLectures(this.currentSubCategoryList.data);
		this.fetchCatLectors(this.currentSubCategory.slug);
	},

	watch:{
		currentSubCategoryList:{
			handler(newVal){
				this.setViewedLectures(this.currentSubCategoryList.data);
			}, deep: true,
		},
		getCurrentLecture:{
			handler(newVal){
				this.setViewedLectures(this.currentSubCategoryList.data);
			}
		},
		currentSubCategory:{
			handler(newVal){
				this.fetchCatLectors(this.currentSubCategory.slug);
			}
		}
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
			.topLine{
				.theButton{
					max-width: 30px;
					min-width: 30px;
					width: 30px;
				}
				.theTitle{
					max-width: calc(100% - 60px);
					min-width: calc(100% - 60px);
					width: calc(100% - 60px);
				}
			}
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
						padding-left: 24px;
						padding-right: 24px;
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

			.teachers_box{
				.the_title{
					margin-bottom: 16px;
				}
				.contentSubWrapTeachers{
					width: 100%;
					padding: 5px;
					// background-color: #F3F5F6;
					display: grid;
					// -ms-grid-columns: 1fr[2];
					grid-template-columns: repeat(3,1fr);
					grid-gap: 12px;
					// flex-wrap: wrap;
					.the_element{
						width: 100%;
						min-width: 100%;
						margin-bottom: 10px;
						height: auto;
						.the_title::before{
							display: none;
						}
					}
					.the_element_box{
						width: 60%;
						min-width: 60%;
						padding-top: 60%;
						margin-bottom: 8px;
					}
				}

			}
		}
	}
}


/* -------- @media ----------- */

@media screen and (max-width: 550px) {

.mainContainer.catalogSubCategory .contentWrap .contentSubWrap .teachers_box .contentSubWrapTeachers{
	grid-template-columns: repeat(2,1fr);
}

}




@media screen and (max-width: 480px) {

	.mainContainer.catalogCategory{

		.contentWrap{
			.contentSubWrap{
			}
		}
	}


}




</style>
