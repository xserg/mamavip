<template>
  <div class="mainContainer teachersContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/"></router-link>
				<h1 class="theTitle alignCenter">Наши лекторы</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">
				<teacher-element class="the_element" v-for="teacher in teachersList" :key="teacher" :teacher="teacher" />
			</div>

			<bottom-line></bottom-line>
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import TeacherElement from '@/components/TeacherElement';

import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
  name: 'Teachers',

	data(){
		return{
			// profileIsFill: true,
		}
	},


	components: {
		TeacherElement,
    // DefaultLikes,
  },


	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
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
			// catalogList: 'content/catalogList',
			teachersList: 'content/teachersList',
			// notViewList: 'content/notViewList',
		}),
	},
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
				.the_element_box{
					width: 60%;
					min-width: 60%;
					padding-top: 60%;
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
