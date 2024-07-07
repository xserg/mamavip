<template>
  <div class="mainContainer catalogContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.push('/'), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Каталог лекций</h1>
				<!-- <button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button> -->
				<router-link to="/search" @click="setRouterAnimate" class="theButton rightButton buttonTransparent fontFamilyB buttonSearch"></router-link>
			</div>

			<div class="contentSubWrap">
				<catalog-element
					v-for="post in catalogList.data"
					:post="post"
					:key="post.id"
				/>

			</div>
			<div v-if="getCatalogPrices[0] && getCatalogPrices[1] && getCatalogPrices[2]" class="contentSubWrap content_box info_box marginB12">
				<div v-if="getCatalogPrices[0].price_for_catalog == 0 && getCatalogPrices[1].price_for_catalog == 0 && getCatalogPrices[0].price_for_catalog == 0"></div>
				<span v-else class="theButton buttonPrimary buttonOptimal marginAuto marginB12" @click="$router.push('/catalog_prices/'), setRouterAnimate()">{{ getInfos.data.app_info[0].buy_all }}</span>
			</div>

			<!-- <bottom-line></bottom-line> -->

		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
// import TeacherElement from '@/components/TeacherElement';
import axios from 'axios';
import CatalogElement from '@/components/CatalogElement';

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

import base from "@/base";

export default {
  name: 'Catalog',

	data(){
		return{
			// profileIsFill: true,
		}
	},


	components: {
		CatalogElement,
		// TeacherElement,
    // DefaultLikes,
  },


	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
			setRouterAnimate: 'setRouterAnimate',
			setCatalogPrices: 'setCatalogPrices',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),
		...mapActions({
      fetchCatalog: 'content/fetchCatalog'
    }),

		copyLink(){
			console.log('Скопировано');
		},


		loadCatalogPrices(){
			try{
				setTimeout( async () => {
					const responseCatalogPrices = await axios.get(base.API_URL + '/lecture/all/prices', {
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

	},


	computed:{
		...mapState({
		}),
		...mapGetters({
			getCurrUser: 'getCurrUser',
			getInfos: 'getInfos',
			// recommendationElement: 'content/recommendationElement',
			getCatalogPrices: 'getCatalogPrices',
			catalogList: 'content/catalogList',
			// teachersList: 'content/teachersList',
			// notViewList: 'content/notViewList',
		}),
	},

	mounted() {
    this.fetchCatalog();
		this.loadCatalogPrices();
  },
}
</script>


<style lang="scss" scoped>

.mainContainer.catalogContainer{
	height: 100vh;
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;
		.contentSubWrap{
			width: 100%;
			padding: 16px;
			// background-color: #F3F5F6;
			display: grid;
			// -ms-grid-columns: 1fr[2];
			grid-template-columns: repeat(3,1fr);
			grid-gap: 12px;
			// flex-wrap: wrap;
			&.content_box{
				display: flex;
				width: 100%;
			}
		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 550px) {

	.mainContainer.catalogContainer{
		.contentWrap{
			.contentSubWrap{
				grid-template-columns: repeat(2,1fr);
			}
		}
	}

}

</style>
