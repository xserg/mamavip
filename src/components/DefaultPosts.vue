<template>
	<default-post-form @create="createNewPost"></default-post-form>
	<default-post-list :posts="posts"></default-post-list>
</template>

<script>

import DefaultPostForm from '@/components/DefaultPostForm.vue'
import DefaultPostList from '@/components/DefaultPostList.vue'

export default {
	components: {
		DefaultPostForm, DefaultPostList,
	},
  name: 'DefaultPosts',

	data(){
		return{
			posts: [
				{id: 1, title: 'Пост №1', description: 'Описание поста №1'},
				{id: 2, title: 'Пост №2', description: 'Описание поста №2'},
			],	
		}
	},
	methods: {
		createNewPost(newPost){
			 const thePost = {
				id: newPost.id,
				title: newPost.title,
				description: newPost.desc,
			}
			this.posts.push(thePost);
		}
	},
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.post_creater{
	margin: 0 auto;
	flex-direction: column;
	display: flex;
	width: 100%;
	max-width: 320px;
	input{
		background-color: #f5f5f5;
		border: none;
		color: #333;
		padding: 10px 15px;
		&::placeholder{
			color: #aaaaaa;
		}
	}
	.submit{
		padding: 10px 15px;
		border: none;
		width: max-content;
		background-color: #333;
		color: #fff;
	}
}


</style>
