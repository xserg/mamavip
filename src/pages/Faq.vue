<template>
  <div class="mainContainer">

		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">FAQ</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap" v-if="this.getCurrentFaq.title">
				<div class="infoWrap">
					<h2>{{ this.getCurrentFaq.title }}</h2>
					<p>{{ this.getCurrentFaq.text }}</p>
				</div>
				
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>


	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'

import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
  name: 'Faq',
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

		methods: {
		},

	},


	computed:{
		...mapState({
		}),
		...mapGetters({
			getInfos: 'getInfos',
			getCurrentFaq: 'getCurrentFaq',
		}),
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
