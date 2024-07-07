<template>
  <div class="mainContainer">

		<div class="contentWrap contentWrapPhantom">
			<div class="topLine flexWrap">
				<a @click="$router.push('/profile'), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Поиск</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap"></button>
			</div>

			<div class="filtersWrap topWrap marginB12">
				<span class="theTitle filtersTitle marginB12 fontSize20 fontFamilyEB">Фильтрация лекций</span>
				<div class="filterWrap" v-if="catalogList">
					<span class="filterTitle">Категория</span>
					<select class="filterField" v-model="curCategory">
						<option :value="false">Все категории</option>
						<option 
							v-for="category in this.catalogList.data"
							:key="category.id"
							:value="category.id"
							>{{ category.title }}
						</option>
						
					</select>
				</div>
				<div class="buttonsWrap">
					<span class="theButton buttonSecondary" @click="searchNew">Применить</span>
				</div>
			</div>
			
		</div>

		<div class="contentWrap" v-if="currLoadingStatus || !this.getSearch">
			<div class="contentSubWrap roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		</div>

		<div v-else class="contentWrap" :class="{centered: this.getSearch === 'e'}">
			
			<!-- <pre style="width:100%;">{{ catalogList }}</pre> -->

			<div class="contentsWrap">
				
			<!-- https://api.xn--80axb4d.online/v1/lectures?per_page=12&page=1&filter%5Bcategory_id%5D=21%2C11&filter%5Brecommended%5D=1&include=category&sort=-created_at -->
				<div class="resultsWrap bottomWrap" v-if="this.getSearch == undefined || this.getSearch == '' "></div>
				<div class="resultsWrap bottomWrap" v-else>
					<span class="resultsTitle fontSize20 fontFamilyEB">Результаты поиска</span>
					<div class="resultsQuantity">Найдено материалов: 
						<div class="roller_box" v-if="!getSearchTotal">
							<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
						</div>
						<span v-else>{{ getSearchTotal }}</span>
					</div>
					<search-list 
						class="contentSubWrap  "
						v-if="this.getSearch && this.getSearch !== 'e' && this.getSearch !== undefined"
						:posts="this.getSearch"
					></search-list>
				</div>

			</div>

			<div class="loaderWrap" v-if="this.getSearch == undefined || this.getSearch == '' "></div>
			<div class="loaderWrap" v-else>
				<div class="contentSubWrap roller_box" v-if="getAjaxStatus">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
				<span v-if="!getAjaxStatus && this.getSearch.length < this.getSearchTotal" class="theButton buttonPrimary marginAuto buttonOptimal" @click="searchMore">Загрузить еще</span>
			</div>
			


			<div class="contentSubWrap empty_wrap flexWrap" v-if=" this.getSearch == undefined || this.getSearch == '' " >
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Лекций не найдены</span>
				<!-- <p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p> -->
				<router-link class="theButton buttonPrimary buttonOptimal fontSize16" to="/search" @click="fetchSearchTotal(this.confs.category), fetchSearch(this.confs), resetCategory()">Сбросить фильтры</router-link>
			</div>

			<div class="element_box" v-if="this.getSearch == 'e'">
				<img class="the_img" src="./../assets/images/noResponse.png">
				<span class="info_title fontFamilyB">Данные не загрузились</span>
				<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
				<span @click="this.fetchPurchased(1000)" class="theButton buttonTertiary buttonOptimal">Обновить</span>
			</div>

		</div>

	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

import SearchList from '@/components/SearchList';

