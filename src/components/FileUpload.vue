<template>

	<div class="img_wrapper">

		<span class="the_photo theButton buttonTransparent blockWrap changePhotoButton " :class="{hiddenWrap: hasPhoto, transparent: localPhoto}" @click=" this.$refs.inputField.click()"></span>
		<img class="the_photo blockWrap the_photo_has" :src="localPhoto" v-if="localPhoto">
	</div>

	<span class="the_title blockWrap fontFamilyB" :class="{hiddenWrap: !hasPhoto && !localPhoto}">Фото загружено</span>
	<p class="the_desc fontSize12 marginB12" v-if="!errors.length" :class="{hiddenWrap: !hasPhoto && !localPhoto}">Прекрасно выглядите!</p>

	<span class="the_title blockWrap fontFamilyB" :class="{hiddenWrap: hasPhoto || localPhoto}">Загрузите фото</span>
	<p class="the_desc fontSize12 marginB12" v-if="!errors.length" :class="{hiddenWrap: hasPhoto || localPhoto}">JPEG или PNG не более 10 Мб</p>

	<div v-if="errors.length > 0" class="the_desc fontSize12 marginB12">
		<div
			class="file-upload__error"
			v-for="(error, index) in errors"
			:key="index"
		>
			<span>{{ error }}</span>
		</div>
	</div>

	<div class="buttons_wrap flexWrap" v-if="!errors.length">
		<span class="theButton buttonTertiary buttonOptimal" v-if="localPhoto" @click="resetFileInput">Удалить</span>
		<span class="theButton buttonSecondary buttonOptimal" v-if="hasPhotoChanges" @click="sendDataToParent">Сохранить</span>
	</div>

	<!-- END OF COMPONENT -->




  <div class="file-upload" style="max-width:600px; width:100%">
    <div class="file-upload__area" style="width:100%">
      <div v-if="!file.isUploaded">
        <input ref="inputField" type="file" name="" id="" @change="handleFileChange($event)" />
        <div v-if="errors.length > 0">
          <div
            class="file-upload__error"
            v-for="(error, index) in errors"
            :key="index"
          >
            <span>{{ error }}</span>
          </div>
        </div>
      </div>

      <!-- <div v-if="file.isUploaded" class="upload-preview" style="width:100%;">
				<span>Превью изображения</span>
        <img :src="file.url" v-if="file.isImage" class="file-image" alt="" />
        <div v-if="!file.isImage" class="file-extention">
          {{ file.fileExtention }}
        </div>
        <span class="file-name">
          {{ file.name }}{{ file.isImage ? `.${file.fileExtention}` : "" }}
        </span>
        <div class="">
          <button @click="resetFileInput">Change file</button>
        </div>
        <div class="" style="margin-top: 10px">
          <button @click="sendDataToParent">Select File</button>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import base from "@/base";

