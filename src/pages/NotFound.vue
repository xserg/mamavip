<template>
  <div class="mainContainer">

		<div class="contentWrap centered">

			<div class="contentSubWrap empty_wrap flexWrap">
				<img class="the_img" src="./../assets/images/404.png" alt="img">
				<span class="the_title fontFamilyEB">Страница не найдена</span>
				<!-- <p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p> -->
				<router-link class="theButton buttonPrimary buttonOptimal fontSize14" to="/" @click="this.setHomeTab()">На главный экран</router-link>
			</div>

			</div>


	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'

import {mapMutations} from 'vuex';

export default {
  name: 'NotFound',
	components: {
  },

	data(){
		return{
			// hasElements: false,
		}
	},

	methods:{

		...mapMutations({
			setHomeTab: 'setHomeTab',
		}),

		methods: {
		},

	},

	computed:{
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

		&.centered{
			justify-content: center;
			align-items: center;
		}

		.contentSubWrap{
			width: 100%;
			&.elements_wrap{
				padding-top: 8px;
			}

			&.empty_wrap{
				padding-top: 45px;
    		padding-bottom: 48px;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				max-width: 480px;
				padding-left: 10px;
				padding-right: 10px;
				.the_img{
					width: 56.56%;
					margin-left: auto;
					margin-right: auto;
					margin-bottom: 10px;
				}
				.the_title{
					color: #23292DB2;
					margin-bottom: 4px;
					text-align: center;
				}
				.the_desc{
					color: #23292DB2;
					margin-bottom: 4px;
					text-align: center;
				}
				.theButton{
					margin-top: 24px;
				}
			}

		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 480px) {

	.mainContainer{
		.contentWrap{
		}
	}


}

</style>
