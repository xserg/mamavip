<template>

	<agile :options="sliderOptions" :speed="400" :throttleDelay="100" :swipeDistance="10" :timing="'ease-in-out'" class="theSlider">
		<teacher-element 
			v-for="teacher in teachers"
			:teacher="teacher"
			:key="teacher.id"
		/>
	</agile>
	
</template>


<script>
import { VueAgile } from 'vue-agile'

import TeacherElement from '@/components/TeacherElement';


export default({

	name: 'TeacherSlider',
	components: {
		TeacherElement,
		agile: VueAgile,
	},
	
	props: {
		teachers: {
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
				slidesToShow: 2.2,
				responsive: [
				{
						breakpoint: 350,
						settings: {
								slidesToShow: 3.2
						}
					},
					{
						breakpoint: 550,
						settings: {
								slidesToShow: 3.4
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
		.top_line{
			padding: 8px 16px;
		}
	}
}





/* -------- @media ----------- */

@media screen and (max-width: 480px) {


}

</style>
