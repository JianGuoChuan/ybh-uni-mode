<template>
	<view>
		<chartColumn v-if="chartType == 'column'"></chartColumn>
		<chartLine v-if="chartType == 'line'"></chartLine>
		<chartRing v-if="chartType == 'ring'"></chartRing>
	</view>
</template>

<script>
	import chartColumn from './charts/column.vue'
	import chartLine from './charts/line.vue'
	import chartRing from './charts/ring.vue'
	export default {
		props : {
			chartType : {
				type : String,
				default: 'column'
			}
		},
		components:{
			chartColumn,chartLine,chartRing
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	
</style>
