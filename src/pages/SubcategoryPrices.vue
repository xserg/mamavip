<template>
  <div class="mainContainer">

		<div class="contentWrap" style="min-height:calc(100vh - 45px);">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Купить доступ</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>


			<div class="topLine flexWrap popupWrap" v-if="popupInfo">
				<a @click="switchPopupInfo(false, '')" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Оплата</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div> 

			<div class="contentSubWrap popupWrap" :class="{active_popup: popupInfo}" v-show="popupInfo">
				<div class="infoWrap ">
					<span class="blockWrap marginB12"></span>
					<h2 class="alignCenter" style="margin-bottom:4px;">Выберите способ оплаты</h2>
					<img class="the_img" src="./../assets/images/emptyState.png" alt="bg">
				
					<!-- <h4 class="alignCenter" style="margin-top:20px;margin-bottom:20px;font-size:15px;"></h4> -->
					<span class="blockWrap theButton buttonPrimary buttonOptimal marginAuto" style="margin-top:20px;margin-bottom:16px;" @click="buyCategory(this.forBuy)">Оплата сразу</span>
					<span class="tinkoffButton blockWrap theButton buttonSecondary buttonOptimal marginAuto" :class="{disabled: this.forBuyPrice < getInfos.data.app_info[0].credit_minimal_sum }" @click="buyTinkoff(this.forBuy)">Оплата в рассрочку</span>
					<span class="tinkoff_info alignCenter buttonOptimal marginAuto" style="font-size:13px;margin-top:12px;color:#2C3F51;" v-if="this.forBuyPrice < getInfos.data.app_info[0].credit_minimal_sum">Рассрочка доступна при оформлении заказа от {{getInfos.data.app_info[0].credit_minimal_sum}} рублей.</span>
					
					<div class="special_option marginAuto">
						<span class="the_desc alignCenter">{{ this.getInfos.data.app_info[0].category_special_price_text }}</span>
						<span class="theButton buttonSecondary" @click="buySubCategoryCategory(), setRouterAnimate()">Купить весь курс</span>
					</div>

				</div>
			</div>



			<div class="contentSubWrap" :class="{active_popup: popupInfo}" v-if="getCurrUser.user.name !== null">
				<div class="infoWrap">
					<h2>{{ currentSubCategory.title }}</h2>

					<div class="content_box info_box marginB12">
						<div class="video_wrap">
							<img class="video_preview" v-if="currentSubCategory.preview_picture && currentSubCategory.preview_picture !== ''" :src="currentSubCategory.preview_picture ? 'https://api.roddom1.vip/storage/' + currentSubCategory.preview_picture : ''" alt="preview" />
						</div>
					</div>

					<p style="text-align:center;margin-bottom:10px;">{{ getInfos.data.app_info[0].buy_page_description }} </p>
					<p class="important_message" style="text-align:center;">{{ splitedCountDesc[0] }} <strong>{{ currentSubCategory.lectures_count }}</strong> {{ splitedCountDesc[1] }}{{ splitedCountDesc[2] }}{{ splitedCountDesc[3] }} <br><span v-if="currentSubCategory.prices[0] && currentSubCategory.prices[0].discount.already_purchased_count > 0">У вас уже есть доступ к <strong>{{ currentSubCategory.prices[0].discount.already_purchased_count }}</strong> материалу(ам), будет приобретено <strong>{{ Number(currentSubCategory.lectures_count - currentSubCategory.prices[0].discount.already_purchased_count) }}</strong> недостающий(их).</span></p>
					<br>
					<br>
					<div v-if="currentSubCategory.is_promo == true">
					<span v-if="currentSubCategory.prices[0]" @click="switchPopupInfo(true, this.getInfos.data.app_periods[0], Math.round(currentSubCategory.prices[0].price_for_category_promo), 0)" class="theButton buttonPrimary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(currentSubCategory.prices[0].price_for_category_promo) }}₽</span>
					<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[0]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="currentSubCategory.is_promo == true">{{ splitedEconomyDesc[0] }} {{ Math.round(currentSubCategory.prices[0].price_for_category - currentSubCategory.prices[0].price_for_category_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
					</div>
					<div v-else>
					<span v-if="currentSubCategory.prices[0]" @click="switchPopupInfo(true, this.getInfos.data.app_periods[0], Math.round(currentSubCategory.prices[0].price_for_category), 0)" class="theButton buttonPrimary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_1}}: {{ Math.round(currentSubCategory.prices[0].price_for_category) }}₽</span>
					<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[0]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="currentSubCategory.is_promo == true">{{ splitedEconomyDesc[0] }} {{ Math.round(currentSubCategory.prices[0].price_for_category - currentSubCategory.prices[0].price_for_category_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
					</div>
					<br>
					<div v-if="currentSubCategory.is_promo == true">
					<span v-if="currentSubCategory.prices[1]" @click="switchPopupInfo(true, this.getInfos.data.app_periods[1], Math.round(currentSubCategory.prices[1].price_for_category_promo), 1)" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_2}}: {{ Math.round(currentSubCategory.prices[1].price_for_category_promo) }}₽</span>
					<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[1]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="currentSubCategory.is_promo == true">{{ splitedEconomyDesc[0] }} {{ Math.round(currentSubCategory.prices[1].price_for_category - currentSubCategory.prices[1].price_for_category_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
					</div>
					<div v-else>
					<span v-if="currentSubCategory.prices[1]" @click="switchPopupInfo(true, this.getInfos.data.app_periods[1], Math.round(currentSubCategory.prices[1].price_for_category),1 )" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_2}}: {{ Math.round(currentSubCategory.prices[1].price_for_category) }}₽</span>
					<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[1]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="currentSubCategory.is_promo == true">{{ splitedEconomyDesc[0] }} {{ Math.round(currentSubCategory.prices[1].price_for_category - currentSubCategory.prices[1].price_for_category_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
					</div>
					<br>
					<div v-if="currentSubCategory.is_promo == true">
					<span v-if="currentSubCategory.prices[2]" @click="switchPopupInfo(true, this.getInfos.data.app_periods[2], Math.round(currentSubCategory.prices[2].price_for_category_promo), 2)" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(currentSubCategory.prices[2].price_for_category_promo) }}₽</span>
					<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[2]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="currentSubCategory.is_promo == true">{{ splitedEconomyDesc[0] }} {{ Math.round(currentSubCategory.prices[2].price_for_category - currentSubCategory.prices[2].price_for_category_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
					</div>
					<div v-else>
					<span v-if="currentSubCategory.prices[2]" @click="switchPopupInfo(true, this.getInfos.data.app_periods[2], Math.round(currentSubCategory.prices[2].price_for_category), 2)" class="theButton buttonSecondary buttonOptimal marginAuto"><!--Купить -->{{getInfos.data.app_info[0].tarif_title_3}}: {{ Math.round(currentSubCategory.prices[2].price_for_category) }}₽</span>
					<p style="text-align:center;font-size:13px;margin-top:6px;display: block;max-width:380px;margin-left:auto;margin-right:auto;color:#575757">{{ splitedButtonDesc[0] }}<strong>{{getInfos.data.app_periods[2]}}</strong>{{ splitedButtonDesc[1] }}{{ splitedButtonDesc[2] }}{{ splitedButtonDesc[3] }}{{ splitedButtonDesc[4] }} <span v-if="currentSubCategory.is_promo == true">{{ splitedEconomyDesc[0] }} {{ Math.round(currentSubCategory.prices[2].price_for_category - currentSubCategory.prices[2].price_for_category_promo) }} {{ splitedEconomyDesc[1] }}{{ splitedEconomyDesc[2] }}{{ splitedEconomyDesc[3] }}</span></p>
					</div>
					<br>
					
				</div>

				<div class="usebabyconins_wrap" :class="{active: useBabyconins}" @click="switchBabyconins">
					<div class="checkbox_wrap"><!-- <input type="checkbox" name="yes_babycoins" class="checkbox" checked> --></div>
					<div class="the_title">На балансе <span style="font-weight:600;">{{ getCurrUser.user.ref.points_available }} бебикоинов</span>, использовать имеющиеся при оплате материалов. Доступно только при покупке материалов с оплатой сразу.</div>
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
import tinkoff from '@tcb-web/create-credit';
import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
  name: 'SubcategoryPrices',
	components: {
  },

	data(){
		return{
			forBuyPrice: 0,
			forBuyType: 99,
			popupInfo: false,
			splitedButtonDesc: '',
			splitedCountDesc: '',
			splitedEconomyDesc: '',
			// hasElements: false,
			useBabyconins: false,
		}
	},

	methods:{

		...mapMutations({
			setInfos: 'setInfos',
			setRouterAnimate: 'setRouterAnimate',
		}),

		buySubCategoryCategory(){
			// setTimeout( async () => {
			// 	this.fetchCurrentSubCategoryAndElements(this.getCurrentLecture.category_slug);
			// }, 500);
			this.$router.push('/catalog_prices/');
			// this.$router.push('/category_prices/');
		},


		switchPopupInfo(bool, data, price, type){
			this.popupInfo = bool;
			this.forBuy = data;
			this.forBuyPrice = price;
			this.forBuyType = type;
		},


		buyTinkoff(period){
			if(this.forBuyPrice >= this.getInfos.data.app_info[0].credit_minimal_sum){
				try{
					setTimeout( async () => {
						const headers = { 
							'Authorization': this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};
						var response = await axios.post('https://api.roddom1.vip/v1/category/' + this.currentSubCategory.id + '/buy/' + period + '/order', {}, { headers }).catch(function (error) { if (error.response.status !== 404){ console.log(error.response); } });
						
						if(response){
							// console.log('Успешная отработка:');
							// Приобретается материал по теме «Грудное вскармливание», сроком доступа на X дня(ей), Количество материалов X, Стоимость XXXXX рублей, Дополнительная скидка от приложения – ХХХХ рублей, Итого – ХХХХ рублей.
							//const title = 'Приобретается доступ ко всем материалам каталога'  + ', сроком доступа на ' + this.forBuy + ' дня(ей), Количество материалов ' + x + ', Стоимость ' + x + ' рублей, Дополнительная скидка от приложения – ' + x + ' рублей, Итого – ' + x + 'рублей.';
							const items_count = this.currentSubCategory.lectures_count;

							if(this.currentSubCategory.is_promo == true){
								var economy_price = Math.round(this.currentSubCategory.prices[this.forBuyType].price_for_category - this.currentSubCategory.prices[this.forBuyType].price_for_category_promo);
								var default_price = Number(this.forBuyPrice + economy_price);
								var final_price = Number(this.forBuyPrice + 0);
								
								var tinkoff_title = 'Приобретается материал по теме "' + this.currentSubCategory.title + '", сроком доступа на ' + this.forBuy + ' дня(ей), Количество материалов ' + items_count + ', Стоимость ' + default_price + ' рублей, Дополнительная скидка от приложения – ' + economy_price + ' рублей, Итого – ' + final_price + ' рублей.';
							}else{
								var final_price = Number(this.forBuyPrice + 0);
								var tinkoff_title = 'Приобретается материал по теме "' + this.currentSubCategory.title + '", сроком доступа на ' + this.forBuy + ' дня(ей), Количество материалов ' + items_count + ', Итого – ' + final_price + ' рублей.';
							}
							
							tinkoff.create({
								orderNumber: response.data[0],
								shopId: '99e38bba-6f25-4f10-b62a-4f05e32383b7',
								showcaseId: '3432f3d3-6b9d-407c-a793-a5ac9137c53d',
								items: [
									{name: tinkoff_title, price: final_price, quantity: 1},
								],
								sum: final_price
							});
						}else{



						
						// if(response){
						// 	// console.log('Успешная отработка:');
						// 	const title = 'Подкатегория "' + this.currentSubCategory.title + '" | На срок: ' + this.forBuy + ' дня(ей)';
						// 	const price = Number(this.forBuyPrice + 0);
						// 	tinkoff.create({
						// 		orderNumber: response.data[0],
						// 		shopId: '99e38bba-6f25-4f10-b62a-4f05e32383b7',
						// 		showcaseId: '3432f3d3-6b9d-407c-a793-a5ac9137c53d',
						// 		items: [
						// 			{name: title, price: price, quantity: 1},
						// 		],
						// 		sum: price
						// 	});
						// }else{
							// console.log('Ошибка отработки:');
							// console.log(response);
						}
					}, 500 );
				} catch(e){
					console.log(e);
				} finally {}
			}
		},


			buyCategory(time){
				try{
					setTimeout( async () => {
						const headers = { 
							'Authorization': this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'application/json',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						};

						if(this.useBabyconins && Number(this.getCurrUser.user.ref.points_available) > 0){
							var response = await axios.post('https://api.roddom1.vip/v1/category/' + this.currentSubCategory.id + '/buy/' + time, {ref_points: Number(this.getCurrUser.user.ref.points_available)}, { headers });
						}else{
							var response = await axios.post('https://api.roddom1.vip/v1/category/' + this.currentSubCategory.id + '/buy/' + time, {}, { headers });
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
					const responseInfos = await axios.get('https://api.roddom1.vip/v1/app/info', {
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
			currentSubCategory: 'content/currentSubCategory',
		}),
	},

	mounted(){
		this.loadStaticInfo();
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
			width: 100%;
			display: inline-block;
			margin: 10px auto 5px;
			padding: 8px 26px;
			border-radius: 8px;
		}

		.topLine.popupWrap{
			background-color: #FFF;
			width: 100%;
			z-index: 110;
			position: fixed;
			left: 0;
			top: 0;
		}
		.contentSubWrap.popupWrap{
			// min-height: calc(100vh - 45px);
			padding: 0;
			width: 100%;
			z-index: 105;
			position: absolute;
			left: 0; 
			top: 45px;
			background-color: #F3F5F6;
			background-color: #FFF;
			padding: 8px 16px;
			padding-bottom: 0px;
			&.active_popup{
				position: relative;
				top: auto;
				left: auto;
				height: auto;
				opacity: 1;
				visibility: visible;
			}
			.the_img{
				width: 56%;
				max-width: 480px;
				margin: 0 auto;
				display: block;
			}
			.infoWrap{}
			}
			.special_option{
				margin-top: 60px;
				height: auto;
				min-width: 288px;
    		max-width: 395px;
				display: flex;
				flex-direction: column;
				
				.the_desc{
					display: block;
					height: max-content;
					font-size: 13px;
					margin-bottom: 14px;
					color: rgb(44, 63, 81);
				}
				.theButton{
					width: 100%;
				}
			}
		.contentSubWrap{
			&.active_popup{
				height: 0;
				opacity: 0;
				visibility: hidden;
				overflow: hidden;
			}
			padding: 32px 16px;
			padding-bottom: 0;
			p{
				line-height: 150%;
			}
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