export default {

	props: {
    maxSize: {
      type: Number,
      default: 5,
      required: true,
    },
    accept: {
      type: String,
      default: "image/*",
    },
  },


	data () {
    return {

			// локальное активное фото
			localPhoto: false,

			// фото в кеше на обновление
			hasPhoto: false,

			// хранение фото как файла в кеше
			cachePhoto: {},

			// любые изменения до Сохранения
			hasPhotoChanges: false,

			errors: [],
			file: {},

      fileSelected: false,

      showFileSelect: false,
      isLoading: false,
      uploadReady: true,
      // file: {
      //   name: "",
      //   size: 0,
      //   type: "",
      //   fileExtention: "",
      //   url: "",
      //   isImage: false,
      //   isUploaded: false,
      // },
    };
  },


	methods: {

		...mapMutations({
			setPhotoEditChanges: 'setPhotoEditChanges',
			switchEditing: 'switchEditing',
		}),

		...mapActions({
			fetchUserData: 'fetchUserData',
		}),


		hasPhotoTrue(){
			this.hasPhoto = true;
		},
		hasPhotoFalse(){
			this.hasPhoto = false;
		},


		setLocalPhoto(newPhoto){
			// console.log('Устанавливаем localPhoto');
			// if(newPhoto.includes('data:image')){
			// 	console.log('Это data:image');
			// }
			// this.localPhoto = newPhoto;
			if(newPhoto){
				if(newPhoto.includes('data:image')){
					this.localPhoto = newPhoto;
				}else{
					this.localPhoto = newPhoto + '?' + Date.now();
				}
			}
		},


		resetFileInput() {
			this.hasPhoto = false;
			this.hasPhotoChanges = true;
			this.setPhotoEditChanges(true);
			this.cachePhoto = '';
			this.localPhoto = false;

      this.uploadReady = false;
      this.$nextTick(() => {
        this.uploadReady = true;
        this.file = {
          name: "",
          size: 0,
          type: "",
          data: "",
          fileExtention: "",
          url: "",
          isImage: false,
          isUploaded: false,
        };
      });
    },


		sendDataToParent() {

			if(this.localPhoto){
				setTimeout( async () => {

					const thePhoto = this.cachePhoto;

					const formdata = new FormData();
					formdata.append("photo", thePhoto, 'photo.jpg');
					formdata.append('_method', 'PUT');

					const response = await axios.post(base.API_URL + '/user/photo', formdata, {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'multipart/form-data',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						}
					});

					const freshPhoto = this.localPhoto;
					// console.log(response);

					this.resetFileInput();
     			this.$emit("file-uploaded", this.file);


					this.setLocalPhoto(freshPhoto);

					this.fetchUserData();
					this.hasPhotoChanges = false;
					this.switchEditing(true);
					this.setPhotoEditChanges(false);

				}, 100);
			}else{
				setTimeout( async () => {

					const response = await axios.delete(base.API_URL + '/user/photo', {
						headers: {
							Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
							'Content-Type': 'multipart/form-data',
							'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
							'Access-Control-Allow-Origin': '*',
						}
					});

					// console.log(response);



					// const thePhoto = '';

					// const formdata = new FormData();
					// formdata.append("photo", thePhoto);
					// formdata.append('_method', 'PUT');

					// const response = await axios.post('https://api.roddom1.vip/v1/user/photo', formdata, {
					// 	headers: {
					// 		Authorization: this.getCurrUser.token_type + ' ' + this.getCurrUser.access_token,
					// 		'Content-Type': 'multipart/form-data',
					// 		'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
					// 		'Access-Control-Allow-Origin': '*',
					// 	}
					// });

					this.resetFileInput();
     			this.$emit("file-uploaded", this.file);

					this.localPhoto = false;

					this.fetchUserData();
					this.hasPhotoChanges = false;
					this.switchEditing(true);
					this.setPhotoEditChanges(false);

				});
			}


    },



		getUploadedData(file) {
      this.fileSelected = true;
      this.showFileSelect = false;
      this.file = file;
    },


		isFileSizeValid(fileSize) {
      if (fileSize <= this.maxSize) {
        // console.log("File size is valid");
      } else {
          this.errors.push(`Файл должен быть менее чем ${this.maxSize} MB`);
      }
    },
    isFileTypeValid(fileExtention) {


			const accepts = this.accept.split(",");
			const extention = fileExtention;
			// accepts.includes(extention)
			// console.log('Accept');
			// console.log('Разрешенные расширения: ' + accepts);
			// console.log('Расширение файла: ' + extention);
			// console.log('----');
      if (accepts.includes(extention)) {
        // console.log("File type is valid");
      } else {
        this.errors.push(`Файл должен быть одним из следующих расишрений: ${this.accept}`);
      }
    },
    isFileValid(file) {
      this.isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100);
      this.isFileTypeValid(file.name.split(".").pop());
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },


		handleFileChange(e) {
      this.errors = [];
			// console.log(e.target.files);
			this.cachePhoto = e.target.files[0];
      // Check if file is selected
      if (e.target.files && e.target.files[0]) {
        // Check if file is valid
        if (this.isFileValid(e.target.files[0])) {
          // Get uploaded file
          const file = e.target.files[0],
            // Get file size
            fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100,
            // Get file extension
            fileExtention = file.name.split(".").pop(),
            // Get file name
            fileName = file.name.split(".").shift(),
            // Check if file is an image
            isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtention);
          // Print to console
          // console.log(fileSize, fileExtention, fileName, isImage);
          // Load the FileReader API

					const reader = new FileReader();
					reader.addEventListener("load", () => {
						// Set file data
						// console.log('ОТработал ридер');
              this.file = {
                name: fileName,
                size: fileSize,
                type: file.type,
                fileExtention: fileExtention,
                isImage: isImage,
                url: reader.result,
                isUploaded: true,
              };
							this.hasPhoto = true;
							this.hasPhotoChanges = true;
							this.setPhotoEditChanges(true);

							// console.log('Устанавливаем localPhoto');
							if(reader.result){
								if(reader.result.includes('data:image')){
									this.localPhoto = reader.result;
								}else{
									this.localPhoto = reader.result + '?' + Date.now();
								}
							}

							// console.log(this.file);
					}, false);
					reader.readAsDataURL(file);
        } else {
          // console.log("Invalid file");
        }
      }
    },





  },

	computed:{
		...mapGetters({
			getCurrUser: 'getCurrUser',
		}),
	},

	mounted(){
		this.setLocalPhoto(this.getCurrUser.user.photo);
	},

}
</script>

<style lang="scss">

.file-upload{
	opacity: 0;
	width: 0;
	height: 0;
	overflow: hidden;
}

.img_wrapper{
	cursor: pointer;
	margin: 0 auto;
	min-width: 150px;
	width: 150px;
	height: 150px;
	position: relative;
	margin-bottom: 14px;
	margin-top: 8px;
	&::before{
		z-index: 5;
		display: block;
		position: absolute;
		right: 4px;
		top: 4px;
		content: '';
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background-color: #ffffff;
		box-shadow: 0 2px 4px #dadada;
		background-image: url('./../assets/icons/edit.svg');
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: center;
	}
}



.photo_wrap{
	background-color: #FFF;
	padding: 16px;
	padding-top: 8px;
	.buttons_wrap{
		width: calc(100% + 8px);
		margin-left: -4px;
		margin-right: -4px;
		justify-content: center;
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
		&.changePhotoButton{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 4;
			&.transparent{
				opacity: 0;
			}
		}
		&.the_photo_has{
			margin-bottom: 12px;
			object-fit: cover;
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

</style>
