<template>

	<agile :options="sliderOptions" :speed="400" :throttleDelay="100" :swipeDistance="10" :timing="'ease-in-out'" class="theSlider">
		<div 
			v-for="post in posts"
			:post="post"
			:key="post.id"
			class="the_slide"
		>
			<div class="the_slide_box"> 
				<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
				<img :src="post.preview" alt="element">
			</div>
		</div>
	</agile>
	
</template>


<script>
import { VueAgile } from 'vue-agile'


export default({

	name: 'PopupSlider',
	components: {
		agile: VueAgile,
	},
	
	props: {
		posts: {
			type: Array,
			required: true,
		}
	},

	data(){
		return{

			sliderOptions: {
				// swipeDistance: 20,
				// timing: 'ease-out',
				// infinite: false,
				dots: false,
				navButtons: false,
				slidesToShow: 1,
				responsive: [
				{
						breakpoint: 350,
						settings: {
								slidesToShow: 1
						}
					},
					{
						breakpoint: 550,
						settings: {
								slidesToShow: 1
						}
					},
					{
						breakpoint: 1000,
						settings: {
								// navButtons: true
						}
					}
				]
			},

		}
	},

});
</script>


<style lang="scss" scoped>


.theSlider{
	// margin-bottom: 12px;
	.the_slide{
		display: block;
		width: 100%;
		position: relative;
		cursor: pointer;
		transition: all .24s ease;
		&:hover{
			opacity: 1;
		}
		.the_slide_box{
			overflow: hidden;
			margin-bottom: 4px;
			position: relative;
			height: 100%;
			width: 100%;
			z-index: 10;
			img{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				object-fit: contain;
				display: block;
			}
		}
		.the_title{
			display: block;
			color: #23292D;
		}
	}

}





/* -------- @media ----------- */

@media screen and (max-width: 480px) {


}

</style>
