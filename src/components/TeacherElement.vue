<template>

	<div class="the_element marginB12" @mousedown="handleMouseDown" @click="handleClick">
		<div class="the_element_box">
			<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
			<img v-if="filterTeacher.photo" :src="filterTeacher.photo ? filterTeacher.photo : ''" alt="element">
		</div>
		<!-- <h5 class="new_title">{{ teacher.name }}</h5> -->
		<div class="teacher_title fontFamilyB fontSize14" style="font-size:13px !important;">{{ filterTeacher.name }}</div>
		<!-- <span class="the_title fontFamilyB">{{ teacher.title }}</span> -->
		<!-- <span class="the_title fontSize14 fontFamilyEB">Короткий заголовок у элемента</span> -->
	</div>


</template>


<script>
import {mapMutations, mapActions} from 'vuex';
import router from "@/router/router";

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
			startX: 0,
			filterTeacher: {},
			// post: {},
		}
	},

	methods: {

		...mapMutations({
      setRouterAnimate: 'setRouterAnimate',
			setStatusLoading: 'content/setStatusLoading',
    }),
		...mapActions({
			fetchCurrentLector: 'content/fetchCurrentLector',
		}),

		routeToElement(){
			router.push('/lectors/' + this.teacher.id);
		},

		setTeacher(){
			this.filterTeacher = this.teacher;
		},

		handleMouseDown(event){
			this.startX = event.screenX;
		},

		handleClick(event){
			// console.log(event.screenX);
			const delta = Math.abs(event.screenX - this.startX);
			if (delta > 10) {
				// console.log('Сработал свайп');
			}else{
				// console.log('Сработал клик');
				this.setStatusLoading(true);
				this.fetchCurrentLector(this.teacher.id);
				this.setRouterAnimate();
				this.routeToElement();
			}
			this.startX = 0;
		},


	},

	mounted(){
		this.setTeacher();
	}

});
</script>


<style lang="scss" scoped>

.the_element{
	width: 100%;
	position: relative;
	cursor: pointer;
	transition: all .24s ease;
	height: 100%;
	// padding: 0 18px;
	margin-bottom: 0;
	// &:hover{
	// 	opacity: .86;
	// }
	.the_element_box{
		border: 1px solid rgba(35, 41, 45, 0.1);
		border: 2px solid #feabb029;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 4px;
		position: relative;
		height: 0;
		width: calc(100% - 42px);
		padding-top: calc(100% - 42px);
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

		width: 65%;
		min-width: 65%;
		padding-top: 65%;
		margin-bottom: 8px;

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
	.new_title{
		font-size: 14px;
	}
	.teacher_title{
		display: block;
		width: 100%;
		color: #23292D;
		text-align: center;
		// padding-left: 4px;
		// padding-right: 4px;
		width: calc(100% - 16px);
		margin-top: 8px;
		margin-left: auto;
		margin-right: auto;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		max-height: 2.2rem;
		line-height: 1.1rem;
		// font-size: .93rem;
		white-space: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
		// font-size: 12px !important;
		// &::before{
		// 	content: '';
		// 	width: 16px;
		// 	position: absolute;
		// 	display: block;
		// 	right: 0;
		// 	bottom: 0;
		// 	height: 100%;
		// 	background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
		// 	background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,255,255,0)), color-stop(100%, rgba(255,255,255,1)));
		// 	background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
		// 	background: -o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
		// 	background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
		// 	background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
		// }
	}
}



/* -------- @media ----------- */

@media screen and (max-width: 550px) {

.the_element{
	.teacher_title{
			max-height: 2.66rem;
			line-height: 1.33rem;
			font-size: 0.88rem !important;
	}
}

}


</style>
