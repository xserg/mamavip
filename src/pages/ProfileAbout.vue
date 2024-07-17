<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotification }">
					<p>{{ notificationMess }}</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">О приложении</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>


			<div class="topLine flexWrap popupWrap" v-if="popupInfo && !getLoadingStatus && this.getInfos.data">
				<a @click="switchPopupInfo(false)" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">{{ this.getInfos.data.app_info[0].app_show_qr_title }}</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap popupWrap" v-if="popupInfo && !getLoadingStatus && this.getInfos.data">
				<div class="infoWrap">
					<!-- <h2>{{ this.getCurrentFaq.title }}</h2> -->
					<!-- <img :src="this.getCurrUser.user.ref.ref_link_qr_png ? 'data:image/png;base64,' + this.getCurrUser.user.ref.ref_link_qr_png : '' "/> -->
					<div ref='qrcode' class="qr_wrap" v-html="this.getCurrUser.user.ref.ref_link_qr"/>
					<!-- <span class="share_qr qr_share_button" @click="navigatorShareQR()" v-if="navigatorShareSupported" >navigator.share поделиться</span> -->
					<span class="share_qr" @click="shareQR">Скачать QR-код</span>
				</div>
			</div>


			<div v-if="getLoadingStatus" class="contentSubWrap">
				<div class="info_wrap roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>

			<div class="contentSubWrap" v-if="!getLoadingStatus && this.getInfos.data">
				<div class="title_wrap topWrap marginB12 flexWrap">
					<!-- <span class="the_title fontSize20 fontFamilyEB">{{ this.getInfos.data.app_info[0].app_title }}</span> -->
					<span class="the_subtitle fontSize32 fontFamilyEB">{{ this.getInfos.data.app_info[0].app_title }}</span>
				</div>
				<div class="info_wrap marginB12 midWrap" v-html="this.getInfos.data.app_info[0].about_app" />
					<!-- <p>{{ this.getInfos.data.app_info[0].about_app }}</p>
				</div> -->
				<div class="author_wrap marginB12 midWrap">
					<span class="the_title fontSize14">Автор</span>
					<span class="the_value fontFamilyEB">{{ this.getInfos.data.app_info[0].app_author_name }}</span>
				</div>
				<div class="links_wrap bottomWrap">
					<!-- <div class="link_wrap" @click="copyLink"> -->
					<div class="link_wrap" @click="copyReferal">
						<span class="the_title fontSize14">{{ this.getInfos.data.app_info[0].app_link_share_title }}</span>
						<span id="linkforcopy" class="the_value fontFamilyEB">{{ this.getInfos.data.app_info[0].app_link_share_link }}</span>
					</div>
					<!-- this.getInfos.data.app_info[0].app_link_share_link -->
					<div class="link_wrap the_qr" @click="switchPopupInfo(true)">
						<span class="the_title fontSize14">{{ this.getInfos.data.app_info[0].app_show_qr_title }}</span>
						<span class="the_value fontFamilyEB">{{ this.getInfos.data.app_info[0].app_link_share_link }}</span>
					</div>
				</div>
			</div>

			<!-- <bottom-line></bottom-line> -->

		</div>
	</div>
</template>

<script>
// @ is an alias to /src

import {mapGetters, mapMutations, mapActions} from 'vuex';
import base from "@/base";

