<template>
  <div class="mainContainer catalogContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Каталог лекций</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">
				<catalog-element 
					v-for="post in catalogList.data"
					:post="post"
					:key="post.id"
				/>
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
// import TeacherElement from '@/components/TeacherElement';
import CatalogElement from '@/components/CatalogElement';

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

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
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),
		...mapActions({
      fetchCatalog: 'content/fetchCatalog'
    }),

		copyLink(){
			console.log('Скопировано');
		},

	},


	computed:{
		...mapState({
		}),
		...mapGetters({
			// recommendationElement: 'content/recommendationElement',
			catalogList: 'content/catalogList',
			// teachersList: 'content/teachersList',
			// notViewList: 'content/notViewList',
		}),
	},

	mounted() {
    this.fetchCatalog();
  },
}
</script>


<style lang="scss">

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
