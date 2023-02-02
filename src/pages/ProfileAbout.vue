<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">О приложении</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">
				<div class="title_wrap topWrap marginB12 flexWrap">
					<span class="the_title fontSize20 fontFamilyEB">Школа мам и пап</span>
					<span class="the_subtitle fontSize32 fontFamilyEB">«Нежность»</span>
				</div>
				<div class="info_wrap marginB12 midWrap">
					<p>(Описание приложения идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение модели развития. Значимость этих проблем настолько очевидна, что реализация намеченных плановых заданий способствует подготовки и реализации соответствующий условий активизации.</p>
					<p>(Описание приложения идёт сюда) Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение модели развития. Значимость этих проблем настолько очевидна, что реализация намеченных плановых заданий способствует подготовки и реализации соответствующий условий активизации.</p>
				</div>
				<div class="author_wrap marginB12 midWrap">
					<span class="the_title fontSize14">Автор</span>
					<span class="the_value fontFamilyEB">Сергей Тарасов</span>
				</div>
				<div class="links_wrap bottomWrap">
					<div class="link_wrap" @click="copyLink">
						<span class="the_title fontSize14">Поделиться ссылкой</span>
						<span class="the_value fontFamilyEB">www.google.com</span>
					</div>
					<div class="link_wrap the_qr" @click="copyLink">
						<span class="the_title fontSize14">Показать QR-код</span>
						<span class="the_value fontFamilyEB">www.google.com</span>
					</div>
				</div>
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import {mapMutations} from 'vuex';

export default {
  name: 'ProfileAbout',

	data(){
		return{
		}
	},

	methods:{

		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
		}),

		copyLink(){
			console.log('Скопировано');
		},

	},

  components: {
  },


}
</script>


<style lang="scss" scoped>

.mainContainer{
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		justify-content: flex-start;

		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			.title_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.the_title, .the_subtitle{
					color: #23292D;
				}
			}
			.info_wrap{
				font-size: 14px;
				background-color: #FFF;
				padding: 16px;
				color: #23292DB2;
				p{
					line-height: 150%;
				}
			}
			.author_wrap{
				background-color: #FFF;
				padding: 16px;
				.the_title{
					color: #23292DB2;
					display: block;
					margin-bottom: 4px;
				}
				.the_value{
					display: block;
				}
			}
			.links_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-bottom: 46px;
				.link_wrap{
					margin-bottom: 16px;
					position: relative;
					cursor: pointer;
					transition: all .24s ease;
					&:hover{
						opacity: .85;
					}
					&::before{
						content: '';
						width: 24px;
						height: 24px;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translate(-50%);
						background-repeat: no-repeat;
						background-size: contain;
						background-image: url('./../assets/icons/share-icon.svg');
					}
					&.the_qr::before{
						background-image: url('./../assets/icons/qr-icon.svg');
					}
				}
				.link_wrap:last-of-type{
					margin-bottom: 0;
				}
				.the_title{
					color: #23292DB2;
					display: block;
					margin-bottom: 4px;
				}
				.the_value{
					display: block;
				}
			}

		}

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 600px) {

	.mainContainer{
		.contentWrap{
		}
	}

}

</style>
