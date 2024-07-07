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

			<div class="topLine flexWrap popupWrap" v-if="popupInfo && !getLoadingStatus && this.getInfos.data">
				<a @click="switchPopupInfo(false)" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">{{ this.getInfos.data.app_info[0].app_show_qr_title }}</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Партнерская программа</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>


			<div class="contentSubWrap popupWrap" v-if="popupInfo && !getLoadingStatus && this.getInfos.data">
				<div class="infoWrap">
					<!-- <h2>{{ this.getCurrentFaq.title }}</h2> -->
					<!-- <img :src="this.getInfos.data.app_info[0].app_show_qr_link ? 'https://api.roddom1.vip/storage/' + this.getInfos.data.app_info[0].app_show_qr_link : '' "/> -->
					<div class="qr_wrap" v-html="this.getCurrUser.user.ref.ref_link_qr"/>
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
					<div class="img_wrap">
						<img class="the_img" v-if="this.getInfos.data.app_info[0].ref_system_preview_picture" :src="this.getInfos.data.app_info[0].ref_system_preview_picture  ? this.getInfos.data.app_info[0].ref_system_preview_picture : ''" alt="subcategory_image" />
					</div>
					<!-- <span class="the_title fontSize20 fontFamilyEB">{{ this.getInfos.data.app_info[0].app_title }}</span> -->
					<span class="the_subtitle fontSize20 fontFamilyEB">{{ this.getInfos.data.app_info[0].ref_system_title }}</span>
					<div class="info_wrap" v-html="this.getInfos.data.app_info[0].ref_system_description"></div>
				</div>
				<!-- <div class="info_wrap marginB12 midWrap" v-html="this.getInfos.data.app_info[0].ref_system_description" /> -->
					<!-- <p>{{ this.getInfos.data.app_info[0].about_app }}</p>
				</div> -->

				<div class="info_wrap links_wrap marginB12 midWrap">
					<div class="link_wrap" @click="copyReferal">
						<span class="the_title fontSize14">Ссылка на партнерскую программу</span>
						<span class="the_value fontFamilyEB">https://roddom1.vip/</span>
					</div>
					<div class="link_wrap the_qr" @click="switchPopupInfo(true)">
						<span class="the_title fontSize14">QR-код на партнерскую программу</span>
						<span class="the_value fontFamilyEB">{{ this.getInfos.data.app_info[0].app_link_share_link }}</span>
					</div>
				</div>


				<div class="info_wrap referal_wrap bottomWrap">

					<span class="the_title the_main blockWrap currBalance fontSize16 fontFamilyEB">Детали</span>

					<div class="the_title blockWrap currBalance">Ваш баланс: <span class="fontFamilyB">{{ getCurrUser.user.ref.points_available }} бебикоинов</span></div>
					<div class="the_title blockWrap currReferal">Приглашено пользователей: <span class="fontFamilyB">{{ getCurrUser.user.ref.referrals_count }}</span></div>
					<div class="the_title blockWrap currSubReferal marginB20" v-if="getCurrUser.user.ref.referrals_of_referrals_count" style="margin-bottom:30px;">Всего приглашено по программе: <span class="fontFamilyB">{{ getCurrUser.user.ref.referrals_of_referrals_count }}</span></div>

					<!-- <span class="theButton buttonPrimary buttonOptimal fontSize14" @click="copyReferal">Скопировать партнерскую ссылку</span> -->
					<!-- <div class="link_wrap" @click="copyReferal"></div> -->
				</div>



			</div>

			<!-- <bottom-line></bottom-line> -->

		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'ProfilePartner',

	data(){
		return{
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

		switchPopupInfo(bool){
			this.popupInfo = bool;
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


		hideMessages(){
			this.showNotification = false;
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


		shareQR() {

			const imageUrl = 'data:image/png;base64,' + this.getCurrUser.user.ref.ref_link_qr_png;

			const downloadLink = document.createElement('a');
			downloadLink.href = imageUrl;
			downloadLink.download = 'qrcode.png';
			downloadLink.textContent = 'Поделиться';
			downloadLink.click();

		},


		// checkDevice(){
		// 	const os = navigator.platform;
		// 	console.log(os);

		// 	const deviceMemory = navigator.deviceMemory;
		// 	console.log('Memory ' + deviceMemory);

		// 	const language = navigator.language;
		// 	console.log(language);

		// 	const hardwareConcurrency = navigator.hardwareConcurrency ;
		// 	console.log('CPU ' + hardwareConcurrency);

		// 	// const userAgent = navigator.userAgent ;
		// 	// console.log('userAgent ' + userAgent);


		// },

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
		// this.fetchInfos();
		this.loadStaticInfo();
		this.splitInviteDesc(this.getInfos.data.app_info[0].user_invites_you_to_join);
		// this.checkDevice();
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
				max-width: 320px;
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
				padding-top: 18px;
				padding-bottom: 18px;
				.img_wrap{
					width: 100%;
					padding-top: 32.5%;
					position: relative;
					margin-bottom: 12px;
					// border: 1px solid rgba(35, 41, 45, 0.1);
					overflow: hidden;
					border-radius: 8px;
					background-color: #FFEAEB;
					.empty_icon{
						position: absolute;
						z-index: 5;
						bottom: 12px;
						left: 16px;
						border-radius: 50%;
						background-image: url('./../assets/icons/folder.svg');
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
						display: block;
						width: 32px;
						height: 32px;

					}
					img{
						width: 100%;
						height: 100%;
						object-fit: cover;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 10;
						border: 1px solid rgba(35, 41, 45, 0.1);
						overflow: hidden;
						border-radius: 8px;
					}
				}
				.the_title, .the_subtitle{
					color: #23292dcf;
					width: 100%;
				}
				.info_wrap{
					width: 100%;
					padding-top: 8px;
					padding-left: 0;
					padding-right: 0;
					padding-bottom: 10px;
				}
			}
			.referal_wrap{
				.the_title{
					color: #23292dcf;
					// font-weight: 600;
					margin-bottom: 4px;
					&.the_main{
						margin-bottom: 8px;
					}
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
				// padding: 16px;
				// padding-bottom: 46px;
				// padding-top: 0;
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
