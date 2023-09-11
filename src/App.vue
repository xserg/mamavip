<template>
	<div v-if="!getCurrUser.access_token" class="authContainer">
		<autoriz v-if="!newReg"></autoriz>
		<registr v-if="newReg"></registr>
	</div>
	<!-- v-touch-swipe.mouse.right="$router.go(-1)" -->
	<div v-if="getCurrUser.access_token" class="appContainer">

		<span v-if="!getCurrUser.user.is_notification_read && notificationData.data[0].date" class="myOverlay" :class="{active: !notificationStatus}" @click="turnOffNotification"></span>
		<div v-if="!getCurrUser.user.is_notification_read && notificationData.data[0].date" class="myPopup" :class="{active: !notificationStatus}">
			<span class="close_button" style="cursor:pointer;" @click="turnOffNotification"></span>
			<div class="the_content_wrap">
				<div class="the_content" v-html="notificationData.data[0].text" />
				<span class="the_date" style="display:block;font-size:13px;color:#707171b2;">{{ notificationData.data[0].date.getDate() }}.{{ notificationData.data[0].date.getMonth() + 1 }}.{{ notificationData.data[0].date.getFullYear() }}</span>  
			</div>
		</div>
		
		<router-view v-slot="{ Component }">
			<!-- mode="out-in" -->
			<transition 
				:name="curRouterAnimate"
				mode="out-in"
			>
				<component :is="Component"  />
			</transition>
		</router-view>
		<bottom-line></bottom-line>
		<div class="empty_layout" v-if="getCurrUser.access_token"></div>
	</div>
	
</template>


<script>

// Импортирование компонентов  
// import 'animate.css'
import axios from 'axios';

import Autoriz from '@/pages/Autoriz';
import Registr from '@/pages/Registr';

import { mapState, mapGetters, mapMutations, mapActions} from 'vuex';



export default {
	// Определяем компоненты
	components: { Autoriz, Registr, },

	data(){
		return{
			transitionName: '',
			notificationStatus: true,
			notificationData: {
				data: [
					{
						text: '',
						id: 1,
					},]
			},
			// curStep: 1,
		}
	},

	methods:{
		...mapMutations({
			setHomeTab: 'setHomeTab',
			setFavourTab: 'setFavourTab',
			setProfileTab: 'setProfileTab',
		}),
		...mapActions({
			fetchUserData: 'fetchUserData',
		}),

		switchNotificationStatus(bool){
			this.notificationStatus = bool;
		},

		loadNotifications(){
			try{
				setTimeout( async () => {
					const response = await axios.get('https://api.roddom15.ru/v1/notifications', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						}
					});
					// console.log(response);
					if(response){
						this.notificationData = response.data;
						this.notificationData.data[0].date = new Date(response.data.data[0].date);
					}
					
				}, 500 );

			} catch(e){
				console.log(e);
			} finally {}
		},

		turnOffNotification(){
			this.notificationStatus = true;
			try{
				setTimeout( async () => {
					const response = await axios.put('https://api.roddom15.ru/v1/notifications/read', {}, {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						}
					});
					// console.log(response);
					// if(response){
					// 	console.log(response);
					// }
					
				}, 500 );

			} catch(e){
				console.log(e);
			} finally {}
		},
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
			getCurrUser: 'getCurrUser',
			curRouterAnimate: 'curRouterAnimate',
			getCurrNotificationStatus: 'getCurrNotificationStatus',
		}),
	},

	watch: {
    $route(to) {
			const toPath = to.path;
			const profileSubString = '/profile';
			const favourSubString = '/profile/saved';
			if(toPath.includes(favourSubString)){
				this.setFavourTab();
			}else if(toPath.includes(profileSubString)){
				// console.log('В пути есть /profile');
				this.setProfileTab();
			}else{
				// console.log('В пути нет /profile');
				this.setHomeTab();
			};
		},

		getCurrUser: {
			handler(newVal){
				this.switchNotificationStatus(newVal.user.is_notification_read);
			},
			deep: true
		}

	},

	beforeMount() {
		this.$store.commit('initialiseVuex')
		// this.$store.commit('initialiseVuexContent');
		// this.$store.dispatch("content/initialiseVuexContent");
	}, 

	mounted(){

		if(this.getCurrUser.user){
			this.fetchUserData();
		};
	
		setTimeout( async () => {
			if(this.getCurrUser.user){
				if(!this.getCurrNotificationStatus){
					this.loadNotifications();
					this.switchNotificationStatus(this.getCurrUser.user.is_notification_read);
				}
			}
		}, 800 );
		
	},


}

</script>

<style lang="scss">

@import '@/assets/main.css';




/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #FFEAEB;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffbec1;
  transition: all .28s ease;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ffbec1ce;
}

*{
	// overflow-x: hidden;
}
#app {
	overflow: hidden;
	padding: 0;
	position: relative;
	background: #FFEAEB;
	// max-height: 100vh;
	// min-height: 100vh;
	// height: 100vh;
	max-height: 100vh;
	min-height: 100vh;
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

	.myOverlay{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10000010;
		background-color: #0000003c;
		display: block;
		width: 100%;
		height: 100%;
		visibility: hidden;
		opacity: 0;
		transition: all .26s ease;
		&.active{
			visibility: visible;
			opacity: 1;
		}
	}

	.myPopup{
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 10000020;
		visibility: hidden;
		opacity: 0;
		transform: translate(-50%, -48%);
		display: flex;
		width: 100%;
		max-width: 480px;
		padding-left: 10px;
		padding-right: 10px;
		max-height: 90vh;
		overflow-y: scroll;
		transition: all .26s ease;
		&.active{
			visibility: visible;
			opacity: 1;
			transform: translate(-50%, -50%);
		}
		.close_button{
			display: block;
			position: absolute;
			right: 20px;
			top: 10px;
			width: 30px;
			min-width: 30px;
			height: 30px;
			border-radius: 50%;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			background-image: url('assets/icons/close-g.svg');
		}
		.the_content_wrap{
			background-color: #FFF;
			width: 100%;
			height: 100%;
			padding: 25px 20px;
			padding-right: 15%;
		}
		.the_content{
			h1,h2,h3,h4,h5,h6{
				margin-bottom: 6px;
			}
			p{
				margin-bottom: 4px;
			}

		}
	}


	.authContainer{
		height: 100%;
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
		transform: translateX(calc(-50% - 4px));
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


.mainContainer .contentWrap .contentSubWrap .chat_wrap .chat_history .chat_msg .content p, .mainContainer .contentWrap .contentSubWrap .chat_wrap .chat_history .chat_msg .content li, .mainContainer .contentWrap .contentSubWrap .chat_wrap .chat_history .chat_msg .content ul, .mainContainer .contentWrap .contentSubWrap .chat_wrap .chat_history .chat_msg .content li{
	padding: 0;
	margin: 0;
	display: block;
}
.mainContainer .contentWrap .contentSubWrap .chat_wrap .chat_history .chat_msg .content a{
	display: inline-block;
	text-decoration: underline;
}
.mainContainer .contentWrap .contentSubWrap .chat_wrap .chat_history .chat_msg.chat_msg_mamy .content a{
	color: #FFF;
}

.mainContainer .contentWrap .contentSubWrap .requests_wrap .requests_list .the_request .request_mess a, .mainContainer .contentWrap .contentSubWrap .requests_wrap .requests_list .the_request .request_mess p{
	display: inline;
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
