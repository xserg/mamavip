<template>
  <div class="mainContainer">

		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Купить доступ</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap" v-if="getCurrUser.user.name !== null">
				<div class="infoWrap" v-if="this.getCatalogPrices && this.getCatalogPrices.length && this.getCatalogPrices !== 'e'">
					<h2 style="text-align:center;">Доступ ко всем материалам каталога</h2>
					
					<p style="text-align:center;margin-bottom:10px;">{{ getInfos.data.app_info[0].buy_page_description }} </p>
					<p class="important_message" style="text-align:center;"><span v-if="splitedCountDesc[0]">{{ splitedCountDesc[0] }} <strong>{{ getCatalogPrices[0].lectures_count }}</strong> {{ splitedCountDesc[1] }}{{ splitedCountDesc[2] }}{{ splitedCountDesc[3] }}</span></p>
					<br>
					<br>
					<div v-if="getCatalogPrices[0]">
						<div v-if="getCatalogPrices[0].is_promo == true">
							<span v-if="getCatalogPrices[0]" @click="buyCatalog(getCatalogPrices[0].period_length)" class="theButton buttonPrimary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCatalogPrices[0].price_for_catalog_promo) }}₽</span>
							<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[0]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="getCatalogPrices[0].is_promo == true && splitedEconomyDesc">{{ splitedEconomyDesc[0] }} {{ Math.round(getCatalogPrices[0].price_for_catalog - getCatalogPrices[0].price_for_catalog_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
						</div>
						<div v-else>
							<span v-if="getCatalogPrices[0]" @click="buyCatalog(getCatalogPrices[0].period_length)" class="theButton buttonPrimary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(getCatalogPrices[0].price_for_catalog) }}₽</span>
							<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[0]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }}</p>
						</div>
					</div>
					<br>
					<div v-if="getCatalogPrices[1]">
						<div v-if="getCatalogPrices[1].is_promo == true">
							<span v-if="getCatalogPrices[1]" @click="buyCatalog(getCatalogPrices[1].period_length)" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_2}}: {{ Math.round(getCatalogPrices[1].price_for_catalog_promo) }}₽</span>
							<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[1]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="getCatalogPrices[1].is_promo == true && splitedEconomyDesc">{{ splitedEconomyDesc[0] }} {{ Math.round(getCatalogPrices[1].price_for_catalog - getCatalogPrices[1].price_for_catalog_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
						</div>
						<div v-else>
							<span v-if="getCatalogPrices[1]" @click="buyCatalog(getCatalogPrices[1].period_length)" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_2}}: {{ Math.round(getCatalogPrices[1].price_for_catalog) }}₽</span>
							<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[1]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }}</p>
						</div>
					</div>
					<br>
					<div v-if="getCatalogPrices[2]">
						<div v-if="getCatalogPrices[2].is_promo == true">
							<span v-if="getCatalogPrices[2]" @click="buyCatalog(getCatalogPrices[2].period_length)" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(getCatalogPrices[2].price_for_catalog_promo) }}₽</span>
							<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[2]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="getCatalogPrices[2].is_promo == true && splitedEconomyDesc">{{ splitedEconomyDesc[0] }} {{ Math.round(getCatalogPrices[2].price_for_catalog - getCatalogPrices[2].price_for_catalog_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
						</div>
						<div v-else>
							<span v-if="getCatalogPrices[2]" @click="buyCatalog(getCatalogPrices[2].period_length)" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(getCatalogPrices[2].price_for_catalog) }}₽</span>
							<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[2]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }}</p>
						</div>
					</div>
					<br>

					<div class="usebabyconins_wrap" :class="{active: useBabyconins}" @click="switchBabyconins">
						<div class="checkbox_wrap"><!-- <input type="checkbox" name="yes_babycoins" class="checkbox" checked> --></div>
						<div class="the_title">На балансе <span style="font-weight:600;">{{ getCurrUser.user.ref.points_available }} бебикоинов</span>, использовать имеющиеся при оплате материалов.</div>
					</div>
					
				</div>

				<div v-else class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				
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
  name: 'CatalogPrices',
	components: {
  },

	data(){
		return{
			splitedButtonDesc: '',
			// hasElements: false,
			useBabyconins: false,
			splitedCountDesc: '',
		}
	},

	methods:{

		...mapMutations({
			setInfos: 'setInfos',
			setCatalogPrices: 'setCatalogPrices',
			setRouterAnimate: 'setRouterAnimate',
		}),


			buyCatalog(time){
				try{
					setTimeout( async () => {
						const headers = { 
							'Authorization': this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};

						if(this.useBabyconins && this.getCurrUser.user.ref.points_available > 0){
							var response = await axios.post('https://api.roddom15.ru/v1/lecture/all/buy/' + time, {ref_points: this.getCurrUser.user.ref.points_available}, { headers });
						}else{
							var response = await axios.post('https://api.roddom15.ru/v1/lecture/all/buy/' + time, {}, { headers });
						}
						
						window.open(response.data.link,"_self");
					}, 500 );
				} catch(e){
					console.log(e);
				} finally {}
		},

		loadStaticInfo(){
			try{
				setTimeout( async () => {
					const responseInfos = await axios.get('https://api.roddom15.ru/v1/app/info', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					});
					this.setInfos(responseInfos.data);
				}, 50 );
			}
			catch(e){} 
			finally {}
		},

		loadCatalogPrices(){
			try{
				setTimeout( async () => {
					const responseCatalogPrices = await axios.get('https://api.roddom15.ru/v1/lecture/all/prices', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  this.setCatalogPrices('e') } });
					
					if(responseCatalogPrices && responseCatalogPrices.data){
							this.setCatalogPrices(responseCatalogPrices.data);
					}else{
						const emptyArray = [];
						this.setCatalogPrices(emptyArray);
					}
					
				}, 50 );
			}
			catch(e){} 
			finally {}
		},


		splitDesc(buttonDesc){
			this.splitedButtonDesc = buttonDesc.split('x');
		},

		splitCountDesc(countDesc){
			this.splitedCountDesc = countDesc.split('x');
		},

		splitEconomy(economyDesc){
			this.splitedEconomyDesc = economyDesc.split('x');
		},

		switchBabyconins(){
			if(this.useBabyconins){
				this.useBabyconins = false;
			}else{
				this.useBabyconins = true;
			}
		},

	},

	


	computed:{
		...mapState({
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			getInfos: 'getInfos',
			getCatalogPrices: 'getCatalogPrices', 
			currentCategory: 'content/currentCategory',
			currentSubCategory: 'content/currentSubCategory',
		}),
	},

	mounted(){
		this.loadStaticInfo();
		this.loadCatalogPrices();
		this.splitDesc(this.getInfos.data.app_info[0].buy_page_under_btn_description);
		this.splitCountDesc(this.getInfos.data.app_info[0].chosen_category_contains_lectures);
		this.splitEconomy(this.getInfos.data.app_info[0].your_profit_is_roubles);
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
		.important_message{
			color: #ff3d6f;
			background: #fef5f6;
			width: max-content;
			margin: 10px auto 5px;
			padding: 8px 26px;
			border-radius: 8px;
		}
		.contentSubWrap{
			padding: 32px 16px;
			.usebabyconins_wrap{
				margin-top: 20px;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all .26s ease;
				cursor: pointer;
				&:hover{
					opacity: .92;
				}
				&.active .checkbox_wrap::before{
					opacity: 1;
				}
				.checkbox_wrap{
					display: block;
					position: relative;
					width: 15px;
					height: 15px;
					min-width: 15px;
					border-radius: 4px;
					background-color: #FFEAEB;
					border: 1px solid #f9b2b7;
					margin-right: 8px;
					&::before{
						opacity: 0;
						transition: all .14s ease;
						content: '';
						display: block;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						position: absolute;
						background-image: url('../assets/icons/done2.svg');
						background-repeat: no-repeat;
						background-position: center;
						background-size: contain;
					}
					// input{
					// 	width: 0;
					// 	height: 0;
					// }
				}
				.the_title{
					line-height: 125%;
					display: block;
					font-size: 13px;
					color: rgb(87, 87, 87);
				}
			}
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
