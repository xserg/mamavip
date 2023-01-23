<template>

	<div class="the_element marginB12">
		<div class="info_line flexWrap">
			<div class="icons flexWrap">
				<span class="viewed blockWrap"></span>
				<span class="bought blockWrap"></span>
				<span class="premium blockWrap"></span>
			</div>
			<span class="play"></span>
			<!-- <span @click="$emit('deleteElement', post)">Открыть</span> -->
		</div>
		<div class="the_element_box">
			<!-- <img src="./../assets/images/element.jpg" alt="element"> -->
			<img :src="post.preview" alt="element">
		</div>
		<span class="the_title fontSize14 fontFamilyEB">{{ post.title + ' ' + post.id}}</span>
		<!-- <span class="the_title fontSize14 fontFamilyEB">Короткий заголовок у элемента</span> -->
	</div>
	
	
</template>


<script>
export default({

	name: 'Element', 

	props: {
		post: {
			type: Object,
			requiered: true
		}
	},

	data() {
	},

});
</script>


<style lang="scss">

.the_element{
	width: 100%;
	position: relative;
	cursor: pointer;
	transition: all .24s ease;
	// &:hover{
	// 	opacity: .86;
	// }
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
				width: 28px;
				height: 16px;
				border-radius: 8px;
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				margin-right: 4px;
				padding: 2px 8px;
				&::before{
					display: block;
					content: '';
					width: 12px;
					height: 12px;
					background-image: url('../assets/icons/viewed.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
			.bought{
				width: 28px;
				height: 16px;
				border-radius: 8px;
				background: rgba(255, 255, 255, 0.7);
				backdrop-filter: blur(10px);
				margin-right: 4px;
				padding: 2px 8px;
				&::before{
					display: block;
					content: '';
					width: 11px;
					height: 11px;
					background-image: url('../assets/icons/bag.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
			.premium{
				padding: 2px 8px;
				width: 28px;
				height: 16px;
				border-radius: 8px;
				background: #FD7C84;
				box-shadow: 0px 2px 4px rgba(253, 124, 132, 0.5);
				&::before{
					display: block;
					content: '';
					width: 12px;
					height: 12px;
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
	}
	.the_element_box{
		border: 1px solid rgba(35, 41, 45, 0.1);
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 4px;
		position: relative;
		height: 0;
		width: 100%;
		padding-top: 56.6%;
		z-index: 10;
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
	}
}



/* -------- @media ----------- */

@media screen and (max-width: 480px) {

}


</style>
