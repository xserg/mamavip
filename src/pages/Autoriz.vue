<template>

	<div class="mainContainer blockWrap">
		<div class="contentWrap authstep_login" v-show=" this.curStep == 'auth_login' ">
			<Form @submit="onSubmit" v-slot="{ errors }" :validation-schema="schema">

				<div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotification }">
					<p>Пароль был успешно обновлен</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>

				<div class="errorWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showErrors }">
					<p>Неправильный логин/пароль. <br>Повторите попытку.</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>

				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
					<h1 class="theTitle alignCenter">Вход</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB">Войти</button>
				</div>

				<div class="contentSubWrap">

					<div class="titleLine">
						<h2 class="pageTitle fontSize20 alignCenter fontFamilyEB">Добро пожаловать в школу мам и пап</h2>
						<h2 class="pageSubtitle fontSize32 alignCenter fontFamilyEB">"Нежность"</h2>
					</div>
					<div class="formWrap">
						<label class="inputWrap" :class="{notValid: errors.email || showErrors }">
							<span class="label">Введите email</span>
							<div class="inputBox">
								<Field name="email" placeholder="example@mail.com" />
							</div>
   					 	<ErrorMessage class="errorTitle" name="email" />
						</label>
						<label class="inputWrap" :class="{notValid: errors.password || showErrors }">
							<span class="label">Введите пароль</span>
							<div class="inputBox">
								<Field name="password" :type="inputPassType" />
								<span class="theButton buttonShowPass" :class="{ active: this.inputPassType == 'text' }" @click="showPass"></span>
							</div>
							<ErrorMessage class="errorTitle" name="password" />
						</label>

						<div class="infoWrap">
							<span class="theButton buttonOptimal marginAuto buttonWhite fontFamilyB" @click="forgotStep">Забыли пароль?</span>
							<span class="theTitle">Нет аккаунта?</span>
							<span class="theButton buttonOptimal marginAuto buttonTransparent fontFamilyB fontSize14" @click="this.setRegPage()">Зарегистрироваться</span>
						</div>
					</div>

				</div>

			</Form>
		</div>



		<div class="mainContainer authstep_forgot" v-show=" this.curStep == 'auth_forgot' ">
			<Form class="contentWrap" @submit="onSendCode" v-slot="{ errors }" :validation-schema="schema_forgot">

				<div class="errorWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showErrors }">
					<p>Текущий email <br>не зарегистрирован в системе</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>
				
				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonBack" @click="loginStep"></span>
					<h1 class="theTitle alignCenter">Восстановить пароль</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB">Далее</button>
				</div>

				<div class="contentSubWrap">
					<div class="titleLine">
						<h2 class="pageTitle fontSize20 alignCenter fontFamilyEB marginB12">Введите email, с которым регистрировались ранее</h2>
						<p class="pageSubtitle fontSize16 alignCenter">Мы отправим письмо с проверочным кодом на этот адрес</p>
					</div>
					<div class="formWrap">
						<label class="inputWrap" :class="{notValid: errors.email || showErrors }">
							<span class="label">Email</span>
							<div class="inputBox">
								<Field ref="forgotEmailInput" name="email" placeholder="example@mail.com" />
							</div>
								<ErrorMessage class="errorTitle" name="email" />
						</label>
					</div>
				</div>
			
			</Form>
		</div>



		<div class="mainContainer authstep_code" v-show=" this.curStep == 'auth_code' ">
			<Form class="contentWrap" @submit="onResetPass" v-slot="{ errors }" :validation-schema="schema_code">

				<div class="errorWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showErrors }">
					<p>Введен не корректный код</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>

				<div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotification }">
					<p>Код подтверждения отправлен</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>
				
				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonBack" @click="forgotStep"></span>
					<h1 class="theTitle alignCenter">Восстановить пароль</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB">Далее</button>
				</div>

				<div class="contentSubWrap">
					<div class="titleLine">
						<h2 class="pageTitle fontSize20 alignCenter fontFamilyEB marginB12">Введите код из письма</h2>
					</div>
					<div class="formWrap marginB50">
						<label class="inputWrap" :class="{notValid: errors.code }">
							<span class="label">Код</span>
							<div class="inputBox">
								<Field ref="forgotCodeInput" name="code" type="number" onkeypress="this.value=this.value.substring(0,5)" placeholder="123456" />
							</div>
								<ErrorMessage class="errorTitle" name="code" />
						</label>
					</div>

					<div class="infoWrap">
						<span class="theButton buttonWhite" :class="{disabled: !this.resendCode }" @click="onResendCode">Запросить код повторно <b :class="{hiddenWrap: this.resendCode }">{{this.timer.minutes}}:{{this.timer.seconds.value < 10 ? '0' + this.timer.seconds.value : this.timer.seconds}}</b></span>
						<p class="fontSize12 alignCenter">Проверьте папку «Спам», если не видите письма</p>
					</div>

				<div class="infoWrap testingWrap">

					<!-- {{ this.displayTimerSeconds }} -->
					<!-- <span>{{this.time.hours}}</span>:<span>{{this.time.minutes}}</span>:<span>{{this.time.seconds}}</span><span>{{this.time.ampm}}</span> -->
					<!-- <span>{{this.timer.days}}</span>:<span>{{this.timer.hours}}</span>:<span>{{this.timer.minutes}}</span>:<span>{{this.timer.seconds.value < 10 ? '0' + this.timer.seconds.value : this.timer.seconds}}</span> <span>{{this.time.ampm}}</span> -->
					<!-- {{ this.displayTimerSeconds }} -->
					<!-- <p>{{timer.isRunning ? 'Running' : 'Not running'}}</p> -->
					<!-- <button @click="timer.start()">Start</button>
					<button @click="timer.pause()">Pause</button>
					<button @click="timer.resume()">Resume</button>
					<button @click="restartOne()">Restart</button> -->
				</div> 

				</div>
			
			</Form>

			

		</div>



		<div class="mainContainer authstep_newpass" v-show=" this.curStep == 'auth_newpass' ">
			<Form class="contentWrap" @submit="onSavePass" v-slot="{ errors }" :validation-schema="schema_newpass">

				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonGhost"></span>
					<h1 class="theTitle alignCenter">Новый пароль</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB">Готово</button>
				</div>

				<div class="contentSubWrap">
					<div class="titleLine">
						<h2 class="pageTitle fontSize20 alignCenter fontFamilyEB marginB12">Придумайте новый пароль</h2>
					</div>
					<div class="formWrap">
						<label class="inputWrap">
							<span class="label">Введите пароль</span>
							<div class="inputBox">
								<Field name="newpass" :class="{notValid: errors.newpass }" :type="inputPassType" />
								<span class="theButton buttonShowPass" :class="{ active: this.inputPassType == 'text' }" @click="showPass"></span>
							</div>
							<ErrorMessage class="errorTitle" name="newpass" />
						</label>
						<label class="inputWrap">
							<span class="label">Повторите пароль</span>
							<div class="inputBox">
								<Field name="confirm_newpass" :class="{notValid: errors.confirm_newpass }" :type="inputPassType" />
								<span class="theButton buttonShowPass" :class="{ active: this.inputPassType == 'text' }" @click="showPass"></span>
							</div>
							<ErrorMessage class="errorTitle" name="confirm_newpass" />
						</label>
					</div>
				</div>
			
			</Form>
		</div>


	</div>
