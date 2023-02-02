<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Помощь</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">

				<div class="tabsinfo_wrap midWrap marginB12 fontSize16">
					<router-link class="link_button" to="/profile">
						<div class="left_wrap">
							<span class="the_icon help_icon"></span>
							<span class="the_title">Как делать то?</span>
						</div>
						<!-- <span class="the_count">12</span> -->
					</router-link>
					<router-link class="link_button" to="/profile">
						<div class="left_wrap">
							<span class="the_icon help_icon"></span>
							<span class="the_title">Что значит это?</span>
						</div>
					</router-link>
					<router-link class="link_button" to="/profile">
						<div class="left_wrap">
							<span class="the_icon help_icon"></span>
							<span class="the_title">А что если вот так?</span>
						</div>
					</router-link>
					<router-link class="link_button" to="/profile">
						<div class="left_wrap">
							<span class="the_icon help_icon"></span>
							<span class="the_title">Не понимаю вот это</span>
						</div>
					</router-link>
				</div>

			</div>

			<div class="contentSubWrap">
			</div>


			<!-- <bottom-line></bottom-line> -->
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import {mapMutations} from 'vuex';

export default {
  name: 'ProfileHelp',

	data(){
		return{
		}
	},

	methods:{
		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
		}),

	},

  components: {
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
			width: 100%;
			padding: 0;
			.tabsinfo_wrap{
				background-color: #FFF;
				padding: 16px 4px;
				padding-bottom: 48px;
				.link_button{
					border: none;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: transparent;
					width: 100%;
					position: relative;
					padding: 6px 12px;
					padding-right: calc(24px + 26px); 
					border-radius: 16px;
					margin-bottom: 4px;
					&::after{
						content: '';
						position: absolute;
						right: 16px;
						top: 50%;
						transform: translateY(-50%);
						width: 24px;
						height: 24px;
						display: block;
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;
						background-image: url('../assets/icons/arrow-right.svg');
					}
					.left_wrap{
						display: flex;
						align-items: center;
					}
					.the_count{
						color: rgba(35, 41, 45, 0.7);
					}

					.the_icon{
						min-width: 32px;
						width: 32px;
						height: 32px;
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;
						margin-right: 8px;
						&.help_icon{
							background-image: url('../assets/icons/profile-help.svg');
						}
					}
					.the_title{
						text-align: left;
						padding-right: 10px;
						color: #23292D;
					}
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