export default {
  name: 'Search',

	data(){
		return{
			curCategory: false,
			confs: {
				category: false,
				page: 1,
			},
			// curPage: 1,
			testCategory: 51,
		}
	},

	methods:{

		...mapMutations({
			setHomeTab: 'setHomeTab',
			setRouterAnimate: 'setRouterAnimate',
		}),
		...mapActions({
			fetchCatalog: 'content/fetchCatalog',
			fetchSearch: 'content/fetchSearch',
			fetchSearchTotal: 'content/fetchSearchTotal',
			fetchSearchMore: 'content/fetchSearchMore',
		}),

		resetCategory(){
			this.confs.page = 1;
			this.confs.category = false;
		},

		searchNew(){
			this.confs.page = 1;
			this.fetchSearchTotal(this.confs.category);
			this.fetchSearch(this.confs);
		},

		searchMore(){
			this.confs.page += 1;
			this.fetchSearchMore(this.confs);
		},

	},

  components: {
		SearchList,
  },


	computed:{
		...mapState({
		}),
		...mapGetters({
			currLoadingStatus: 'content/currLoadingStatus',
			getAjaxStatus: 'content/getAjaxStatus',
			getCurrUser: 'getCurrUser',
			catalogList: 'content/catalogList',
			getSearch: 'content/getSearch',
			getSearchTotal: 'content/getSearchTotal',
		}),
	},

	mounted(){
    this.fetchCatalog();
		this.fetchSearchTotal(this.confs.category);
		this.fetchSearch(this.confs);
  },


	watch:{
		curCategory: {
			handler(newVal){
				this.confs.category = newVal;
				this.searchNew();
			},
			deep: true
		}
	},


}
</script>


<style lang="scss" scoped>

.mainContainer{
	.contentWrap{
		padding: 0;
		padding-bottom: 48px;
		justify-content: flex-start;
		&.contentWrapPhantom{
			padding-top: 45px;
			padding-bottom: 0;
			overflow: visible;
			height: max-content;
			background-color: #F3F5F6;
			&::after{
				content: none;
			}
		}

		&.centered{
			justify-content: center;
			align-items: center;
		}
		.contentsWrap{
			width: 100%;
			display: flex;
    	align-items: center;
			flex-direction: column;
			background-color: #F3F5F6;
		}
		.filtersWrap{
			padding: 16px 16px 22px;
			width: 100%;
			background-color: #FFF;
			display: flex;
			flex-direction: column;
			.filtersTitle{}
			.buttonsWrap{}
			.theButton{
				margin-top: 10px;
				display: inline-block;
				min-width: 220px;
			}
			.filterWrap{
				width: 100%;
				display: flex;
				flex-direction: column;
				.filterTitle{
					margin-bottom: 4px;
    			margin-left: 16px;
					display: block;
					color: rgba(35, 41, 45, 0.6980392157);
					font-size: 12px;
				}
				.filterField{
					background-color: #F3F5F6;
					box-shadow: none;
					min-height: 44px;
					border-radius: 8px;
					letter-spacing: 0.32px;
					appearance: none;
					width: 100%;
					padding: 12px 14px;
					border: 2px solid #FFF;
    			transition: all .24s ease, letter-spacing .0s ease;
					font-size: 14px;
					// max-width: 420px;
				}
			}
		}
		.resultsWrap{
			width: 100%;
			padding: 8px 0px 8px;
			background-color: #FFF;
			.resultsTitle{
				display: block;
				color: #2c3e50;
				margin-bottom: 4px;
				padding: 8px 16px 0px;
			}
			.resultsQuantity{
				display: block;
				color: rgba(35, 41, 45, 0.6980392157);
				font-size: 13px;
				padding: 0px 16px 16px;
			}
			.roller_box{
				transform: scale(0.7);
				transform-origin: center;
				transform: scale(0.3);
				transform-origin: center;
				display: inline-block !important;
				min-height: 25px !important;
				/* height: 80px; */
				/* margin: -15px; */
				margin-right: 20px;
				margin-left: -5px;
				.lds-roller{
					width: 30px;
    			height: 30px;
				}
			}

		}

		.loaderWrap{
			.roller_box{
				min-height: 90px !important;
				transform: scale(0.85);
				transform-origin: center;
			}
		}
		

		.contentSubWrap{
			width: 100%;
			&.elements_wrap{
				padding-top: 8px;
			}
		

			&.empty_wrap{
				padding-top: 45px;
    		padding-bottom: 48px;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				max-width: 480px;
				padding-left: 10px;
				padding-right: 10px;
				.the_img{
					width: 56.56%;
					margin-left: auto;
					margin-right: auto;
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
