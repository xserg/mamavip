<template>

<div class="elements_wrap flexWrap" :class="{active: listLoaded}">
	<element
		v-for="post in posts"
		:post="post"
		:key="post.id"
	>	
	</element>
</div>
	
</template>


<script>

import Element from '@/components/Element';


export default({

	name: 'Elements',
	components: {
		Element,
	},
	props: {
		posts: {
			type: Array,
			required: true,
		}
	},

	data() {
		return{
			listLoaded: false, 
		}
	},

	methods: { 
	goLoadList(){
		setTimeout( async () => {
		this.listLoaded = true;
		}, 500);
	},


	},


	mounted(){
		this.goLoadList();
	},

});
</script>


<style lang="scss">

.elements_wrap{
	width: calc(100% + 16px);
	padding: 16px 8px 16px;
	flex-wrap: wrap;
	transition: all .45s cubic-bezier(1, -0.15, 0.63, 0.99);;
	opacity: 0;
	&.active{
		opacity: 1;
	}
	.the_element{
		width: calc(50% - 16px);
		margin-left: 8px;
		margin-right: 8px;
	}
}


/* -------- @media ----------- */

@media screen and (max-width: 480px) {

.elements_wrap{
	width: 100%;
	padding: 8px 16px 16px;
	margin-left: 0px;
	margin-right: 0px;
	.the_element{
		width: 100%;
		margin-left: 0px;
		margin-right: 0px;
	}
}

}

</style>
