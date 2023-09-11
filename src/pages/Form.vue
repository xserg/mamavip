<template>
  <div class="mainContainer" ref="scrollContainer">


		<div class="contentWrap">

			<div class="topLine flexWrap">
				<a @click="$router.go(-1), setRouterAnimate()" class="theButton leftButton buttonTransparent buttonBack" />
				<h1 class="theTitle alignCenter">Форма-опрос</h1>
				<button class="theButton rightButton buttonTransparent fontFamilyB ghostWrap">Далее</button>
			</div>


			<div v-if="getLoadingStatus || !this.getInfos.data" class="contentSubWrap rollerWrap">	
				<div class="info_wrap roller_box">
					<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>	

			<div class="contentSubWrap" v-else>
				<Form @submit="sendFormData" :validation-schema="schema">
					<div class="infoWrap formaWrap" v-if="formData && formDataFilter">
						<div class="formLoadbar topWrap marginB12" v-if="formTotalSteps >= formCurStep">
							<h2 class="formTitle" v-if="formData.common_titles.title">{{ formData.common_titles.title }}</h2>
							<p class="formDesc" v-if="formData.common_titles.description">{{ formData.common_titles.description }}</p>
							<div class="status_line" v-if="formTotalSteps >= formCurStep">
								<span class="status_position" :style="{ 'width': formLoadbar + '%' }"></span>
								<div class="status_title fontFamilyB">
									<span class="status_title_procent">{{ formLoadbar + '%' }}</span>
									<span>{{ formCurStepTitle }}</span>
								</div>
							</div>
						</div>

						<div class="formWrap formStep midWrap marginB12" 
							v-for='formStep in formDataFilter.data'
							:key='formStep.title' 
							:class="['step_' + formStep.index, {step_active: formStep.index == formCurStep}]"
						>
							<span class="step_title fontSize20 fontFamilyEB">{{ formStep.title }}</span>
							<div class="inputWrap input_wrap" v-for="input in formStep.form" :key="input.index">
								
								<div class="input_subwrap" v-if="input.type == 'question-type-one-text-field'">
									<label><span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
										<input v-model="input.value_text_1" type="text" :placeholder="input.data.field_text_1">
									</label>
								</div>

								<div class="input_subwrap subwrap_half_width" v-if="input.type == 'question-type-two-text-field'">
									<label class="half_width"><span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
										<input type="text" v-model="input.value_text_1" :placeholder="input.data.field_text_1">
									</label>
									<label class="half_width"><span class="label"></span>
										<input type="text" v-model="input.value_text_2" :placeholder="input.data.field_text_2">
									</label>
								</div>

								<div class="input_subwrap subwrap_half3_width" v-if="input.type == 'question-type-three-text-field'">
									<label class="half3_width"><span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
										<input type="text" v-model="input.value_text_1" :placeholder="input.data.field_text_1">
									</label>
									<label class="half3_width"><span class="label"></span>
										<input type="text" v-model="input.value_text_2" :placeholder="input.data.field_text_2">
									</label>
									<label class="half3_width"><span class="label"></span>
										<input type="text" v-model="input.value_text_3" :placeholder="input.data.field_text_3">
									</label>
								</div>

								<div class="input_subwrap" v-if="input.type == 'question-type-one-number-field'">
									<label><span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
										<input class="" type="number" v-model="input.value_text_1" :placeholder="input.data.field_text_1">
									</label>
								</div>

								<div class="input_subwrap" v-if="input.type == 'question-type-one-date-field'">
									<label><span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
										<input class="" type="date" v-model="input.value_text_1" :placeholder="input.data.field_text_1">
									</label>
								</div>

								<div class="input_subwrap" v-if="input.type == 'question-type-checkbox'">
									<label>
										<span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
									</label>
									<label v-for="answer in input.data.answers" :key="answer.data.text">
										<span class="checkbox_label">
											<input type="checkbox" v-model="answer.value_text_1" /> {{ answer.data.text }}
											<input style="margin-top:6px;" type="text" v-if="answer.value_text_1 && answer.custom_answer" v-model="answer.value_text_2" />
										</span>
									</label>
								</div>

								<div class="input_subwrap" v-if="input.type == 'question-type-radio'">
									<label><span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
									</label>
									<label class="select">
										<select :name="['select_' + input.index]" as="select" v-model="input.value_text_1">
											<option value="">...</option>
											<option v-for="answer in input.data.answers" :value="answer.data.text" :key="answer.data.text">{{ answer.data.text }}</option>
										</select>
									</label>
								</div>

								<div class="input_subwrap" v-if="input.type == 'textarea'">
									<label><p class="the_desc" v-html="input.data.text"/>
									</label>
								</div>

								<div class="input_subwrap" v-if="input.type == 'custom_textarea'">
									<label><span class="label">{{ input.data.text }}</span>
										<span class="desc" v-if="input.data.description">{{ input.data.description }}</span>
										<textarea v-model="input.value_text_1" :placeholder="input.data.field_text_1" />
									</label>
								</div>

							</div>
						</div>
						
						
						<div class="formWrap formStep step_6" :class="{step_active: formTotalSteps < formCurStep}">
							<span class="form_finish_title fontSize20 fontFamilyEB marginB12" v-if="formData.common_titles.successful_submit_title">{{ formData.common_titles.successful_submit_title }}</span>
							<p class="form_finish_desc" v-if="formData.common_titles.successful_submit_description">{{ formData.common_titles.successful_submit_description }}</p>
							<router-link class="theButton buttonSecondary buttonOptimal" to="/profile" @click="setRouterAnimate">Вернуться</router-link>
						</div>


						<div class="formButtons bottomWrap" v-if="formTotalSteps >= formCurStep">
							<span class="theButton buttonPrimary buttonOptimal marginB12" v-if="formCurStep < formTotalSteps" @click="nextFormStep">Вперед</span>
							<button class="theButton buttonPrimary buttonOptimal marginB12" v-if="formCurStep == formTotalSteps">Отправить на почту</button>
							<span class="theButton buttonSecondary buttonOptimal" v-if="formCurStep > 1 && formTotalSteps >= formCurStep" @click="prevFormStep">Назад</span>
						</div>

						<!-- <h2>{{ this.getInfos.data.app_info[0].agreement_title }}</h2>
						<div v-html="this.getInfos.data.app_info[0].agreement_text" /> -->

					</div>
				</Form>
			</div>

			<!-- <bottom-line></bottom-line> -->
			
		</div>


	</div>
