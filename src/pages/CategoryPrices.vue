<template>
  <div class="mainContainer">

		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Купить доступ</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap" v-if="getCurrUser.user.name !== null">
				<div class="infoWrap">
					<h2>{{ currentSubCategory.title }}</h2>

					<div class="content_box info_box marginB12">
						<div class="video_wrap">
							<img class="video_preview" :v-if="currentSubCategory.preview_picture" :src="currentSubCategory.preview_picture ? 'https://api.xn--80axb4d.online/storage/' + currentSubCategory.preview_picture : ''" alt="preview" />
						</div>
					</div>

					<p>Вы можете приобрести доступ ко всем видео из текущий подкатегории на необходимый вам промежуток времени.</p>
					<br>
					<br>
					<span v-if="currentSubCategory.prices[0]" @click="buyCategory(this.getInfos.data.app_periods[0])" class="theButton buttonPrimary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_1}}: {{ currentSubCategory.prices[0].price_for_category }}₽</span>
					<br>
					<br>
					<span v-if="currentSubCategory.prices[1]" @click="buyCategory(this.getInfos.data.app_periods[1])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_2}}: {{ currentSubCategory.prices[1].price_for_category }}₽</span>
					<br>
					<br>
					<span v-if="currentSubCategory.prices[2]" @click="buyCategory(this.getInfos.data.app_periods[2])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_3}}: {{ currentSubCategory.prices[2].price_for_category }}₽</span>
					<br>
					
				</div>
				
			</div>

			<div class="contentSubWrap contentCompleteProfile" v-else>
				<div class="finish_delete_wrap flexWrap">
					<img src="./../assets/images/delete.png" alt="delete-account" class="the_img">
					<span class="the_title blockWrap fontFamilyEB marginB12">Заполните профиль</span>
					<p class="the_desc blockWrap fontSize14 marginB12">Это необходимо, чтобы пользоваться сервисом</p>
					<router-link class="theButton buttonPrimary buttonOptimal fontSize16" to="/profile/edit" @click="setRouterAnimate">Заполнить</router-link>
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
			setInfos: 'setInfos',
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
		},

		loadStaticInfo(){
			try{
				setTimeout( async () => {
					const responseInfos = await axios.get('https://api.xn--80axb4d.online/v1/app/info', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					});
					this.setInfos(responseInfos.data);
				}, 50 );
			}
			catch(e){} 
			finally {}
		}

	},

	


	computed:{
		...mapState({
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			getInfos: 'getInfos',
			currentSubCategory: 'content/currentSubCategory',
		}),
	},

	mounted(){
		this.loadStaticInfo();
	}

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
			&.contentCompleteProfile {
				background-color: #FFF;
				padding-top: 30px;
				.finish_delete_wrap{
					max-width: 480px;
					margin-left: auto;
					margin-right: auto;
					width: 100%;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					.the_img{
						margin-left: auto;
						margin-right: auto;
						display: block;
						// width: 100%;
						width: 55.6%;
						margin-bottom: 10px;
						display: block;
					}
					.the_title{
						color: #23292DB2;
						text-align: center;
						margin-bottom: 12px;
					}
					.the_desc{
						text-align: center;
						color: #23292DB2;
						margin-bottom: 24px;
					}
					.theButton{}
				}
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
