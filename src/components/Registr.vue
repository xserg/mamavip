<template>
	<div class="span">Страница регистрации</div>
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

<style>

</style>