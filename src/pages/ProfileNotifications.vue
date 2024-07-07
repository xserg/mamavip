<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">История оповещений</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div v-if="getLoadingStatus" class="contentSubWrap">	
				<div class="info_wrap roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>	

			<div class="contentSubWrap" v-if="!getLoadingStatus && this.getInfos.data">
				<div class="title_wrap topWrap marginB12 flexWrap">
					<!-- <span class="the_title fontSize20 fontFamilyEB">{{ this.getInfos.data.app_info[0].app_title }}</span> -->
					<span class="the_subtitle fontSize20 fontFamilyEB">{{ this.getInfos.data.app_info[0].app_title }}</span>
				</div>
				<div v-if="this.notificationsData.data[0]">
					<div class="info_wrap bottomWrap" v-if="this.notificationsData.data[0].date" >
						<div 
							class="the_notification"
							v-for="notification in this.notificationsData.data"
							:key="notification.id"
						>
							<div class="the_content" v-html="notification.text"></div>
							<span class="the_date" v-if="notification.date">{{ notification.date.getDate() }}.{{ notification.date.getMonth() + 1 < 10 ? '0' + Number(notification.date.getMonth() + 1) : notification.date.getMonth() + 1 }}.{{ notification.date.getFullYear() }} </span>
						</div>
					</div>
				</div>
					<!-- <p>{{ this.getInfos.data.app_info[0].about_app }}</p>
				</div> -->
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import moment from 'vue-moment';
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'ProfileNotifications',

	data(){
		return{
			message: '',
			popupInfo: false,
			showNotification: false,
			notificationMess: '',
			splitedInviteDesc: '',
			notificationsData: {
				data: [
					{
						text: '',
						id: 1,
					},

			]
			},
		}
	},

	methods:{

		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
			setInfos: 'setInfos',
		}),
		...mapActions({
			fetchInfos: 'fetchInfos',
		}),

		splitInviteDesc(inviteDesc){
			this.splitedInviteDesc = inviteDesc.split('x');
		},

		loadStaticInfo(){
			try{
				setTimeout( async () => {
					const responseInfos = await axios.get('https://api.roddom1.vip/v1/app/info', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					});
					this.setInfos(responseInfos.data);
				}, 50 );
			}
			catch(e){} 
			finally {}
		},

		getNotifications(){
			try{
				setTimeout( async () => {
					const responseInfos = await axios.get('https://api.roddom1.vip/v1/notifications', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					});
					if(responseInfos){
						responseInfos.data.data.forEach(function(data, ind) {
							// if(responseInfos.data.data[ind]){
							// 	if(responseInfos.data.data[ind].date){
									responseInfos.data.data[ind].date = new Date(data.date);
							// 	}
							// }
							
						});
						this.notificationsData = responseInfos.data;
					}
					
				}, 50 );
			}
			catch(e){} 
			finally {}
		},


		switchPopupInfo(bool){
			this.popupInfo = bool;
		},

		hideMessages(){
			this.showNotification = false;
		},

	},

  components: {
  },

	computed: {
		...mapGetters({
			getLoadingStatus: 'getLoadingStatus',
			getInfos: 'getInfos',
			getCurrUser: 'getCurrUser',
		}),
  },

	mounted(){
		this.fetchInfos();
		this.getNotifications();
		if(this.getInfos.data){
			this.splitInviteDesc(this.getInfos.data.app_info[0].user_invites_you_to_join);
		}
	},

	watch:{
		getInfos: {
			handler(newVal){
				if(this.getInfos){
					this.splitInviteDesc(this.getInfos.data.app_info[0].user_invites_you_to_join);
				}
			},
			deep: true
		}
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
		position: relative;
		.notificationWrap{
			bottom: 60px;
		}
		.the_notification{
			margin-bottom: 22px;
			
			 .the_content{
				margin-bottom: 4px;
				color: #23292df0;
			 }
			 .the_date{
				font-size: 13px;
				color: #707171b2;
			 }
		}
		.topLine.popupWrap{
			background-color: #FFF;
			width: 100%;
			z-index: 110;
			position: fixed;
			left: 0;
			top: 0;
		}
		.contentSubWrap.popupWrap{
			min-height: calc(100vh - 45px);
			width: 100%;
			z-index: 105;
			position: absolute;
			left: 0; 
			top: 45px;
			// height: calc(100% - 45px);
			padding: 8px 16px;
			padding-bottom: 58px;
			background-color: #FFF;
			img{
				display: block;
				width: 100%;
				max-width: 320px;
				margin: 16px auto;

			}
		}
		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			.title_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
				padding-top: 18px;
				padding-bottom: 18px;
				.the_title, .the_subtitle{
					color: #23292D;
					text-align: center;
				}
			}
			.info_wrap{
				font-size: 14px;
				background-color: #FFF;
				padding: 16px;
				color: #23292DB2;
				padding-top: 22px;
				p{
					line-height: 150%;
				}
			}
			.author_wrap{
				background-color: #FFF;
				padding: 16px;
				.the_title{
					color: #23292DB2;
					display: block;
					margin-bottom: 4px;
				}
				.the_value{
					display: block;
				}
			}
			.links_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-bottom: 46px;
				.link_wrap{
					margin-bottom: 16px;
					position: relative;
					cursor: pointer;
					transition: all .24s ease;
					padding-right: 50px;
					&:hover{
						opacity: .85;
					}
					&::before{
						content: '';
						width: 24px;
						height: 24px;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translate(-50%);
						background-repeat: no-repeat;
						background-size: contain;
						background-image: url('./../assets/icons/share-icon.svg');
					}
					&.the_qr::before{
						background-image: url('./../assets/icons/qr-icon.svg');
					}
				}
				.link_wrap:last-of-type{
					margin-bottom: 0;
				}
				.the_title{
					color: #23292DB2;
					display: block;
					margin-bottom: 4px;
				}
				.the_value{
					display: block;
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
