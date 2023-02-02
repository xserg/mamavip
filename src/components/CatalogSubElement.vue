<template>

	<router-link to="/catalog/category/subcategory" class="the_subcategory" @click="setRouterAnimate">
		<div class="the_subcategory_wrap">
			<div class="the_subcategory_subwrap">
				<div class="the_subcategory_box">
					<div class="bottom_line fontFamilyEB">Название подкатегории</div>
				</div>
			</div>
		</div>
	</router-link>
	
	
</template>


<script>
import {mapMutations} from 'vuex';
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
    }),
	},

});
</script>


<style lang="scss" scoped>

.the_subcategory{
	padding-top: 12px;
	overflow: hidden;
	border-radius: 12px 12px 12px 12px;
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
			background-image: url('./../assets/images/subcategory.jpg');
			border-radius: 12px;
			padding-top: 15.4%;
			padding-bottom: 8px;
			
			// overflow: hidden;
			.bottom_line{
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				padding: 12px;
				color: #FD7C84;
				font-size: 14px;
			}
		}
		

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 480px) {

}


</style>
