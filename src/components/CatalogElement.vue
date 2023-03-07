<template>

	<div class="the_element marginB12" @mousedown="handleMouseDown" @click="handleClick">  
		<!-- @mousedown="handleMouseDown(event)" -->
		<div class="the_element_box">
			<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
			<img v-if="post.preview_picture" :src="post.preview_picture" alt="element">
			<span class="post_noimg" v-else ></span>
		</div>
		<span class="the_title fontSize16 fontFamilyEB">{{ post.title }}</span>
		<!-- <span class="the_title fontSize14 fontFamilyEB">Короткий заголовок у элемента</span> -->
	</div>
	
	
</template>


<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import router from "@/router/router"; 

export default({

	name: 'CatalogElement', 

	props: {
		post: {
			type: Object,
			requiered: true
		}
	},

	data(){
		return{
			startX: 0,
			// post: {},
		}
	},

	methods:{

		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
			setCurrentCategory: 'content/setCurrentCategory',
			setCurrentCategoryElements: 'content/setCurrentCategoryElements',
		}),
		...mapActions({
      fetchCategoryElements: 'content/fetchCategoryElements',
    }),

		routeToElement(){
			router.push('/catalog/category');
		},

		handleMouseDown(event){
      this.startX = event.screenX;
    },

		handleClick(event){

			// console.log(event.screenX);
    	const delta = Math.abs(event.screenX - this.startX);
			if (delta > 10) {
				// console.log('Сработал свайп');
			}else{
				this.setRouterAnimate();
				setTimeout(() => {
					this.routeToElement();
				}, 50);
				this.setCurrentCategory(this.post);
				this.fetchCategoryElements(this.post.slug);
				// this.setCurrentCategoryElements($post.slug);
				// console.log(this.post);
			}
			this.startX = 0;

		},
		

	},

});
</script>


<style lang="scss" scoped>

.the_element{
	display: block;
	width: 100%;
	position: relative;
	cursor: pointer;
	transition: all .24s ease;
	&:hover{
		opacity: 1;
	}
	.the_element_box{
		border: 1px solid rgba(35, 41, 45, 0.1);
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 6px;
		position: relative;
		height: 0;
		width: 100%;
		padding-top: 130%;
		z-index: 10;
		img{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			margin-bottom: 6px;
		}
		.post_noimg{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			display: block;
			background-color: #f2f2f2;
		}
	}
	.the_title{
		display: block;
		color: #23292D;
	}
}



/* -------- @media ----------- */

@media screen and (max-width: 480px) {

}


</style>
