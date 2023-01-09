<template>
	<div class="span">Страница авторизации</div>
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