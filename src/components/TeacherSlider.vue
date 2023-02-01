<template>

	<agile 
	@before-change="lockHeight()"
	@after-change="unlockHeight()"
	:options="sliderOptions" :speed="300" :throttleDelay="100" :swipeDistance="10" :timing="'ease-in-out'" class="theSlider">
		<teacher-element 
			v-for="teacher in teachers"
			:teacher="teacher"
			:key="teacher.id"
		/>
	</agile>
	
</template>


<script>
import {mapMutations} from 'vuex';
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

	methods: {
		...mapMutations({
			lockHeight: 'lockHeight',
			unlockHeight: 'unlockHeight',
		}),
	},

	data(){
		return{

			sliderOptions: {
				// swipeDistance: 20,
				// timing: 'ease-out',
				// infinite: false,
				dots: false,
				navButtons: false,
				slidesToShow: 2.5,
				responsive: [
				{
						breakpoint: 350,
						settings: {
								slidesToShow: 2.85
						}
					},
					{
						breakpoint: 480,
						settings: {
								slidesToShow: 3.4
						}
					},
					{
						breakpoint: 550,
						settings: {
								slidesToShow: 3.8
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
		// font-size: 14px;
		.top_line{
			padding: 8px 16px;
		}
	}
}





/* -------- @media ----------- */

@media screen and (max-width: 550px) {


.theSlider{
	.the_element{
		// font-size: 12px; 
	}
}


}

</style>
