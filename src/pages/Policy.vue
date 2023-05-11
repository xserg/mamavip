<template>
  <div class="mainContainer">


		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Политика конфиденциальности</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>


			<div v-if="getLoadingStatus || !this.getInfos.data" class="contentSubWrap">	
				<div class="info_wrap roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>	

			<div class="contentSubWrap" v-else>
				<div class="infoWrap">
					<h2>{{ this.getInfos.data.app_info[0].agreement_title }}</h2>
					<div v-html="this.getInfos.data.app_info[0].agreement_text" />
				</div>
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>


	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'

import {mapMutations, mapGetters, mapActions} from 'vuex';

export default {
  name: 'Policy',
	components: {
  },

	data(){
		return{
			// hasElements: false,
		}
	},

	methods:{

		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
		}),
		...mapActions({
			fetchInfos: 'fetchInfos',
		}),

	},


	computed:{
		...mapGetters({
			getInfos: 'getInfos',
		}),
	},

	mounted(){
		this.fetchInfos();
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
		.contentSubWrap{
			padding: 32px 16px;
			p{
				line-height: 150%;
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
