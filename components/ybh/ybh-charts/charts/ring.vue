<template>
	<view>
		<view class="charts-box">
			<qiun-data-charts type="ring" :chartData="chartData"/>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				chartData:{
					"series": [
						{
							"data": [
								{
									"name": "一班",
									"value": 50
								},
								{
									"name": "二班",
									"value": 30
								},
								{
									"name": "三班",
									"value": 20
								},
								{
									"name": "四班",
									"value": 18
								},
								{
									"name": "五班",
									"value": 8
								}
							]
						}
					]
				},
			}
		}
	}
</script>
<style scoped>
	.charts-box{
		width: 100%;
		height: 250px;
	}
</style>