<template>
  <div class="mainContainer">

		<div class="contentWrap" v-if="posts.length > 0">

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/profile"></router-link>
				<h1 class="theTitle alignCenter">Сохранённые</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<elements-list 
				class="contentSubWrap"
				:posts="posts"
			></elements-list>
<!-- 
			<div class="contentSubWrap empty_wrap flexWrap" >
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет просмотренных лекций</span>
				<span class="theButton buttonPrimary buttonOptimal">Искать лекции</span>
			</div> -->

			<bottom-line></bottom-line>
			
		</div>




		<div class="contentWrap centered" v-else>

			<div class="topLine flexWrap">
				<router-link class="theButton leftButton buttonTransparent buttonBack" to="/profile"></router-link>
				<h1 class="theTitle alignCenter">Сохранённые</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap empty_wrap flexWrap">
				<img class="the_img" src="./../assets/images/emptyState.png" alt="img">
				<span class="the_title fontFamilyEB">Нет сохранённых лекций</span>
				<p class="the_desc fontSize14">Сохраняйте лекции, чтобы вернуться к ним в любой момент</p>
				<router-link class="theButton buttonPrimary buttonOptimal" to="/" @click="this.setHomeTab()">Искать лекции</router-link>
			</div>

			<bottom-line></bottom-line>

		</div>



	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import ElementsList from '@/components/ElementsList';

import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
  name: 'ProfileSaved',
	components: {
		ElementsList,
  },

	data(){
		return{
			hasElements: true,
			posts: [
			// {
			// 	id: '1',
			// 	title: 'Компонент',
			// 	preview: 'https://images.unsplash.com/photo-1673960508121-3407ffa4bb15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80'
			// },
			// {
			// 	id: '2',
			// 	title: 'Компонент',
			// 	preview: 'https://images.unsplash.com/photo-1673960508121-3407ffa4bb15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80'
			// }
		],

		}
	},

	methods:{

		...mapMutations({
			setLogPage: 'setLogPage',
			setAuthOut: 'setAuthOut',
			setHomeTab: 'setHomeTab',
			// hiddenPopup: state => state.hiddenPopup, // какой-то старый не рабочий вариант подключения мутаций из vuex
		}),

		methods: {
			deleteElement(post){
				console.log('Имитация удаления элемента: ID ' + post.id)
				// this.posts = this.posts.filter(p => p.id !== post.id)
			},
		},


		computed:{
		...mapState({
			// curFilter: state => state.content.curFilter,
		// 	posts: state => state.post.posts,
		// 	isPostsLoading: state => state.post.isPostsLoading,
		// 	selectedSort: state => state.post.selectedSort,
		// 	searchQuery: state => state.post.searchQuery,
		// 	page: state => state.post.page,
		// 	limit: state => state.post.limit,
		// 	totalPages: state => state.post.totalPages,
		// 	sortOptions: state => state.post.sortOptions,
		}),
		...mapGetters({
			// sortedPosts: 'post/sortedPosts',
			sortedElementsSaved: 'content/sortedElementsSaved',
		}),
	},

	},



	// computed:{
	// 	...mapState({
	// 		isAuth: state => state.isAuth,
	// 	}),
	// },
}
</script>


<style lang="scss" scoped>

.mainContainer{
	height: 100vh;
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;

		&.centered{
			justify-content: center;
			align-items: center;
		}

		.contentSubWrap{
			width: 100%;
			// padding: 16px 0px;
			// padding: 0;
			// background-color: #F3F5F6;
			&.elements_wrap{
			}

			&.empty_wrap{
				padding-top: 45px;
    		padding-bottom: 48px;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				max-width: 480px;
				.the_img{
					width: 100%;
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
