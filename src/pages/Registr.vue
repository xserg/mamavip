<template>
	<div class="mainContainer blockWrap">

		<div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotification }">
			<p>{{notificationMess}}</p>
			<div class="button_wrap">
				<span class="separate"></span>
				<span class="theButton close_button" @click="hideMessages"></span>
			</div>
		</div>

		<div class="errorWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showErrors }">
			<p>{{notificationErrorMess}}</p>
			<div class="button_wrap">
				<span class="separate"></span>
				<span class="theButton close_button" @click="hideMessages"></span>
			</div>
		</div>


		<Form @submit="onSubmit" :validation-schema="schema" v-if="curStep == 1 || curStep == 2">

			<div class="contentWrap stepRegFirst" v-show="curStep == 1">

				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
					<h1 class="theTitle alignCenter">Регистрация</h1>
					<span class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</span> <!-- @click="nextStepReg" -->
				</div>

				<div class="contentSubWrap">

					<div class="titleLine">
						<h2 class="pageTitle alignCenter fontSize20 fontFamilyEB">Добро пожаловать в школу мам и пап</h2>
						<h2 class="pageSubtitle alignCenter fontSize32 fontFamilyEB">"Нежность"</h2>
					</div>
					<div class="formWrap">
						<label class="inputWrap">
							<span class="label">Введите номер полиса</span>
							<div class="inputBox">
								<Field name="polis" />
							</div>
							<ErrorMessage class="errorTitle" name="polis" />
						</label>
							<label class="inputWrap">
								<span class="label">Введите email</span>
								<div class="inputBox">
									<Field name="email" />
								</div>
								<ErrorMessage class="errorTitle" name="email" />
							</label>
							<label class="inputWrap">
								<span class="label">Введите пароль</span>
								<div class="inputBox">
									<Field name="password" :type="inputPassType" />
									<span class="theButton buttonShowPass" :class="{ active: this.inputPassType == 'text' }" @click="showPass"></span>
								</div>
								<ErrorMessage class="errorTitle" name="password" />
							</label>
							<label class="inputWrap">
								<span class="label">Повторите пароль</span>
								<div class="inputBox">
									<Field name="password_confirmation" :type="inputPassType" />
									<span class="theButton buttonShowPass" :class="{ active: this.inputPassType == 'text' }" @click="showPass"></span>
								</div>
								<ErrorMessage class="errorTitle" name="password_confirmation" />
							</label>
							<button class="theButton buttonOptimal marginAuto buttonPrimary fontFamilyB marginB20" style="margin-bottom:32px;margin-top:20px">Далее</button>
							<div class="infoWrap">
								<span class="theTitle">Есть аккаунт?</span>
								<span class="theButton buttonTransparent fontFamilyB marginB30 fontSize14" @click="this.setLogPage()">Войти</span>
								<p class="policy_text alignCenter fontSize12">Регистрируясь в приложении вы соглашаетесь с <a href="#" @click="readPolicy()">политикой обработки персональных данных</a></p>
							</div>
						<!-- </Form> -->
						<!-- <button class="theButton buttonPrimary buttonConfirm marginAuto" @click="onSubmit" >Отправить</button> -->
					</div>

				</div>

			</div>



			<div class="contentWrap stepRegSecond" v-show="curStep == 2">

				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonTransparent" style="text-align:left;" @click="prevStep">Назад</span>
					<h1 class="theTitle alignCenter">Прочтите соглашение</h1>
					<span class="theButton ghostWrap"></span>
				</div>

				<div class="contentSubWrap" v-if="!agreementDataLoading">
					<div class="infoWrap">
						<!-- <h2 v-if="this.getInfos.data">{{ this.getInfos.data.app_info[0].agreement_title }}</h2> -->
						<h2 v-html="this.agreementData[0].agreement_title"></h2>
						<!-- <div v-if="this.getInfos.data" v-html="this.getInfos.data.app_info[0].agreement_text"/> -->
						<div v-html="this.agreementData[0].agreement_text"/>
						<!-- <p>{{ this.getInfos.data.app_info[0].agreement_text }}</p> -->
					</div>
					<!-- <span class="theButton buttonPrimary buttonConfirm" :class="{hiddenWrap: !this.finishReg }" @click="confirmRegistr">Принять и продолжить</span>
					<span class="theButton buttonPrimary buttonConfirm" :class="{hiddenWrap: this.finishReg }" @click="prevStep">Зарегистрироваться</span> -->
					<span class="theButton buttonPrimary buttonConfirm" :class="{hiddenWrap: !this.formValues || Object.keys(this.formValues).length === 0 || !this.finishReg }" @click="confirmRegistr">Принять и продолжить</span>
					<span class="theButton buttonPrimary buttonConfirm" :class="{hiddenWrap: this.formValues && Object.keys(this.formValues).length !== 0 && this.finishReg }" @click="prevStep">Зарегистрироваться</span>
				</div>

				<div v-else class="roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>

			</div>
		</Form>

		<Form class="contentWrap stepRegCode" @submit="onSendCode" v-slot="{ errors }" :validation-schema="schema_code" v-show="curStep == 3">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonBack" @click="prevStep"></span>
				<h1 class="theTitle alignCenter">Аутентификация почты</h1>
				<span class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</span>
			</div>

			<div class="contentSubWrap">
				<div class="titleLine">
					<h2 class="pageTitle fontSize20 alignCenter fontFamilyEB marginB12">Введите код из письма</h2>
				</div>
				<div class="formWrap marginB20">
					<label class="inputWrap" :class="{notValid: errors.code }">
						<span class="label">Код</span>
						<div class="inputBox">
							<Field ref="forgotCodeInput" name="code" type="number" onkeypress="this.value=this.value.substring(0,11)" placeholder="123456" />
						</div>
							<ErrorMessage class="errorTitle" name="code" />
					</label>
					<button class="theButton buttonOptimal marginAuto buttonPrimary fontFamilyB marginB20" style="margin-bottom:42px;margin-top:12px">Далее</button>
				</div>

				<div class="infoWrap">
					<span class="theButton buttonWhite buttonOptimal" :class="{disabled: !this.resendCode }" @click="onResendCode">Запросить код повторно <b :class="{hiddenWrap: this.resendCode }">{{this.timer.minutes}}:{{this.timer.seconds.value < 10 ? '0' + this.timer.seconds.value : this.timer.seconds}}</b></span>
					<p class="fontSize12 alignCenter">Проверьте папку «Спам», если не видите письма</p>
				</div>

				<div class="infoWrap testingWrap">
				</div>
			</div>
		</Form>


		<div class="contentWrap stepRegFinal" v-show="curStep == 4">
			<div class="contentSubWrap">
				<div class="infoWrap">
					<h2>Регистрация прошла успешно!</h2>
					<p class="confirmMessage">Для входа, нажмите на кнопку "Войти"</p>
					<!-- <span class="theButton buttonConfirm buttonPrimary" @click="this.goMainPage()">Войти</span> -->
					<router-link class="theButton buttonConfirm buttonPrimary" to="/" @click="this.goMainPage()">Войти</router-link>
					<!-- <button class="theButton buttonPrimary" @click="confirmReg">Войти</button> -->
				</div>
			</div>
		</div>


		<div class="empty_layout" v-if="curStep == 2"></div>


	</div>
