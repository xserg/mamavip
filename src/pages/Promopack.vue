<template>
  <div class="mainContainer">

		<div class="contentWrap" v-if="currLoadingStatus || !this.getPromopack">
			<div class="contentSubWrap roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		</div>

		<div v-else class="contentWrap" :class="{centered: this.getPromopack == 'e'}">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Все акции</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Готово</button>
			</div>

			<div class="contentSubWrap marginB12" v-if="this.getPromopack.prices && this.getPromopack && this.getPromopack !== 'e'">
				<div class="infoWrap">
					<h2>Наша акционная подборка видео для Вас</h2>
					<p>Вы можете приобрести все видео разом из текущего раздела по специальной цене, а также каждое отдельное видео!</p>
					<span class="theButton buttonPrimary buttonOptimal marginAuto marginB12" @click="$router.push('/category_prices/'), setRouterAnimate()">Купить от {{ this.getPromopack.prices[0].price }}₽</span>
				</div>
			</div>

			<elements-list 
				class="contentSubWrap"
				v-if="this.getPromopack && this.getPromopack !== 'e' && this.getPromopack !== undefined && this.getPromopack !== ''"
				:posts="this.getPromopack.data"
			></elements-list>

			<div class="contentSubWrap empty_wrap flexWrap" v-else>
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет лекций в разделе</span>
				<!-- <p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p> -->
				<router-link class="theButton buttonPrimary buttonOptimal fontSize16" to="/" @click="setHomeTab(), setRouterAnimate()">Искать лекции</router-link>
			</div>

			<div class="element_box" v-if="this.getPromopack == 'e'">
				<img class="the_img" src="./../assets/images/noResponse.png">
				<span class="info_title fontFamilyB">Данные не загрузились</span>
				<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
				<span @click="this.fetchPromopack(1000)" class="theButton buttonTertiary buttonOptimal">Обновить</span>
			</div>

		</div>

	</div>
</template>



<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import axios from 'axios';
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
			setInfos: 'setInfos',
			setHomeTab: 'setHomeTab',
			setRouterAnimate: 'setRouterAnimate',
		}),
		...mapActions({
			fetchPromopack: 'content/fetchPromopack',
    }),


		loadStaticInfo(){
			try{
				setTimeout( async () => {
					const responseInfos = await axios.get('https://api.xn--80axb4d.online/v1/app/info', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					});
					this.setInfos(responseInfos.data);
				}, 50 );
			}
			catch(e){} 
			finally {}
		}

	},

  components: {
		ElementsList,
  }, 


	computed:{
		...mapState({
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			currLoadingStatus: 'content/currLoadingStatus',
			currentSubCategory: 'content/currentSubCategory',
			getPromopack: 'content/getPromopack',
		}),
	},

	mounted() {
		this.loadStaticInfo();
		this.fetchPromopack(1000);
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
