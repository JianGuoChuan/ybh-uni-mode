<template>
	<view>
		<SpinnerSnake v-if="loadingType == 'type1'"></SpinnerSnake>
		<TripleBounce v-if="loadingType == 'type2'"></TripleBounce>
		<DoubleBounce v-if="loadingType == 'type3'"></DoubleBounce>
	</view>
</template>

<script>
	import SpinnerSnake from './spinner/snake.vue'
	import TripleBounce from './spinner/triple-bounce.vue'
	import DoubleBounce from './spinner/double-bounce.vue'
	export default {
		props:{
			loadingType : {
				type : String,
				default: 'type1'
			}
		},
		components: {
			SpinnerSnake,TripleBounce,DoubleBounce
		},
		data() {
			return {
				
			}
		},
	}
</script>
<style>
</style>