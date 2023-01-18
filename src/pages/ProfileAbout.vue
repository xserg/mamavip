<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/profile"></router-link>
				<h1 class="theTitle alignCenter">О приложении</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap elements_wrap">
				<div class="the_element_wrap">
					<div class="info_line">
						<div class="left_wrap">
							<span class="viewed"></span>
							<span class="premium"></span>
						</div>
						<span class="play_wrap"></span>
					</div>
				</div>
			</div>

			<div class="contentSubWrap">
			</div>


			<bottom-line></bottom-line>
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'

import {mapState, mapMutations} from 'vuex';

export default {
  name: 'ProfileAbout',

	data(){
		return{
			// profileIsFill: true,
		}
	},

	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),

	},

  components: {
    // DefaultLikes,
  },


	// computed:{
	// 	...mapState({
	// 		isAuth: state => state.isAuth,
	// 	}),
	// },
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
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			// background-color: #F3F5F6;
			.elements_wrap{
				.the_element_wrap{

				}
			}
		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 600px) {

	.mainContainer{
		.contentWrap{
		}
	}

}

</style>
