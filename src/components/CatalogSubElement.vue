<template>

	<div class="the_subcategory" @mousedown="handleMouseDown" @click="handleClick">
		<div class="the_subcategory_wrap">
			<div class="the_subcategory_subwrap">
				<div class="the_subcategory_box">
					<img v-if="subCategory.preview_picture" :src="subCategory.preview_picture" alt="preview_image">
					<div class="bottom_line fontFamilyEB">{{ subCategory.title }}</div>
				</div>
			</div>
		</div>
	</div>
	
	
</template>


<script>
import {mapMutations, mapActions} from 'vuex';
import router from "@/router/router";  

export default({

	name: 'CatalogElement', 

	props: {
		subCategory: {
			type: Object,
			requiered: true
		}
	},

	data(){
		return{
			// post: {},
		}
	},

	methods:{
    ...mapMutations({
      setRouterAnimate: 'setRouterAnimate',
			// setCurrentSubCategory: 'content/setCurrentSubCategory',
			// setCurrentCategorySubElements: 'content/setCurrentSubCategoryElements',
    }),
		// ...mapActions({
    //   fetchSubCategoryElements: 'content/fetchSubCategoryElements',
    // }), 
		

		routeToElement(){
			router.push('/catalog/' + this.subCategory.parent_slug + '/' + this.subCategory.slug);
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
				// console.log('Кликнули по подкатегории');
				// this.setCurrentSubCategory(this.subCategory);
				// this.fetchSubCategoryElements(this.subCategory.id); 
				// console.log(this.subCategory); 
			}
			this.startX = 0;

		},


	},

});
</script>


<style lang="scss" scoped>

.the_subcategory{
	padding-top: 12px;
	overflow: hidden;
	border-radius: 12px 12px 12px 12px;
	cursor: pointer;
	.the_subcategory_wrap{
		width: 100%;
		background-color: #FEABB0;
		border-radius: 0px 12px 12px 12px;
		position: relative;
		padding-top: 12px;
		// overflow: hidden;
		.the_subcategory_subwrap{
			position: relative;
			// filter: drop-shadow(0px -1px 8px rgba(253, 124, 132, 0.7));
		}
		
		&::before{
			content: '';
			width: 100px;
			height: 12px;
			display: block;
			position: absolute;
			top: -11px;
			left: 0;
			background-size: contain;
			background-position: bottom;
			background-repeat: no-repeat;
			background-image: url('./../assets/icons/subcategory.svg');
		}
		.the_subcategory_box{
			border: 4px solid #FECBCE;
			background-color: #FECBCE;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			// background-image: url('./../assets/images/subcategory.jpg');
			border-radius: 12px;
			padding-top: 15.4%;
			padding-bottom: 8px;
			position: relative;
			overflow: hidden;
			background-color: #ffdee0;
			img{
				width: 104%;
				height: 104%;
				transform: translate(-50%, -50%);
				object-fit: cover;
				position: absolute;
				left: 50%;
				top: 50%;
				z-index: 5;
			}
			
			// overflow: hidden;
			.bottom_line{
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				padding: 12px;
				color: #FD7C84;
				font-size: 14px;
				position: relative;
				z-index: 10;
			}
		}
		

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 480px) {

}


</style>
