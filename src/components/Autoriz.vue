<template>

	<div class="mainContainer blockWrap">
		<div class="contentWrap authstep_login" v-show=" this.curStep == 'auth_login' ">
			<Form @submit="onSubmit" v-slot="{ errors }" :validation-schema="schema">

				<div class="errorWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showErrors }">
					<p>Неправильный логин/пароль. <br>Повторите попытку.</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideErrors"></span>
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
						<span class="theButton close_button" @click="hideErrors"></span>
					</div>
				</div>
				
				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonBack"></span>
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
								<Field name="email" placeholder="example@mail.com" />
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
						<span class="theButton close_button" @click="hideErrors"></span>
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
								<Field name="code" type="number" onkeypress="this.value=this.value.substring(0,5)" placeholder="123456" />
							</div>
								<ErrorMessage class="errorTitle" name="code" />
						</label>
					</div>

					<div class="infoWrap">
						<span class="theButton buttonWhite">Запросить код повторно 0:49</span>
						<p class="fontSize12 alignCenter">Проверьте папку «Спам», если не видите письма</p>
					</div>

				</div>
			
			</Form>
		</div>



		<div class="mainContainer authstep_newpass" v-show=" this.curStep == 'auth_newpass' ">
			<Form class="contentWrap" @submit="onSubmit" v-slot="{ errors }" :validation-schema="schema">

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
								<Field name="password" :class="{notValid: errors.password }" :type="inputPassType" />
								<span class="theButton buttonShowPass" :class="{ active: this.inputPassType == 'text' }" @click="showPass"></span>
							</div>
							<ErrorMessage class="errorTitle" name="password" />
						</label>
						<label class="inputWrap">
							<span class="label">Повторите пароль</span>
							<div class="inputBox">
								<Field name="password" :class="{notValid: errors.password }" :type="inputPassType" />
								<span class="theButton buttonShowPass" :class="{ active: this.inputPassType == 'text' }" @click="showPass"></span>
							</div>
							<ErrorMessage class="errorTitle" name="password" />
						</label>
					</div>
				</div>
			
			</Form>
		</div>


	</div>
</template>

<script>

import {mapState, mapMutations} from 'vuex';
import { Form, Field, ErrorMessage } from 'vee-validate';

import { object, string, number } from 'yup';

export default {
	name: 'autoriz',

	components: {
		Form,
    Field,
    ErrorMessage,
	},

	setup(){
		const schema = object({
      email: string().required('Пожалуйста, заполните это поле').email('Пожалуйста, введите корректный email').typeError('Поле Email обязателен').label('Email'),
      password: string().required('Пожалуйста, заполните это поле').label('Пароль'),
		});
		const schema_forgot = object({
      email: string().required('Пожалуйста, заполните это поле').email('Пожалуйста, введите корректный email').typeError('Поле Email обязателен').label('Email'),
		});
		const schema_code = object({
      code: string().required('').min(6, 'Код должен состоять из 6 символов').max(6, 'Код должен состоять из 6 символов').typeError().label('Код из письма'),
		});
    return {
      schema, schema_forgot, schema_code,
    };
	},

	data(){
		return{
			curStep: 'auth_code',
			inputPassType: 'password',
			showErrors: false,
			timer: 0,
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
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),

		loginStep(){
			this.curStep = 'auth_login';
		},
		forgotStep(){
			this.curStep = 'auth_forgot';
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
			this.setAuthIn();
		},

		onSendCode(values){
			console.log(JSON.stringify(values, null, 2));
			// this.showErrors = true;
			this.curStep = 'auth_code';
		},

		onResetPass(values){
			console.log(JSON.stringify(values, null, 2));
			this.showErrors = true;
			// this.curStep = 'auth_newpass';
		},



		hideErrors(){
			this.showErrors = false;
		},

	},

	computed:{
		...mapState({
			isAuth: state => state.isAuth,
			newReg: state => state.newReg,
		})
	},

	
}


</script>

<style lang="scss" scoped>


.mainContainer{
	.contentWrap{

		.topLine{
			background-color: #ffeaeba8;
			backdrop-filter: blur(5px);
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			right: 0;
			padding: 0 16px;
			justify-content: space-between;
			z-index: 100;
			align-items: center;
			.backButton{

			}
			.theButton{
				width: 100%;
				max-width: max-content;
				min-width: 20%;
				&.rightButton{
					text-align: right;
				}
			}
			.theTitle{
				cursor: default;
				width: 100%;
				max-width: max-content;
				min-width: 60%;
				margin-top: 12px;
				margin-bottom: 12px;
				font-size: 16px;
			}
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