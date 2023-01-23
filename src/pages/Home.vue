<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonTransparent ghostWrap">Назад</span>
				<h1 class="theTitle alignCenter">Главное</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap">

				<div class="userinfo_wrap topWrap marginB12">
					<div class="userinfo_box">
						<div class="userinfo_card">
							<!-- <span class="card_photo_wrap"  style="background-image:url('../assets/images/profile.jpg')"></span> -->
							<span class="card_photo_wrap"></span>
							<div class="card_info_wrap">
								<span class="card_name">Заполните профиль</span>
								<span class="card_status fontSize14">Это необходимо, чтобы пользоваться сервисом</span>
							</div>
							<router-link class="card_button theButton buttonTransparent buttonOptimal" to="/edit"></router-link>
						</div>
					</div>
				</div>

				<div class="recommended_box midWrap marginB12">

					<span class="the_title fontFamilyEB fontSize20 blockWrap">Рекомендуем</span>
					<span class="the_subtitle marginB12 fontSize14 blockWrap">Не пропустите новые лекции!</span>
					<div class="element_box">
						<element 
						:post="recommendationElement"
						:key="recommendationElement.id"
						/>
					</div>

				</div>


				<bottom-line></bottom-line>
			</div>
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import Element from '@/components/Element';

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
		Element,
    // DefaultLikes,
  },

	computed:{
		...mapState({
		}),
		...mapGetters({
			recommendationElement: 'content/recommendationElement',
		}),
	},



}
</script>


<style lang="scss" scoped>

.mainContainer{
	height: 100vh;
	position: relative;
	.contentWrap.ghostWrap{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 0;
	}
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;

		.contentSubWrap{
			width: 100%;
			padding: 16px 0px;
			padding: 0;
			background-color: #F3F5F6;
			
			.userinfo_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;

				.userinfo_box{
					.userinfo_card{
						display: flex;
						align-items: center;
						position: relative;
						.card_photo_wrap{
							min-width: 60px;
							width: 60px;
							height: 60px;
							display: block;
							background-position: center;
							background-repeat: no-repeat;
							background-color: #FFEAEB;
							border-radius: 50%;
							margin-right: 12px;
							background-image: url('../assets/icons/nophoto.svg');
							background-size: 35%;

							// background-image: url('../assets/images/profile.jpg');
							// background-size: cover;
						}
						.card_info_wrap{
							display: flex;
							flex-direction: column;
							.card_name{
								font-weight: 800;
								margin-bottom: 4px;
								user-select: none;
							}
							.card_status{
								padding-right: 40px;
								color: #23292DB2;
							}
						}
						.card_button{
							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
							display: block;
							background-position: center;
							background-repeat: no-repeat;
							background-size: 20px;
							background-image: url('../assets/icons/arrow-right.svg');
							min-width: 30px;
							width: 30px;
							height: 30px;
							border: none;
							padding: 5px;
							background-color: transparent;
						}
					}
				}
			}

			.recommended_box{
				background-color: #FFF;
				padding: 16px;
				.the_title{
					margin-bottom: 2px;
				}
			}

		}
	}
}


</style>