</template>

<script>

// import { useRoute } from 'vue-router';

import axios from 'axios';

import { defineComponent, watchEffect, onMounted, ref } from "vue";

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';

import { Form, Field, ErrorMessage, useField } from 'vee-validate';
import * as yup from 'yup';
// import { object, string, ref} from 'yup';

import { useTimer, useStopwatch, useTime } from 'vue-timer-hook';
import base from "@/base";

export default defineComponent({

	name: 'Registr',

	components: {
		// object,
		// string,
    Form,
    Field,
    ErrorMessage,
  },

	// Создаем переменные yup через setup, чтобы избежать ненужной реактивности
	setup(){
		const resendCode = ref(true);
		const time = new Date();
		const timer = useTimer(time);

		const restartOne = () => {
			const time = new Date();
			time.setSeconds(time.getSeconds() + 59);
			timer.restart(time);
    };

		onMounted(() => {
      watchEffect(async () => {
        if(timer.isExpired.value) {
					try {
						resendCode.value = true;
					} catch (error) {
						console.log('Error! Could not reach the API. ' + error);
					}
        }
      });
    });

		const schema_code = yup.object({
      code: yup.string().required('Введите код подтверждения').min(6, 'Код должен состоять из 6 символов').max(12, 'Код должен состоять из 6 символов').typeError().label('Код из письма'),
		});
		const schema = yup.object({
			polis: yup.string().min(16, 'Поле должно содержать не менее 16 цифр').required('Пожалуйста, заполните это поле').matches(/^[0-9]+$/, "Must be only digits").typeError('Ввелите цифры').label('Полис'),
      email: yup.string().required('Пожалуйста, заполните это поле').email('Пожалуйста, введите корректный email').typeError('Поле Email обязателен').label('Email'),
			// name: string().required('Поле обязательно на заполнение').label('Имя'),
			password: yup.string().required('Пожалуйста, заполните это поле').min(8, 'Поле должно содержать не менее 8 символов').label('Пароль'),
			password_confirmation: yup.string().label('Подтверждение пароля').required('Пожалуйста, заполните это поле').oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
		});
    return {
      schema, schema_code, resendCode, time, timer, restartOne,
    };
	},
	data(){
		return{
			curStep: 1,
			finishReg: false,
			inputPassType: 'password',
			formValues: {},
			currReferal: false,
			cacheUserData: {},
			showErrors: false,
			resendCode: true,
			curResetCode: '',
			showNotification: false,
			notificationMess: '',
			notificationErrorMess: '',
			agreementData: [{
				agreement_title: '',
				agreement_text: '',
			}],
			agreementDataLoading: false,
			// regForm: {
			// 	email: '',
			// 	firstName: '',
			// 	password: '',
			// 	confirmPassword: '',
			// 	phone: '',
			// },

		}
	},

	methods:{

		// Мутации состояний из хранилища
		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthIn: 'setAuthIn',
			setAuthOut: 'setAuthOut',
			setRegPage: 'setRegPage',
			setHomeTab: 'setHomeTab',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),
		...mapActions({
			fetchInfos: 'fetchInfos',
		}),

		hideMessages(){
			this.showErrors = false;
			this.showNotification = false;
		},

		// Шаги, для регистрации
		nextStep(){
			this.curStep += 1;
			this.finishReg = false;
		},
		// nextStepReg(){
		// 	this.curStep += 1;
		// 	this.finishReg = true;
		// },
		prevStep(){
			this.curStep -= 1;
			this.finishReg = false;
		},

		// Микс из мутации хранилища и локального метода
		// confirmReg(){
		// 	this.curStep = 1;
		// 	this.setLogPage();
		// },

		// Локальный метод для показа пароля в форме
		showPass(){
			if( this.inputPassType == 'password' ){
				this.inputPassType = 'text';
			}else{
				this.inputPassType = 'password';
			}
		},

		readPolicy(){
			this.agreementDataLoading = true;
			try{
				setTimeout( async () => {
					const response =
						await axios.get(base.API_URL + '/app/agreement').catch(function (error) { if (error.response){} });
					if(response){
						this.agreementData = response.data.data;
						this.agreementDataLoading = false;
					}else{
						this.agreementData = [{
							agreement_title: 'Ошибка загрузки политики конфиденциальности',
							agreement_text: 'К сожалению, загрузить политику конфинедциальности не удалось, однако Вы всегда сможете ознакомиться с ней позже.',
						}]
						this.notificationErrorMess = 'Неожиданная ошибка';
						this.agreementDataLoading = false;
						setTimeout(() => {
						this.showErrors = true;
						}, 400);
						setTimeout(() => {
							this.showErrors = false;
						}, 3000);
					}
				}, 50 );
			} catch(e){
				// console.log(e);
			} finally {}
			this.curStep += 1;
		},

		onSubmit(values){

			this.agreementDataLoading = true;

			try{
				setTimeout( async () => {
					const response =
						await axios.get(base.API_URL + '/app/agreement').catch(function (error) { if (error.response){} });
					if(response){
						this.agreementData = response.data.data;
						this.agreementDataLoading = false;
					}else{
						this.agreementData = [{
							agreement_title: 'Ошибка загрузки политики конфиденциальности',
							agreement_text: 'К сожалению, загрузить политику конфинедциальности не удалось, однако Вы всегда сможете ознакомиться с ней позже.',
						}]
						this.notificationErrorMess = 'Неожиданная ошибка';
						this.agreementDataLoading = false;
						setTimeout(() => {
						this.showErrors = true;
						}, 400);
						setTimeout(() => {
							this.showErrors = false;
						}, 3000);
					}
				}, 50 );
			} catch(e){
				// console.log(e);
			} finally {}

			this.finishReg = true;
			this.formValues = values;
			this.curStep += 1;
			// const route = useRoute();
			// console.log(route.params);

		},

		getCurrentReferal(){
			const urlPath = window.location.search;
			var refFilter = '';
			const urlParams = new URLSearchParams(urlPath);
			// console.log(urlParams);
			if( urlParams.has('ref') ){
					refFilter = urlParams.get('ref');
					// console.log(refFilter);
			}
			if(refFilter && refFilter !== ''){
				this.currReferal = refFilter;
				// console.log(refFilter);
			}
		},


		// Отправить запрос на регистрацию
		confirmRegistr(){
			// this.notificationErrorMess = 'ошибка';
			try{
				setTimeout( async () => {
					if(this.currReferal){
						var response =
						await axios.post(base.API_URL + '/user/register?ref=' + this.currReferal, this.formValues).catch(function (error) { if (error.response){
							return error.response;
						} });
					}else{
						var response =
						await axios.post(base.API_URL + '/user/register', this.formValues).catch(function (error) { if (error.response){
							return error.response;
						} });
					}

					if(response.status == 200){
						this.notificationMess = response.data.message;
						setTimeout(() => {
							this.showNotification = true;
						}, 400);
						setTimeout(() => {
							this.showNotification = false;
						}, 3000);
						this.curStep += 1;
						this.resendCode = false;
						this.restartOne();
					}else{
						// console.log(response);
						this.notificationErrorMess = response.data.message;
						setTimeout(() => {
						this.showErrors = true;
						}, 400);
						setTimeout(() => {
							this.showErrors = false;
						}, 3000);
					}
				}, 50 );
			} catch(e){
				console.log(e);
			} finally {}
		},


		onResendCode(){
			if(this.resendCode){
					try{
					setTimeout( async () => {
						const cacheUserMail = {
							email: this.formValues.email,
						}
						// console.log(cacheUserMail);
						const response =
							await axios.post(base.API_URL + '/user/resend-login-code', cacheUserMail).catch(function (error) { if (error.response){
								return error.response;
							} });
						// console.log(response);
						if(response.status == 200){
							this.$refs.forgotCodeInput.reset();
							this.notificationMess = response.data.message;
							setTimeout(() => {
								this.showNotification = true;
							}, 400);
							setTimeout(() => {
								this.showNotification = false;
							}, 3000);
							// this.curStep = 4;
							this.resendCode = false;
							this.restartOne();
						}else{
							this.notificationErrorMess = response.data.message;
							this.resendCode = false;
							this.restartOne();
							setTimeout(() => {
							this.showErrors = true;
							}, 400);
							setTimeout(() => {
								this.showErrors = false;
							}, 3000);
						}
					}, 50 );
				} catch(e){
				} finally {}
				// this.curStep = 'auth_code2';
			}
		},


		onSendCode(values){
			// console.log(values);
			try{
				setTimeout( async () => {
					this.curResetCode = values.code;
					const filterCode = {
						code: values.code,
					};
					const response =
						await axios.post(base.API_URL + '/user/login/code', filterCode).catch(function (error) { if (error.response){} });
					if(response){
						this.$refs.forgotCodeInput.reset();
						this.curStep = 4;
						this.cacheUserData = response.data;
					}else{
						this.notificationErrorMess = 'Некорректный код.';
						setTimeout(() => {
						this.showErrors = true;
						}, 400);
						setTimeout(() => {
							this.showErrors = false;
						}, 3000);
					}
				}, 50 );
			} catch(e){
				console.log(e);
			} finally {}
		},


		goMainPage(){
			try{
				setTimeout( async () => {
					if(this.cacheUserData.access_token){
						this.setAuthIn(this.cacheUserData);
						const responseInfos = await axios.get(base.API_URL + '/app/info', {
							headers: {
								Authorization: this.cacheUserData.token_type + ' ' + this.cacheUserData.access_token,
							}
						});

						if(responseInfos){
							this.setInfos(responseInfos.data);
							this.setAuthIn(response.data);
							this.curStep += 1;
							this.finishReg = false;
							this.setLogPage();
							// this.$router.push("/");
						}else{
							this.notificationErrorMess = 'Во время входа произошла ошибка.';
							setTimeout(() => {
							this.showErrors = true;
							}, 400);
							setTimeout(() => {
								this.showErrors = false;
							}, 3000);
							this.curStep += 1;
						}
					}
				}, 50 );

			}catch(e){
				console.log(e);
			} finally {
			}

		},


	},




	computed:{
		...mapState({
			isAuth: state => state.isAuth,
			newReg: state => state.newReg,
		}),
		...mapGetters({
			getInfos: 'getInfos',
		})
	},


	mounted(){
		this.getCurrentReferal();
	},


	// watch:{
	// 	$route(to, from) {
	// 		this.getCurrentReferal(to.params);
	// 		// console.log('To:');
	// 		// console.log(to.params.id);
	// 		// console.log('From:');
	// 		// console.log(from);
	// 	},
	// }


});
</script>

