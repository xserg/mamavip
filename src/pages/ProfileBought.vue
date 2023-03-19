<template>
  <div class="mainContainer">

		<div class="contentWrap" v-if="currLoadingStatus || !this.getPurchased">
			<div class="contentSubWrap roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		</div>

		<div v-else class="contentWrap" :class="{centered: this.getPurchased === 'e'}">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Купленные</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Готово</button>
			</div>

			<elements-list 
				class="contentSubWrap"
				v-if="this.getPurchased && this.getPurchased !== 'e' && this.getPurchased !== undefined"
				:posts="this.getPurchased"
			></elements-list>

			<div class="contentSubWrap empty_wrap flexWrap" v-if=" this.getPurchased == undefined || this.getPurchased == '' " >
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет купленных лекций</span>
				<!-- <p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p> -->
				<router-link class="theButton buttonPrimary buttonOptimal fontSize16" to="/" @click="setHomeTab(), setRouterAnimate()">Искать лекции</router-link>
			</div>

			<div class="element_box" v-if="this.getPurchased == 'e'">
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

import ElementsList from '@/components/ElementsList';

export default {
  name: 'ProfileBought',

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
			fetchPurchased: 'content/fetchPurchased',
		}),

	},

  components: {
		ElementsList,
  },


	computed:{
		...mapState({
		}),
		...mapGetters({
			currLoadingStatus: 'content/currLoadingStatus',
			getCurrUser: 'getCurrUser',
			getPurchased: 'content/getPurchased',
		}),
	},

	mounted(){
		this.fetchPurchased(1000);
	},


}
</script>


<style lang="scss" scoped>

.mainContainer{
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		justify-content: flex-start;

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
