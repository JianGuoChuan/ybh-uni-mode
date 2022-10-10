<template>
	<view class="signBody">
		<!-- 操作栏 -->
		<view class="signBottom">
			<view class="signBottom-item signTools" 
				:style="{'color' : vuex_themeColor.color,'borderTop' : `1px solid ${vuex_themeColor.color}`}">
				<view class="signTools-item" @click="lineWidth">
					<view class="padding-top-md padding-bottom-sm">
						<text class="ybh-icon ybh-icon-graffiti font-lgc"></text>
					</view>
					<view>线条</view>
				</view>
				<view class="signTools-item" @click="color">
					<view class="padding-top-md padding-bottom-sm">
						<text class="ybh-icon ybh-icon-palette font-lgc"></text>
					</view>
					<view>颜色</view>
				</view>
				<view class="signTools-item" @click="revoke">
					<view class="padding-top-md padding-bottom-sm">
						<text class="ybh-icon ybh-icon-withdraw font-lgc"></text>
					</view>
					<view>撤回</view>
				</view>
				<view class="signTools-item" @click="clear">
					<view class="padding-top-md padding-bottom-sm">
						<text class="ybh-icon ybh-icon-eraser font-lgc"></text>
					</view>
					<view>清空</view>
				</view>
			</view>
			<view class="signBottom-item sumbit" :class="[vuex_themeColor.colorCharacter || 'bg-gradual-blue']" @click="sumbit">提交</view>
		</view>
		<!-- 工具箱 -->
		<view class="signColorBox" v-if="colorShow">
			<view @click="selColor(index)" :class="index==colorIndex ? ' signColorBox-item on ' : 'signColorBox-item '"
			 :style="'background-color:'+item.value" v-for="(item,index) in colorData" :key="index">
				<image src="./static/on.png"></image>
			</view>
		</view>
		<view class="signColorBox" v-if="lineWidthShow">
			<view @click="selLineWidth(index)" :class="index==lineWidthIndex?'signLineBox-item on':'signLineBox-item'"
			 v-for="(item,index) in lineWidthData" :key="index">
				<view :style="'width:60%;height:'+item+'px;background-color:#000000;position: absolute;top: 50%;left: 20%;margin-top:-'+item/2+'px'"></view>
			</view>
		</view>
		<!-- 画板 -->
		<canvas :canvas-id="cid" :id="cid" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
	</view>
</template>

