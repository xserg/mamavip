<template>
	<div v-if="!isAuth" class="authContainer">
		<autoriz v-if="!newReg"></autoriz>
		<registr v-if="newReg"></registr>
	</div>
	<!-- v-touch-swipe.mouse.right="$router.go(-1)" -->
	<div v-if="isAuth" class="appContainer">
		<router-view v-slot="{ Component }">
			<transition 
				:name="curRouterAnimate"
				mode="out-in"
			>
				<component :is="Component" />
			</transition>
		</router-view>
		<bottom-line></bottom-line>
		<div class="empty_layout" v-if="isAuth"></div>
	</div>
	
</template>


<script>

// Импортирование компонентов 
// import 'animate.css'
import Autoriz from '@/pages/Autoriz';
import Registr from '@/pages/Registr';

import { mapState, mapGetters} from 'vuex';



export default {
	// Определяем компоненты
	components: { Autoriz, Registr, },

	data(){
		return{
			transitionName: '',
			// curStep: 1,
		}
	},

	methods:{
		// nextStep(){
		// 	this.curStep += 1;
		// }
	},


	computed:{
	...mapState({
			// Определяем isAuth из хранилища, чтобы приложение смогло использовать его в работе на странице.
			isAuth: state => state.isAuth,
			newReg: state => state.newReg,
			// thePopup: state => state.thePopup,
		}),
		...mapGetters({
			curRouterAnimate: 'curRouterAnimate',
		}),
	},

	
  // watch: {
  //   $route(to, from) {
  //     const toDepth = to.path.split('/').length;
  //     const fromDepth = from.path.split('/').length;
	// 		console.log('toDepth: ' + toDepth + ' and fromDepth: ' + fromDepth);
	// 		if( toDepth < fromDepth ){
	// 			this.transitionName = 'slide-right';
	// 		}else if( toDepth > fromDepth ){
	// 			this.transitionName = 'slide-left';
	// 		}else{
	// 			console.log(to.path);
	// 			console.log(from.path);
	// 			if(to.path == '/'){
	// 				this.transitionName = 'slide-right';
	// 			}else if(from.path == '/'){
	// 				this.transitionName = 'slide-left';
	// 			}else{
	// 				this.transitionName = 'fade';
	// 			}
				
	// 		}
  //   },
  // },

}

</script>

<style lang="scss">

@import '@/assets/main.css';

#app {
	overflow: hidden;
	padding: 0;
	position: relative;
	background: #FFEAEB;
	// max-height: 100vh;
	// min-height: 100vh;
	// height: 100vh;
	max-height: 100%;
	min-height: 100%;
	height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
	&::before{
		z-index: 5;
		content: '';
		display: block;
		position: fixed;
		width: 36vh;
		height: 36vh;
		right: -18vh;
		top: 15vh;
		border-radius: 50%;
		background: #FEABB0;
		filter: blur(13vh);
	}
	&::after{
		z-index: 5;
		content: '';
		display: block;
		position: fixed;
		width: 60vh;
		height: 60vh;
		left: -30vh;
		bottom: 10vh;
		border-radius: 50%;
		background: #FEABB0;
		filter: blur(20vh);
	}
	.authContainer{
		height: 100vh;
		z-index: 10;
		position: relative;
	}
	.appContainer{
		z-index: 10;
		position: relative;
		height: 100%;
		// background-color: #FFF;
	}
	.empty_layout{
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
    max-width: 600px;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		min-height: 100vh;
		height: 100vh;
		background-color: rgb(255, 255, 255);
		z-index: 10;
	}
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


/* ------ @Media ------- */

@media screen and (max-width: 480px) {

#app {
	&::before{
		width: 36vh;
		height: 36vh;
		right: -22vh;
		top: 5vh;
		border-radius: 50%;
		background: #FEABB0;
		filter: blur(6vh);
	}
	&::after{
		width: 60vh;
		height: 60vh;
		left: -36vh;
		bottom: 5vh;
		border-radius: 50%;
		background: #FEABB0;
		filter: blur(12vh);
	}
}

}



</style>