</template>

<script>
// 1. Подключаем defineComponent, watchEffect, onMounted как просит того модуль vue-timer-hook
// 2. Подключаем ref как в примерах для корректной работы обновления данных в setup
import router from "@/router/router"; 
import { defineComponent, watchEffect, onMounted, ref } from "vue";

import {mapState, mapMutations} from 'vuex';

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
// Все три функции что есть в модуля
import { useTimer, useStopwatch, useTime } from 'vue-timer-hook';

export default defineComponent({
	name: 'autoriz',

	components: {
		// object, string, ref, 
		Form,
    Field,
    ErrorMessage,
	},

	setup(){

		const resendCode = ref(true);
		const time = new Date();
		// const format = '12-hour'
    // const time = useTime(format);
    // time.setSeconds(time.getSeconds() + 1); // 600 = 10 minutes timer
    const timer = useTimer(time);

		// Тесты: пытался вывести кастомизацию таймера за пределы компонента
		// const displayTimerSeconds = ref(timer.seconds.value < 10 ? "0" + timer.seconds.value : timer.seconds);
		// const displayTimerValues = ref({
		// 	days: timer.days,
		// 	hours: timer.hours,
		// 	minutes: timer.minutes.value < 10 ? "0" + timer.minutes.value : timer.minutes,
		// 	seconds: timer.seconds.value < 10 ? "0" + timer.seconds.value : timer.seconds,
		// });

		// Рестарт таймера под отправку нового кода
    const restartOne = () => {
			const time = new Date();
			time.setSeconds(time.getSeconds() + 59);
			timer.restart(time);
    }

    onMounted(() => {
      watchEffect(async () => {
        if(timer.isExpired.value) {
					// Timer is expired 
					try {
						// Примеры на будущее потестировать
						// const res = await fetch('https://www.greetingsapi.com/random')
						// const response = await res.json()
						resendCode.value = true;
					} catch (error) {
						console.log('Error! Could not reach the API. ' + error);
					}
        }
				// Тесты: пытался вывести кастомизацию таймера за пределы компонента
				// if(timer.seconds.value){
				// 	try {
				// 		console.log('timer seconds try');
				// 		displayTimerSeconds = timer.seconds.value < 10 ? "0" + timer.seconds.value : timer.seconds;
				// 		// Примеры на будущее потестировать
				// 		// const res = await fetch('https://www.greetingsapi.com/random')
				// 		// const response = await res.json()
				// 		// resendCode.value = true;
				// 		// displayTimerValues.seconds = timer.seconds.value < 10 ? "0" + timer.seconds.value : timer.seconds;
				// 		// displayTimerValues = {
				// 		// 	days: timer.days,
				// 		// 	hours: timer.hours,
				// 		// 	minutes: timer.minutes.value < 10 ? "0" + timer.minutes.value : timer.minutes,
				// 		// 	seconds: timer.seconds.value < 10 ? "0" + timer.seconds.value : timer.seconds,
				// 		// };
				// 	} catch (error) {
				// 		console.log('Error! Could not reach the API. ' + error);
				// 	}
				// }
      });
    });

		

		const schema = yup.object({
      email: yup.string().required('Пожалуйста, заполните это поле').email('Пожалуйста, введите корректный email').typeError('Поле Email обязателен').label('Email'),
      password: yup.string().required('Пожалуйста, заполните это поле').label('Пароль'),
		});
		const schema_forgot = yup.object({
      email: yup.string().required('Пожалуйста, заполните это поле').email('Пожалуйста, введите корректный email').typeError('Поле Email обязателен').label('Email'),
		});
		const schema_code = yup.object({
      code: yup.string().required('Введите код подтверждения').min(6, 'Код должен состоять из 6 символов').max(6, 'Код должен состоять из 6 символов').typeError().label('Код из письма'),
		});
		const schema_newpass = yup.object({
      newpass: yup.string().required('Пожалуйста, заполните это поле').min(8, 'Поле должно содержать не менее 8 символов').label('Пароль'),
			confirm_newpass: yup.string().label('Подтверждение пароля').required('Пожалуйста, заполните это поле').oneOf([yup.ref('newpass'), null], 'Пароли должны совпадать'),
		});
    return {
      schema, schema_forgot, schema_code, schema_newpass,
			resendCode, time, timer, restartOne,
			// displayTimerDays, displayTimerHours, displayTimerMinutes, displayTimerSeconds, displayTimerValues,
    };


		


	},

	data(){
		return{
			curStep: 'auth_login',
			inputPassType: 'password',
			showErrors: false,
			showNotification: false,
			resendCode: true,
			curResetValues: '',
			// resendCode: false,
			// loginForm: {
			// 	email: '',
			// 	password: '',
			// },
		}
	},

	
	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthIn: 'setAuthIn',
			setAuthOut: 'setAuthOut',
			setRegPage: 'setRegPage',
			setRouterAnimate: 'setRouterAnimate',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),

		loginStep(){
			this.curStep = 'auth_login';
		},
		forgotStep(){
			this.curStep = 'auth_forgot';
			this.$refs.forgotCodeInput.reset();
		},
		newpassStep(){
			this.curStep = 'auth_newpass';
		},

		showPass(){
			if( this.inputPassType == 'password' ){
				this.inputPassType = 'text';
			}else{
				this.inputPassType = 'password';
			}
		},

		onSubmit(values){
			console.log(JSON.stringify(values, null, 2));
			// this.showErrors = true;
			this.setRouterAnimate();
			router.push('/');
			this.setAuthIn();
			setTimeout(() => {}, 50);
		},

		onSendCode(values){
			this.curResetValues = values;
			console.log(JSON.stringify(this.curResetValues, null, 2));
			setTimeout(() => {
				this.showNotification = true;
			}, 400);
			setTimeout(() => {
				this.showNotification = false;
			}, 3000);
			// this.showErrors = true;
			// this.$refs.forgotEmailInput.reset();
			this.curStep = 'auth_code';
			this.resendCode = false;
			this.restartOne();
		},
		onResendCode(){
			if(this.resendCode){
				this.$refs.forgotCodeInput.reset();
				setTimeout(() => {
					this.showNotification = true;
				}, 400);
				setTimeout(() => {
					this.showNotification = false;
				}, 3000);
				// this.showErrors = true;
				this.curStep = 'auth_code';
				this.resendCode = false;
				this.restartOne();
			}
		},


		onResetPass(values){
			console.log(JSON.stringify(values, null, 2));
			this.$refs.forgotCodeInput.reset();
			// this.showErrors = true;
			this.curStep = 'auth_newpass';
		},

		onSavePass(values){
			console.log(JSON.stringify(values, null, 2));
			this.curStep = 'auth_login';
			setTimeout(() => {
        this.showNotification = true;
      }, 400);
			setTimeout(() => {
        this.showNotification = false;
      }, 3000);
		},

		hideMessages(){
			this.showErrors = false;
			this.showNotification = false;
		},

	},

	computed:{
		...mapState({
			isAuth: state => state.isAuth,
			newReg: state => state.newReg,
		}),
	},

	// mounted(){
	// 	this.setTimes();
	// },


	// watch:{
	// 	clientStatus: {
	// 		handler(newVal){
	// 			this.addThisTable(newVal);
	// 		},
	// 		deep: true
	// 	}
	// },
	

});


</script>

<style lang="scss" scoped>


.mainContainer{
	.contentWrap{

		.topLine{
			background-color: #ffeaeba8;
			border-bottom: none;
		}

		.contentSubWrap{
			position: relative;
			z-index: 10;
			width: 100%;
			padding-top: 80px;
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

	}

	.authstep_login{}
	.authstep_forgot{}
	.authstep_code{
		.infoWrap .theButton{
			margin-bottom: 10px;
		}
	}
	.authstep_newpass{}
}



/* -------- @media ----------- */

@media screen and (max-width: 600px) {
	.stepRegSecond{
		margin-bottom: 0px;
	}
}




</style>