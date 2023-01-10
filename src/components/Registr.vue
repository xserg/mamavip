<template>
	<div class="mainContainer blockWrap">
		<div class="contentWrap">
		
			<div class="topLine flexWrap">
				<button class="theButton leftButton buttonTransparent ghostWrap">Назад</button>
				<h1 class="theTitle">Регистрация</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB">Далее</button>
			</div>

			<div class="contentSubWrap">

				<div class="titleLine">
					<h2 class="pageTitle fontSize20 fontFamilyEB">Добро пожаловать в школу мам и пап</h2>
					<h2 class="pageSubtitle fontSize32 fontFamilyEB">"Нежность"</h2>
				</div>
				<div class="formWrap">
					<label class="inputWrap">
						<span class="label">Введите email</span>
						<input type="text" placeholder="example@mail.com">
					</label>
					<label class="inputWrap">
						<span class="label">Введите пароль</span>
						<input type="password">
						<button class="theButton actionShowPass"></button>
					</label>
					<label class="inputWrap">
						<span class="label">Повторите пароль</span>
						<input type="password">
						<button class="theButton actionShowPass"></button>
					</label>
					<div class="infoWrap">
						<span class="theTitle">Есть аккаунт?</span>
						<button class="theButton buttonTransparent fontFamilyB">Войти</button>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>

<script>

import {mapState} from 'vuex';

export default {

	name: 'registr',

	data(){
		return{
			curStep: 1,
			regForm: {
				email: '',
				firstName: '',
				password: '',
				confirmPassword: '',
				phone: '',
			},
			
		}
	},

	methods:{

		// nextStep{}
		
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
	max-width: 568px;
	margin: 0 auto;
	width: 100%;
	
	.inputWrap{
		margin-bottom: 24px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
		.label{
			font-size: 12px;
			margin-bottom: 4px;
		}
		input{
			position: relative;
			z-index: 5;
			width: 100%;
			border: none;
			padding: 12px 16px;
			box-shadow: 0px 16px 20px -8px rgba(253, 124, 132, 0.2);
			border-radius: 8px;
			border: 2px solid #FFF;
			transition: all .24s ease, letter-spacing .0 ease;
			outline: none;
			letter-spacing: 1px;
			&[type=text]{
				letter-spacing: 0.6px;
			}
			&[type=password]{
				letter-spacing: 5px;
			}
			&::placeholder{
				color: #23292D4D;
			}
			&:focus, &:focus-within, &:active, &:focus-visible, &:target{
				border: 2px solid #FEABB0;
				transition: all .24s ease;
			}
		}
		.theButton.actionShowPass{
			position: absolute;
			bottom: 2px;
			right: 8px;
			display: block;
			border-radius: 50%;
			width: 42px;
			height: 42px;
			z-index: 10;
			&::before{
				content: '';
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				position: absolute;
				background-image: url('../assets/icons/eye-on.svg');
				background-size: 60%;
				background-repeat: no-repeat;
				background-position: center;
				opacity: 0;
				transition: all .24s ease;
			}
			&::after{
				content: '';
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				position: absolute;
				background-image: url('../assets/icons/eye-off.svg');
				background-size: 60%;
				background-repeat: no-repeat;
				background-position: center;
				opacity: 1;
				transition: all .24s ease;
			}
			&.active::before{
				opacity: 1;
			}
			&.active::after{
				opacity: 0;
			}
		}
	}

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




</style>