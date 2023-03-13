<template>
  <div class="mainContainer">

		<div class="contentWrap" v-if="getCurrUser.user.saved_lectures.length">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Сохранённые</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Готово</button>
			</div>

			<elements-list 
				class="contentSubWrap"
				v-if="getCurrUser.user.saved_lectures"
				:posts="getCurrUser.user.saved_lectures"
			></elements-list>

			<div class="contentSubWrap roller_box" v-else>
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>


		<div class="contentWrap centered" v-else>

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Сохранённые</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap empty_wrap flexWrap">
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет сохранённых лекций</span>
				<p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p>
				<router-link class="theButton buttonPrimary buttonOptimal fontSize16" to="/" @click="setHomeTab(), setRouterAnimate()">Искать лекции</router-link>
			</div>

			<!-- <bottom-line></bottom-line> -->

		</div>



	</div>
</template>

<script>
// @ is an alias to /src
import ElementsList from '@/components/ElementsList';

import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
  name: 'ProfileSaved',
	components: {
		ElementsList,
  },

	data(){
		return{
		}
	},

	methods:{

		...mapMutations({
			setHomeTab: 'setHomeTab',
			setRouterAnimate: 'setRouterAnimate',
		}),

		// 	deleteElement(post){
		// 		console.log('Имитация удаления элемента: ID ' + post.id)
		// 	},


	},


	computed:{
		...mapState({
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
		}),
	},

}
</script>


<style lang="scss" scoped>

.mainContainer{
	// height: 100vh;
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
					margin-bottom: 4px;
					text-align: center;
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
		}
	}


}

</style>
