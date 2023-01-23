<template>

	<agile :options="sliderOptions" class="theSlider">
		<element 
			v-for="post in posts"
			:post="post"
			:key="post.id"
		/>
	</agile>
	
</template>


<script>
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

});
</script>


<style lang="scss">


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
