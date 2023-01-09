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
					</label>
					<label class="inputWrap">
						<span class="label">Повторите пароль</span>
						<input type="password">
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
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	padding: 0 16px;
	justify-content: space-between;
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
	.titleLine{
		margin-bottom: 32px;
	}
}



.formWrap{
	max-width: 330px;
	margin: 0 auto;
	width: 100%;
	
	.inputWrap{
		margin-bottom: 24px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		.label{
			font-size: 12px;
			margin-bottom: 4px;
		}
		input{
			width: 100%;
			border: none;
			padding: 12px 16px;
			box-shadow: 0px 16px 20px -8px rgba(253, 124, 132, 0.2);
			border-radius: 8px;
			border: 2px solid #FFF;
			transition: all .24s ease;
			outline: none;
			&::placeholder{
				color: #23292D4D;
			}
			&:focus, &:focus-within, &:active, &:focus-visible, &:target{
				border: 2px solid #FEABB0;
				transition: all .24s ease;
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