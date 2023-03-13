<template>

	<agile 
	:class="{active: sliderLoaded}"
	@before-change="lockHeight()"
	@after-change="unlockHeight()"
	:options="sliderOptions" :speed="400" :throttleDelay="100" :swipeDistance="10" :timing="'ease-in-out'" class="theSlider">
		<element 
			v-for="post in posts"
			:post="post"
			:key="post.id"
		/>
	</agile>
	
</template>


<script>
import {mapMutations} from 'vuex';
import { VueAgile } from 'vue-agile'

import Element from '@/components/Element';


export default({

	name: 'Slider',
	components: {
		Element,
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
			sliderLoaded: false, 
			sliderOptions: {
				dots: false,
				navButtons: false,
				slidesToShow: 1.5,
				responsive: [
					{
						breakpoint: 600,
						settings: {
								slidesToShow: 2.2
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
