<template>
  <div class="mainContainer">
		<div class="contentWrap" :class="{hiddenWrap: deleteAccount}">

			<Form @submit="onSubmit" v-slot="{ errors }" :validation-schema="schema">


				<div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotification }">
					<p>Изменения сохранены</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>

				<div class="errorWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showErrors }">
					<p>Не удалось отправить запрос. <br>Попробуйте снова.</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>

				<div class="notificationWrap flexWrap fontSize14" :class="{ ghostWrap: !this.showNotificationDelete }">
					<p>Заявка отправлена. Скоро мы удалим ваш профиль.</p>
					<div class="button_wrap">
						<span class="separate"></span>
						<span class="theButton close_button" @click="hideMessages"></span>
					</div>
				</div>

				<!-- motorstate.com.ua-Volvo-APCI_PTT-2.8+PTT-2.7 -->


				<div class="topLine flexWrap">
					
					<a @click="$router.go(-1)" class="theButton leftButton buttonTransparent">Отмена</a>
					<h1 class="theTitle alignCenter">Профиль</h1>
					<button class="theButton rightButton buttonTransparent fontFamilyB">Готово</button>
				</div>

				<div class="contentSubWrap profile_wrap">
					
					<div class="photo_wrap topWrap marginB12"> 

						<span class="the_photo theButton buttonTransparent blockWrap" :class="{hiddenWrap: hasPhoto == true}" @click="hasPhotoTrue"></span>
						<img class="the_photo blockWrap the_photo_has" src="./../assets/images/profile.jpg" :class="{hiddenWrap: hasPhoto == false}">

						<span class="the_title blockWrap fontFamilyB" :class="{hiddenWrap: hasPhoto == true}">Загрузите фото</span>
						<p class="the_desc fontSize12 marginB12" :class="{hiddenWrap: hasPhoto == true}">JPEG или PNG не более 10 Мб</p>

						<div class="buttons_wrap flexWrap" :class="{hiddenWrap: hasPhoto == false}">
							<span class="theButton buttonTertiary buttonOptimal" @click="hasPhotoFalse">Удалить</span>
							<span class="theButton buttonSecondary buttonOptimal" @click="hasPhotoFalse">Заменить</span>
						</div>

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

							<label class="inputWrap" :class="{notValid: errors.burthday }">
								<span class="label">Дата вашего рождения</span>
								<div class="inputBox">
									<Field name="burthday" type="date" placeholder="Выберите дату..." />
								</div>
								<ErrorMessage class="errorTitle" name="burthday" />
							</label>

							<label class="inputWrap" :class="{notValid: errors.mobile }">
								<span class="label">Номер телефона</span>
								<div class="inputBox">
									<Field name="mobile" type="tel" placeholder="+7" />
									<!-- <Field v-model="mobile" name="mobile" v-slot="{ field }" type="tel" placeholder="+7">
										<input v-bind="field">
									</Field> -->
									
								</div>
								<ErrorMessage class="errorTitle" name="mobile" />
							</label>
							
						</div>
						
					</div>


					<div class="more_wrap midWrap marginB12">
						<span class="the_title marginB12 fontFamilyEB blockWrap">Выберите статус</span>
						<div class="statuses_wrap">
							<span class="the_status" :class="{active: this.born == false}" @click="bornFalse">Я беременна</span>
							<span class="the_status" :class="{active: this.born == true}" @click="bornTrue">Я мама</span>
						</div>
						<div class="formWrap">

							<label class="inputWrap" :class="{ hiddenWrap: this.born == true, notValid: errors.baby_weeks }">
								<span class="label">Какой срок?</span>
								<div class="inputBox">
									<Field ref="bornFalse" name="baby_weeks" type="number" placeholder="В неделях" />
								</div>
								<ErrorMessage class="errorTitle" name="baby_weeks" />
							</label>
							<label class="inputWrap" :class="{ hiddenWrap: this.born == false, notValid: errors.baby_burthday }">
								<span class="label">Когда родился малыш?</span>
								<div class="inputBox">
									<Field ref="bornTrue" name="baby_burthday" type="date" placeholder="Выберите дату..." />
								</div>
								<ErrorMessage class="errorTitle" name="baby_burthday" />
							</label>
							
						</div>
						
					</div>

					<div class="delete_wrap bottomWrap">
						<span class="theButton buttonTransparent fontSize16" @click="deleteAccountTrue">Удалить мой аккаунт</span>
					</div>


				</div>

				<bottom-line></bottom-line>

			</Form>
			
		</div>


		<div class="contentWrap finish_delete_container" :class="{hiddenWrap: !this.deleteAccount}">

			<div class="topLine flexWrap">
				<span class="theButton leftButton buttonTransparent" @click="deleteAccountFalse">Отмена</span>
				<h1 class="theTitle alignCenter">Удаление профиля</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>

			<div class="contentSubWrap finish_delete_wrap flexWrap">
				<img src="./../assets/images/delete.png" alt="delete-account" class="the_img">
				<span class="the_title blockWrap fontFamilyEB marginB12">Подтвердите заявку на удаление профиля</span>
				<p class="the_desc blockWrap fontSize14 marginB12">Ваш профиль будет удалён окончательно и безвозвратно. Все ваши покупки, закладки и все данные будут потеряны.</p>
				<span class="theButton buttonPrimary buttonOptimal fontSize16" @click="deleteAccountConfirm">Подтвердить</span>
			</div>

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
		// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

		const schema = yup.object().shape({
			name: yup.string().required('Пожалуйста, заполните это поле').typeError('Поле обязателено').min(2, 'Поле должно содержать не менее 2 символов').label('Имя'),
			burthday: yup.date().typeError('Введите дату рождения').max(new Date(), 'Выберете корректную дату').label('День рождения'),
			baby_weeks: yup.number().min(1, 'Введите корректный срок').max(40, 'Введите корректный срок').typeError().label('Количество недель'),
			baby_burthday: yup.date().typeError('Введите дату рождения малыша').max(new Date(), "Выберете корректную дату").label('День рождения'),
			mobile: yup.string().when('mobile', {
				is: (value) => value?.length > 0,
				then: yup.string().phone("", true, 'Введите корректный номер телефона'),
				otherwise: yup.string(),
			}),

			// mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid')
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
			hasPhoto: false,
			born: false,
			showErrors: false,
			showNotification: false,
			showNotificationDelete: false,
			deleteAccount: false,
		}
	},


  components: {
		Form,
    Field,
    ErrorMessage,
  },


	methods: {

		// Удалить аккаунт
		deleteAccountTrue(){
			this.deleteAccount = true;
		},
		deleteAccountFalse(){
			this.deleteAccount = false;
		},
		// Подтвердить удаление аккаунта
		deleteAccountConfirm(){
			this.deleteAccount = false;
			setTimeout(() => {
        this.showNotificationDelete = true;
      }, 400);
			setTimeout(() => {
        this.showNotificationDelete = false;
      }, 5000);
		},

		// Сохранение данных профиля
		onSubmit(values){
			console.log(JSON.stringify(values, null, 2));
			setTimeout(() => {
        this.showNotification = true;
      }, 400);
			setTimeout(() => {
        this.showNotification = false;
      }, 5000);
		},

		// Скрыть уведомления любого типа
		hideMessages(){
			this.showErrors = false;
			this.showNotification = false;
			this.showNotificationDelete = false;
		},

		// Переключение статуса "рождение малыша" под инпуты сроков
		bornTrue(){
			this.born = true;
			this.$refs.bornFalse.reset();
		},
		bornFalse(){
			this.born = false;
			this.$refs.bornTrue.reset();
		},

		// Состояние фото профиля
		hasPhotoTrue(){
			this.hasPhoto = true;
		},
		hasPhotoFalse(){
			this.hasPhoto = false;
		},

	},

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

		.topLine{
			.leftButton{
				text-align: left;
				padding-left: 4px;
				font-size: 15px;
			}
		}
		.notificationWrap{
			bottom: 60px;
		}
	
		.contentSubWrap.profile_wrap{
			width: 100%;
			padding: 16px 0;
			padding: 0;
			background-color: #F3F5F6;
			
			.photo_wrap{
				background-color: #FFF;
				padding: 16px;
				padding-top: 8px;
				.buttons_wrap{
					width: calc(100% + 8px);
					margin-left: -4px;
					margin-right: -4px;
					.theButton{
						width: calc(50% - 8px);
						min-width: calc(50% - 8px);
						margin: 0 4px;
					}
				}
				.the_photo{
					cursor: pointer;
					margin: 0 auto;
					background-color: #FFEAEB;
					min-width: 150px;
					width: 150px;
					height: 150px;
					background-image: url('../assets/icons/add-photo.svg');
					background-size: 40%;
					background-position: center;
					background-repeat: no-repeat;
					margin-bottom: 8px;
					border-radius: 50%;
					&.the_photo_has{
						margin-bottom: 12px;
					}
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
				
			}

			.more_wrap{
				background-color: #FFF;
				padding: 20px 16px;
				.the_title{
				}
				.statuses_wrap{
					display: flex;
					flex-wrap: wrap;
					margin-bottom: 16px;
					.the_status{
						cursor: pointer;
						background-color: #F3F5F6;
						padding: 4px 16px;
						border-radius: 30px;
						margin-right: 8px;
						color: #23292D;
						transition: all .24s ease;
						&.active{
							background-color: #FD7C84;
							color: #FFF;
						}
					}

				}
			}

			.delete_wrap{
				background-color: #FFF;
				padding: 8px 16px;
				padding-bottom: 32px;
			}

			.formWrap{
				.label{
						color: #23292DB2;
					}
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


	}

	.contentWrap.finish_delete_container{
		align-items: center;
		justify-content: center;
		padding-left: 10px;
		padding-right: 10px;
		.contentSubWrap.finish_delete_wrap{
			max-width: 480px;
			width: 100%;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.the_img{
				margin-left: auto;
				margin-right: auto;
				display: block;
				// width: 100%;
				width: 55.6%;
				margin-bottom: 10px;
				display: block;
			}
			.the_title{
				color: #23292DB2;
				text-align: center;
				margin-bottom: 12px;
			}
			.the_desc{
				text-align: center;
				color: #23292DB2;
				margin-bottom: 24px;
			}
			.theButton{}
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
