<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.push('/profile/'), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Поддержка</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div v-if="getLoadingStatus" class="contentSubWrap">	
				<div class="info_wrap roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>	

			<div class="contentSubWrap" v-if="!getLoadingStatus && this.getInfos.data && this.getCurrUser">
				<div class="title_wrap topWrap marginB12 flexWrap">
					<span class="the_subtitle fontSize20 fontFamilyEB">Заявки в поддержку</span>
				</div>

				<div class="requests_wrap bottomWrap" >
					<span class="new_request_button theButton buttonTertiary" @click="createThread">Новое обращение</span>
					

					<div class="requests_list">
						<span class="requests_title">Ранее созданные заявки</span>

						<div class="the_request" 
							@click="routeToRequest(tread.id)"
							v-for="tread in this.getRequests.data"
							:key="tread.id"
							:class="{open: tread.status == 'open', closed: tread.status == 'closed'}"
						>
							<span class="request_title">Обращение №{{ tread.id }}</span>
							<span class="request_status open">Открыта</span>
							<span class="request_status closed">Закрыта</span>

							<div class="request_mess"><span class="reqest_mess_author">{{ tread.messages[tread.messages.length - 1].author.name }}:</span> <span v-html="tread.messages[tread.messages.length - 1].message.substr(0, 90)"/></div>
							<span class="request_create">{{ tread.created_at }}</span>
						</div>
					
						<!-- <div class="the_request" @click="routeToRequest">
							<span class="request_title">Обращение №1</span>
							<span class="request_status">Открыта</span>
						</div>
						<div class="the_request closed">
							<span class="request_title">Обращение №1</span>
							<span class="request_status">Закрыта</span>
						</div> -->
					</div>

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
  name: 'ProfileSupport',

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
			fetchUserData: 'fetchUserData',
			fetchInfos: 'fetchInfos',
			fetchRequests: 'content/fetchRequests',
		}),

		createThread(){ 
			this.$router.push('/profile/support/new');
		},

		routeToRequest(id){
			this.$router.push('/profile/support/' + id);
		},

	},

  components: {
  },

	computed: {
		...mapGetters({
			getLoadingStatus: 'getLoadingStatus',
			getInfos: 'getInfos',
			getCurrUser: 'getCurrUser',
			getRequests: 'content/getRequests',
		}),
  },

	mounted(){
		this.fetchUserData();
		this.fetchInfos();
		this.fetchRequests();
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
				padding: 16px;
				background-color: #FFF;
			}
			.requests_wrap{
				font-size: 14px;
				background-color: #FFF;
				padding: 16px;
				color: #23292DB2;
				p{
					line-height: 150%;
				}
				.new_request_button{
					display: flex;
					align-items: center;
					color: #FD7C84;
					font-weight: 600;
					width: max-content;
					padding-left: 22px;
					padding-right: 22px;
					&::before{
						display: block;
						background-image: url('../assets/icons/plus-g.svg');
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;
						content: '';
						width: 18px;
						height: 18px;
						margin-right: 8px;

					}
				}
				.requests_list{
					margin-top: 18px;
					.requests_title{
						margin-bottom: 10px;
						font-size: 15px;
						color: #303437;
						font-weight: 600;
						display: block;
						padding-left: 12px;
   					margin-top: 30px;
					}

					.the_request{
						// box-shadow: 0 4px 16px rgba(0,51,153,.04), 0 2px 2px rgba(0,51,153,.08);
   					// background-color: #fff;
						background-color: #fafafa;
						padding: 14px 20px;
						border-radius: 12px;
						margin-bottom: 12px;
						position: relative;
						min-height: 88px;
						display: flex;
						flex-direction: column;
						transition: all .14s ease;
						cursor: pointer;
						&:hover{
							background-color: #f6f6f6;
						}
						&.closed{
							opacity: .65;
							background-color: #fbfbfb;
							// cursor: default;
							&:hover{
								opacity: .9;
							}
							.request_status.open{
								display: none;
							}
							// box-shadow: none;
						}
						&.open{
							.request_status.closed{
								display: none;
							}
						}
						.request_title{
							font-size: 14px;
							color: #4d5357;
							font-weight: 600;
						}
						.request_status{
							margin-top: 4px;
							font-size: 13px;
							color: #bbbbbb;
							margin-bottom: 12px;
							&.open{
								color:#FD7C84;
							}
						}
						.request_mess{
							margin-bottom: 14px;
							font-size: 13px;
							max-width: 85%;
						}
						.reqest_mess_author{
							font-weight: 600;
							text-transform: capitalize;
						}
						.request_create{
							font-size: 12px;
							color: #757575;
						}
						&::after{
							position: absolute;
							right: 18px;
							top: 18px;
							display: block;
							background-image: url('../assets/icons/arrow-right-light.svg');
							background-size: contain;
							background-position: center;
							background-repeat: no-repeat;
							content: '';
							width: 18px;
							height: 18px;
						}
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
