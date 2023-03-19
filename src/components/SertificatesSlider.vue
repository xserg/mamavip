<template>

	<agile
	@before-change="lockHeight()"
	@after-change="unlockHeight()"
	ref="sertificatesSlider" :options="sliderOptions" :speed="400" :throttleDelay="100" :swipeDistance="10" :timing="'ease-in-out'" 
	class="theSlider"
	:class="{active: listLoaded}"
	>
		<sertificate-element 
			v-for="post in posts" 
			:post="post"
			:key="post.id"
			@showElement="$emit('showElement', post)"
		/>
	</agile>
	
</template>


<script>
import {mapMutations} from 'vuex'; 
import { VueAgile } from 'vue-agile'

import SertificateElement from '@/components/SertificateElement';


export default({

	name: 'SertificatesSlider',
	components: {
		SertificateElement,
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
			listLoaded: false,
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


	methods: {
		...mapMutations({
			lockHeight: 'lockHeight',
			unlockHeight: 'unlockHeight',
		}),
		goLoadList(){
			setTimeout( async () => {
			this.listLoaded = true;
			}, 500);
		},
	},

	mounted(){
		this.goLoadList();
	},

});
</script>


<style lang="scss" scoped>


.theSlider{
	// margin-bottom: 12px;
	transition: all .45s cubic-bezier(1, -0.15, 0.63, 0.99);
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
