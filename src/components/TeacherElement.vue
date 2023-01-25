<template>

	<div class="the_element marginB12">
		<div class="the_element_box">
			<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
			<img v-if="teacher.preview" :src="teacher.preview" alt="element">
		</div>
		<span class="the_title fontSize14 fontFamilyB">{{ teacher.title }}</span>
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
	// padding: 0 18px;
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
		width: calc(100% - 36px);
		padding-top: calc(100% - 36px);
		z-index: 10;
		border-radius: 50%;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #FFEAEB;
		border-radius: 50%;
		margin-right: 12px;
		background-image: url('../assets/icons/nophoto.svg');
		background-size: 35%;
		margin-left: auto;
		margin-right: auto;
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
		padding: 0 8px;
		position: relative;
		overflow: hidden;
		&::before{
			content: '';
			width: 16px;
			position: absolute;
			display: block;
			right: 0;
			bottom: 0;
			height: 100%;
			background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
			background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(255,255,255,1)));
			background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
			background: -o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
			background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
			background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
		}
	}
}



/* -------- @media ----------- */

@media screen and (max-width: 480px) {

}


</style>
