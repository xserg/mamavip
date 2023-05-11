<template>
  <div class="mainContainer">

		<div class="contentWrap" v-if="currLoadingStatus || !this.getWatched">
			<div class="contentSubWrap roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		</div>

		<div v-else class="contentWrap" :class="{centered: this.getWatched === 'e'}">

			<div class="topLine flexWrap">
				<a @click="$router.push('/profile'), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Просмотренные</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Готово</button>
			</div>

			<elements-list 
				class="contentSubWrap"
				v-if="this.getWatched && this.getWatched !== 'e' && this.getWatched !== undefined"
				:posts="this.getWatched"
			></elements-list>

			<div class="contentSubWrap empty_wrap flexWrap" v-if=" this.getWatched == undefined || this.getWatched == '' " >
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет просмотренных лекций</span>
				<!-- <p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p> -->
				<router-link class="theButton buttonPrimary buttonOptimal fontSize16" to="/" @click="setHomeTab(), setRouterAnimate()">Искать лекции</router-link>
			</div>

			<div class="element_box" v-if="this.getWatched == 'e'">
				<img class="the_img" src="./../assets/images/noResponse.png">
				<span class="info_title fontFamilyB">Данные не загрузились</span>
				<span class="info_subtitle fontSize14">Попробуйте обновить страницу</span>
				<span @click="this.fetchWatched(1000)" class="theButton buttonTertiary buttonOptimal">Обновить</span>
			</div>

		</div>

	</div>
</template>

<script>
// @ is an alias to /src
import ElementsList from '@/components/ElementsList';

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

export default {
  name: 'ProfileViewed',

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
			fetchWatched: 'content/fetchWatched',
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
			getWatched: 'content/getWatched',
		}),
	},

	mounted(){
		this.fetchWatched(1000);
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