</template>

<script>
// @ is an alias to /src
// import DefaultLikes from '@/components/DefaultLikes.vue'
import axios from 'axios';
import {mapMutations, mapGetters, mapActions} from 'vuex';

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'Forma',

	components: {
		Form,
    Field, 
    ErrorMessage,
	},

	setup(){
		const schema = yup.object({
      // firstname: yup.string().required('Пожалуйста, заполните это поле').min(2, 'Поле должно содержать не менее 2 символов').label('Имя'),
      // lastname: yup.string().required('Пожалуйста, заполните это поле').min(2, 'Поле должно содержать не менее 2 символов').label('Фамилия'),
		});
		return {
      schema,
		};
	},
	

	data(){
		return{
			formData: false,
			formDataFilter: false,
			formCurStep: 1,
			formTotalSteps: 1,
			formCurStepTitle: '',
			formLoadbar: 0,
			formLoadbarStep: 0,
			// hasElements: false,
		}
	},

	methods:{

		...mapMutations({
			setRouterAnimate: 'setRouterAnimate',
		}),
		...mapActions({
			fetchInfos: 'fetchInfos',
		}),

		getFormData(){
			try{
				setTimeout( async () => {
					const response = await axios.get('https://api.roddom15.ru/v1/pregnancy-plan-form', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						}
					}).catch(function (error) { if (error.response.status !== 404){  console.log(error.response) } });
					
					if(response.data){
						this.formData = response.data;
						this.setFilterFormData(response.data);
						this.formCurStepTitle = response.data.data[0].title;
						this.formLoadbarStep = 100 / (this.formTotalSteps - 1);
					}
					
				}, 50 );
			}
			catch(e){} 
			finally {}
		},

		sendFormData(){
			this.formCurStep++;
			this.$refs.scrollContainer.scrollTop = 0;

			var formBody = '';
			formBody += '<span style="width:100%;display:block;font-size:17px;font-weight:600;color:#333;margin-bottom:22px;line-height:110%;text-align:left;">' + this.formData.common_titles.title + '</span>'; 
				
			this.formDataFilter.data.forEach((step, step_index) => {
				var formBodyTitle = '<span style="margin-left:12px;text-align:left;width:100%;display:block;margin-bottom:6px;color:#23292dd9;font-size:15px;">' + step.title + '</span>';
				formBody += formBodyTitle;

				var formTbody = '<table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="border: 1px solid #f1f1f1;background-color:#fafafa;margin-bottom:20px;margin-bottom:18px;"><tr><th style="border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;text-align:left;font-weight:600;color:#23292dd9;">Вопрос</th><th style="border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;text-align:left;font-weight:600;color:#23292dd9;">Ответ</th></tr>';
				formBody += formTbody;

				step.form.forEach((option) => {
					
					if(option.type == 'question-type-checkbox'){
						if(option.data.text && option.data.text !== undefined){ var field1 = option.data.text + ' '; }else{ var field1 = ''; };
						var checkboxValues = '';
						option.data.answers.forEach( (checkbox) => {
							// checkbox
							if(checkbox.value_text_1){
								if(checkbox.custom_answer){
									checkboxValues = checkboxValues + checkbox.value_text_2 + '<br>';
								}else{
									checkboxValues = checkboxValues + checkbox.data.text + '<br>';
								}
							}
						});
						var formBodyOption = '<tr><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;">' 
							+ field1 
							+ '</th><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;border-left:1px solid #ececec;">' 
							+ checkboxValues 
							+ '</th></tr>';
						formBody += formBodyOption;

					}else if(option.type == 'question-type-two-text-field'){
						// option question-type-two-text-field
						if(option.data.text && option.data.text !== undefined){ var field1 = option.data.text + ' '; }else{ var field1 = ''; };
						var formBodyOption = '<tr><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;">' 
							+ field1 
							+ '</th><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;border-left:1px solid #ececec;">' 
							+ option.value_text_1 + ' ' + option.value_text_2 
							+ '</th></tr>';
						formBody += formBodyOption;

					}else if(option.type == 'question-type-three-text-field'){
						// option question-type-two-text-field
						if(option.data.text && option.data.text !== undefined){ var field1 = option.data.text + ' '; }else{ var field1 = ''; };
						var formBodyOption = '<tr><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;">' 
							+ field1 
							+ '</th><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;border-left:1px solid #ececec;">' 
							+ option.value_text_1 + ' ' + option.value_text_2 + ' ' + option.value_text_3 
							+ '</th></tr>';
						formBody += formBodyOption;

					}else if(option.type == 'textarea'){ /* option textarea */ }else{ 
						// option one-field, number, date, radio
						if(option.data.text && option.data.text !== undefined){ var field1 = option.data.text + ' '; }else{ var field1 = ''; };
						var formBodyOption = '<tr><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;">' 
							+ field1 
							+ '</th><th style="color:#23292dd9;min-height:35px;border-bottom:1px solid #ececec;font-size:14px;text-align:left;padding:8px 12px;font-weight:400;width:50%;min-width:50%;line-height:125%;border-left:1px solid #ececec;">' 
							+ option.value_text_1 
							+ '</th></tr>';
						formBody += formBodyOption;
					}
					
				});

				formBody += '</table>';

			});

			// console.log(formBody);
						
			
			try{
				setTimeout( async () => {
					const headers = { 
						'Authorization': this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
						'Content-Type': 'application/json',
						'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
						'Access-Control-Allow-Origin': '*',
					};
					
					const response = await axios.post('https://api.roddom15.ru/v1/pregnancy-plan-form', { data: formBody }, { headers })
					.catch(function (error) { if (error.response.status !== 404){  console.log(error.response) } });
					
					if(response){
						console.log('Форма успешно отправлена');
					}

				}, 50 );
			}
			catch(e){} 
			finally {}

		},


		nextFormStep(){
			this.formCurStep++;
			this.formCurStepTitle = this.formDataFilter.data[this.formCurStep - 1].title;
			this.formLoadbar = this.formLoadbarStep * (this.formCurStep - 1);
			this.$refs.scrollContainer.scrollTop = 0;
		},

		prevFormStep(){
			this.formCurStep--;
			this.formCurStepTitle = this.formDataFilter.data[this.formCurStep - 1].title;
			this.formLoadbar = this.formLoadbarStep * (this.formCurStep - 1);
			this.$refs.scrollContainer.scrollTop = 0;
		},

		setFilterFormData(data){
			this.formDataFilter = {
				data: [],
			}
			data.data.forEach( (step, el_index) => {
				step.form.forEach( (option, option_index) => {
					if(option.type == 'question-type-two-text-field'){
						option.value_text_1 = '';
						option.value_text_2 = '';
					}
					else if(option.type == 'question-type-three-text-field'){
						option.value_text_1 = '';
						option.value_text_2 = '';
						option.value_text_3 = '';
					}
					else if(option.type == 'question-type-checkbox'){
						option.data.answers.forEach( (checkbox, checkbox_index) => {
							checkbox.value_text_1 = false;
						});
						var filter_answers = {
							data: {
								text: 'Свой вариант',
							},
							type: 'answer',
							value_text_1: false,
							value_text_2: '',
							custom_answer: true,
						};
						option.data.answers.push(filter_answers);
					}
					else{
						option.value_text_1 = '';
					}
				});
				this.formDataFilter.data.push(step);
			})

			const stepsCount = data.data.length;
			var last_step = {
				form: [
					{
						data: {
							text: 'Дополнительно',
							description: 'Напишите, что еще Вы хотите добавить в свой индивидуальный План родов?',
						},
						index: 1,
						type: 'custom_textarea',
						value_text_1: '',
					},
				],
				index: stepsCount + 1,
				title: 'Подтверждение',
			}
			this.formDataFilter.data.push(last_step);
			this.formTotalSteps = this.formDataFilter.data.length;
		}

	},

	computed:{
		...mapGetters({
			getLoadingStatus: 'getLoadingStatus',
			getCurrUser: 'getCurrUser',
			getInfos: 'getInfos',
		}),
	},


	mounted(){
		this.fetchInfos();
		this.getFormData();
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
			background-color: #F3F5F6;
			&.rollerWrap{
				background-color: #FFF;
			}
			// padding: 32px 16px;
			p{
				line-height: 150%;
			}
		}
		.formaWrap{
			max-width: none;
			.formLoadbar{
				padding: 32px 16px;
				background-color: #FFF;
				.formTitle{
					margin-bottom: 8px;
					width: calc(100% - 10px);
					margin-left: 5px;
					margin-right: 5px;
				}
				.formDesc{
					margin-bottom: 20px;
					width: calc(100% - 10px);
					margin-left: 5px;
					margin-right: 5px;
				}
				.status_line{
					border-radius: 50px;
					background-color: #ffd5d8; //#FFEAEB; //#FEF5F6;
					width: calc(100% - 50px);
					margin-left: auto;
					margin-right: auto;
					display: block;
					padding: 8px 18px;
					position: relative;
					.status_position{
						position: absolute;
						left: 0;
						top: 0;
						z-index: 2;
						border-radius: 50px;
						background-color: #FD7C84;
						width: 0%;
						height: 100%;
						display: block;
						transition: all .34s ease-in-out;
					}
					.status_title{
						position: relative;
						z-index: 10;
						color: #FFF;
						.status_title_procent{
							display: inline-block;
							margin-right: 20px;
						}
					}
				}
			}
			.formStep{
				max-width: none;
				padding: 16px 16px;
				background-color: #FFF;
				display: none;
				.form_finish_title{
					text-align: center;
					color: #23292deb;
					display: block;
					margin-top: 30px;
				}
				.form_finish_desc{
					text-align: center;
					color: #23292dd9;
					max-width: 85%;
					margin-left: auto;
					margin-right: auto;
					margin-bottom: 15px;
				}
				&.step_active{
					display: block;
				}
				.step_title{
					display: block;
					margin-bottom: 12px;
					width: calc(100% - 10px);
					margin-left: 5px;
					margin-right: 5px;
				}
				.input_wrap{
					width: 100%;
					.input_subwrap{
						width: calc(100% + 10px);
						margin-left: -5px;
						margin-right: -5px;
						&.subwrap_half_width{
							width: calc(100% + 0px);
							margin-left: -5px;
							margin-right: -5px;
						}
						&.subwrap_half3_width{
							width: calc(100% + 0px);
							margin-left: -0px;
							margin-right: -0px;
							
							input{
								width: calc(100% - 4px);
								margin-left: 2px;
								margin-right: 2px;
							}
						}
						select{
							color: #23292deb;
							width: calc(100% - 10px);
							margin-left: 5px;
							margin-right: 5px;
							background-color: #F3F5F6;
							box-shadow: none;
							min-height: 48px;
							letter-spacing: .32px;
							border-radius: 8px;
							border: 2px solid #FFF;
							transition: all .24s ease, letter-spacing .0s ease;
							padding: 6px 10px;
							-moz-appearance:none; /* Firefox */
							-webkit-appearance:none; /* Safari and Chrome */
							appearance:none;
						}
						.select{
							position: relative;
						}
						.select::before{
							content: '';
							display: block;
							min-width: 12px;
							width: 10px;
							height: 10px;
							position: absolute;
							right: 25px;
							top: 50%;
							transform: translateY(-50%);
							z-index: 2;
							background-repeat: no-repeat;
							background-size: contain;
							background-position: center;
							background-image: url('../assets/icons/arrow_down_a.svg');
						}
						input{
							width: calc(100% - 10px);
							margin-left: 5px;
							margin-right: 5px;
							background-color: #F3F5F6;
							box-shadow: none;
							min-height: 48px;
							letter-spacing: .32px;
						}
						.checkbox_label{
							font-size: 13px;
							cursor: pointer;
							opacity: 1;
							transition: all .28s ease;
							color: #23292deb
						}
						.checkbox_label:hover{
							opacity: .84;
						}
						input[type=checkbox]{
							width: 15px;
							height: 15px;
							display: inline-block;
							padding: 0;
							min-width: 15px;
							min-height: 15px; 
							border-radius: 4px;
							background-color: #ffeaeb25;
							border: 1px solid #f9b2b792;
							position: relative;
							margin-right: 8px;
							margin-left: 24px;
							margin-bottom: -2px;
							margin-top: 10px;
						}
						input[type=checkbox]::before{
							opacity: 0;
							transition: all .14s ease;
							content: '';
							display: block;
							width: 100%;
							height: 100%;
							top: 0;
							left: 0;
							position: absolute;
							background-repeat: no-repeat;
							background-position: 50%;
							background-size: contain;
							background-image: url('../assets/icons/done2.svg');
						}
						input[type=checkbox]:checked::before{
							opacity: 1;
						}
						input[type=checkbox]:checked{
							opacity: 1;
							background-color: #ffeaeb;
							border: 1px solid #f9b2b7;
						}
						.the_desc{
							width: calc(100% - 20px);
							margin-left: 10px;
							margin-right: 10px;
							font-size: 13px;
							color: #23292dd9;
						}
						textarea{
							width: calc(100% - 10px);
							margin-left: 5px;
							margin-right: 5px;
							letter-spacing: .32px;
							z-index: 5;
							padding: 14px 16px;
							border-radius: 8px;
							border: 2px solid #FFF;
							transition: all 0.24s ease, letter-spacing 0s ease;
							outline: none;
							appearance: none;
							-moz-appearance: none;
							-webkit-appearance: none;
							background-color: #F3F5F6;
							box-shadow: none;
							min-height: 148px;
							&:active, &:target, &:focus-visible, &:focus-within, &:focus{
								border: 2px solid #FEABB0;
    						transition: all 0.24s ease, letter-spacing 0s ease;
							}
						}
						label{
							display: inline-block;
							width: calc(100% - 10px);
							margin-right: 5px;
							margin-left: 5px;
						}
						.label{
							display: block;
							width: calc(100% - 10px);
							margin-left: 5px;
							margin-right: 5px;
							font-size: 13px;
							margin-bottom: 2px;
							margin-left: 16px;
							color: #23292deb;
						}
						.desc{
							display: block;
							width: calc(100% - 10px);
							font-size: 12px;
							// text-decoration: underline;
							color: #23292d97;
							margin-left: 16px;
							margin-bottom: 5px;
							margin-right: 5px;
						}
						.half_width{
							width: calc(50% - 10px);
							margin-left: 5px;
							margin-right: 5px;
						}
						.half3_width{
							width: calc(33.3333% - 6px);
							margin-left: 3px;
							margin-right: 3px;
						}
					}
				}
			}
			.formButtons{
				padding: 32px 16px;
				background-color: #FFF;
			}
		}
	}
}


/* -------- @media ----------- */

@media screen and (max-width: 600px) {

	.mainContainer .contentWrap .formaWrap .formStep .input_wrap .input_subwrap .half3_width{
		width: calc(50% - 6px);
		margin-bottom: 5px;
		input{
			width: calc(100% - 4px);
			margin-left: 2px;
			margin-right: 2px;
		}
	}


}

</style>
