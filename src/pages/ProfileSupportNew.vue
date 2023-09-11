<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.push('/profile/support/'), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Поддержка</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div v-if="getLoadingStatus" class="contentSubWrap">	
				<div class="info_wrap roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>	
 
			<div class="contentSubWrap" v-if="!getLoadingStatus && this.getInfos.data">
				<!-- <div class="title_wrap topWrap marginB12 flexWrap">
				</div> -->
				<div class="chat_wrap">
					<span class="the_status new">Заявка</span>
					<span class="the_subtitle fontSize20 fontFamilyEB marginB20">Новое обращение</span>
					
					<span class="white_us_empty">Отправьте нам сообщение и мы вскоре ответим в этом обращении.</span>

					<div class="new_message_form">
						<textarea class="new_message_form_textarea" v-model="messValue" placeholder="Сообщение"></textarea>
						<button class="new_message_form_submit theButton buttonSecondary" @click="createTread">Отправить</button>
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
  name: 'ProfileSupportRequest',

	data(){
		return{
			messValue: '',
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
			// setThreadMess: 'content/setThreadMess',
		}),
		...mapActions({
			fetchInfos: 'fetchInfos',
		}),


		createTread(){
			if(this.messValue !== ""){
				try{
					setTimeout( async () => {
						const response = 
						await axios.post('https://api.roddom15.ru/v1/threads', {}, {
							headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}}).catch(function (error) { if (error.response){
							return error.response;
						} });

						if(response.status == 201){
							const newThreadMess = this.messValue;
							// this.messValue = '';
							setTimeout( async () => {
								const messresponse = 
								await axios.put('https://api.roddom15.ru/v1/threads/' + response.data.id, {message: newThreadMess}, {
									headers: {
										Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
										'Content-Type': 'application/json',
										'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
										'Access-Control-Allow-Origin': '*',
									}
								}).catch(function (error) { if (error.messresponse){
									return error.messresponse;
								} });
								if(messresponse){
									this.$router.push('/profile/support/' + response.data.id);
								}else{
									console.log('Во время отправки сообщения произошла ошибка:');
									console.log(messresponse);
								}
							}, 800);
						}else{
							console.log('Во время создания новой завяки произошла ошибка:');
							console.log(response);
							// this.notificationErrorMess = response.data.message;
							// setTimeout(() => {
							// this.showErrors = true;
							// }, 400);
							// setTimeout(() => {
							// 	this.showErrors = false;
							// }, 3000);
						}
					}, 50 );
					
				} catch(e){
				} finally {}
			}else{
				// console.log('Введите сообщение');
			}
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
			// background-color: #fff;
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
			}
			.the_title, .the_subtitle{
				color: #23292D;
				text-align: center;
			}
			.the_status{
				font-size: 13px;
				display: flex;
				align-items: center;
				margin-top: 6px;
				color: #FD7C84;
				&.new{
					color: #faa8ab;
				}
				&.closed{
					color: #7b7b7b;
				}
				&::before{
					// content: '';
					width: 6px;
					height: 6px;
					border-radius: 50%;
					display: block;
					margin-right: 5px;
					margin-left: 4px;
					background-color: #FD7C84;
				}
			}
			.the_created{
				margin-top: 16px;
				display: block;
				color: #bfbfbf;
				font-size: 12px;
			}


			.info_wrap{
				padding: 16px;
				background-color: #FFF;
			}

			.chat_wrap{
				// max-width: 380px;
				// margin-left: auto;
				// margin-right: auto;
				font-size: 14px;
				background-color: #fff;
				padding: 16px;
				color: #23292DB2;
				
				.white_us_empty{
					margin-top: 10px;
					margin-bottom: 10px;
					font-size: 13px;
					color: #a7a7a7;
					text-align: center;
					// max-width: 340px;
					margin-left: auto;
					margin-right: auto;
					line-height: 120%;
					padding: 15px 22%;
					min-height: 220px;
					display: flex;
					align-items: center;
					background-color: #fcfcfc;
					width: 100%;
					border-radius: 16px;
				}

				.chat_subwrap{
					margin-top: 10px;
					margin-bottom: 10px;
					// padding: 15px;
					// background-color: #fafafa;
					border-radius: 8px;
					min-height: 220px;
					display: flex;
					align-items: center;
					padding: 10px;
					padding-top: 20px;
					padding-bottom: 34px;
					background-color: #f8f8f8;
					background-color: #FFEAEB;
					border-radius: 16px;
				}

				.chat_history{
					display: flex;
					flex-direction: column;
					width: 100%;
					.chat_msg{
						display: inline-flex;
						flex-direction: column;
						padding: 18px;
						padding-top: 10px;
						padding-bottom: 12px;
						max-width: 70%;
						width: auto;
						min-width: 20%;
						background-color: #ffffff;
						margin-bottom: 8px;
						font-size: 13px;
						// border: 2px solid #FD7C84;
						// border-radius: 12px;
						.content{
							margin-bottom: 12px;
						}
						.bottom_line{
							width: 100%;
							display: flex;
							justify-content: flex-end;

							.time{
								font-size: 11px;
								color: #23292D;
								margin-right: 6px;
								display: block;
							}
							.person{
								font-size: 11px;
								color: #23292D;
								display: block;
								text-transform: capitalize;
							}
						}
					}
					.chat_msg_user{
						margin-left: auto;
						margin-right: 0;
						background-color: #ffffff;
						// background-color: #fafafa;
						// border: 1px solid #FD7C84;
						// box-shadow: 0 2px 4px #dadada60;
						border-radius: 12px 12px 0 12px;
						.bottom_line .time{ color: #c7c7c7; }
						.bottom_line .person{ color: #c7c7c7; }
					}
					.chat_msg_mamy{
						margin-top: 6px;
						margin-left: 0;
						margin-right: auto;
						background-color: #FD7C84;
						// border: 1px solid #703a3a;
						color: #FFF;
						border-radius: 12px 12px 12px 0;
						.bottom_line{
							justify-content: flex-start;
						}
						.bottom_line .time{ color: #FFF; }
						.bottom_line .person{ color: #FFF; }
					}
				}
				.new_message_form{
					
				}
				.new_message_form_textarea{
					padding: 16px;
					background-color: #f8f8f8;
					border-radius: 16px;
					border: none;
					width: 100%;
					min-height: 120px;
					max-width: 100%;
					max-height: 500px;
					border: 2px solid #FFF;
					transition: all .22s ease;
					&:focus{
						border-color: #FFEAEB;
					}
				}
				.new_message_form_submit{
					min-width: 200px;
					margin-top: 5px;
					margin-right: auto;
					margin-left: 0;
				}
				p{
					line-height: 150%;
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