<style lang="scss" scoped>

.mainContainer{

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
    background-color: #fff;
    z-index: 10;
	}
	.contentWrap{
		z-index: 15;

		.topLine{
			background-color: #ffeaeba8;
			border-bottom: none;
		}

		.contentSubWrap{
			position: relative;
			z-index: 10;
			width: 100%;
			padding-top: 60px;
			padding-bottom: 40px;
			.titleLine{
				margin-bottom: 32px;
			}
		}

		.formWrap{
			.submitWrap{
				margin-bottom: 0;
			}
			.infoWrap{
				margin-top: 52px;
				display: flex;
				flex-direction: column;
				.theButton{
					padding: 12px 16px;
					margin-bottom: 32px;
				}
				.theTitle{
					text-align: center;
					margin-bottom: 4px;
				}
			}
		}

		&.stepRegSecond{
			margin-bottom: 80px;
			background-color: #FFF;
			.topLine{
				background-color: #ffffffa8;
				backdrop-filter: blur(5px);
				border-bottom: 1px solid rgba(35, 41, 45, 0.1);
			}
			.infoWrap{
				margin-bottom: 20px;
				line-height: 150%;
				p{
					line-height: 150%;
				}
			}
			.buttonConfirm{
				margin: 0 auto;
			}
		}
		&.stepRegCode{
			.infoWrap .theButton{
				margin-bottom: 10px;
			}
		}

		&.stepRegFinal{
			& *{
				text-align: center;
				margin-left: auto;
				margin-right: auto;
			}
			.infoWrap .confirmMessage{
				margin-bottom: 30px;
			}
		}

		.infoWrap{
			.policy_text{
				line-height: 150%;
			}
		}
	}
}


/* -------- @media ----------- */

@media screen and (max-width: 600px) {

	.mainContainer{
		.contentWrap{
			&.stepRegSecond{
				margin-bottom: 0px;
			}
		}
	}

}



</style>
