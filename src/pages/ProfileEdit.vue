<template>
  <div class="mainContainer">
		<div class="contentWrap">

			<Form @submit="onSubmit" v-slot="{ errors }" :validation-schema="schema">

				<div class="topLine flexWrap">
					<span class="theButton leftButton buttonTransparent ghostWrap"></span>
					<h1 class="theTitle alignCenter">Профиль</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB">Готово</button>
				</div>

				<div class="contentSubWrap profile_wrap">

					<div class="photo_wrap topWrap marginB12">
						<span class="the_photo theButton buttonTransparent"></span>
						<span class="the_title blockWrap fontFamilyB">Загрузите фото</span>
						<p class="the_desc fontSize12">JPEG или PNG не более 10 Мб</p>
					</div>

					<div class="info_wrap midWrap marginB12">
						<div class="formWrap">

							<label class="inputWrap" :class="{notValid: errors.name }">
								<span class="label">Как вас зовут?</span>
								<div class="inputBox">
									<Field name="name" placeholder="Имя" />
								</div>
								<ErrorMessage class="errorTitle" name="name" />
							</label>

							<label class="inputWrap">
								<span class="label">Дата вашего рождения</span>
								<div class="inputBox">
									<Field name="burthday" type="date" placeholder="Выберите дату..." />
								</div>
								<ErrorMessage class="errorTitle" name="burthday" />
							</label>

							<label class="inputWrap">
								<span class="label">Номер телефона</span>
								<div class="inputBox">
									<Field name="phone" type="tel" placeholder="+7" />
								</div>
								<ErrorMessage class="errorTitle" name="phone" />
							</label>
							
						</div>
						
					</div>


					<div class="more_wrap bottomWrap">
						Ваш статус
					</div>


				</div>

				<bottom-line></bottom-line>

			</Form>
			
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import "yup-phone";

export default {
  name: 'ProfileEdit',

	setup(){

		const schema = yup.object().shape({
			name: yup.string().required('Пожалуйста, заполните это поле').typeError('Поле обязателено').min(2, 'Поле должно содержать не менее 2 символов').label('Имя'),
      burthday: yup.date().typeError('Введите дату дня рождения').max(new Date(), "Выберете корректную дату").label('День рождения'),
      // phone: yup.string().phone('RU', 'Введите корректный номер телефона').label('Телефон'),
			mobile: yup.string().when('mobile', {
				is: (value) => value?.length > 0,
				then: yup.string().phone(),
				otherwise: yup.string(),
			}),
		},
		[
      ['mobile', 'mobile'],
    ]
		);

		return {
      schema, 
		}

	},

	data(){
		return{
			// profileIsFill: true,
		}
	},


  components: {
    // DefaultLikes,
		Form,
    Field,
    ErrorMessage,
  },


	methods: {
		onSubmit(values){
			console.log(JSON.stringify(values, null, 2));
			// this.showErrors = true;
			// router.push('profile');
		},
	}


}
</script>


<style lang="scss" scoped>

.mainContainer{
	height: 100vh;
	.contentWrap{
		padding: 0;
		padding-top: 45px;
		padding-bottom: 48px;
		background-color: #FFF;
		overflow: scroll;
		justify-content: flex-start;

	
		.contentSubWrap.profile_wrap{
			width: 100%;
			padding: 16px 0;
			padding: 0;
			background-color: #F3F5F6;
			
			.photo_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;
				.the_photo{
					cursor: pointer;
					margin: 0 auto;
					background-color: #FFEAEB;
					display: block;
					min-width: 150px;
					width: 150px;
					height: 150px;
					background-image: url('../assets/icons/add-photo.svg');
					background-size: 40%;
					background-position: center;
					background-repeat: no-repeat;
					margin-bottom: 8px;
					border-radius: 50%;
				}
				.the_title{
					margin: 0 auto;
					margin-bottom: 4px;
					text-align: center;
					color: rgba(35, 41, 45, 0.7);
					user-select: none;
				}
				.the_desc{
					text-align: center;
					color: rgba(35, 41, 45, 0.5);
					user-select: none;
				}
			}


			.info_wrap{
				background-color: #FFF;
				padding: 20px 16px;
				.formWrap{
					.inputBox{
						input{
							background-color: #F3F5F6;
							box-shadow: none;
							min-height: 48px;
							letter-spacing: .32px;
						}
					}
					.errorTitle{}
				}
				
			}

			.more_wrap{
				background-color: #FFF;
				padding: 20px 16px;
			}
				

		}

		

		

	}
}


/* -------- @media ----------- */

@media screen and (max-width: 600px) {

	.mainContainer{
		.contentWrap{
			&.stepRegSecond{
				margin-bottom: 0px;
			}
		}
	}

}

</style>
