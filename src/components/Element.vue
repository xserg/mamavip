<template>

	<div class="the_element marginB12" @mousedown="handleMouseDown" @click="handleClick">
		<div class="info_line flexWrap">
			<div class="icons flexWrap">
				<span class="viewed blockWrap" :class="{hiddenWrap: post.list_watched !== 1 }"></span>
				<!-- <span class="bought blockWrap" :class="{hiddenWrap: !getCurrUser.user.purchased_lectures.find(item => item.id === post.id )}"></span> -->
				<span class="premium blockWrap" :class="{hiddenWrap: post.is_free == 1 }"></span>
			</div>
			<span class="download" v-if="post.content_type && post.content_type.type == 'pdf'"></span>
			<span class="download" v-if="post.content_type && post.content_type.title == 'pdf'"></span>
			<span class="play" v-if="post.content_type && post.content_type.type == 'embed'"></span>
			<span class="play" v-if="post.content_type && post.content_type.title == 'embed'"></span>
			<span class="play" v-if="post.content_type && post.content_type.type == 'kinescope'"></span>
			<span class="play" v-if="post.content_type && post.content_type.title == 'kinescope'"></span>
			<!-- <span @click="$emit('deleteElement', post)">Открыть</span> -->
		</div>
		<div class="the_element_box">
			<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
			<img v-if="post.preview_picture" :src="post.preview_picture ? 'https://api.roddom15.ru/storage/' + post.preview_picture : ''" alt="element">
			<span class="star" :class="{active: post.is_promo == 1}"></span>
		</div>
		<span class="the_title fontSize16 fontFamilyEB">{{ post.title }}</span>
		<!-- <span class="the_title fontSize14 fontFamilyEB">Короткий заголовок у элемента</span> -->
	</div>
	
	
</template>


<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import router from "@/router/router"; 
export default({

	name: 'Element', 

	props: {
		post: {
			type: Object,
			requiered: true
		}
	},

	data(){
		return{
			startX: 0,
			postLoaded: false,
			// post: {},
		}
	},

	methods: {

		...mapMutations({
      setRouterAnimate: 'setRouterAnimate',
			// setCurrentLecture: 'content/setCurrentLecture',
    }),
		...mapActions({
			// fetchCurrentSubCategoryElements: 'content/fetchCurrentSubCategoryElements',
			fetchCurrentLecture: 'content/fetchCurrentLecture',
		}),

		// goLoadPost(){
		// 	setTimeout( async () => {
		// 	this.postLoaded = true;
		// 	}, 500);
		// },

		routeToElement(){ 
			this.$router.push('/videos/' + this.post.id);
			// location.reload();
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
				// this.setCurrentLecture(this.post);
				// console.log('клик по элементу, супкагория:' + this.post.category_id);


				this.fetchCurrentLecture(this.post.id);
				// this.fetchCurrentSubCategoryElements(this.post.category_id);
				this.setRouterAnimate();
				this.routeToElement();
			}
			this.startX = 0;
		},

	},

	computed:{
		...mapGetters({
			getCurrUser: 'getCurrUser',
		}),
	},

	// mounted(){
	// 	this.goLoadPost();
	// },

});
</script>


<style lang="scss" scoped>

.the_element{
	width: 100%;
	position: relative;
	cursor: pointer;
	transition: all .24s ease;
	display: block;
	// margin-bottom: 5px;
	padding-bottom: 8px;
	&:hover{
		opacity: 1;
	}
	.info_line{
		padding: 8px 12px;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		justify-content: space-between;
		display: flex;
		z-index: 20;

		.icons{
			height: max-content;
			.viewed{
				// width: 28px;
				// height: 16px;
				width: 34px;
				height: 19.5px;
				// border-radius: 8px;
				border-radius: 10px;
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				margin-right: 4px;
				// padding: 2px 8px;
				padding: 2px 10px;
				&::before{
					display: block;
					content: '';
					// width: 12px;
					// height: 12px;
					width: 15px;
					height: 15px;
					background-image: url('../assets/icons/viewed.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
			.bought{
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				margin-right: 4px;
				width: 34px;
				height: 19.5px;
				border-radius: 10px;
				padding: 2px 10px;
				&::before{
					width: 14px;
					height: 14px;
					display: block;
					content: '';
					background-image: url('../assets/icons/bag.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
			.premium{
				background: #FD7C84;
				box-shadow: 0px 2px 4px rgba(253, 124, 132, 0.5);
				width: 34px;
				height: 19.5px;
				border-radius: 10px;
				padding: 2px 10px;
				&::before{
					display: block;
					content: '';
					width: 15px;
					height: 15px;
					background-image: url('../assets/icons/premium.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
			
		}
		.play{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.7);
			backdrop-filter: blur(10px);
			padding: 8px;
			&::before{
				content: '';
				width: 100%;
				height: 100%;
				display: block;
				background-image: url('../assets/icons/play.png');
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
		.download{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.7);
			backdrop-filter: blur(10px);
			padding: 8px;
			&::before{
				content: '';
				width: 100%;
				height: 100%;
				display: block;
				background-image: url('../assets/icons/download-a.png');
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
	}
	.the_element_box{
		border: 1px solid rgba(35, 41, 45, 0.1);
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 8px;
		position: relative;
		height: 0;
		width: 100%;
		padding-top: 56.6%;
		z-index: 10;
		background-color: #fff0f1;
		img{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
		.star{
			display: none !important;
			width: 30px;
			height: 30px;
			position: absolute;
			right: 0px;
			bottom: 0px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			&.active{
				display: block !important;
			}
			&::before{
				display: block;
				content: '';
				width: 22px;
				height: 22px;
				background-image: url('../assets/icons/star.png');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}
		}
	}
	.the_title{
		display: block;
		color: #23292D;

		max-height: 2.46rem;
    height: 100%;
    line-height: 1.16rem;
    text-overflow: ellipsis;
    font-size: 0.96rem;
    overflow: hidden;
		white-space: normal; 
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
		width: calc(100% - 20px);
	}
}



/* -------- @media ----------- */

@media screen and (max-width: 550px) {

	.the_element{
		.the_title{
			max-height: 2.66rem;
			line-height: 1.33rem;
			font-size: .93rem;
		}
	}

}


</style>
