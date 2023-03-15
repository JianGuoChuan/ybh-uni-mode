<template>
	<view>
		<ybh-navbar title='饼图'></ybh-navbar>
		<view class="canvasBox margin-top-lgx">
			<canvas canvas-id="myid" id="myid" class="charts" @tap="tap"/>
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
				cHeight: 280
			}
		},
		methods: {
			getServerData() {
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [
							{
								data: [{"name":"一班","value":50},{"name":"二班","value":30},{"name":"三班","value":20},{"name":"四班","value":18},{"name":"五班","value":8}]
							}
						]
					};
					this.drawCharts('myid', res);
				}, 500);
			},
			drawCharts(id,data){
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "pie",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
					padding: [5,5,5,5],
					extra: {
						pie: {
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: true,
							borderWidth: 3,
							borderColor: "#FFFFFF",
							linearType: "custom"
						}
					}
				});
			},
			tap(e){
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		},
		onReady() {
			//这里的 750 对应 css .charts 的 width
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