<script>
	/*
	* 签名的请求返回配置 可能与后台反馈数据产生差异导致报错 还请对自身项目做一定的定制
	* action : 请求地址
	* header : 请求头
	*/
	export default {
		name: 'ybh-editSign',
		props: {
			cid: {
				type: String,
				default: '',
			},
			action:{
				type: String,
				default: '',
			},
			header:{
				type: Object,
				required: false,
			}
		},
		data() {
			return {
				id: '',
				Strokes: [],
				dom: null,
				width: 0,
				height: 0,
				colorShow: false,
				colorIndex: 0,
				isWrite : false,
				colorData: [{
					name: 'red',
					value: '#f34336',
				},  {
					name: 'black',
					value: '#000000'
				},  {
					name: 'blue',
					value: '#0238d0',
				}, {
					name: 'green',
					value: '#8bc24b',
				}, {
					name: 'yellow',
					value: '#ffeb3c',
				}, {
					name: 'purple',
					value: '#a603d0',
				}, {
					name: 'grey',
					value: '#a5a5a5',
				}],
				lineWidthShow: false,
				lineWidthIndex: 0,
				lineWidthData: ['1','3', '5', '7', '9', '12', '15']
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				// #ifdef H5
				document.body.addEventListener('touchmove', this.touchmoveEnd, {
					passive: false
				})
				// #endif
				uni.getSystemInfo({
					success: (res) => {
						this.width = res.windowWidth;
						this.height = res.windowHeight;
					}
				});
				this.dom = uni.createCanvasContext(this.cid, this);
			});
		},
		beforeDestroy: function() {
			// #ifdef H5
			document.body.removeEventListener('touchmove', this.touchmoveEnd, {
				passive: false
			})
			// #endif
		},
		methods: {
			touchmoveEnd(e) {
				e.preventDefault();
				e.stopPropagation();
			},
			sumbit() {
				if(!this.isWrite){return}
				uni.canvasToTempFilePath({
					canvasId: this.cid,
					success: (res) => {
						// 未传入请求地址 直接反馈本地路径
						if(!this.action){ this.$emit('sumbit' , res );return}
						uni.showLoading();
						uni.uploadFile({
						    url: this.action,
						    filePath: res.tempFilePath, // uni.chooseImage函数调用后获取的本地文件路劲
							name : 'file',
						    header:this.header,
						    success:(res) => {
								uni.hideLoading();
								// 此处可能需要针对后台返回的数据格式做定制提示
								if(res.statusCode != 200){
									this.$refs.uToast.show({title: '签名上传失败',type: 'error',position: 'bottom'});
									return
								}
								let signImgUrl = JSON.parse(res.data).data.link;
								this.$refs.uToast.show({title: '签名添加成功',type: 'success',position: 'bottom'});
								this.$emit('sumbit' , {signUrl : signImgUrl});
						    },
							fail: (err) => {
								uni.hideLoading();
							}
						});
					},
					fail: (err) => {
						this.$emit('fail', err)
					}
				}, this)
			},
			clear() { //清空
				this.Strokes = [];
				this.isWrite = false;
				this.dom.clearRect(0, 0, this.width, this.height)
				this.dom.draw();
			},
			lineWidth() {
				this.lineWidthShow = !this.lineWidthShow;
				this.colorShow = false;
			},
			selLineWidth(index) {
				this.lineWidthIndex = index;
				this.lineWidthShow = false;
			},
			color() {
				this.colorShow = !this.colorShow;
				this.lineWidthShow = false;
			},
			selColor(index) {
				this.colorIndex = index;
				this.colorShow = false;
			},
			revoke() { //撤销上一步
				var delItem = this.Strokes.pop();
				this.drawCanves();
			},
			drawCanves() {
				this.Strokes.forEach((item, index) => {
					let StrokesItem = item;
					if (StrokesItem.points.length > 1) {
						this.dom.beginPath();
						this.dom.setLineCap('round');
						this.dom.setStrokeStyle(item.style.color);
						this.dom.setLineWidth(item.style.lineWidth);
						StrokesItem.points.forEach((sitem, sindex) => {
							if (sitem.type == "touchstart") {
								this.dom.moveTo(sitem.x, sitem.y)
							} else {
								this.dom.lineTo(sitem.x, sitem.y)
							}
						})
						this.dom.stroke();

					}
				})
				this.dom.draw();
			},
			createId() {
				var d = new Date();
				return 'can' + d.getTime();
			},
			touchstart(e) {
				this.Strokes.push({
					imageData: null,
					style: {
						color: this.colorData[this.colorIndex].value,
						lineWidth: this.lineWidthData[this.lineWidthIndex],
					},
					points: [{
						x: e.touches[0].x,
						y: e.touches[0].y,
						type: e.type,
					}]
				})
				this.drawLine(this.Strokes[this.Strokes.length - 1], e.type);
			},
			touchmove(e) {
				this.isWrite = true;
				this.Strokes[this.Strokes.length - 1].points.push({
					x: e.touches[0].x,
					y: e.touches[0].y,
					type: e.type,
				})
				this.drawLine(this.Strokes[this.Strokes.length - 1], e.type);
			},
			touchend(e) {
				if(this.Strokes[this.Strokes.length - 1].points.length<2){//当此路径只有一个点的时候
					this.Strokes.pop();
				}
			},
			drawLine(StrokesItem, type) {
				if (StrokesItem.points.length > 1) {
					this.dom.beginPath();
					this.dom.setLineCap('round')
					this.dom.setStrokeStyle(StrokesItem.style.color);
					this.dom.setLineWidth(StrokesItem.style.lineWidth);
					this.dom.moveTo(StrokesItem.points[StrokesItem.points.length - 2].x, StrokesItem.points[StrokesItem.points.length -
						2].y);
					this.dom.lineTo(StrokesItem.points[StrokesItem.points.length - 1].x, StrokesItem.points[StrokesItem.points.length -
						1].y);
					this.dom.stroke();
					this.dom.draw(true);
				}
			}
		}
	}
</script>

<style>
	.signBody {
		position: fixed;
		top: 0;
		bottom: 100rpx;
		left: 0;
		width: 100%;
	}
	.signBody canvas {
		width: 100%;
		height: 100%;
	}
	.signBottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #000;
		z-index: 11;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		background-color: #fff;
	}
	.signBottom .signBottom-item {
		-webkit-box-flex: 3;
		-webkit-flex-grow: 3;
		flex-grow: 3;
	}
	.signBottom view.sumbit {
		-webkit-box-flex: 1;
		-webkit-flex-grow: 1;
		flex-grow: 1;
		color: #fff;
	}
	.signTools {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	.signTools-item {
		text-align: center;
		-webkit-box-flex: 1;
		-webkit-flex-grow: 1;
		flex-grow: 1;
		line-height: 25rpx;
	}
	.signBottom-item view image {
		width: 50rpx;
		height: 50rpx;
		padding-top: 10rpx;
	}
	.signTools-item view {font-size: 22rpx;}
	.signColorBox {
		position: fixed;
		bottom: 100rpx;
		left: 0;
		width: 100%;
		z-index: 11;
		padding: 25rpx 20rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;
		border-top: 1px dashed #d9d9d9;
		transition: display 2s;
		-moz-transition: display 2s;
		/* Firefox 4 */
		-webkit-transition: display 2s;
		/* Safari 和 Chrome */
		-o-transition: display 2s;
	}
	.signColorBox-item {
		width: 80rpx;
		height: 80rpx;
		background-color: #000000;
		border-radius: 100px;
		margin: 5px;
		position: relative;
	}
	.signLineBox-item {
		width: 80rpx;
		height: 80rpx;
		background-color: #fff;
		border-radius: 100px;
		margin: 5px;
		position: relative;
	}
	.signLineBox-item.on {border: 1px solid #d4a39e;}
	.signColorBox-item image {display: none;}
	.signColorBox-item.on image {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 50rpx;
		height: 50rpx;
		margin-top: -25rpx;
		margin-left: -25rpx;
	}
	.black {background-color: #000000 !important;}
</style>

