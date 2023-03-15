<template>
	<view>
		<ybh-navbar title='柱状图'></ybh-navbar>
		<view class="canvasBox margin-top-lgx">
			<canvas canvas-id="myid" id="myid" class="charts" @tap="tap"/>
		</view>
		<view class="padding-md">
			<ybh-button type="pri" @click='updateDate'>更新数据</ybh-button>
		</view>
	</view>
</template>
<script>
	import uCharts from '@/common/js/u-charts.min.js';
	var uChartsInstance = {};
	export default {
		data(){
			return {
				cWidth: 750,
				cHeight: 280,
			}
		},
		methods: {
			// 数据
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					let res = {
						categories: ["2016","2017","2018","2019","2020","2021"],
						series: [
							{
								name: "目标值", // 数据名称
								legendText: '期望值', // 自定义图例显示文字
								data: [35,36,31,33,13,34] ,// 数据值
								show: true, // 是否显示
							},{
								name: "完成量",
								data: [18,27,21,24,6,28]
							}
						]
					};
					this.drawCharts('myid', res);
				}, 500);
			},
			// 图表参数配置
			drawCharts(id,data){
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: 'column',
					padding: [25,15,0,5],
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true, // 是否开启动画
					// 图例配置
					legend: {
						show: true, // 是否显示图例标识
					},
					// X轴配置
					xAxis: {
						disableGrid: true
					},
					// Y轴配置
					yAxis: {
						data: [ { min: 0 } ]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					},
				});
			},
			// 图表点击
			tap(e){
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			},
			updateDate(){
				let res = {
					categories: ["2016","2017","2018","2019","2020","2021"],
					series: [
						{
							name: "目标值",
							data: [55,44,33,22,11,0]
						},{
							name: "完成量",
							data: [0,5,10,15,20,25]
						}
					]
				};
				this.drawCharts('myid', res);
			}
		},
		// 图表初始化
		onReady() {
			this.cWidth = uni.upx2px(750);
			this.$nextTick(() => {
				let info = uni.createSelectorQuery().in(this).select('.canvasBox');
				info.boundingClientRect( (data)=> {
					this.cHeight = data.height;
					this.getServerData();
				}).exec();
			})
		},
	}
</script>
<style scoped>
	.canvasBox{
	    width: 100%;
		height: 280px;
	}
	.charts{
		width: 100%;
		height: 100%;
	}
</style>
