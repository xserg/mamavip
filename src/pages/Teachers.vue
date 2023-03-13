<template>
  <div class="mainContainer teachersContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.push('/')" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Наши лекторы</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap" v-if="teachersList.data">
				<teacher-element class="the_element" v-for="teacher in teachersList.data" :key="teacher" :teacher="teacher" />
			</div>
			<div v-else class="roller_box">
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import TeacherElement from '@/components/TeacherElement';
// import { HTTP } from '@/http-common';

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Teachers',

	data(){
		return{
			errors: [],
		}
	},


	components: {
		TeacherElement,
		// HTTP,
  },


	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
      fetchPosts: 'content/fetchPosts'
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),
		...mapActions({
      fetchLectors: 'content/fetchLectors'
    }),

		copyLink(){
			console.log('Скопировано');
		},


	},


	computed:{
		...mapState({
			posts: state => state.content.posts,
		}),
		...mapGetters({
			// recommendationElement: 'content/recommendationElement',
			// catalogList: 'content/catalogList',
			// notViewList: 'content/notViewList',
			teachersList: 'content/teachersList', 
		}),
	},


	mounted() {
    this.fetchLectors();
  },

	// created() {
  //   HTTP.get(`categories`)
  //   .then(response => {
  //     this.info = response.data;
	// 		console.log(this.info);
  //   })
  //   .catch(e => {
  //     this.errors.push(e)
  //   })
  // }


}
</script>


<style lang="scss">

.mainContainer.teachersContainer{
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
			.the_element{
				width: 100%;
				min-width: 100%;
				margin-bottom: 10px;
				height: auto;
				.the_element_box{
					width: 60%;
					min-width: 60%;
					padding-top: 60%;
					margin-bottom: 8px;
				}
				.the_title::before{
					display: none;
				}
			}
		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 550px) {

	.mainContainer.teachersContainer{
		.contentWrap{
			.contentSubWrap{
				grid-template-columns: repeat(2,1fr);
			}
		}
	}

}

</style>
