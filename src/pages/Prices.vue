<template>
  <div class="mainContainer">

		<div class="contentWrap" >

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Купить доступ</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap" v-if="getCurrUser.user.name !== null">
				<div class="infoWrap">
					<h2>{{ getCurrentLecture.title }}</h2>

					<div class="content_box info_box marginB12">
						<div class="video_wrap">
							<img class="video_preview" :v-if="getCurrentLecture.preview_picture" :src="getCurrentLecture.preview_picture ? 'https://api.xn--80axb4d.online/storage/' + getCurrentLecture.preview_picture : ''" alt="preview" />
						</div>
					</div>

					<p>Вы можете приобрести доступ к этому видео на необходимый вам промежуток времени.</p>
					<br>
					<br>
					<!-- <span v-if="!getCurrentLecture.prices.price_by_promo && getCurrentLecture.prices.price_by_category && !getCurrentLecture.prices.price_by_promo[0]" @click="buyLecture(this.getInfos.data.app_periods[0])" class="theButton buttonPrimary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCurrentLecture.prices.price_by_category[0].price_for_lecture) }}₽</span>
					<span v-if="getCurrentLecture.prices.price_by_promo[0]" @click="buyLecture(this.getInfos.data.app_periods[0])" class="theButton buttonPrimary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCurrentLecture.prices.price_by_promo[0].price_for_promo_lecture) }}₽</span> -->
					<!-- <span v-if="!getCurrentLecture.prices.price_by_promo && getCurrentLecture.prices.price_by_category && !getCurrentLecture.prices.price_by_promo[0]" @click="buyLecture(this.getInfos.data.app_periods[0])" class="theButton buttonPrimary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCurrentLecture.prices.price_by_category[0].price_for_lecture) }}₽</span>
					<span v-if="getCurrentLecture.prices.price_by_promo[0]" @click="buyLecture(this.getInfos.data.app_periods[0])" class="theButton buttonPrimary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCurrentLecture.prices.price_by_promo[0].price_for_promo_lecture) }}₽</span> -->
					<span v-if="getCurrentLecture.prices[0].custom_price_for_one_lecture == null" @click="buyLecture(this.getInfos.data.app_periods[0])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCurrentLecture.prices[0].common_price_for_one_lecture) }}₽</span>
					<span v-else @click="buyLecture(this.getInfos.data.app_periods[0])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCurrentLecture.prices[0].custom_price_for_one_lecture) }}₽</span>
					<br>
					<br>
					<div></div>
					<span v-if="getCurrentLecture.prices[1].custom_price_for_one_lecture == null" @click="buyLecture(this.getInfos.data.app_periods[1])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_2}}: {{ Math.round(getCurrentLecture.prices[1].common_price_for_one_lecture) }}₽</span>
					<span v-else @click="buyLecture(this.getInfos.data.app_periods[1])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_2}}: {{ Math.round(getCurrentLecture.prices[1].custom_price_for_one_lecture) }}₽</span>
					<br>
					<br>
					<span v-if="getCurrentLecture.prices[2].custom_price_for_one_lecture == null" @click="buyLecture(this.getInfos.data.app_periods[2])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(getCurrentLecture.prices[2].common_price_for_one_lecture) }}₽</span>
					<span v-else @click="buyLecture(this.getInfos.data.app_periods[2])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(getCurrentLecture.prices[2].custom_price_for_one_lecture) }}₽</span>
					<!-- <span v-if="!getCurrentLecture.prices.price_by_promo && getCurrentLecture.prices.price_by_category && !getCurrentLecture.prices.price_by_promo[2]" @click="buyLecture(this.getInfos.data.app_periods[2])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(getCurrentLecture.prices.price_by_category[2].price_for_lecture) }}₽</span>
					<span v-if="getCurrentLecture.prices.price_by_promo[2]" @click="buyLecture(this.getInfos.data.app_periods[2])" class="theButton buttonSecondary buttonOptimal marginAuto">Купить {{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(getCurrentLecture.prices.price_by_promo[2].price_for_promo_lecture) }}₽</span> -->
					<br>

					<!-- <a ref="activeLinkButton" class="activeBuyButton" :href="this.activeLink" target="_blank">Покупка</a> -->
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
  name: 'Prices',
	components: {
  },

	data(){
		return{
			// hasElements: false,
			activeLink: '',
		}
	},

	methods:{

		...mapMutations({
			setInfos: 'setInfos',
			setRouterAnimate: 'setRouterAnimate',
		}),


		buyLecture(time){
			try{
				setTimeout( async () => {
					const headers = { 
						'Authorization': this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						'Content-Type': 'application/json',
						'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
						'Access-Control-Allow-Origin': '*',
					};
					const response = await axios.post('https://api.xn--80axb4d.online/v1/lecture/' + this.getCurrentLecture.id + '/buy/' + time, {}, { headers });
					
					if(response){
						window.open(response.data.link,"_self");
						// this.activeLink = response.data.link;
						// setTimeout(() => {
						// 	this.$refs.activeLinkButton.click();
						// }, 500);
						// 	// console.log(this.activeLink);
					}
					
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
			getInfos: 'getInfos',
			getCurrUser: 'getCurrUser',
			getCurrentLecture: 'content/getCurrentLecture',
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
		.activeBuyButton{
			height: 0;
			overflow: hidden;
			width: 0;
			opacity: 0;
		}
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
