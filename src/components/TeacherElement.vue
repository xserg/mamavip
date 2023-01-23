<template>

	<div class="the_element marginB12">
		<div class="the_element_box">
			<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
			<img :src="teacher.preview" alt="element">
		</div>
		<span class="the_title fontSize14 fontFamilyEB">{{ teacher.title }}</span>
		<!-- <span class="the_title fontSize14 fontFamilyEB">Короткий заголовок у элемента</span> -->
	</div>
	
	
</template>


<script>
export default({

	name: 'TeacherElement', 

	props: {
		teacher: {
			type: Object,
			requiered: true
		}
	},

	data(){
		return{
			// post: {},
		}
	},

});
</script>


<style lang="scss" scoped>

.the_element{
	width: 100%;
	position: relative;
	cursor: pointer;
	transition: all .24s ease;
	padding: 0 18px;
	margin-bottom: 0;
	// &:hover{
	// 	opacity: .86;
	// }
	.the_element_box{
		border: 1px solid rgba(35, 41, 45, 0.1);
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 4px;
		position: relative;
		height: 0;
		width: 100%;
		padding-top: 100%;
		z-index: 10;
		border-radius: 50%;
		img{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}
	.the_title{
		display: block;
		color: #23292D;
		text-align: center;
	}
}



/* -------- @media ----------- */

@media screen and (max-width: 480px) {

}


</style>
