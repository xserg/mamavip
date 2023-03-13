<template>

	<agile 
		:class="{active: sliderLoaded}"
		:options="sliderOptions" 
		:speed="400" 
		:throttleDelay="100" 
		:swipeDistance="10" 
		:timing="'ease-in-out'" 
		@before-change="lockHeight()"
		@after-change="unlockHeight()"
		class="theSlider">
		<catalog-element 
			v-for="post in posts"
			:post="post"
			:key="post.id"
		/>
	</agile>
	
</template>


<script>

import {mapMutations} from 'vuex'; 
import { VueAgile } from 'vue-agile';

import CatalogElement from '@/components/CatalogElement';


export default({ 

	name: 'CatalogSlider',
	components: {
		CatalogElement,
		agile: VueAgile,
	},
	
	props: {
		posts: {
			type: Array,
			required: true,
		}
	},

	methods: {
		...mapMutations({
			lockHeight: 'lockHeight',
			unlockHeight: 'unlockHeight',
		}),
		goLoadSlider(){
			setTimeout( async () => {
			this.sliderLoaded = true;
			}, 500);
		},
	},


	// computed:{
	// 	...mapState({
	// 		heightLock: state => state.heightLock,
	// 	}),
	// },



	data(){
		return{
			sliderLoaded: false, 
			sliderOptions: {
				// swipeDistance: 20,
				// timing: 'ease-out',
				// infinite: false,
				dots: false,
				navButtons: false,
				slidesToShow: 1.6,
				responsive: [
				{
						breakpoint: 350,
						settings: {
								slidesToShow: 2.25
						}
					},
					{
						breakpoint: 550,
						settings: {
								slidesToShow: 3.2
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


	mounted(){
		this.goLoadSlider();
	},


});
</script>


<style lang="scss" scoped>


.theSlider{
	margin-bottom: 12px;
	transition: all .45s cubic-bezier(1, -0.15, 0.63, 0.99);;
	opacity: 0;
	&.active{
		opacity: 1;
	}
	.the_element{
		padding: 0 6px;
		.top_line{
			padding: 8px 16px;
		}
	}
}





/* -------- @media ----------- */

@media screen and (max-width: 480px) {


}

</style>
