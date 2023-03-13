<template>
  <div class="mainContainer">

		<div class="contentWrap" v-if="sortedElementsNotview.length > 0">

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/" @click="setRouterAnimate"></router-link>
				<h1 class="theTitle alignCenter">Все акции</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap marginB12">
				<div class="infoWrap">
					<h2>Наша акционная подборка видео для Вас</h2>
					<p>Вы можете приобрести все видео разом из текущего раздела по специальной цене, а также каждое отдельное видео!</p>
					<span class="theButton buttonPrimary buttonOptimal marginAuto marginB12" @click="$router.push('/category_prices/'), setRouterAnimate()">Купить от {{ this.currentSubCategory.prices[0].price_for_category }}₽</span>
				</div>
			</div>

			<elements-list 
				class="contentSubWrap"
				v-if="getPromopack.data"
				:posts="getPromopack.data"
			></elements-list>
			<div v-else class="roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>




		<div class="contentWrap centered" v-else>

			<div class="topLine flexWrap">
				<a @click="$router.push('/'), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Все акции</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap empty_wrap flexWrap">
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет лекций в разделе</span>
				<!-- <p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p> -->
				<router-link class="theButton buttonPrimary buttonOptimal" to="/" @click="setHomeTab(), setRouterAnimate()">На главную</router-link>
			</div>

			<!-- <bottom-line></bottom-line> -->

		</div>



	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import ElementsList from '@/components/ElementsList';

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

export default {
  name: 'PromoPack',

	data(){
		return{
		}
	},

	methods:{

		...mapMutations({
			setHomeTab: 'setHomeTab',
			setRouterAnimate: 'setRouterAnimate',
		}),
		...mapActions({
			fetchPromopack: 'content/fetchPromopack',
    }),

	},

  components: {
		ElementsList,
  }, 


	computed:{
		...mapState({
		}),
		...mapGetters({
			
			currentSubCategory: 'content/currentSubCategory',
			currentSubCategoryList: 'content/currentSubCategoryList',
			// sortedPosts: 'post/sortedPosts',
			sortedElementsNotview: 'content/sortedElementsNotview',
			getPromopack: 'content/getPromopack',
		}),
	},

	mounted() {
		this.fetchPromopack();
  },

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
			.infoWrap{
				padding: 18px 16px;
				.theButton{
					margin-top: 20px;
				}
			}
			
			p{
				line-height: 150%;
			}
			
		}

		&.centered{
			justify-content: center;
			align-items: center;
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
