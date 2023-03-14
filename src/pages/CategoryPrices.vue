<template>
  <div class="mainContainer">

		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Купить доступ</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">
				<div class="infoWrap">
					<h2>{{ currentSubCategory.title }}</h2>

					<div class="content_box info_box marginB12">
						<div class="video_wrap">
							<img class="video_preview" :v-if="currentSubCategory.preview_picture" :src="currentSubCategory.preview_picture" alt="preview" />
						</div>
					</div>

					<p>Вы можете приобрести доступ ко всем видео из текущий подкатегории на необходимый вам промежуток времени.</p>
					<br>
					<br>
					<span @click="buyCategory(1)" class="theButton buttonPrimary buttonOptimal marginAuto">Купить на день: {{ currentSubCategory.prices[0].price_for_category }}₽</span>
					<br>
					<br>
					<span @click="buyCategory(14)" class="theButton buttonSecondary buttonOptimal marginAuto">Купить на неделю: {{ currentSubCategory.prices[1].price_for_category }}₽</span>
					<br>
					<br>
					<span @click="buyCategory(30)" class="theButton buttonSecondary buttonOptimal marginAuto">Купить на месяц: {{ currentSubCategory.prices[2].price_for_category }}₽</span>
					<br>
					
				</div>
				
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>


	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import axios from 'axios';
import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
  name: 'CategoryPrices',
	components: {
  },

	data(){
		return{
			// hasElements: false,
		}
	},

	methods:{

		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
		}),


			buyCategory(time){
				try{
					setTimeout( async () => {
						const headers = { 
							'Authorization': this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};
						const response = await axios.post('https://api.xn--80axb4d.online/v1/category/' + this.currentSubCategory.id + '/buy/' + time, {}, { headers });
						window.open(response.data.link,"_self");
					}, 500 );
				} catch(e){
					console.log(e);
				} finally {}
		}

	},


	computed:{
		...mapState({
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			currentSubCategory: 'content/currentSubCategory',
		}),
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
		.contentSubWrap{
			padding: 32px 16px;
			p{
				line-height: 150%;
			}
			.content_box{
				margin-left: -15px;
				margin-right: -15px;
				width: calc(100% + 30px);
				.video_wrap{
					width: 100%;
					padding-top: 58%;
					position: relative;
					margin-bottom: 12px;
					background-color: #FFEAEB;
					.video_preview{
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 10;
						border: 1px solid rgba(35, 41, 45, 0.1);
						object-fit: cover;
					}
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