export default {
  name: 'ProfileAbout',

	data(){
		return{
			navigatorShareSupported: false,
			message: '',
			popupInfo: false,
			showNotification: false,
			notificationMess: '',
			splitedInviteDesc: '',
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



		navigatorShareCheck() {
			if (navigator.share) {
					this.navigatorShareSupported = true;
			}
		},


		navigatorShareQR(){},


		shareQR() {
			const imageUrl = 'data:image/png;base64,' + this.getCurrUser.user.ref.ref_link_qr_png;
			const downloadLink = document.createElement('a');
			downloadLink.href = imageUrl;
			downloadLink.download = 'qrcode.png';
			downloadLink.textContent = 'Поделиться';
			downloadLink.click();
    },

		copyLink(){
			if (navigator.share) {
				navigator.share({
					title: 'roddom1.vip',
					text: 'Школа "Мам и Пап"',
					url: 'https://roddom1.vip/',
				});
				setTimeout(() => {
					this.showNotification = true;
					this.notificationMess = 'Скопировано'
				}, 400);
				setTimeout(() => {
					this.showNotification = false;
				}, 3000);
			}else{
				const copyText = document.getElementById("linkforcopy").textContent;
      	navigator.clipboard.writeText(copyText);
				setTimeout(() => {
					this.showNotification = true;
					this.notificationMess = 'Скопировано'
				}, 400);
				setTimeout(() => {
					this.showNotification = false;
				}, 3000);
			}
		},

		splitInviteDesc(inviteDesc){
			this.splitedInviteDesc = inviteDesc.split('x');
		},

		copyReferal(){
			if (navigator.share) {
				if(this.getCurrUser.user.name){
					navigator.share({
						title: 'roddom1.vip',
						text: this.splitedInviteDesc[0] + this.getCurrUser.user.name + this.splitedInviteDesc[1],
						url: 'https://roddom1.vip/register?ref=' + this.getCurrUser.user.ref.token,
					});
				}else{
					navigator.share({
						title: 'roddom1.vip',
						text: this.splitedInviteDesc[0] + this.getCurrUser.user.email + this.splitedInviteDesc[1],
						url: 'https://roddom1.vip/register?ref=' + this.getCurrUser.user.ref.token,
					});
				}
				setTimeout(() => {
					this.showNotification = true;
					this.notificationMess = 'Скопировано'
				}, 400);
				setTimeout(() => {
					this.showNotification = false;
				}, 3000);
			}else{
				if(this.getCurrUser.user.name){
					var copyText = this.splitedInviteDesc[0] + this.getCurrUser.user.name + this.splitedInviteDesc[1] + ' ' + 'https://roddom1.vip/register?ref=' + this.getCurrUser.user.ref.token;
					navigator.clipboard.writeText(copyText);
				}else{
					var copyText = this.splitedInviteDesc[0] + this.getCurrUser.user.email + this.splitedInviteDesc[1] + ' ' + 'https://roddom1.vip/register?ref=' + this.getCurrUser.user.ref.token;
					navigator.clipboard.writeText(copyText);
				}
				setTimeout(() => {
					this.showNotification = true;
					this.notificationMess = 'Скопировано'
				}, 400);
				setTimeout(() => {
					this.showNotification = false;
				}, 3000);
			}
		},

		loadStaticInfo(){
			try{
				setTimeout( async () => {
					const responseInfos = await axios.get(base.API_URL + '/app/info', {
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
		if(this.getInfos.data){
			this.splitInviteDesc(this.getInfos.data.app_info[0].user_invites_you_to_join);
		}
		this.navigatorShareCheck();
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
				max-width: 250px;
				margin: 16px auto;

			}
			.qr_wrap{
				padding: 20px;
				width: 290px;
				height: 290px;
				margin-left: auto;
				margin-right: auto;
				margin-top: 30px;
			}
			.share_qr{
				display: flex;
				justify-content: center;
				align-items: center;
				width: max-content;
				margin-left: auto;
				margin-right: auto;
				font-weight: 600;
				margin-bottom: 16px;
				margin-top: 40px;
				position: relative;
				cursor: pointer;
				transition: all .24s ease;
				padding-left: 12px;
				// padding-right: 50px;
				&:hover{
					opacity: .85;
				}
				&::after{
					content: '';
					margin-left: 6px;
					width: 24px;
					height: 24px;
					position: relative;
					background-repeat: no-repeat;
					background-size: contain;
					background-image: url('./../assets/icons/download.svg');
				}
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
