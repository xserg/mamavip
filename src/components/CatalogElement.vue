<template>

	<div class="the_element catalog_element marginB12" @mousedown="handleMouseDown" @click="handleClick">  
		<!-- @mousedown="handleMouseDown(event)" -->
		<div class="the_element_box">
			<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
			<img v-if="filterCatalogElement.preview_picture" :src="filterCatalogElement.preview_picture ? 'https://api.xn--80axb4d.online/storage/' + filterCatalogElement.preview_picture : ''" alt="element">
			<span class="post_noimg" v-else ></span>
		</div>
		<div class="the_title fontSize16 fontFamilyEB" style="font-size:15px !important;">{{ filterCatalogElement.title }}</div> 
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
			filterCatalogElement: {},
			// post: {},
		}
	},

	methods:{

		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
			setCurrentCategory: 'content/setCurrentCategory',
			setCurrentCategoryElements: 'content/setCurrentCategoryElements',
		}),
		// ...mapActions({
    //   fetchCategoryElements: 'content/fetchCategoryElements',
    // }),

		setCatalogElement(){
			this.filterCatalogElement = this.post;
		},

		routeToElement(){
			router.push('/catalog/' + this.post.slug);  
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
				// this.setCurrentCategory(this.post);
				//ПОКАТЕГОИИИИИИИИ
				// this.fetchCategoryElements(this.post.slug);
				// this.setCurrentCategoryElements($post.slug);
				// console.log(this.post);
			}
			this.startX = 0;

		},
		

	},

	mounted(){
		this.setCatalogElement();
	},

});
</script>


<style lang="scss" scoped>

.the_element.catalog_element{
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
		font-size: 0.96rem !important;
		line-height: 120%;
		font-weight: 600;
	}
}



/* -------- @media ----------- */

@media screen and (max-width: 550px) {

	.the_element.catalog_element{
		.the_title{
			max-height: 2.66rem;
			line-height: 1.33rem;
			font-size: 0.93rem !important;
		}
	}
}


</style>
