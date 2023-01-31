<template>

	<agile 
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
	},


	// computed:{
	// 	...mapState({
	// 		heightLock: state => state.heightLock,
	// 	}),
	// },



	data(){
		return{

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

});
</script>


<style lang="scss" scoped>


.theSlider{
	margin-bottom: 12px;
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
