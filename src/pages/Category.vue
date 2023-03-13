<template>

	<div class="mainContainer catalogCategory">
		<div class="contentWrap">

			<!-- <div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/"></router-link>
				<h1 class="theTitle alignCenter">Каталог лекций</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div> -->

			<div class="contentSubWrap">
				<div class="topWrap content_box preview_box">
					<!-- <router-link class="theButton buttonBack theWhite" to="/catalog" /> -->
					<a @click="$router.push('/catalog/'), setRouterAnimate()" class="theButton buttonBack theWhite" />
					<!-- <img src="./../assets/images/category.jpg" alt=""> -->
					<img :src="currentCategory.preview_picture" alt="category_image">
					
				</div>
				<div class="midWrap content_box info_box">
					<span class="the_title fontSize20 fontFamilyEB">{{ currentCategory.title }}</span>
					<span class="the_subtitle fontSize14">{{ currentCategory.description }}</span>
					<!-- <span class="the_subtitle fontSize14">{{ currentCategory.info }}</span> -->
				</div>
				<div class="bottomWrap content_box categories_box" v-if="!currLoadingStatus && currentCategoryList.data">
					<catalog-sub-element 
					v-for="subCategory in currentCategoryList.data" 
					:key="subCategory.id"
					:subCategory="subCategory"
					/>
				</div>
				<div class="bottomWrap content_box categories_box roller_box" v-else>
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
				<!-- <catalog-element 
					v-for="post in catalogList"
					:post="post"
					:key="post.id"
				/> -->
				<!-- {{ currentCategory.id }} -->
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>
	</div>
	
	
</template>


<script>

import CatalogSubElement from '@/components/CatalogSubElement';

import {mapState, mapGetters, mapMutations} from 'vuex';


export default({

	name: 'Category', 

	components: {
		CatalogSubElement,
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
			currLoadingStatus: 'content/currLoadingStatus',
			currentCategory: 'content/currentCategory',
			currentCategoryList: 'content/currentCategoryList',
		}),
	},

	methods:{
    ...mapMutations({
      setRouterAnimate: 'setRouterAnimate',
			// setCurrentCategory: 'content/setCurrentCategory',
    }),
	},


	// mounted() {
	// 	this.setCurrentCategory(JSON.parse(localStorage.getItem("currentCategory")) || []);
	// },
	// watch: {
	// 	currentCategory(newValue, oldValue) {
	// 		localStorage.setItem("currentCategory", JSON.stringify(newValue));
	// 	}
	// },


});
</script>


<style lang="scss" scoped>



.mainContainer.catalogCategory{
	height: 100vh;
	position: relative;
	.contentWrap{
		padding: 0;
		padding-top: 0px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;
		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			.content_box{
				background-color: #FFF;
				margin-bottom: 12px;
			}
			.preview_box{
				width: 100%;
				padding-top: 53.35%;
				height: 0;
				position: relative;
				overflow: hidden;
				.theButton{
					display: block;
					position: absolute;
					left: 8px;
					top: 12px;
					z-index: 5;
					width: 24px;
					height: 24px;
					min-width: 24px;
				}
				img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: cover;
					display: block;
				}
			}
			.info_box{
				padding: 16px;
				padding-bottom: 24px;
				.the_title{
					margin-bottom: 4px;
					padding-right: 32px;
					position: relative;
					display: block;
					&::before{
						content: '';
						display: block;
						position: absolute;
						width: 20px;
						height: 20px;
						top: 50%;
						transform: translateY(-50%);
						right: 2px;
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
						background-image: url('./../assets/icons/alert-l.svg');
					}
				}
				.the_subtitle{
					display: block;
					color: #23292DB2;
					line-height: 150%;
					padding-right: 16px;
				}
			}

			.categories_box{
				padding: 16px;
				padding-bottom: 48px;
				margin-bottom: 0;
				display: grid;
				// -ms-grid-columns: 1fr[2];
				grid-template-columns: repeat(2,1fr);
				grid-gap: 12px;
			}
		}
	}
}


/* -------- @media ----------- */

@media screen and (max-width: 480px) {

	.mainContainer.catalogCategory{

		.contentWrap{
			.contentSubWrap{
				.categories_box{
					grid-template-columns: repeat(1,1fr);
				}
			}
		}
	}


}


</style>
