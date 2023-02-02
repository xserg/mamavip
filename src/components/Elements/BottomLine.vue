<template>

	<div class="bottomLine flexWrap">
		<router-link class="theButton leftButton buttonTransparent fontFamilyB left_button" :class="{active: this.curTab == 'home'}" to="/" @click="setHomeTab(), setRouterAnimate()">
			<span class="the_icon home_icon"></span>
			<span class="the_title">Главное</span>
		</router-link>
		<router-link class="theButton rightButton buttonTransparent fontFamilyB right_button" :class="{active: this.curTab == 'profile'}" to="/profile" @click="setProfileTab(), setRouterAnimate()">
			<span class="the_icon profile_icon"></span>
			<span class="the_title">Профиль</span>
		</router-link>
	</div>

</template>

<script>

import {mapState, mapMutations} from 'vuex';

export default {

	name: 'bottom-line',

	methods:{
		...mapMutations({
			setHomeTab: 'setHomeTab',
			setProfileTab: 'setProfileTab',
			setRouterAnimate: 'setRouterAnimate',
		}),
	},

	computed:{
		...mapState({
			curTab: state => state.curTab,
		}),
	},
}
</script>

<style lang="scss" scoped>

// .mainContainer{
	// height: 100vh;
	// position: relative;
	// .contentWrap{
		// padding: 0;
		// padding-top: 45px;
		// padding-bottom: 48px;
		// background-color: #FFF;
		// overflow: scroll;
		// justify-content: flex-start;
		.bottomLine{
			// background-color: #ffffffa8;
			background-color: #fbfbfba8;
			backdrop-filter: blur(5px);
			// border-top: 1px solid rgb(196, 196, 196, 0.07);
			// border-bottom: 1px solid rgba(35, 41, 45, 0.1);
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 4px;
			justify-content: space-around;
			z-index: 10000000;
			.theButton{
				color: rgba(35, 41, 45, 0.5);
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0;
				width: 100%;
				.the_icon{
					display: block;
					min-width: 24px;
					width: 24px;
					height: 24px;
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					margin-bottom: 0px;
					&.home_icon{
						background-image: url('../../assets/icons/icon-home-g.svg');
					}
					&.profile_icon{
						background-image: url('../../assets/icons/icon-profile-g.svg');
					}
				}
				.the_title{}
				&.active{
					color: #FD7C84;
					.the_icon{
						&.home_icon{
						background-image: url('../../assets/icons/icon-home-a.svg');
						}
						&.profile_icon{
							background-image: url('../../assets/icons/icon-profile-a.svg');
						}
					}
				}
			}
			.left_button{}
			.right_button{}
		}
// 	}
// }

</style>