<template>
	
	<div class="mainContainer blockWrap">
		
		<div class="topLine">
			<button class="theButton buttonTransparent ghostWrap">Назад</button>
			<h1 class="theTitle">Вход</h1>
			<button class="theButton buttonTransparent">Войти</button>
		</div>

		<div class="contentWrap">

			<div class="titleLine"></div>
			<div class="formWrap"></div>

		</div>

	</div>

</template>

<script>

import {mapState} from 'vuex';

export default {
	name: 'autoriz',

	components: {},

	data(){
		return{
			loginForm: {
				email: '',
				password: '',
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

<style>

</style>